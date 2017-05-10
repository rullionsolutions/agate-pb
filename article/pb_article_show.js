"use strict";

var UI = require("lazuli-ui/index.js");


module.exports = UI.Page.clone({
    id              : "pb_article_show",
    entity_id: "pb_article",
    title           : "Show this Article",
    short_title     : "Show",
    requires_key    : true,
    skin            : "guest.html",
    security        : { all: true },
});


module.exports.sections.addAll([
    {
        id: "display",
        type: "Section",
        entity_id: "pb_article",
        layout: "table-cell",
    },
]);


module.exports.links.addAll([
    {
        id: "display",
        page_to: "pb_article_display",
        page_key: "{page_key}",
    },
    {
        id: "update",
        page_to: "pb_article_update",
        page_key: "{page_key}",
    },
    {
        id: "delete",
        page_to: "pb_article_delete",
        page_key: "{page_key}",
    },
]);


module.exports.defbind("setupEnd", "setupEnd", function () {
    this.fieldset = this.getPrimaryRow();

    if (!this.checkSecurity()) {
        this.throwError({ id: "access_denied", text: "Access denied" });
    }
    this.fieldset.each(function (field) {
        field.visible = false;
    });
    this.fieldset.getField("content").visible = true;
    this.full_title = this.fieldset.getField("title").get();

    this.fieldset.page = this;
});


// allow access if either user is NOT a guest OR article's security setting is GA (guest access)
module.exports.define("checkSecurity", function () {
    return (this.fieldset.getField("security").get() === "GA" || !this.session.is_guest);
});
