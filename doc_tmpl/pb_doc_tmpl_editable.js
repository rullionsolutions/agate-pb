"use strict";

var Core = require("lapis-core/index.js");
var Data = require("lazuli-data/index.js");
var UI = require("lazuli-ui/index.js");


module.exports = UI.Page.clone({
    id              : "pb_doc_tmpl_editable",
    entity_id: "pb_doc_tmpl"
});


module.exports.sections.addAll([
    { id: "main" , type: "Create"    , entity: "pb_doc_tmpl" },
    { id: "sects", type: "ListUpdate", entity: "pb_doc_tmpl_sect", link_field: "doc_tmpl" }
]);


module.exports.defbind("validate_tokens_used", "updateAfterSections", function (params) {
    var main  = this.sections.get("main").fieldset,
        sects = this.sections.get("sects"),
        available_fields = Data.entities.get("pb_doc_tmpl").area_fieldset[main.getField("area").get()],
        section_tokens,
        trans = this.getTrans();

    if (params.page_button === "save") {
        sects.eachRow(function (sect) {
            section_tokens = Core.Format.sweepTextForTokens(sect.getField("text").get());
            section_tokens.forEach(function (token) {
                if (available_fields && available_fields.get(token) === undefined) {
                    trans.messages.add({
                        type: "E",
                        text: "Unavailable token {" + token + "} is used in section titled " + sect.getField("title").get(),
                    });
                }
            });
        });
    }
});
