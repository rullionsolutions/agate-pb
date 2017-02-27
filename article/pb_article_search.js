"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.Page.clone({
    id              : "pb_article_search",
    entity_id: "pb_article",
    title           : "Search for Articles",
    short_title     : "Articles"
});


module.exports.sections.addAll([
    { id: "search", type: "Search", entity: "pb_article" }
]);


module.exports.links.addAll([
    { id: "create", page_to: "pb_article_create" }
]);
