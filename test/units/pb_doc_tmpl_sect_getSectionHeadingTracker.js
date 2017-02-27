/*global x, java */
"use strict";
/*
 * What behaviour are we testing?
 *  1. Heading numbers should begin at 1 & 1.1
 *  2. Progressing once should increment the current level once
 *  3. Progressing twice should increment the current level twice
 *  4. Increasing the depth should add to the structure and allow further progession
 *  5. Decreasing the depth should reduce the structure and automatically further progession (as the previous number was already used)
 *  6. If the subheading is used, then if the subsequent header is increased to that level, it should be an increment on the pervious subheader
 *
 * What component aspect are we testing?
 *  1. The internal logic of the getSectionHeadingTracker function
 *  2. The internal logic of the getSectionHeadingTracker function
 *  3. The internal logic of the getSectionHeadingTracker function
 *  4. The internal logic of the getSectionHeadingTracker function
 *  5. The internal logic of the getSectionHeadingTracker function
 *  6. The internal logic of the getSectionHeadingTracker function
 */
x.test.TestCoverage.pb_doc_tmpl_sect_getSectionHeadingTracker = function () {
    var heading_tracker, expected_result, actual_result, evaluation;

    //Test1
    heading_tracker = x.entities.pb_doc_tmpl_sect.getSectionHeadingTracker();

    expected_result  = ["1","1.1"];
    actual_result    = [];
    actual_result[0] = heading_tracker.getHeadingNumber();
    actual_result[1] = heading_tracker.getSubHeadingNumber();

    evaluation = ((expected_result[0] === actual_result[0]) &&
                  (expected_result[1] === actual_result[1]));

    this.assert(evaluation === true, "after initialisation the headers should be at 1 & 1.1");

    //Test2
    heading_tracker = x.entities.pb_doc_tmpl_sect.getSectionHeadingTracker();
    heading_tracker.progress();

    expected_result  = ["2","2.1"];
    actual_result    = [];
    actual_result[0] = heading_tracker.getHeadingNumber();
    actual_result[1] = heading_tracker.getSubHeadingNumber();

    evaluation = ((expected_result[0] === actual_result[0]) &&
                  (expected_result[1] === actual_result[1]));

    this.assert(evaluation === true, "after one progression the headers should be at 2 & 2.1");


    //Test3
    heading_tracker = x.entities.pb_doc_tmpl_sect.getSectionHeadingTracker();
    heading_tracker.progress();
    heading_tracker.progress();

    expected_result  = ["3","3.1"];
    actual_result    = [];
    actual_result[0] = heading_tracker.getHeadingNumber();
    actual_result[1] = heading_tracker.getSubHeadingNumber();

    evaluation = ((expected_result[0] === actual_result[0]) &&
                  (expected_result[1] === actual_result[1]));

    this.assert(evaluation === true, "after two progressions the headers should be at 3 & 3.1");


    //Test4a
    heading_tracker = x.entities.pb_doc_tmpl_sect.getSectionHeadingTracker();
    heading_tracker.increaseDepth();

    expected_result  = ["1.1","1.1.1"];
    actual_result    = [];
    actual_result[0] = heading_tracker.getHeadingNumber();
    actual_result[1] = heading_tracker.getSubHeadingNumber();

    evaluation = ((expected_result[0] === actual_result[0]) &&
                  (expected_result[1] === actual_result[1]));

    this.assert(evaluation === true, "after one depth increase the headers should be 1.1 & 1.1.1");

    //Test4b
    heading_tracker.progress();

    expected_result  = ["1.2","1.2.1"];
    actual_result    = [];
    actual_result[0] = heading_tracker.getHeadingNumber();
    actual_result[1] = heading_tracker.getSubHeadingNumber();

    evaluation = ((expected_result[0] === actual_result[0]) &&
                  (expected_result[1] === actual_result[1]));

    this.assert(evaluation === true, "after one depth increase and one progression the headers should be 1.2 & 1.2.1");


    //Test4c
    heading_tracker.increaseDepth();
    heading_tracker.progress();
    heading_tracker.progress();

    expected_result  = ["1.2.3","1.2.3.1"];
    actual_result    = [];
    actual_result[0] = heading_tracker.getHeadingNumber();
    actual_result[1] = heading_tracker.getSubHeadingNumber();

    evaluation = ((expected_result[0] === actual_result[0]) &&
                  (expected_result[1] === actual_result[1]));

    this.assert(evaluation === true, "after the transitions performed the headers should be at 1.2.3 & 1.2.3.1");


    //Test5a
    heading_tracker = x.entities.pb_doc_tmpl_sect.getSectionHeadingTracker();
    heading_tracker.increaseDepth();
    heading_tracker.decreaseDepth();

    expected_result  = ["2","2.1"];
    actual_result    = [];
    actual_result[0] = heading_tracker.getHeadingNumber();
    actual_result[1] = heading_tracker.getSubHeadingNumber();

    evaluation = ((expected_result[0] === actual_result[0]) &&
                  (expected_result[1] === actual_result[1]));

    this.assert(evaluation === true, "increasing depth then decreasing depth should leave us in the same position as one progression");

    //Test5b
    heading_tracker = x.entities.pb_doc_tmpl_sect.getSectionHeadingTracker();
    heading_tracker.increaseDepth();
    heading_tracker.increaseDepth();
    heading_tracker.progress();
    heading_tracker.progress();
    heading_tracker.decreaseDepth();

    expected_result  = ["1.2","1.2.1"];
    actual_result    = [];
    actual_result[0] = heading_tracker.getHeadingNumber();
    actual_result[1] = heading_tracker.getSubHeadingNumber();

    evaluation = ((expected_result[0] === actual_result[0]) &&
                  (expected_result[1] === actual_result[1]));

    this.assert(evaluation === true, "after the transitions performed the headers should be at 1.2 & 1.2.1");


    //Test6a
    heading_tracker = x.entities.pb_doc_tmpl_sect.getSectionHeadingTracker();
    heading_tracker.subHeaderUsed();
    heading_tracker.increaseDepth();

    expected_result  = ["1.2","1.2.1"];
    actual_result    = [];
    actual_result[0] = heading_tracker.getHeadingNumber();
    actual_result[1] = heading_tracker.getSubHeadingNumber();

    evaluation = ((expected_result[0] === actual_result[0]) &&
                  (expected_result[1] === actual_result[1]));

    this.assert(evaluation === true, "increasing depth should increment if that level was used as a subheading in the previous");

    //Test6b
    heading_tracker = x.entities.pb_doc_tmpl_sect.getSectionHeadingTracker();
    heading_tracker.subHeaderUsed();
    heading_tracker.progress();

    expected_result  = ["2","2.1"];
    actual_result    = [];
    actual_result[0] = heading_tracker.getHeadingNumber();
    actual_result[1] = heading_tracker.getSubHeadingNumber();

    evaluation = ((expected_result[0] === actual_result[0]) &&
                  (expected_result[1] === actual_result[1]));

    this.assert(evaluation === true, "progressing should always set the subheading value back to 1");
};
