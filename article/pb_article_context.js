"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.ContextPage.clone({
    id              : "pb_article_context",
    entity_id: "pb_article",
    title           : "Article",
    requires_key    : true,
});


module.exports.sections.addAll([
    { id: "display" , type: "Display", entity: "pb_article" }
]);


module.exports.links.addAll([
    { id: "show"  , page_to: "pb_article_show"  , page_key: "{page_key}" },
    { id: "update", page_to: "pb_article_update", page_key: "{page_key}" },
    { id: "delete", page_to: "pb_article_delete", page_key: "{page_key}" }
]);
