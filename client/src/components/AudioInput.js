import React, { useRef, useState } from "react";
import Progress from "./Progress";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ReactPlayer from "react-player";

const AudioInput = () => {
  const fileInputRef = useRef();
  const [uploadPercentange, setUploadPercentange] = useState(0);
  const [data, setData] = useState(null);

  const formik = useFormik({
    initialValues: {
      audioFile: "",
    },
    validationSchema: Yup.object({
      audioFile: Yup.string().required("Audio file is required"),
    }),
    onSubmit: async (values, helpers) => {
      console.log("Formik values", values);
      try {
        const formData = new FormData();

        formData.append("file", values.audioFile);
        console.log("formData data", formData);
        const res = await axios.post("/upload_file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentange(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
            setTimeout(() => setUploadPercentange(0), 2000);
          },
        });
        fileInputRef.current.value = "";
        helpers.resetForm();
      } catch (error) {
        console.log("Error from client side", error);
      }
    },
  });

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-4">
          <form onSubmit={formik.handleSubmit}>
            <div class="input-group">
              <input
                type="file"
                className="form-control"
                ref={fileInputRef}
                onChange={(e) => {
                  formik.setFieldValue("audioFile", e.target.files[0]);
                  setData(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </div>
            <div className="mb-3">
              <small className="text-danger form-text">
                {formik.touched.audioFile && formik.errors.audioFile}
              </small>
            </div>
            <Progress percentage={uploadPercentange} />
            <button type="submit" className="btn btn-primary mt-4 w-100">
              Submit
            </button>
          </form>
        </div>
        <div className="d-flex justify-content-center col-sm-12 col-lg-8">
          {data && <audio controls src={data} />}
          {/* <ReactPlayer
        url={data}
        controls
        config={{ file: { forceAudio: true } }}
      /> */}
        </div>
      </div>
    </div>
  );
};

export default AudioInput;
