"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.SearchPage.clone({
    id              : "pb_doc_tmpl_search",
    entity_id: "pb_doc_tmpl",
    title           : "Search for Document Templates",
    short_title     : "Document Templates",
});


module.exports.sections.addAll([
    { id: "main", type: "Search", entity: "pb_doc_tmpl" }
]);


module.exports.links.addAll([
    { id: "create", page_to: "pb_doc_tmpl_create" }
]);
