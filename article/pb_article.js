"use strict";

var Data = require("lazuli-data/index.js");
var UI = require("lazuli-ui/index.js");
var IO = require("lazuli-io/index.js");
var SQL = require("lazuli-sql/index.js");


module.exports = Data.Entity.clone({
    id              : "pb_article",
    title           : "Article",
    area            : "pb",
    transactional   : true,
    autocompleter   : true,
    full_text_search: true,
    title_field     : "title",
    default_order   : "title",
    primary_key     : "id",
    pack_level      : 20
});


module.exports.addFields([
    { id: "id"         , label: "Id"   , type: "Text", editable: false, list_column: true, data_length: 80 },
    { id: "title"      , label: "Title", type: "Text", mandatory: true, search_criterion: true, list_column: true, data_length: 255 },
    { id: "security"   , label: "Security"       , type: "Option"   , list_column: true, list: "pb.security" },
    { id: "last_upd_at", label: "Last Updated At", type: "DateTime" , editable: false },
    { id: "last_upd_by", label: "Last Updated By", type: "Reference", editable: false, ref_entity: "ac_user", description: "A reference to system user account." },
// this single field is now preferred to pb_article_sect...
    { id: "content"    , label: "Content"        , type: "Textarea" , css_richtext: true, detokenize_content: true },
]);


module.exports.defbind("presaveLogic", "presave", function (outcome_id) {
    this.getField("last_upd_by").set(this.trans.session.user_id);
    this.getField("last_upd_at").set("today");
});


module.exports.getField("content").replaceTokenSingle = function (token_str) {
    return this.owner.replaceTokenRecord(token_str);
};

module.exports.replaceTokenRecord = function (key) {
    var row = this.getRow(key);
    if (!row) {
        return "(ERROR: record not found: " + key + ")";
    }

    return IO.XmlStream.left_bracket_subst + "a href='" +
        UI.pages.get("pb_article_show").getSimpleURL(row.getKey()) + "'" + UI.XmlStream.right_bracket_subst + row.getLabel("article_link") +
        UI.XmlStream.left_bracket_subst + "/a" + UI.XmlStream.right_bracket_subst;
};

module.exports.getField("content").define("replaceToken_file", function (tokens) {
    var file_id = tokens[1];
    var file_row;
    var return_value = "";
    try {
        file_row = UI.entities.get("ac_file").getRow(file_id);
        file_row.getField("url").owner.page = this.owner.page;
        return_value = IO.XmlStream.left_bracket_subst
            + "a href='" + file_row.getField("url").getURL() + "'"
            + " target='_blank'" + IO.XmlStream.right_bracket_subst
            + file_row.getField("title").get()
            + IO.XmlStream.left_bracket_subst + "/a" + IO.XmlStream.right_bracket_subst;
    } catch (e) {
        this.error(e);
        return_value = "Unknown file (" + file_id + ")";
    }

    return return_value;
});

module.exports.convert = function () {
    var sql,
        resultset,
        article,
        content;

    SQL.Connection.shared.executeUpdate("UPDATE pb_article_sect SET seq = IFNULL(seq, id)");
    SQL.Connection.shared.executeUpdate("SET SESSION group_concat_max_len = 1000000");
    sql = "SELECT article, GROUP_CONCAT(CONCAT('<h2>', IFNULL(S.title, ''), '</h2>', IFNULL(S.text, '')) ORDER BY S.seq SEPARATOR '') " +
        " FROM pb_article_sect S GROUP BY S.article";
    try {
        resultset = SQL.Connection.shared.executeQuery(sql);
        while (resultset.next()) {
            article = SQL.Connection.getColumnString(resultset, 1);
            content = SQL.Connection.getColumnString(resultset, 2);
            this.info(this, "Article: " + article + ", content length: " + content.length);
            SQL.Connection.shared.executeUpdate("UPDATE pb_article SET content = " + SQL.Connection.escape(content) +
                " WHERE _key = " + SQL.Connection.escape(article));
        }
    } catch (e) {
        this.report(e);
    } finally {
        SQL.Connection.shared.finishedWithResultSet(resultset);
    }
};
