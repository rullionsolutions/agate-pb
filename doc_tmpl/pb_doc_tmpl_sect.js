"use strict";

var Core = require("lapis-core/index.js");
var Data = require("lazuli-data/index.js");


module.exports = Data.Entity.clone({
    id              : "pb_doc_tmpl_sect",
    title           : "Document Template Section",
    area            : "pb",
    transactional   : true,
    title_field     : "title",
    default_order   : "seq_number",
    primary_key     : "id",
    pack_level      : 7,
});


module.exports.addFields([
    { id: "doc_tmpl"   , label: "Document Template"    , type: "Reference", editable: false, list_column: true, ref_entity: "pb_doc_tmpl" },
    { id: "id"         , label: "Id"                   , type: "Number"   , editable: false, auto_generate: true },
    { id: "seq_number" , label: "Sequence Number"      , type: "Number"   , mandatory: true, list_column: true, search_criterion: true },
    { id: "hdg_level"  , label: "Heading Level"        , type: "Number"   , mandatory: true, list_column: true, default_val: "1", min: 1, max: 5 },
    { id: "title"      , label: "Title"                , type: "Text"     , mandatory: true, list_column: true, search_criterion: true, data_length: 80 },
    { id: "slctn_expr" , label: "Selection Expression" , type: "Text"     , list_column: true, data_length:  80 },
    { id: "slctn_regex", label: "Selection Regex"      , type: "Text"     , list_column: true, data_length: 255 },
    { id: "text"       , label: "Section Text"         , type: "Textarea" , list_column: true, css_richtext: true, min_col_width: "300px" },
    { id: "hdg_numbering", label: "Heading Number"     , type: "Option"   , list_column: true, list: "sy.yesno", default_val: "Y", mandatory: true }
]);


module.exports.define("indexes", []);


module.exports.define("getConfig", function (doc_tmpl_id) {
    var config = [],
        query = this.getQuery(null, true);      // use default sort

    query.addCondition({ column: "A.doc_tmpl", operator: "=", value: doc_tmpl_id });

    while (query.next()) {
        config.push({
            seq      : query.getColumn("A.seq_number").getNumber(0),
            level    : query.getColumn("A.hdg_level" ).getNumber(0),
            expr     : query.getColumn("A.slctn_expr").get(),
            regex    : new RegExp(query.getColumn("A.slctn_regex").get()),
            title    : query.getColumn("A.title"     ).get(),
            text     : query.getColumn("A.text"      ).get(),
            numbering: query.getColumn("A.hdg_numbering").get(),
            tokens   : Core.Format.sweepTextForTokens(query.getColumn("A.text").get())
        });
    }
    query.reset();
    return config;
});


module.exports.define("getSectionHeadingTracker", function () {
    var head_structure,
        init,
        progress,
        subHeaderUsed,
        increaseDepth,
        decreaseDepth,
        getHeadingNumber,
        getSubHeadingNumber,
        buildHeadingString;


    init = function () {
        head_structure = [1,1];
    };
    progress = function () {
        var curr_pos = head_structure.length-2,
            end_pos  = head_structure.length-1;
        head_structure[curr_pos] = head_structure[curr_pos] + 1;
        head_structure[end_pos]  = 1;
    };
    subHeaderUsed = function () {
        var end_pos = head_structure.length-1;
        head_structure[end_pos] = head_structure[end_pos] + 1;
    };
    increaseDepth = function () {
        var new_pos = head_structure.length;
        head_structure[new_pos] = 1;
    };
    decreaseDepth = function () {
        var end_pos;
        head_structure.splice(-1,1);
        end_pos = head_structure.length-1;
        head_structure[end_pos] = 1;
        progress();
    };
    getHeadingNumber = function () {
        return buildHeadingString().split(".").slice(0,-1).join(".");
    };
    getSubHeadingNumber = function () {
        return buildHeadingString();
    };
    buildHeadingString = function () {
        var built_heading = "",
            first = head_structure[0],
            rest  = head_structure.slice(1);

        built_heading = built_heading + first;
        rest.forEach( function (num) {
            built_heading = built_heading + "." + num;
        });
        return built_heading;
    };

    init();

    return {
        progress           : progress,
        subHeaderUsed      : subHeaderUsed,
        increaseDepth      : increaseDepth,
        decreaseDepth      : decreaseDepth,
        getHeadingNumber   : getHeadingNumber,
        getSubHeadingNumber: getSubHeadingNumber
    };
});

