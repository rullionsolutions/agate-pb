"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.Page.clone({
    id              : "pb_ntfcn_show",
    entity_id: "pb_ntfcn",
    title           : "Show this User Notification",
    short_title     : "Show",
    transactional   : false,
    requires_key    : true,
    security        : { all: true }
});


module.exports.sections.addAll([
    { id: "display"  , type: "Display"    , entity: "pb_ntfcn" }
]);


module.exports.buttons.addAll([
    { id: "ack", label: "Acknowledge", css_class: "btn-success" }
]);


module.exports.defbind("setupEndLogic", "setupEnd", function () {
    var fieldset = this.sections.get("display").fieldset,
        trans,
        row;

    fieldset.each(function (field) {
        field.visible = false;
    });
    this.full_title = fieldset.getField("summary").get();
//    fieldset.getField("summary").visible = true;
    fieldset.getField("detail" ).visible = true;
    fieldset.getField("file").visible = true;

    this.buttons.get("ack").visible = (fieldset.getField("how_often").get() === "A");      // to be acknowledged

    if (fieldset.getField("which_user").get() === "U" && fieldset.getField("viewed").isBlank()) {  // named user
        trans = this.session.getNewTrans({ page: this });
        row = trans.getRow("pb_ntfcn", this.page_key);
        row.getField("viewed").set("now");
        trans.save();
    }
});


module.exports.defbind("setupAfterLogic", "updateAfterSections", function (params) {
    var trans,
        row;

    if (params.page_button === "ack") {
        trans = this.session.getNewTrans({ page: this });
        row = trans.getRow("pb_ntfcn", this.page_key);
        row.getField("acknowl").set("now");
        trans.save();
        this.active = false;
        this.redirect_url = "index.html?page_id=home";
    }
});
