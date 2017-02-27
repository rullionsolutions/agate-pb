"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.Page.clone({
    id              : "pb_ntfcn_search",
    entity_id: "pb_ntfcn",
    title           : "Search for User Notifications",
    short_title     : "User Notifications"
});


module.exports.sections.addAll([
    { id: "main"  , type: "Search"    , entity: "pb_ntfcn" }
]);


module.exports.links.addAll([
    { id: "create", page_to: "pb_ntfcn_create" }
]);
