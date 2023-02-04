import React, { useEffect, useRef, useState } from "react";
import Progress from "./Progress";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import ReactPlayer from "react-player";
import API from "../API";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { COLORS } from "../constant";

const AudioInput = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [uploadPercentange, setUploadPercentange] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAudioUploaded, setIsAudioUploaded] = useState(false);
  // useEffect(() => {
  //   console.log("Entered88 in useEffect");
  // }, []);

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

        //const res = await API.uploadAudio(formData);

        setLoading(true);
        var startTime = new Date().getTime();
        const res = await axios
          .post("http://127.0.0.1:5000/upload", formData, {
            onUploadProgress: (progressEvent) => {
              setUploadPercentange(
                parseInt(
                  Math.round((progressEvent.loaded * 100) / progressEvent.total)
                )
              );
            },
          })
          .then((res) => {
            console.log("Transcripts : ", res.data.text);
            setLoading(false);

            var endTime = new Date().getTime();
            var time = endTime - startTime;
            console.log("Execution time in mins : " + time / (60 * 1000));

            Swal.fire({
              title: "Success",
              text: "Audio processing completed",
              icon: "success",
              showCloseButton: false,
              confirmButtonColor: COLORS.SECONDARY,
            });
            navigate("/searchKeyword", {
              state: {
                data: res.data,
                audio: values.audioFile,
              },
            });
            setIsAudioUploaded(false);
          });

        // setTimeout(() => setUploadPercentange(0), 2000);
        fileInputRef.current.value = "";
        helpers.resetForm();
      } catch (error) {
        setLoading(false);
        Swal.fire({
          title: "Error",
          text: "Server is busy, please try again later",
          icon: "error",
          confirmButtonColor: COLORS.SECONDARY,
        });
        setUploadPercentange(0);
        console.log("Error from client side", error);
      }
    },
  });

  return (
    <div className="container mt-5">
      <form onSubmit={formik.handleSubmit}>
        <div class="input-group">
          <input
            disabled={loading}
            type="file"
            className="form-control"
            ref={fileInputRef}
            onChange={(e) => {
              formik.setFieldValue("audioFile", e.target.files[0]);
              //setData(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </div>
        <div className="mb-3">
          <small className="text-danger form-text">
            {formik.touched.audioFile && formik.errors.audioFile}
          </small>
        </div>
        {/* {isAudioUploaded && <div className="d-flex justify-content-center mt-1">
              <h6>Audio uploaded</h6>
            </div>} */}
        <Progress percentage={uploadPercentange} />
        {loading ? (
          <>
            <div className="d-flex justify-content-center mt-4">
              <h6 style={{ color: COLORS.TERTIARY }}>
                {uploadPercentange < 100 ? (
                  <span>Uploading audio</span>
                ) : (
                  <span>Processing your audio</span>
                )}
              </h6>
            </div>
            <div className="d-flex justify-content-center mt-2">
              <div
                class="spinner-border d-flex justify-content-center"
                style={{ color: COLORS.SECONDARY }}
                role="status"
              >
                {/* <span class="sr-only text-center">
                  Transcript generating...
                </span> */}
              </div>
            </div>
          </>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="btn mt-4 w-100 p-2 submit-btn"
            style={{
              backgroundColor: COLORS.SECONDARY,
              color: "#FFF",
              border: "none",
            }}
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default AudioInput;
