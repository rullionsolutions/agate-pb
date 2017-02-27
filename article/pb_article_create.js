"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.Page.clone({
    id              : "pb_article_create",
    entity_id: "pb_article",
    title           : "Create this Article",
    short_title     : "Create",
    transactional   : true,
    requires_key    : true,
});


module.exports.sections.addAll([
    { id: "create"  , type: "Create"    , entity: "pb_article" }
// Can't add sections until id is defined
//    { id: "sections", type: "ListUpdate", entity: "pb_article_sect", link_field: "article" },
]);


module.exports.defbind("presaveLogic", "presave", function () {
    var row = this.getPrimaryRow(),
        id  = row.getField("title").get().toLowerCase().replace(/[\W]/g, "_");

    row.getField("id").set(id);
    this.exit_url_save = "?page_id=pb_article_update&page_key=" + id;
});