module.exports.define("trimSectionInfo", function (section) {
    if (section.title === null || section.title === undefined || section.title === "" || section.title === "**") {
        section.title = undefined;
    }
    if (section.text === null || section.text === undefined || section.text === "" || section.text === "**") {
        section.text = undefined;
    }
    if (section.expr === null || section.expr === undefined || section.expr === "" || section.expr === "**") {
        section.expr = undefined;
    }
});

module.exports.define("addHeadingNumberInfo", function (config) {
    var heading_tracker = this.getSectionHeadingTracker(),
        that = this;

    config.forEach(function (section, index) {
        var tmp_headings = [],
            this_level   = section.level,
            next_level   = config[index + 1] && config[index + 1].level,
            head_num;

        that.trimSectionInfo(section);

        if (section.numbering !== "N") {
            config[index].head_num = {};
            head_num = config[index].head_num;

            tmp_headings.push(heading_tracker.getHeadingNumber());
            tmp_headings.push(heading_tracker.getSubHeadingNumber());

            if (section.title !== undefined) { head_num.title = tmp_headings.shift(); }
            if (section.text  !== undefined) { head_num.text   = tmp_headings.shift(); }

            if (next_level === undefined) { return; }

            if (tmp_headings.length === 0) { heading_tracker.subHeaderUsed(); }

            if  (next_level === this_level)     { heading_tracker.progress();      }
        }
        if      (next_level === undefined)      { return; }
        if      (next_level === this_level + 1) { heading_tracker.increaseDepth(); }
        else if (next_level === this_level - 1) { heading_tracker.decreaseDepth(); }
        // TODO : else                          { that.session.messages.add({ type: "E", text: "The indentation of this template is not incremental. Please correct the template." }); }
        // TODO : Need to respond if the sections delta by more than 1 level.
        // TODO : Should probably put some validation into the template creation as well to prevent it being saved if this is the case.
        // TODO : Add logic consider the ignore_sub_headers, force_section_numbers & heading_numbering page variables when determining heading values
        // TODO : Move the section_numbering bit out into the heading generation as well
    });

    return config;
});


module.exports.define("renderSections", function (config, params, xmlstream) {
    var that = this;

    Object.keys(params).forEach(function (param) {
        that[param] = params[param];
    });

    this.replaceToken = Core.Base.replaceToken;

    this.addHeadingNumberInfo(config);

    config.forEach(function (section) {
        that.renderSection(section, xmlstream);
    });
});


module.exports.define("renderSection", function (section, xmlstream) {
    var buildSection,
        buildWithExpressionSelection,
        that = this;

    buildWithExpressionSelection = function () {
        var selection_string;

        selection_string = this.detokenize(section.expr);
        if (selection_string === undefined || section.regex.exec(selection_string) !== null) {
            buildSection();
        }
    };

    buildSection = function () {
        var title_out = "";
        var text_out = "";
        if (section.title !== undefined) {
            if (section.head_num !== undefined && section.head_num.title !== undefined) {
                title_out = title_out + section.head_num.title + " ";
            }
            title_out += section.title;
            xmlstream.makeElement("h" + section.level).text(title_out);
        }
        if (section.text !== undefined) {
            if (section.head_num !== undefined && section.head_num.text !== undefined) {
                text_out += section.head_num.text + " ";
            }
            text_out += section.text;
            xmlstream.makeElement("p").text(that.detokenize(text_out));
        }
    };

    if (section.expr) {
        buildWithExpressionSelection();
    } else {
        buildSection();
    }
    // TODO : add logic to ignore other selection expression based sections at the same sequence number
    // TODO : the number which was placed before the text was previously inside a <span> tag. Consider doing this again
});
