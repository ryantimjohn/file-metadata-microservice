'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var fs = require('file-system');

// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});

app.post("/api/fileanalyse", upload.single('upfile'), (req, res)=>{
  var tmp_path = req.file.path;
  var target_path = 'uploads/' + req.file.originalname;
  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  src.on('end', ()=>{res.json({file_name: req.file.originalname, size_in_bytes: req.file.size})}); 
  src.on('error', (err)=>{res.json(err)});
})