"use strict";

var UI = require("lazuli-ui/index.js");
var Data = require("lazuli-data/index.js");


module.exports = UI.Page.clone({
    id              : "pb_doc_tmpl_test",
    entity_id: "pb_doc_tmpl",
    title           : "Test this Document Template",
});


module.exports.tabs.addAll([
    { id: "params", label: "Parameters" },
    { id: "result", label: "Resulting Contract" }
]);


module.exports.sections.addAll([
    { id: "params", type: "FormParams", tab: "params" },
    { id: "result", type: "Section"   , tab: "result" }
]);


module.exports.links.addAll([
    { id: "search", page_to: "pb_doc_tmpl_search" }
]);


module.exports.defbind("setupEndLogic", "setupEnd", function () {
    this.config = Data.entities.get("pb_doc_tmpl_sect").getConfig(this.getPrimaryRow().getKey());
    this.sections.get("params").fieldset.addFields([
        { id: "json", label: "Parameters", type: "Textarea" }
    ]);
});


module.exports.sections.get("result").override("render", function (element, render_opts) {
    var params = {};
    UI.Section.render.call(this, element, render_opts);
    try {
        params = JSON.parse(this.owner.page.sections.get("params").fieldset.getField("json").get().replace(/&quot;/g, '"'));
        this.info("test: " + JSON.stringify(params));
    } catch (e1) {
        this.owner.page.session.messages.add({ type: 'E', text: e1.toString() });
    }
    Data.entities.get("pb_doc_tmpl_sect").renderSections(this.owner.page.config, params, this.sctn_elem, render_opts);
});
