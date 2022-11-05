const express = require("express");
const multer = require("multer");
const AdmZip = require("adm-zip");
const fs = require("fs");
const cors = require("cors");


var app = express();
app.use(cors());
// ---------- Setup multer ----------
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "---" + file.originalname);
  },
  // destination: function (req, file, cb) {
  //   console.log("storage");
  //   cb(null, "./uploads");
  // },
});

const upload = multer({ storage });

app.post("/upload_file", upload.single("file"), (req, res) => {
  const file = req.file;
  const fileName = file.originalname.split(".")[0];
  const zip = new AdmZip();

  zip.addLocalFile(req.file.path);

  var outputPath = "./uploads/" + `${fileName}.zip`;

  fs.writeFileSync(outputPath, zip.toBuffer());

  res.send({ message: "Successfully uploaded files" });
});

app.listen(5000, function () {
  console.log("Started application on port", 5000);
});
