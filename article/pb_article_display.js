"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.Page.clone({
    id              : "pb_article_display",
    entity_id: "pb_article",
    title           : "Article",
    short_title     : "Display",
    requires_key    : true,
});


module.exports.sections.addAll([
    { id: "display" , type: "Display"      , entity: "pb_article" },
//    { id: "sections", type: "ListQuery"    , entity: "pb_article_sect", link_field: "article" },
    { id: "chg_hist", type: "ChangeHistory", entity: "pb_article" }
]);


module.exports.links.addAll([
    { id: "show"  , page_to: "pb_article_show"  , page_key: "{page_key}" },
    { id: "update", page_to: "pb_article_update", page_key: "{page_key}" },
    { id: "delete", page_to: "pb_article_delete", page_key: "{page_key}" }
]);
