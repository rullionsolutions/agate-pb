"use strict";

var Core = require("lapis-core/index.js");
var Data = require("lazuli-data/index.js");


module.exports = Data.Entity.clone({
    id              : "pb_doc_tmpl",
    title           : "Document Template",
    area            : "pb",
    display_page    : true,
    transactional   : true,
    full_text_search: true,
    title_field     : "title",
    default_order   : "area,title",
    primary_key     : "area,id",
    pack_level      : 0,
    pack_condition  : "area='{module}'",
});


module.exports.addFields([
    { id: "area"  , label: "Area"  , type: "Text"    , data_length:   2, mandatory: true, list_column: true, search_criterion: true, config_item: "x.areas" },
    { id: "id"    , label: "Id"    , type: "Text"    , data_length:  80, mandatory: true, list_column: true },
    { id: "title" , label: "Title" , type: "Text"    , data_length: 160, mandatory: true, list_column: true, search_criterion: true },
    { id: "detail", label: "Detail", type: "Textarea", css_richtext: true }
]);


module.exports.define("indexes", [
    "area,id",
]);


module.exports.area_fieldset = {};


// TODO - move to vc
module.exports.area_fieldset.vc = Data.FieldSet.clone({
    id : "vc_area_fieldset"
});

module.exports.area_fieldset.vc.addFields([
    { id: "first_name"       , label: "First Name"            , type: "Text"     },
    { id: "last_name"        , label: "Last Name"             , type: "Text"     },
    { id: "home_address"     , label: "Home Address"          , type: "Text"     },
    { id: "home_addr_line_1" , label: "Home Address (line 1)" , type: "Text"     },
    { id: "home_addr_line_2" , label: "Home Address (line 2)" , type: "Text"     },
    { id: "home_county"      , label: "Home County"           , type: "Text"     },
    { id: "home_postcode"    , label: "Home Postcode"         , type: "Postcode" },
    { id: "start_dt"         , label: "Start Date"            , type: "Date"     },
    { id: "end_dt"           , label: "End Date"              , type: "Date"     },
    { id: "rqmt"             , label: "Job Title"             , type: "Reference", ref_entity: "vr_rqmt", },
    { id: "starting_salary"  , label: "Starting Salary"       , type: "Money"    }
]);

module.exports.area_fieldset.vc.defbind("toNameCase", "afterFieldChange", function (spec) {
    var field = spec && spec.field;
    if (!field.isBlank()) {
        if (field.id === "first_name" || field.id === "last_name") {
            field.set(Core.Format.toNameCase(field.get()));
        }
    }
});
