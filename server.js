const express = require("express");
const multer = require("multer");
const AdmZip = require("adm-zip");
const fs = require("fs");
const cors = require("cors");
const { storage, firebaseStorage } = require("./storage/firebase.js");
const { performance } = require("perf_hooks");

let FormData = require("form-data");
const axios = require("axios");

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
  // 1] Upload audio to firebase storage
  const file = req.file;
  console.log("FILE: ", file);

  const fileName = file.originalname.split(".")[0];
  const extension = file.originalname.split(".")[1];

  //const zip = new AdmZip();

  // zip.addLocalFile(req.file.path);
  const starttime = performance.now();
  
  //zip.addFile(file.originalname, file.buffer);

  var outputPath = "./uploads/" + `${fileName}.${extension}`;
  fs.writeFileSync(outputPath, file.buffer);

  // const storageRef = firebaseStorage.ref(
  //   storage,
  //   "audio/" + `${fileName}.${extension}`
  // );
  // await firebaseStorage
  //   .uploadBytes(storageRef, file.buffer)
  //   .then((snapshot) => {
  //     const endtime = performance.now();
  //     console.log("Uploaded a blob or file!");
  //     console.log("Time taken: ", endtime - starttime + " milliseconds");
  //   })
  //   .catch((err) => {
  //     console.log(err.message);
  //   });

  // 2] Generate transcript
  try {
    const formData = new FormData();
    const existingFile = fs.readFileSync(outputPath)
       
    formData.append("file[]", existingFile);

    let res = await axios.post("http://127.0.0.1:5000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    res.send({ message: "Successfully uploaded files", text: res.data.text });

  } catch (error) {

    console.log("Flask API error: ", error);

    res.send({ error: "Server error" });
  }
  // fs.writeFileSync(outputPath, zip.toBuffer());
});

app.listen(5000, () => {
  console.log("Started application on port", 5000);
});
