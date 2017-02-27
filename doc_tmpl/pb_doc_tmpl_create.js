"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.pages.get("pb_doc_tmpl_editable").clone({
    id              : "pb_doc_tmpl_create",
    title           : "Create a Document Template",
    transactional   : true,
    short_title     : "Create",
});
