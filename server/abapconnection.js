
const rfcClient = require('node-rfc').Client;
// TO-DO-  Try making a separaet module so that this can be imported with require
// ABAP system RFC connection parameters

const abapConnection = {
    user: "MITRAA",
    passwd: 'Catal1st"',
    ashost: "ldciqj9.wdf.sap.corp",
    // SAPROUTER:"/H/dadirectaccess.wdf.global.corp.sap/S/3299",
    sysnr: "00",
    client: "500",
    lang: "EN"
};


module.exports = abapConnection;