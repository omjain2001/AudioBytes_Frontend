const express = require("express");
const multer = require("multer");

var app = express();

// ---------- Setup multer ----------
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    console.log("filename");
    cb(null,Date.now() +"---"+ file.originalname);
  },
  destination: function (req, file, cb) {
    console.log("storage");
    cb(null, "./uploads");
  },
});

const upload = multer({ storage });

app.post('/upload_files', upload.single('file'), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.send({ message: 'Successfully uploaded files' })
  })

app.listen(5000, function () {
  console.log("Started application on port", 5000);
});
