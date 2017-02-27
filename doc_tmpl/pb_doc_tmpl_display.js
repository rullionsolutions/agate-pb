"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.Page.clone({
    id              : "pb_doc_tmpl_display",
    entity_id: "pb_doc_tmpl",
    title           : "Document Template",
    requires_key    : true,
});


module.exports.sections.addAll([
    { id: "main"    , type: "Display"      , entity: "pb_doc_tmpl" },
    { id: "sects"   , type: "ListQuery"    , entity: "pb_doc_tmpl_sect", link_field: "doc_tmpl" },
    { id: "chg_hist", type: "ChangeHistory", entity: "pb_doc_tmpl" }
]);


module.exports.links.addAll([
    { id: "test"  , page_to: "pb_doc_tmpl_test"  , page_key: "{page_key}" },
    { id: "update", page_to: "pb_doc_tmpl_update", page_key: "{page_key}" },
    { id: "delete", page_to: "pb_doc_tmpl_delete", page_key: "{page_key}" }
]);
