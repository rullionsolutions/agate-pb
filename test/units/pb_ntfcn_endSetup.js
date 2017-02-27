/*global x, java */
"use strict";

/* What behaviour are we testing 
 *  1a. msg_type field's 'D' item has its active property set to false
 *  1b. msg_type field's 'N' item has its active property set to false
*/

x.test.TestCoverage.pb_ntfcn_endSetup = function () {
    var ntfcn;
    function beforeEach() {
        ntfcn = x.entities.pb_ntfcn.clone({id: "test"});
        ntfcn.modifiable = true;
    }
    function changeMsgTypeItem(item_id, property, value) {
        var tempLoV;
        tempLoV = ntfcn.getField("msg_type").getLoV().clone({id: "tempLov"});
        tempLoV.getItem(item_id)[property] = value;
        ntfcn.getField("msg_type").lov = tempLoV;
    }

    beforeEach();
    changeMsgTypeItem("D", "active", "true");
    changeMsgTypeItem("N", "active", "true");
    ntfcn.endSetup();
    this.assert(ntfcn.getField("msg_type").getLoV().getItem("D").active === false, "msg_type field's 'D' item has its active property set to false");
    this.assert(ntfcn.getField("msg_type").getLoV().getItem("N").active === false, "msg_type field's 'N' item has its active property set to false");
};