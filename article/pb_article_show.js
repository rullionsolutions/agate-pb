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
    { id: "display" , type: "Section", entity: "pb_article" }
]);


module.exports.links.addAll([
    { id: "display", page_to: "pb_article_display", page_key: "{page_key}" },
    { id: "update" , page_to: "pb_article_update" , page_key: "{page_key}" },
    { id: "delete" , page_to: "pb_article_delete" , page_key: "{page_key}" }
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


module.exports.sections.get("display").override("render", function (element, render_opts) {
    UI.Section.render.call(this, element, render_opts);
    this.form_elem = this.getSectionElement(render_opts).addChild("div", null, "css_form_body");
    this.owner.page.fieldset.getField("content").renderControl(this.form_elem, render_opts);
});


// allow access if either user is NOT a guest OR article's security setting is GA (guest access)
module.exports.define("checkSecurity", function () {
    return (this.fieldset.getField("security").get() === "GA" || !this.session.is_guest);
});

/*
x.entities.pb_article.show_page = x.pages.pb_article_show;

module.exports = x.pages.pb_article_show.clone({
    id              : "pb_article_show_guest",
    security_regex  : /^G/,
    security        : { all: true },
    skin            : "guest.html"
});
module.exports.links.addAll([
    { id: "login", url: "index.html", label: "Return to Log-in" },
]);
module.exports.events.add("showShowPage", "setupEnd", function () {
    this.getPrimaryRow().show_page = this;
});
//End of page pb_article_show_guest
*/
