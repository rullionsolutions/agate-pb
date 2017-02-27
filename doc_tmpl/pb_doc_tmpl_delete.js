"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.Page.clone({
    id              : "pb_doc_tmpl_delete",
    entity_id: "pb_doc_tmpl",
    title           : "Delete this Document Template",
    transactional   : true,
    requires_key    : true,
    short_title     : "Delete",
    security        : { all: false, sysmgr: true },
});


module.exports.sections.addAll([
    { id: "main", type: "Delete", entity: "pb_doc_tmpl" }
]);
