var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "mobiClients.sqlite"

var TABLE_1 = '/* Create the nodes table */';
TABLE_1 += 'CREATE TABLE IF NOT EXISTS "nodes" ( "nodeId" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE, ';
TABLE_1 += '                              "distributerName" TEXT, ';
TABLE_1 += '                              "nid" INTEGER, ';
TABLE_1 += '                              "address" TEXT,';
TABLE_1 += '                              "mobile" TEXT,';
TABLE_1 += '                              "userPackage" INTEGER,';
TABLE_1 += '                              "notes" TEXT';
TABLE_1 += '                               );';



var TABLE_2 = '/* Create the task packages table */';
TABLE_2 += 'CREATE TABLE IF NOT EXISTS "packages" ( "packageId" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,';
TABLE_2 += '                                 "packageName" TEXT,';
TABLE_2 += '                                 "cost" REAL  );';

var TABLE_3 = '/* Create the subNodes table */';
TABLE_3 += 'CREATE TABLE IF NOT EXISTS "subNodes" ( "subNodeId" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,';
TABLE_3 += '                              "fullName" VARCHAR,';
TABLE_3 += '                              "phone" TEXT,';
TABLE_3 += '                              "nid" INTEGER, ';
TABLE_3 += '                              "startDate" DATETIME, ';
TABLE_3 += '                              "address" TEXT,';
TABLE_3 += '                              "notes" TEXT,';
TABLE_3 += '                              "packageId" INTEGER ,';
TABLE_3 += '                              "nodeId" INTEGER ,';
TABLE_3 += '                              "cjan" INTEGER  DEFAULT 0 ,';
TABLE_3 += '                              "cfeb" INTEGER  DEFAULT 0 ,';
TABLE_3 += '                              "cmar" INTEGER  DEFAULT 0,';
TABLE_3 += '                              "capr" INTEGER  DEFAULT 0,';
TABLE_3 += '                              "cmay" INTEGER  DEFAULT 0,';
TABLE_3 += '                              "cjun" INTEGER  DEFAULT 0,';
TABLE_3 += '                              "cjul" INTEGER  DEFAULT 0,';
TABLE_3 += '                              "caug" INTEGER  DEFAULT 0,';
TABLE_3 += '                              "csep" INTEGER  DEFAULT 0,';
TABLE_3 += '                              "coct" INTEGER  DEFAULT 0,';
TABLE_3 += '                              "cnov" INTEGER  DEFAULT 0,';
TABLE_3 += '                              "cdec" INTEGER  DEFAULT 0,';
TABLE_3 += '                              FOREIGN KEY(nodeId) REFERENCES nodes(nodeId),';
TABLE_3 += '                              FOREIGN KEY(packageId) REFERENCES packages(packageId)';
TABLE_3 += '                               );';


let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message)
    throw err
  } else {
    console.log('Connected to the SQLite database.')
    db.run(TABLE_1);
    db.run(TABLE_2);
    db.run(TABLE_3);
  }
});
module.exports = db

