"use strict";


var UI = require("lazuli-ui/index.js");


module.exports = UI.ContextPage.clone({
    id              : "pb_doc_tmpl_context",
    entity_id: "pb_doc_tmpl",
    title           : "Document Template",
    requires_key    : true,
});


module.exports.sections.addAll([
    { id: "main"    , type: "Display"      , entity: "pb_doc_tmpl" }
]);


module.exports.links.addAll([
    { id: "update", page_to: "pb_doc_tmpl_update", page_key: "{page_key}" },
    { id: "delete", page_to: "pb_doc_tmpl_delete", page_key: "{page_key}" }
]);
