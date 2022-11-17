const express = require("express");
const multer = require("multer");
const AdmZip = require("adm-zip");
const fs = require("fs");
const cors = require("cors");
const { storage, firebaseStorage } = require("./storage/firebase.js");
const { performance } = require("perf_hooks");

var app = express();
app.use(cors());
// ---------- Setup multer ----------
const multer_storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "---" + file.originalname);
  },
  // destination: function (req, file, cb) {
  //   console.log("storage");
  //   cb(null, "./uploads");
  // },
});

const upload = multer({ multer_storage });

app.post("/upload_file", upload.single("file"), async (req, res) => {
  const file = req.file;
  console.log("FILE: ", file);
  const fileName = file.originalname.split(".")[0];
  const zip = new AdmZip();

  // zip.addLocalFile(req.file.path);
  const starttime = performance.now();
  zip.addFile(file.originalname, file.buffer);

  // var outputPath = "./uploads/" + `${fileName}.zip`;

  const storageRef = firebaseStorage.ref(storage, "audio/" + `${fileName}.zip`);
  await firebaseStorage
    .uploadBytes(storageRef, zip.toBuffer())
    .then((snapshot) => {
      const endtime = performance.now();
      console.log("Uploaded a blob or file!");
      console.log("Time taken: ", endtime - starttime + " milliseconds");
    })
    .catch((err) => {
      console.log(err.message);
    });

  // fs.writeFileSync(outputPath, zip.toBuffer());

  res.send({ message: "Successfully uploaded files" });
});

app.listen(5000, function () {
  console.log("Started application on port", 5000);
});
