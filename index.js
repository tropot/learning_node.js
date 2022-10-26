const express = require('express');
const rN = require('./random-number.js');
const app = express();
var nrIntrodus = 0;
var nrRandom = rN(5);
var suma = 0;
console.log(rN(5));
app.get('/home', function(req, res) {
    res.sendFile(__dirname + "/home.html");
})
app.get('/form-submit', function(req, res) {
    nrIntrodus = parseInt(req.query.inputNumber);
    suma = nrIntrodus + nrRandom;
    res.send(`suma numerelor :${suma}        Numarul random  ${nrRandom}         Numarul introdus: ${nrIntrodus}`);
})

app.listen(process.env.PORT || 3000, () => console.log('works on '))