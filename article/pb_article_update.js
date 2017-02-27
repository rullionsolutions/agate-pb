"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.Page.clone({
    id              : "pb_article_update",
    entity_id: "pb_article",
    title           : "Update this Article",
    short_title     : "Update",
    transactional   : true,
    requires_key    : true
});


module.exports.sections.addAll([
    { id: "update"  , type: "Update"    , entity: "pb_article" }
//    { id: "sections", type: "ListUpdate", entity: "pb_article_sect", link_field: "article" },
]);


module.exports.defbind("successClearCache", "success", function () {
    this.session.clearPageFromCache("pb_article_show");            // clear from page cache
});
