"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.pages.get("pb_doc_tmpl_editable").clone({
    id              : "pb_doc_tmpl_update",
    title           : "Update this Document Template",
    transactional   : true,
    requires_key    : true,
    short_title     : "Update",
});


// x.pages.pb_doc_tmpl_delete.sections.get("main").type = "Update";
