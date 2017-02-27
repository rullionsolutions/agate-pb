"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.Page.clone({
    id              : "pb_ntfcn_display",
    entity_id: "pb_ntfcn",
    title           : "Display user notification",
    short_title     : "Display",
    requires_key    : true,
});


module.exports.sections.addAll([
    { id: "main"  , type: "Display"    , entity: "pb_ntfcn" }
]);


module.exports.links.addAll([
    { id: "update", page_to: "pb_ntfcn_update", page_key: "{page_key}" }
]);


module.exports.defbind("setupEndLogic", "setupEnd", function () {
    this.sections.get("main").fieldset.each(function (field) {
        field.visible = true;
    });
});
