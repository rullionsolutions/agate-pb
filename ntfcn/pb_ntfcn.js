"use strict";

var Access = require("lazuli-access/index.js");
var Data = require("lazuli-data/index.js");
var Rhino = require("lazuli-rhino/index.js");
var UI = require("lazuli-ui/index.js");
var SQL = require("lazuli-sql/index.js");


module.exports = Data.Entity.clone({
    id              : "pb_ntfcn",
    title           : "Notification",
    area            : "pb",
    transactional   : true,
    autocompleter   : true,
    full_text_search: true,
    title_field     : "summary",
    default_order   : "id,id",
    primary_key     : "id",
    icon            : "style/Axialis/Png/24x24/Write2.png",
});


module.exports.addFields([
    { id: "id"         , label: "Id"                , type: "Number"    , editable: false, visible: false, list_column: true, auto_generate: true },
    { id: "summary"    , label: "Summary"           , type: "Text"      , mandatory: true, list_column: true, data_length: 80 },
    { id: "detail"     , label: "Detail"            , type: "Textarea"  , css_richtext: true },
    { id: "msg_type"   , label: "Notification type" , type: "Option"    , mandatory: true, list: "sy.msg_type" },
    { id: "which_user" , label: "Which user"        , type: "Option"    , mandatory: true, list_column: true, list: "pb.which_user", css_reload: true },
    { id: "user_id"    , label: "User"              , type: "Reference" , visible: false, ref_entity: "ac_user" },
    { id: "type_id"    , label: "Type"              , type: "Reference" , visible: false, ref_entity: "sy_user_type" },
    { id: "role_id"    , label: "Role"              , type: "Option"    , visible: false, collection_id: "roles", data_length: 80 },
    { id: "when_showed", label: "When"              , type: "Option"    , mandatory: true, list_column: true, list: "pb.when", css_reload: true },
    { id: "page_id"    , label: "Page"              , type: "Option"    , visible: false, collection_id: "pages", data_length: 80 },
    { id: "how_often"  , label: "How often"         , type: "Option"    , mandatory: true, list_column: true, list: "pb.how_often", css_reload: true },
    { id: "end_dt"     , label: "End date"          , type: "DateTime"  , list_column: true, visible: false },
    { id: "created"    , label: "Created"           , type: "DateTime"  , list_column: true, visible: false },
    { id: "viewed"     , label: "Viewed"            , type: "DateTime"  , list_column: true, visible: false },
    { id: "acknowl"    , label: "Acknowledged"      , type: "DateTime"  , list_column: true, visible: false },
    { id: "file",        label: "Attachment",         type: "File",       visible: true, editable: true, auto_generate: false, mandatory: false }
]);

module.exports.define("endSetup", function () {
    var lov = this.getField("msg_type").getOwnLoV();
    lov.getItem("D").active = false;
    lov.getItem("N").active = false;
    // this.getField("msg_type").lov = lov;
});


module.exports.define("updateAfter", function () {
    var user  = this.getField("which_user" ).get(),
        when  = this.getField("when_showed").get(),
        often = this.getField("how_often"  ).get(),
        that  = this;

    this.getField("how_often").editable = true;

    if (user === "R" || user === "T") {
        this.getField("how_often").set("P");
        this.getField("how_often").editable = false;
    }

    function updateField(field_id, visible, mand_also) {
        if (that.getField(field_id)) {
            that.getField(field_id).visible   = visible;
            that.getField(field_id).mandatory = mand_also;
            if (!visible) {
                that.getField(field_id).set("");
            }
            that.getField(field_id).validate();
        }
    }

    updateField("user_id", (user === "U"), (user === "U"));
    updateField("type_id", (user === "T"), (user === "T"));
    updateField("role_id", (user === "R"), (user === "R"));
    updateField("page_id", (when === "P"), (when === "P"));
    updateField("end_dt", (often === "P"), (often === "P"));
});


module.exports.define("checkPageNotifications", function (page) {
    this.checkUserNotifications(page.session, "A.page_id = " + SQL.Connection.escape(page.id));
});


module.exports.define("checkLoginNotifications", function (session) {
    this.checkUserNotifications(session, "A.when_showed = 'L'");
});


module.exports.define("checkUserNotifications", function (session, condition) {
    var query = this.getQuery();
    condition += " AND (" +
        "(A.acknowl IS NULL AND A.how_often = 'A') OR " +
        "(A.viewed  IS NULL AND A.how_often = 'O') OR " +
        "(A.end_dt  > NOW() AND A.how_often = 'P') )";
    query.addCondition({ full_condition: condition });
    while (query.next()) {
        this.checkEachUserNotification(session, query);
    }
    query.reset();
});


module.exports.define("checkEachUserNotification", function (session, query) {
    var user_type = session.user_row.getField("user_type").get();
    var ntfcn_user = query.getColumn("A.user_id").get();
    var ntfcn_role = query.getColumn("A.role_id").get();
    var ntfcn_type = query.getColumn("A.type_id").get();
    var msg = {
        type: query.getColumn("A.msg_type").get(),
        text: query.getColumn("A.summary").get(),
    };
    var matches_user = (ntfcn_user === session.user_id);
    var matches_role = session.isUserInRole(ntfcn_role);
    var matches_type = (user_type === ntfcn_type);
    this.debug("checking ntfcn: " + query.getColumn("A.id").get() + ", " + matches_user + ", " + matches_role + ", " + matches_type);
    if (matches_user || matches_role || matches_type) {
        if (query.getColumn("A.detail").get() || query.getColumn("A.how_often").get() !== "P") {
            msg.text += " - click to view full detail";
            msg.link = UI.pages.get("pb_ntfcn_show").getSimpleURL(query.getColumn("A._key").get());
        }
        session.messages.add(msg);
    }
});


// Added directly to Session
Access.Session.defbind("userNotification", "start", function () {         // this == session
   module.exports.checkLoginNotifications(this);
});


// Added directly to Page
UI.Page.defbind("userNotification", "setupEnd", function () {         // this == page
   module.exports.checkPageNotifications(this);
});
