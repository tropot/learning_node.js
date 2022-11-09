const express = require('express');
const rN = require('./random-number.js');
const http = require('http');
const app = express();
var nrIntrodus = 0;
var nrRandom = rN(5);
var suma = 0;
const mysql = require("mysql");
var tableId = 0;

const db = mysql.createConnection({

    host: "localhost",
  
    user: "root",
  
    password: "",
  
    database: "testing",
  
  });
  db.connect((err) => {

    if (err) {
  
      throw err;
  
    }
  });
  
app.get('/home', function(req, res) {
    res.sendFile(__dirname + "/home.html");
})
app.get('/form-submit', function(req, res) {
    console.log("procesing form");
    nrIntrodus = parseInt(req.query.inputNumber);
    suma = nrIntrodus + nrRandom;
    
    
    
        nrIntrodus = parseInt(nrIntrodus);
        nrRandom = parseInt(nrRandom);
        suma = parseInt(suma);
        
        createTable(res);
          
      

      
      
})



app.listen(process.env.PORT || 3000, () => console.log('works on '))

app.get('/edit', function(req, res) {
  //console.log(req.query.inputNumber);
  //console.log(req.query.uid);
  tableId = parseInt(req.query.uid);
  res.sendFile(__dirname + "/edit.html");
  
})

app.get('/form-edit', function(req, res) {
  var editNr = parseInt(req.query.editNr);
  sql = "UPDATE numbers SET input= ? WHERE id=?";
  db.query(sql,[editNr,tableId], function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
  createTable(res);
          
})

function createTable(resp){
  var sql = "INSERT INTO numbers (input, random, sumaNr) VALUES (?,?,?)";
        db.query(sql,[nrIntrodus,nrRandom,suma], function (err, result) {
            if (err) throw err;
            var reo ='<html><head><title>Results</title></head><body><h1>Rezultatele nr random: {${nrIntrodus}}, nr random : {${nrRandom}}, suma {${suma}}: </h1>{${table}}</body></html>';
            sql = 'SELECT * FROM numbers'
            setResHtml(sql, resql=>{
              reo = reo.replace('{${table}}', resql);
              reo = reo.replace('{${nrIntrodus}}', nrIntrodus);
              reo = reo.replace('{${nrRandom}}', nrRandom);
              reo = reo.replace('{${suma}}', suma);
              resp.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
              resp.write(reo, 'utf-8');
              resp.end();
            });
          });
};

function setResHtml(sql, cb){
  
    db.query(sql, (err, res, cols)=>{

      var table =''; 

      for(var i=0; i<res.length; i++){
        var url = '<a href="http://localhost:3000/edit?inputNumber='+res[i].input+'&uid='+ res[i].id +'">edit</a>';
        //console.log(url);
        table +='<tr><td>'+ res[i].id +'</td><td>'+ res[i].input +'</td><td>'+ res[i].random +'</td><td>'+ res[i].sumaNr +'</td><td>'+ url +'</td></tr>';
      }
      table ='<table border="1"><tr><th>id</th><th>Nr introdus</th><th>Nr random</th><th>Suma</th><th>edit</th></tr>'+ table +'</table>';
      return cb(table);
    });
}
app.get('/table', function(req, res) {
  var reo ='<html><head><title>Results</title></head><body><h1>Rezultatele</h1>{${table}}</body></html>';
  sql = 'SELECT * FROM numbers'
  setResHtml(sql, resql=>{
    reo = reo.replace('{${table}}', resql);
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    res.write(reo, 'utf-8');
    res.end();
  });
  
});





