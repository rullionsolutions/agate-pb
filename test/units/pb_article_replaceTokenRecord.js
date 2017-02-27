/*global x, java */
'use strict';

x.test.TestCoverage.pb_article_replaceTokenRecord = function () {
    //This one is written a bit weirdly, I'll do my best to explain my reasoning, but fear it may be uneccessarily comlicated
    //The strangeness is born out of the function being written to be called statically. To this end, I create a clone of pb_article
    //for test isolation (I don't want to be overwriting the pb_article prototype). I then overwrite its getRow function to return
    //ANOTHER clone of the pb_article. This is probably unnecessary, and having article.getRow return article would probably be fine.
    var article,
        output,
        backupURL = x.pages.pb_article_show.getSimpleURL,
        backupRightBracket = x.XmlStream.right_bracket_subst,
        backupLeftBracket = x.XmlStream.left_bracket_subst;

    x.pages.pb_article_show.getSimpleURL = function (key) {
        return 'testSimpleURL|' + key;
    };
    x.XmlStream.right_bracket_subst = 'lB';
    x.XmlStream.left_bracket_subst = 'rB';

    function beforeEach() {
        var tempClone;
        article = x.entities.pb_article.clone({id: 'test'});
        article.modifiable = true;
        article.getRow = function (key) {
            tempClone = x.entities.pb_article.clone({id: 'testInstance', key: key, instance: true});
            tempClone.getLabel = function () {
                return 'testLabel';
            };
            return tempClone;
        };
    }

    beforeEach();
    output = article.replaceTokenRecord('testKey');
    this.assert(output === 'rBa href=\'testSimpleURL|testKey\'lBtestLabelrB/alB', 'Should concatenate strings from the required row, the pb_article_show_page, and globals into a URN');

    x.pages.pb_article_show.getSimpleURL = backupURL;
    x.XmlStream.right_bracket_subst = backupRightBracket;
    x.XmlStream.left_bracket_subst = backupLeftBracket;
};