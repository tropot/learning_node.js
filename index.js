const express = require('express');
const rN = require('./random-number.js');
const app = express();
var nrIntrodus = 0;
var nrRandom = rN(5);
var suma = 0;
const mysql = require("mysql");
const db = mysql.createConnection({

    host: "localhost",
  
    user: "root",
  
    password: "",
  
    database: "testing",
  
  });
app.get('/home', function(req, res) {
    res.sendFile(__dirname + "/home.html");
})
app.get('/form-submit', function(req, res) {
    nrIntrodus = parseInt(req.query.inputNumber);
    suma = nrIntrodus + nrRandom;
    console.log(typeof(nrIntrodus));
    
    
    db.connect((err) => {

        if (err) {
      
          throw err;
      
        }
      
        nrIntrodus = parseInt(nrIntrodus);
        nrRandom = parseInt(nrRandom);
        suma = parseInt(suma);
        
        var sql = "INSERT INTO numbers (input, random, sumaNr) VALUES (?,?,?)";
        db.query(sql,[nrIntrodus,nrRandom,suma], function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
          });
        if (err) throw err;
        db.query("SELECT * FROM numbers", function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
      
      });
})

app.listen(process.env.PORT || 3000, () => console.log('works on '))

  
  