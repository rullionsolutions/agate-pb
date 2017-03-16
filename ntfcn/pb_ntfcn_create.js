"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.Page.clone({
    id: "pb_ntfcn_create",
    entity_id: "pb_ntfcn",
    title: "Create user notification",
    short_title: "Create",
    transactional: true,
});


module.exports.sections.addAll([
    {
        id: "create",
        type: "Create",
        entity: "pb_ntfcn",
    },
]);


module.exports.defbind("setupEndLogic", "setupEnd", function () {
    this.getPrimaryRow().endSetup();
    this.getPrimaryRow().getField("created").set("NOW");
});


module.exports.defbind("setupAfterLogic", "updateAfterSections", function (params) {
    this.getPrimaryRow().updateAfter();
});
