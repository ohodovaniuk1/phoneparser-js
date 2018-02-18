var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var fs = require('fs');

var app = express();
var serverPort = process.env.PORT || 8000

app.get('/', (req, res) => {
  res.status(200).send('The API is accessible');
});

app.get('/api/phonenumbers/parse/text/:phoneNumber', (req, res) => {

  if(req.params.phoneNumber == 'nothing') {
    res.status(400).send([]);
  }
  else {
    var arr = [];
    arr= req.params.phoneNumber.split(',');
    var finalArr = numParser(arr, res);

    res.status(200).send(finalArr);
  }
});

app.post('/api/phonenumbers/parse/file', upload.single('file'), (req, res) => {

  if(!req.file) {
    res.status(400).send('No file received');
  }
  else {
    fs.readFile(req.file.path, function(err, contents) {
      if(err) {
        res.status(500).send(err);
        return;
      }
      var fileText = contents.toString('ascii');
      var buf = Buffer.from(fileText, 'base64');
      var numbers = buf.toString('ascii');
      var numArr = numbers.split('\n');

      var finalArr = numParser(numArr, res);

      res.status(200).send(finalArr);
    });
  }
});

app.post('/api/phonenumbers/parse/pdf', upload.single('file'), (req, res) => {

  if(!req.file) {
    res.status(400).send('No file received');
  }
  else {
    var path = require('path')
    var filePath = path.join(__dirname, req.file.path)
    var extract = require('pdf-text-extract')

    extract(filePath, { splitPages: false }, function (err, text) {
      if (err) {
        res.status(400).send("Exception caught: " + err);
        //return bad pdf
        return
      }

      var finalArr = numParser(text, res);
	    res.status(200).send(finalArr);

    })
  }
});

app.listen(serverPort, () => {
  console.log('The server is running on port '+ serverPort);
});

//////////////////////////////
/////////////////////////////

// Numbers parser
// Takes an array of numbers and sends result to a user
function numParser(arr, res) {

  var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
  var PNF = require('google-libphonenumber').PhoneNumberFormat;

  try {
    var tel;
    var formattedArr = [];
    // Parsing and saving results
    for (var i = 0; i < arr.length; i++) {
      tel = phoneUtil.parse(arr[i], 'CA');
      formattedArr.push(phoneUtil.format(tel, PNF.INTERNATIONAL));
    }

    // Checking for duplicates and removing them from the final result
    var uniqArr = uniq(formattedArr);
    //console.log(uniqArr);
    return uniqArr;
  //  res.status(200).send(uniqArr);
  } catch(err) {
    res.status(400).send("Exception caught: " + err);
  }
}

// Returns an array of unique phone numbers
function uniq(a) {
  return Array.from(new Set(a));
}
///////////////////////////
////////////////////////
module.exports = app;
