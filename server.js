const express = require("express");
const multer = require("multer");
const AdmZip = require("adm-zip");
const fs = require("fs");

var app = express();

// ---------- Setup multer ----------
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    console.log("filename");
    cb(null,Date.now() +"---"+ file.originalname);
  },
  // destination: function (req, file, cb) {
  //   console.log("storage");
  //   cb(null, "./uploads");
  // },
});

const upload = multer({ storage });

app.post('/upload_file', upload.single('file'), (req, res) => {
    console.log(req.file)
    const zip = new AdmZip();

    zip.addLocalFile(req.file.path);

    var outputPath ="./uploads/" + Date.now() + "output.zip"
    
    fs.writeFileSync(outputPath, zip.toBuffer());

    res.send({ message: 'Successfully uploaded files' })
  })

app.listen(5000, function () {
  console.log("Started application on port", 5000);
});
