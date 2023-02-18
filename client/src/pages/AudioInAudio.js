import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import API from "../API";
import Spinner from "../components/Spinner";
import UploadImage from "../components/UploadImage";
import { COLORS } from "../constant";

const AudioInAudio = () => {
  const [loading, setLoading] = useState(false);
  const [timestamps, setTimestamps] = useState([]);
  const [inputAudio, setInputAudio] = useState(null);
  const [searchAudio, setSearchAudio] = useState(null);

  // References
  const inputAudioRef = useRef();

  const formik = useFormik({
    initialValues: {
      inputAudioFile: null,
      searchAudioFile: null,
    },
    validationSchema: Yup.object({
      inputAudioFile: Yup.string().required("Required").nullable(),
      searchAudioFile: Yup.string().required("Required").nullable(),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("inputAudio", values.inputAudioFile);
      formData.append("sampleAudio", values.searchAudioFile);
      setLoading(true);
      await API.getTimestampsFromAudio(formData)
        .then((res) => {
          setTimestamps([res.data.timestamps[0]]);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setLoading(false);
        });
    },
  });

  useEffect(() => {
    console.log("Useeffect running");
    if (formik.values.inputAudioFile) {
      const file = new FileReader();
      file.readAsDataURL(formik.values.inputAudioFile);
      file.onload = () => {
        if (file.readyState === 2) {
          setInputAudio(file.result);
        }
      };
    }
    if (formik.values.searchAudioFile) {
      const file = new FileReader();
      file.readAsDataURL(formik.values.searchAudioFile);
      file.onload = () => {
        if (file.readyState === 2) {
          setSearchAudio(file.result);
        }
      };
    }
  }, [formik.values]);

  const handleAudio = (timestamp) => {
    // const delayMills = (end - start) * 1000;
    inputAudioRef.current.currentTime = parseFloat(
      Number(timestamp).toFixed(2)
    );
    inputAudioRef.current.play();
    // setTimeout(() => {
    //   inputAudioRef.current.pause();
    // }, delayMills);
  };

  return (
    <div className="container py-5 relative vh-100">
      <h1
        className="text-center"
        style={{ fontWeight: 600, letterSpacing: 1, color: COLORS.PRIMARY }}
      >
        AUDIOBYTES
      </h1>
      <div className="row mt-5 py-3">
        <div className="col-md-4 h-100">
          <div
            className="card p-4"
            style={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}
          >
            <div className="card-body">
              <h4
                className="card-title justify-content-center d-flex align-items-center mb-4"
                style={{
                  fontWeight: 600,
                  color: COLORS.SECONDARY,
                }}
              >
                <i class="fab fa-soundcloud" style={{ fontSize: 30 }}></i>
                &nbsp; Search audio
              </h4>
              <form onSubmit={formik.handleSubmit}>
                <div class="form-group">
                  <label htmlFor="inputAudio" className="form-label">
                    Upload sample audio
                  </label>
                  <input
                    disabled={loading}
                    type="file"
                    className="form-control"
                    id="inputAudio"
                    ref={inputAudioRef}
                    onChange={(e) => {
                      if (!e.target.files[0] && timestamps.length > 0) {
                        setTimestamps([]);
                      }
                      formik.setFieldValue("inputAudioFile", e.target.files[0]);
                    }}
                  />
                  <div className="mb-3">
                    <small className="text-danger form-text">
                      {formik.touched.inputAudioFile &&
                        formik.errors.inputAudioFile}
                    </small>
                  </div>
                </div>
                <div class="form-group">
                  <label htmlFor="searchAudio" className="form-label">
                    Upload test audio
                  </label>
                  <input
                    disabled={loading}
                    type="file"
                    className="form-control"
                    id="searchAudio"
                    onChange={(e) => {
                      if (!e.target.files[0] && timestamps.length > 0) {
                        setTimestamps([]);
                      }
                      formik.setFieldValue(
                        "searchAudioFile",
                        e.target.files[0]
                      );
                    }}
                  />
                  <div className="mb-3">
                    <small className="text-danger form-text">
                      {formik.touched.searchAudioFile &&
                        formik.errors.searchAudioFile}
                    </small>
                  </div>
                </div>
                {loading ? (
                  <>
                    <div className="d-flex justify-content-center mt-4">
                      <h6 style={{ color: COLORS.TERTIARY }}>
                        <span>Processing your audio</span>
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
          </div>
        </div>
        <div className="col-md-1 d-flex justify-content-center">
          <div
            className="h-100"
            style={{ width: "1.5px", backgroundColor: COLORS.SECONDARY }}
          />
        </div>
        <div className="col-md-7">
          <div className="row gx-1">
            {formik.values.inputAudioFile && (
              <div className="col-6 p-0 my-4 text-center">
                <h5
                  className="text-center mb-3"
                  style={{ color: COLORS.PRIMARY }}
                >
                  Input
                </h5>
                <audio src={inputAudio} controls ref={inputAudioRef} />
              </div>
            )}
            {formik.values.searchAudioFile && (
              <div className="col-6 p-0 my-4 text-center">
                <h5
                  className="text-center mb-3"
                  style={{ color: COLORS.PRIMARY }}
                >
                  Sample
                </h5>
                <audio src={searchAudio} controls />
              </div>
            )}
            <div className="col-12">
              {timestamps.length > 0 && (
                <div className="flex-row mt-4">
                  <h5 style={{ color: COLORS.PRIMARY }}>Timestamps</h5>{" "}
                </div>
              )}
              <div className="d-flex flex-wrap justify-content-space-evenly">
                {formik.values.inputAudioFile ||
                formik.values.searchAudioFile ? (
                  timestamps.map((timestamp, index) => {
                    return (
                      <button
                        key={index}
                        type="button"
                        className="btn submit-btn my-2"
                        style={{
                          marginRight: 10,
                          color: COLORS.PRIMARY,
                          border: `1px solid ${COLORS.SECONDARY}`,
                        }}
                        onClick={(e) => handleAudio(timestamp)}
                      >
                        {Number(timestamp).toPrecision(3)} sec
                      </button>
                    );
                  })
                ) : (
                  <div className="text-center w-100">
                    <UploadImage style={{ width: "60%" }} />{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioInAudio;
