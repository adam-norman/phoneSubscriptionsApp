const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const PORT = process.env.PORT || 3000;
const App = express();
App.use(bodyParser.json());
App.use(cors());


App.post('/addNode/', function (req, res) {
  console.log('posted object to the server:' + req.body);
  var cmd = db.prepare('INSERT INTO nodes(distributerName,nid,address,mobile,userPackage,notes) VALUES(?,?,?,?,?,?)')
  cmd.run(
    req.body.distributerName,
    req.body.nid,
    req.body.address,
    req.body.mobile,
    req.body.userPackage,
    req.body.notes);
  cmd.finalize();
  res.status(200).send({ "messag": "New Distributer has been added" });
}
);

App.post('/updateSubNode/', function (req, res) {
   
  var cmd = db.prepare('UPDATE  subNodes SET fullName = ?, phone = ? , nid = ? , startDate = ? , address = ? , notes = ? , packageId = ? , nodeId = ?  WHERE subNodeId = ? ');
  cmd.run(
    req.body.fullName,
    req.body.phone,
    req.body.nid,
    req.body.startDate,
    req.body.address,
    req.body.notes,
    req.body.packageId,
    req.body.nodeId,
    req.body.subNodeId,
    );
  cmd.finalize();
  res.status(200).send({ "messag": "subNode has been updated" });
}
);
App.post('/updateSubNodeMonth/', function (req, res) {
   
  var cmd = db.prepare(`UPDATE  subNodes SET 
cjan=?,
cfeb=?,
cmar=?,
capr=?,
cmay=?,
cjun=?,
cjul=?,
caug=?,
csep=?,
coct=?,
cnov=?,
cdec=?
  WHERE subNodeId = ? `);
  //console.table(req.body);
  cmd.run(
    req.body.cjan,
    req.body.cfeb,
    req.body.cmar,
    req.body.capr,
    req.body.cmay,
    req.body.cjun,
    req.body.cjul,
    req.body.caug,
    req.body.csep,
    req.body.coct,
    req.body.cnov,
    req.body.cdec,
    req.body.subNodeId,
    );
  cmd.finalize();
  res.status(200).send({ "messag": "subNode has been updated" });
}
);
App.get('/resetUpdateSubNodeMonth/', function (req, res) {
   
  var cmd = db.prepare(`UPDATE  subNodes SET 
cjan=0,
cfeb=0,
cmar=0,
capr=0,
cmay=0,
cjun=0,
cjul=0,
caug=0,
csep=0,
coct=0,
cnov=0,
cdec=0
   `);
  //console.table(req.body);
  cmd.run();
  cmd.finalize();
  res.status(200).send({ "messag": "subNode has been updated" });
}
);
App.post('/addSubNode/', function (req, res) {
  console.log('posted object to the server:' + req.body);
  var cmd = db.prepare('INSERT INTO subNodes(fullName,phone,nid,startDate,address,notes,packageId,nodeId) VALUES(?,?,?,?,?,?,?,?)')
  cmd.run(
    req.body.fullName,
    req.body.phone,
    req.body.nid,
    req.body.startDate,
    req.body.address,
    req.body.notes,
    req.body.packageId,
    req.body.nodeId
    );
  cmd.finalize();
  res.status(200).send({ "messag": "New clinet has been added " + req.body.startDate});
}
);

App.post('/updateNode/', function (req, res) {
  console.log('posted object to the server:' + req.body);
  var cmd = db.prepare('UPDATE nodes SET distributerName = ?,nid = ?,address = ?,mobile = ?,userPackage = ?,notes =?  WHERE nodeId=?')
  cmd.run(
    req.body.distributerName,
    req.body.nid,
    req.body.address,
    req.body.mobile,
    req.body.userPackage,
    req.body.notes,
    req.body.nodeId);
  cmd.finalize();
  res.status(200).send({ "messag": ` Distributer ${req.body.nodeId} has been modified` });
}
);
App.post('/addPackage/', function (req, res) {
  console.log('posted object to the server:' + req.body);
  var cmd = db.prepare('INSERT INTO packages(packageName,cost) VALUES(?,?)')
  cmd.run(
    req.body.packageName,
    req.body.cost);
  cmd.finalize();
  res.status(200).send({ "messag": "New Package has been added" });
}
);

App.get('/getNodesList/', function (req, res) {
 
  let sql = `SELECT nodeId, distributerName,nid,address,mobile,userPackage,notes FROM nodes 
  ORDER BY distributerName`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);
  });
}) ;
App.post('/getSubNodesListNodeId/', function (req, res) {
  let getByNodeId=' where nodeId=? ';
  let params=[];
  if (req.body.nodeId === '0'){
    getByNodeId='';
  }
  else
  {
    params.push( req.body.nodeId);
  }
  let sql = `SELECT * FROM subNodes ${getByNodeId}  ORDER BY fullName`;
  db.all(sql,params, (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);
  });
}) ;

App.get('/getSubNodesList/', function (req, res) {
 
  let sql = `SELECT * FROM subNodes 
  ORDER BY fullName`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);
  });
}) ;
App.get('/getPackagesList/', function (req, res) {
  var items  ={};
    let sql = `SELECT packageId, packageName, cost FROM packages 
    ORDER BY cost`;
    
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      res.send(rows);
    });
  }) ;


App.post('/deleteNode/', (req, res) =>{
var cmd = db.prepare('DELETE FROM nodes WHERE nodeId=?')
cmd.run(
  req.body.nodeId
  );
cmd.finalize();
res.status(200).send({ "messag": "The Node has been deleted successfuly" });
}
);
App.post('/deleteSubNode/', (req, res) =>{
   
  var cmd = db.prepare('DELETE FROM subNodes WHERE subNodeId=?')
  cmd.run(
    req.body.subNodeId
    );
  cmd.finalize();
  res.status(200).send({ "messag": "The SubNode has been deleted successfuly" });
  }
  );

App.post('/deletePackage/', (req, res) =>{
  var cmd = db.prepare('DELETE FROM packages WHERE packageId=?')
  cmd.run(
    req.body.packageId
    );
  cmd.finalize();
  res.status(200).send({ "messag": "The Package has been deleted successfuly" });
  }
  );

  App.post('/updatePackage/', function (req, res) {
    console.log('posted object to the server:' + req.body);
    var cmd = db.prepare('UPDATE packages SET packageName = ?,cost = ?  WHERE packageId=?')
    cmd.run(
      req.body.packageName,
      req.body.cost,
      req.body.packageId
     );
    cmd.finalize();
    res.status(200).send({ "messag": `Package ${req.body.packageId} modified` });
  }
  );
App.post('/updateNode/', (req, res) =>
  res.send('<h1>updateNode</h1>'));

App.get('/', (req, res) =>
  res.send('hello from server'));

App.listen(PORT, () => {
  console.log('server is lestening on posrt:' + PORT);
});


