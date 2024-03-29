import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Spinner from "../components/Spinner";
import { COLORS } from "../constant";

const KeywordPage = (props) => {
  const { state } = useLocation();
  console.log(props.state);

  const [audio, setAudio] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [timestamps, setTimestamps] = useState([]);
  const [recorderLoading, setRecorderLoading] = useState(false);

  // References
  const keyInputRef = useRef();
  const recordButtonRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    if (state?.audio !== null && state?.audio !== undefined) {
      const file = new FileReader();
      file.readAsDataURL(state.audio);
      file.onload = () => {
        if (file.readyState === 2) {
          setAudio(file.result);
        }
      };
    }
  }, [state?.audio]);

  const onSumbitKeyword = async () => {
    if (keyword.length === 0) return setError(true);
    setLoading(true);

    if (keyword.split(" ").length > 1) {
      await axios
        .post("http://127.0.0.1:5000/getContextForSentence", {
          text_array: state?.data?.segments,
          input_sentence: keyword,
        })
        .then((res) => {
          // console.log(res.data);
          setLoading(false);
          setTimestamps(res.data);
          if (res.data.length === 0) {
            Swal.fire({
              title: "Empty !!",
              text: "There is no such sentence in the audio file",
              icon: "error",
              showCloseButton: false,
              confirmButtonColor: COLORS.SECONDARY,
            });
            keyInputRef.current.value = "";
          }
        })
        .catch((err) => {
          setLoading(false);
          Swal.fire({
            title: "Error",
            text: err.message,
            icon: "error",
            showCloseButton: false,
            confirmButtonColor: COLORS.SECONDARY,
          });
        });
    } else {
      await axios
        .post("http://127.0.0.1:5000/timestamps", {
          transcript_data: state?.data,
          search_word: keyword,
        })
        .then((res) => {
          // console.log(res.data);
          setLoading(false);
          setTimestamps(res.data);
          if (res.data.length === 0) {
            Swal.fire({
              title: "Empty !!",
              text: "There is no such keyword in the audio file",
              icon: "error",
              showCloseButton: false,
              confirmButtonColor: COLORS.SECONDARY,
            });
            keyInputRef.current.value = "";
          }
          // keyInputRef.current.value = "";
        })
        .catch((err) => {
          setLoading(false);
          Swal.fire({
            title: "Error",
            text: err.message,
            icon: "error",
            showCloseButton: false,
            confirmButtonColor: COLORS.SECONDARY,
          });
        });
    }
  };

  const handleAudio = (start, end) => {
    const delayMills = (end - start) * 1000;
    audioRef.current.currentTime = start;
    audioRef.current.play();
    setTimeout(() => {
      audioRef.current.pause();
    }, delayMills);
  };

  let chunks = [];
  const handleRecordClick = () => {
    if (!recording) {
      setRecording(true);
      chunks = [];

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          let recorderObj = new MediaRecorder(stream);
          recorderObj.ondataavailable = (e) => chunks.push(e.data);
          recorderObj.onstop = async (e) => {
            const formData = new FormData();
            formData.append("file", new File(chunks, "recordedAudio.wav"));
            await axios
              .post("http://127.0.0.1:5000/upload", formData)
              .then((res) => {
                setRecorderLoading(false);
                setKeyword(res.data.text);
              })
              .catch((err) => {
                console.log(err);
                setRecorderLoading(false);
              });
          };
          recorderObj.start();
          setRecorder(recorderObj);
        })
        .catch((err) => {
          console.log(err);
          setRecording(false);
          Swal.fire({
            title: "Error",
            text: "Please allow microphone access to record audio",
            icon: "error",
            showCloseButton: false,
            confirmButtonColor: COLORS.SECONDARY,
          });
        });
    } else {
      setRecording(false);
      setRecorderLoading(true);
      recorder.stop();
    }
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
        <div className="col-md-5 h-100">
          <div
            className="card p-4"
            style={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}
          >
            <div className="card-body text-center">
              <h4
                className="card-title"
                style={{
                  fontWeight: 600,
                  color: COLORS.SECONDARY,
                }}
              >
                <i className="fas fa-magnifying-glass" />
                &nbsp; Search keywords
              </h4>
              <div className="form-group my-4" style={{ position: "relative" }}>
                <div className="input-group">
                  <input
                    ref={keyInputRef}
                    type="text"
                    class="form-control shadow-none"
                    placeholder="Enter keyword or sentence"
                    value={keyword}
                    disabled={recording || loading}
                    onChange={(e) => {
                      setKeyword(e.target.value);
                      if (error) setError(false);
                    }}
                  />
                  <button
                    class="btn cross-btn"
                    disabled={recording || loading}
                    type="button"
                    onClick={() => setKeyword("")}
                  >
                    <i class="fas fa-xmark"></i>
                  </button>
                </div>
                {/* <h6
                  className="mt-1"
                  style={{
                    fontSize: 12,
                    color: COLORS.TERTIARY,
                    textAlign: "left",
                  }}
                >
                  Enter keyword for its occurences and sentence for context
                </h6> */}
                {error && (
                  <div className="mt-1" style={{ textAlign: "left" }}>
                    <small className="text-danger">Keyword is required</small>
                  </div>
                )}
                <div
                  className="my-3 text-center"
                  style={{ color: COLORS.SECONDARY }}
                >
                  OR
                </div>
                <div className="d-flex justify-content-center">
                  {!recorderLoading ? (
                    <button
                      className={`record-block ${recording ? "recording" : ""}`}
                      onClick={handleRecordClick}
                      ref={recordButtonRef}
                      disabled={loading}
                    >
                      {recording ? (
                        <i className="fas fa-stop" />
                      ) : (
                        <i className="fas fa-microphone" />
                      )}
                    </button>
                  ) : (
                    <Spinner type="grow" size="lg" color={COLORS.SECONDARY} />
                  )}
                </div>
                {loading ? (
                  <div className="d-flex justify-content-center mt-4">
                    <Spinner color={COLORS.SECONDARY} size="lg" type="border" />{" "}
                  </div>
                ) : (
                  <button
                    onClick={onSumbitKeyword}
                    type="submit"
                    disabled={recording || recorderLoading}
                    style={{
                      backgroundColor: COLORS.SECONDARY,
                      color: "#FFF",
                      border: "none",
                    }}
                    className="btn submit-btn mt-4 p-2"
                  >
                    Search
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-1 d-flex justify-content-center">
          <div
            className="h-100"
            style={{ width: "1.5px", backgroundColor: COLORS.SECONDARY }}
          />
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-12 p-0 my-4">
              <audio
                src={audio}
                controls
                style={{ width: "100%" }}
                ref={audioRef}
              />
            </div>
            <div className="col-12">
              {timestamps.length > 0 && (
                <div className="flex-row mt-4">
                  <h4 style={{ color: COLORS.PRIMARY }}>Timestamps</h4>{" "}
                </div>
              )}
              <div className="d-flex flex-wrap justify-content-space-evenly">
                {timestamps.length === 0 ? (
                  <span color={{ color: COLORS.PRIMARY }}>
                    Search for a keyword to fetch the timestamps !!
                  </span>
                ) : (
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
                        onClick={(e) => handleAudio(timestamp[0], timestamp[1])}
                      >
                        {timestamp[0]} sec - {timestamp[1]} sec
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordPage;
