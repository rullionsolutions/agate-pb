/*global x, java */
"use strict";

/*
* 1a. If which_user is R, how_often should be set to P
* 1b. If which_user is R, how_often should not be editable
* 2a. If which_user is T, how_often should be set to P
* 2b. If which_user is T, how_often should not be editable
* 3.  If which_user is neither R or T, how_often should be editable

* 4a. If which_user is U, user_id should be visible
* 4b. If which_user is U, user_id should be mandatory
* 4c. If which_user is U, user_id should be validated
* 5a. If which_user is not U, user_id should not be visible
* 5b. If which_user is not U, user_id should not be mandatory
* 5c. If which_user is not U, user_id should be set to blank
* 5d. If which_user is not U, user_id should be validated

* 6a. If which_user is T, type_id should be visible
* 6b. If which_user is T, type_id should be mandatory
* 6c. If which_user is T, type_id should be validated
* 7a. If which_user is not T, type_id should not be visible
* 7b. If which_user is not T, type_id should not be mandatory
* 7c. If which_user is not T, type_id should be set to blank
* 7d. If which_user is not T, type_id should be validated

* 8a. If which_user is R, role_id should be visible
* 8b. If which_user is R, role_id should be mandatory
* 8c. If which_user is R, role_id should be validated
* 9a. If which_user is not R, role_id should not be visible
* 9b. If which_user is not R, role_id should not be mandatory
* 9c. If which_user is not R, role_id should be set to blank
* 9d. If which_user is not R, role_id should be validated

* 10a. If when_showed is P, page_id should be visible
* 10b. If when_showed is P, page_id should be mandatory
* 10c. If when_showed is P, page_id should be validated
* 11a. If when_showed is not P, page_id should not be visible
* 11b. If when_showed is not P, page_id should not be mandatory
* 11c. If when_showed is not P, page_id should be set to blank
* 11d. If when_showed is not P, page_id should be validated

* 12a. If how_often is P, end_dt should be visible
* 12b. If how_often is P, end_dt should be mandatory
* 12c. If how_often is P, end_dt should be validated
* 13a. If how_often is not P, end_dt should not be visible
* 13b. If how_often is not P, end_dt should not be mandatory
* 13c. If how_often is not P, end_dt should be set to blank
* 13d. If how_often is not P, end_dt should be validated
*/

x.test.TestCoverage.pb_ntfcn_updateAfter = function () {
    var ntfcn, validateCalled, that = this;
    function beforeEach() {
        ntfcn = x.entities.pb_ntfcn.clone({id: "test"});
        ntfcn.modifiable = true;
        validateCalled = false;
    }
    function stubValidate() {
        validateCalled = true;
    }
    function testUpdateFieldBehaviour(setField, value, affectedField) {
        beforeEach();
        ntfcn.getField(setField).set(value);
        ntfcn.getField(affectedField).validate = stubValidate;
        ntfcn.updateAfter();
        that.assert(ntfcn.getField(affectedField).visible === true, "If " + setField + " is " + value + ", " + affectedField + " should be visible");
        that.assert(ntfcn.getField(affectedField).mandatory === true, "If " + setField + " is " + value + ", " + affectedField + " should be mandatory");
        that.assert(validateCalled === true, "If " + setField + " is " + value + ", " + affectedField + " should be validated");

        beforeEach();
        ntfcn.getField(setField).set("Z");
        ntfcn.getField(affectedField).set("change me");
        ntfcn.getField(affectedField).validate = stubValidate;
        ntfcn.updateAfter();
        that.assert(ntfcn.getField(affectedField).visible === false, "If " + setField + " is not " + value + ", " + affectedField + " should not be visible");
        that.assert(ntfcn.getField(affectedField).mandatory === false, "If " + setField + " is not " + value + ", " + affectedField + " should not be mandatory");
        that.assert(ntfcn.getField(affectedField).isBlank() === true, "If " + setField + " is not " + value + ", " + affectedField + " should be set to blank");
        that.assert(validateCalled === true, "If " + setField + " is not " + value + ", " + affectedField + " should be validated");
    }

    //Test 1.
    beforeEach();
    ntfcn.getField("which_user").set("R");
    ntfcn.updateAfter();
    this.assert(ntfcn.getField("how_often").get() === "P", "If which_user is R, how_often should be set to P");
    this.assert(ntfcn.getField("how_often").editable === false, "If which_user is R, how_often should not be editable");

    //Test 2.
    beforeEach();
    ntfcn.getField("which_user").set("T");
    ntfcn.updateAfter();
    this.assert(ntfcn.getField("how_often").get() === "P", "If which_user is T, how_often should be set to P");
    this.assert(ntfcn.getField("how_often").editable === false, "If which_user is T, how_often should not be editable");

    //Test 3.
    beforeEach();
    ntfcn.getField("which_user").set("Z");
    ntfcn.updateAfter();
    this.assert(ntfcn.getField("how_often").editable === true, "If which_user is neither R or T, how_often should be editable");

    //Test 4 & 5.
    testUpdateFieldBehaviour("which_user", "U", "user_id");

    //Test 6 & 7.
    testUpdateFieldBehaviour("which_user", "T", "type_id");

    //Test 8 & 9.
    testUpdateFieldBehaviour("which_user", "R", "role_id");

    //Test 10 & 11.
    testUpdateFieldBehaviour("when_showed", "P", "page_id");

    //Test 12 & 13.
    testUpdateFieldBehaviour("how_often", "P", "end_dt");
};