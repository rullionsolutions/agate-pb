/*global x, java */
"use strict";
/*
 * What behaviour are we testing?
 *  1. Section titles should increment
 *  2. Section texts should be given a subheading number for that level if they have a sibling title attribute
 *  3. Section texts without a sibling title should get the heading value for that level
 *  4. Nesting the above logic should work as expected
 *  5. Decreasing the level should lead to an incrementing of the previous heading at that level and a setting of 1 of the subheading
 *  6. Decreasing the level without a title should still put the text of this section in a lower heading than the previous title
 *  7. Sections should not have a heading number added if the numbering attribute is set to "N"
 *  8. Increments should not occur if the section has heading numbering disabled
 *
 * What component aspect are we testing?
 *  1. The internal logic of the addHeadingNumberInfo function
 *  2. The internal logic of the addHeadingNumberInfo function
 *  3. The internal logic of the addHeadingNumberInfo function
 *  4. The internal logic of the addHeadingNumberInfo function
 *  5. The internal logic of the addHeadingNumberInfo function
 *  6. The internal logic of the addHeadingNumberInfo function
 *  7. The internal logic of the addHeadingNumberInfo function
 *  8. The internal logic of the addHeadingNumberInfo function
 */
x.test.TestCoverage.pb_doc_tmpl_sect_addHeadingNumberInfo = function () {
    var config, expected_result, actual_result, evaluation;

    // Test 1.
    config = [
        {
            level: 1,
            title: "title1"
        },
        {
            level: 1,
            title: "title2"
        }
    ];

    expected_result = [
        {
            level: 1,
            title: "title1",
            head_num: {title: "1"}
        },
        {
            level: 1,
            title: "title2",
            head_num: {title: "2"}
        }
    ];

    actual_result = x.entities.pb_doc_tmpl_sect.addHeadingNumberInfo(config);

    evaluation = ((actual_result[0].head_num.title === expected_result[0].head_num.title) &&
                  (actual_result[1].head_num.title === expected_result[1].head_num.title));

    this.assert(evaluation === true, "sections heading numbers should increase incrementally");

    // Test 2.
    config = [
        {
            level: 1,
            title: "title1",
            text : "text1"
        },
        {
            level: 1,
            title: "title2",
            text : "text2"
        }
    ];

    expected_result = [
        {
            level: 1,
            title: "title1",
            text : "text1",
            head_num: {title: "1", text: "1.1"}
        },
        {
            level: 1,
            title: "title2",
            text : "text2",
            head_num: {title: "2", text: "2.1"}
        }
    ];

    actual_result = x.entities.pb_doc_tmpl_sect.addHeadingNumberInfo(config);

    evaluation = ((actual_result[0].head_num.title === expected_result[0].head_num.title) &&
                  (actual_result[0].head_num.text  === expected_result[0].head_num.text)  &&
                  (actual_result[1].head_num.title === expected_result[1].head_num.title) &&
                  (actual_result[1].head_num.text  === expected_result[1].head_num.text));

    this.assert(evaluation === true, "section texts should be given a subheading number for that level if they have a sibling title attribute");

    // Test 3.
    config = [
        {
            level: 1,
            title: "title1",
            text : "text1"
        },
        {
            level: 2,
            text : "text2"
        }
    ];

    expected_result = [
        {
            level: 1,
            title: "title1",
            text : "text1",
            head_num: {title: "1", text: "1.1"}
        },
        {
            level: 2,
            text : "text2",
            head_num: {text: "1.2"}
        }
    ];

    actual_result = x.entities.pb_doc_tmpl_sect.addHeadingNumberInfo(config);

    evaluation = ((actual_result[0].head_num.title === expected_result[0].head_num.title) &&
                  (actual_result[0].head_num.text  === expected_result[0].head_num.text)  &&
                  (actual_result[1].head_num.title === expected_result[1].head_num.title) &&
                  (actual_result[1].head_num.text  === expected_result[1].head_num.text));

    this.assert(evaluation === true, "section texts without a sibling title should get the heading value for that level");


    // Test 4.
    config = [
        {
            level: 1,
            title: "title1",
            text : "text1"
        },
        {
            level: 2,
            text : "text2"
        },
        {
            level: 3,
            title: "title3",
            text : "text3"
        },
        {
            level: 3,
            title: "title4",
            text : "text4"
        },
        {
            level: 4,
            text : "text5"
        },
        {
            level: 4,
            text : "text6"
        },
        {
            level: 4,
            title: "title7",
            text : "text7"
        }
    ];

    expected_result = [
        {
            level: 1,
            title: "title1",
            text : "text1",
            head_num: {title: "1", text: "1.1"}
        },
        {
            level: 2,
            text : "text2",
            head_num: {text: "1.2"}
        },
        {
            level: 3,
            title: "title3",
            text : "text3",
            head_num: {title: "1.2.1", text: "1.2.1.1"}
        },
        {
            level: 3,
            title: "title4",
            text : "text4",
            head_num: {title: "1.2.2", text: "1.2.2.1"}
        },
        {
            level: 4,
            text : "text5",
            head_num: {text: "1.2.2.2"}
        },
        {
            level: 4,
            text : "text6",
            head_num: {text: "1.2.2.3"}
        },
        {
            level: 4,
            title: "title7",
            text : "text7",
            head_num: {title: "1.2.2.4", text: "1.2.2.4.1"}
        }
    ];

    actual_result = x.entities.pb_doc_tmpl_sect.addHeadingNumberInfo(config);

    evaluation = ((actual_result[0].head_num.title === expected_result[0].head_num.title) &&
                  (actual_result[0].head_num.text  === expected_result[0].head_num.text)  &&
                  (actual_result[1].head_num.title === expected_result[1].head_num.title) &&
                  (actual_result[1].head_num.text  === expected_result[1].head_num.text)  &&
                  (actual_result[2].head_num.title === expected_result[2].head_num.title) &&
                  (actual_result[2].head_num.text  === expected_result[2].head_num.text)  &&
                  (actual_result[3].head_num.title === expected_result[3].head_num.title) &&
                  (actual_result[3].head_num.text  === expected_result[3].head_num.text)  &&
                  (actual_result[4].head_num.title === expected_result[4].head_num.title) &&
                  (actual_result[4].head_num.text  === expected_result[4].head_num.text)  &&
                  (actual_result[5].head_num.title === expected_result[5].head_num.title) &&
                  (actual_result[5].head_num.text  === expected_result[5].head_num.text)  &&
                  (actual_result[6].head_num.title === expected_result[6].head_num.title) &&
                  (actual_result[6].head_num.text  === expected_result[6].head_num.text));

    this.assert(evaluation === true, "repeating the above rules any number of times should produce predictable results");


    // Test 5.
    config = [
        {
            level: 1,
            title: "title1",
            text : "text1"
        },
        {
            level: 2,
            text : "text2"
        },
        {
            level: 1,
            title: "title3",
            text : "text3"
        }
    ];

    expected_result = [
        {
            level: 1,
            title: "title1",
            text : "text1",
            head_num: {title: "1", text: "1.1"}
        },
        {
            level: 2,
            text : "text2",
            head_num: {text: "1.2"}
        },
        {
            level: 1,
            title: "title3",
            text : "text3",
            head_num: {title: "2", text: "2.1"}
        }
    ];

    actual_result = x.entities.pb_doc_tmpl_sect.addHeadingNumberInfo(config);

    evaluation = ((actual_result[0].head_num.title === expected_result[0].head_num.title) &&
                  (actual_result[0].head_num.text  === expected_result[0].head_num.text)  &&
                  (actual_result[1].head_num.title === expected_result[1].head_num.title) &&
                  (actual_result[1].head_num.text  === expected_result[1].head_num.text)  &&
                  (actual_result[2].head_num.title === expected_result[2].head_num.title) &&
                  (actual_result[2].head_num.text  === expected_result[2].head_num.text));

    this.assert(evaluation === true, "decreasing the level should lead to an incrementing of the previous heading at that level and a setting of 1 of the subheading");


    // Test 6.
    config = [
        {
            level: 1,
            title: "title1",
            text : "text1"
        },
        {
            level: 2,
            text : "text2"
        },
        {
            level: 1,
            text : "text3"
        }
    ];

    expected_result = [
        {
            level: 1,
            title: "title1",
            text : "text1",
            head_num: {title: "1", text: "1.1"}
        },
        {
            level: 2,
            text : "text2",
            head_num: {text: "1.2"}
        },
        {
            level: 1,
            text : "text3",
            head_num: {text: "2"}
        }
    ];

    actual_result = x.entities.pb_doc_tmpl_sect.addHeadingNumberInfo(config);

    evaluation = ((actual_result[0].head_num.title === expected_result[0].head_num.title) &&
                  (actual_result[0].head_num.text  === expected_result[0].head_num.text)  &&
                  (actual_result[1].head_num.title === expected_result[1].head_num.title) &&
                  (actual_result[1].head_num.text  === expected_result[1].head_num.text)  &&
                  (actual_result[2].head_num.title === expected_result[2].head_num.title) &&
                  (actual_result[2].head_num.text  === expected_result[2].head_num.text));

    this.assert(evaluation === true, "decreasing the level without a title should still put the text of this section in a lower heading than the previous title");


    // Test 7.
    config = [
        {
            level: 1,
            title: "title1",
            text : "text1"
        },
        {
            level: 2,
            text : "text2",
            numbering: "N"
        },
        {
            level: 1,
            text : "text3"
        }
    ];

    expected_result = [
        {
            level: 1,
            title: "title1",
            text : "text1",
            head_num: {title: "1", text: "1.1"}
        },
        {
            level: 2,
            text : "text2",
            numbering: "N"
        },
        {
            level: 1,
            text : "text3",
            head_num: {text: "2"}
        }
    ];

    actual_result = x.entities.pb_doc_tmpl_sect.addHeadingNumberInfo(config);

    evaluation = (actual_result[1].head_num === expected_result[1].head_num);

    this.assert(evaluation === true, "sections should not have a heading number added if the numbering attribute is set to 'N'");

    // Test 8.
    config = [
        {
            level: 1,
            title: "title1",
            text : "text1"
        },
        {
            level: 2,
            text : "text2",
            numbering: "N"
        },
        {
            level: 2,
            text : "text3"
        }
    ];

    expected_result = [
        {
            level: 1,
            title: "title1",
            text : "text1",
            head_num: {title: "1", text: "1.1"}
        },
        {
            level: 2,
            text : "text2"
        },
        {
            level: 2,
            text : "text3",
            head_num: {text: "1.2"}
        }
    ];

    actual_result = x.entities.pb_doc_tmpl_sect.addHeadingNumberInfo(config);

    evaluation = ((actual_result[0].head_num.title === expected_result[0].head_num.title) &&
                  (actual_result[0].head_num.text  === expected_result[0].head_num.text)  &&
                  (actual_result[1].head_num  === expected_result[1].head_num)  &&
                  (actual_result[2].head_num.title === expected_result[2].head_num.title) &&
                  (actual_result[2].head_num.text  === expected_result[2].head_num.text));

    this.assert(evaluation === true, "increments should not occur if the section has heading numbering disabled");
};
