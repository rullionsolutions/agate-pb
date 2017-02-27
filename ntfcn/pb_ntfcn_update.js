"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.Page.clone({
    id              : "pb_ntfcn_update",
    entity_id: "pb_ntfcn",
    title           : "Update user notification",
    short_title     : "Update",
    transactional   : true,
    requires_key    : true,
});


module.exports.sections.addAll([
    { id: "update"  , type: "Update"    , entity: "pb_ntfcn" }
]);


module.exports.defbind("setupEndRecord", "setupEnd", function () {
    this.getPrimaryRow().endSetup();
});


module.exports.defbind("setupAfterRecord", "updateAfterSections", function (params) {
    this.getPrimaryRow().updateAfter();
});
