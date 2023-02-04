import axios from "axios";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import Progress from "./Progress";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { COLORS } from "../constant";
import Spinner from "./Spinner";

const AudioInput = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [uploadPercentange, setUploadPercentange] = useState(0);
  const [loading, setLoading] = useState(false);

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
          });

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
            }}
          />
        </div>
        <div className="mb-3">
          <small className="text-danger form-text">
            {formik.touched.audioFile && formik.errors.audioFile}
          </small>
        </div>
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
              <Spinner size="lg" />
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
