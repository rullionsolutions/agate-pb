"use strict";

var SQL = require("lazuli-sql/index.js");
var IO = require("lazuli-io/index.js");
var Rhino = require("lazuli-rhino/index.js");
var Data = require("lazuli-data/index.js");
var Access = require("lazuli-access/index.js");
var menu2;
var menu3;

module.exports = Data.Area.clone({
    id              : "pb",
    title           : "Publishing",
    // dependencies    : [ "sy", "ac", ],
    glyphicon       : "icon-book",
    security        : {
        sysmgr: true,
        rl_admin: true,
    },
});


// var menu = x.MenuItem.addChild({ label: "Publishing", menu_area: "pb" });
menu2 = Access.MenuItem.getItemByModule("ac");
menu2.modules.push("pb");
menu3 = menu2.addChild({ label: "Publishing", });

// menu.addChild({ page: "pb_article_show", url: "&page_key=home", label: "Home Article" });
menu3.addChild({ page: "pb_article_search", });
menu3.addChild({ page: "pb_ntfcn_search", });
menu3.addChild({ page: "pb_doc_tmpl_search", });
// menu3.addChild({ page: "pb_stmt_search" });
// menu3.addChild({ page: "pb_statements_show", url: "&page_key=root", label: "Statements Index" });


Rhino.App.defbind("pb_loadData", "build", function () {
    SQL.Connection.shared.loadSQLFile(IO.File.getModulePath(module) + "/article/build.sql");
// SQL.Connection.loadSQLFile(IO.File.getModulePath(module) + "/doc_tmpl/build.sql");
    SQL.Connection.shared.loadSQLFile(IO.File.getModulePath(module) + "/ntfcn/build.sql");
});
