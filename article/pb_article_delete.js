"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.Page.clone({
    id              : "pb_article_delete",
    entity_id: "pb_article",
    title           : "Delete this Article",
    short_title     : "Delete",
    transactional   : true,
    requires_key    : true,
    security        : { all: false, sysmgr: true },
});


module.exports.sections.addAll([
    { id: "delete", type: "Delete", entity: "pb_article" }
]);
