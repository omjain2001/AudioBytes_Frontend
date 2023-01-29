import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ReactPlayer from "react-player";
import { COLORS } from "../constant";

const KeywordPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("Entered1 in useEffect");
    if (state?.data == null || state?.data === undefined) {
      // console.log("Entered in useEffect");
      // navigate("/");
    }
  }, []);

  const [audio, setAudio] = useState(null);

  useEffect(() => {
    if (state?.audio !== null && state?.audio !== undefined) {
      const file = new FileReader();
      file.readAsDataURL(state.audio);
      console.log("Executing");
      file.onload = () => {
        if (file.readyState === 2) {
          setAudio(file.result);
        }
      };
    }
  }, [state?.audio]);

  const keyInputRef = useRef();
  // const { data=null } = state;

  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const [timestamps, setTimestamps] = useState([]);

  const onSumbitKeyword = async (ipKeyword) => {
    setLoading(true);
    const res = await axios
      .post("http://127.0.0.1:5000/timestamps", {
        transcript_data: state?.data,
        search_word: ipKeyword,
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setTimestamps(res.data);
        if (res.data.length === 0) {
          Swal.fire(
            "Empty !!",
            "There is no such keyword in the audio file",
            "info"
          );
          keyInputRef.current.value = "";
        }
        // keyInputRef.current.value = "";
      });
  };

  const handleAudio = (start, end) => {
    const audio1 = new Audio(audio);
    audio1.autoplay = false;
    audio1.currentTime = start;
    audio1.play();
    setInterval(function () {
      if (audio1.currentTime > end) {
        audio1.pause();
      }
    }, 100);
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
            <div className="card-body text-center">
              <h4
                className="card-title"
                style={{
                  fontWeight: 600,
                  color: COLORS.SECONDARY,
                }}
              >
                <i className="fas fa-magnifying-glass" />
                &nbsp; Search keyword
              </h4>
              <div class="form-group my-4" style={{ position: "relative" }}>
                <div>
                  <input
                    ref={keyInputRef}
                    type="text"
                    class="form-control"
                    placeholder="Enter keyword"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <div style={{ position: "absolute", left: "92%", bottom: "70%" }}>
                    <i
                      onClick={() => keyInputRef.current.value = ""}
                      class="fas fa-xmark"
                    ></i>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    onSumbitKeyword(keyword);
                    console.log("Pressing");
                  }}
                  type="submit"
                  style={{
                    backgroundColor: COLORS.SECONDARY,
                    color: "#FFF",
                    border: "none",
                  }}
                  className="btn submit-btn mt-4 p-2"
                >
                  Search
                </button>
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
        <div className="col-md-7">
          <div className="row">
            <div className="col-12 p-0 my-4">
              <audio src={audio} controls style={{ width: "100%" }} />
            </div>
            <div className="col-12">
              {timestamps.length > 0 && (
                <div className="flex-row mt-4">
                  <h4 style={{ color: COLORS.PRIMARY }}>Timestamps</h4>{" "}
                </div>
              )}
              <div className="d-flex flex-wrap justify-content-space-evenly">
                {timestamps.length === 0
                  ? "Search for a keyword to fetch the timestamps !!"
                  : timestamps.map((timestamp, index) => {
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
                          onClick={() =>
                            handleAudio(timestamp[0], timestamp[1])
                          }
                        >
                          {timestamp[0]} sec - {timestamp[1]} sec
                        </button>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ flexDirection: "column" }}>
        {/* <div class="form-group">
          <label for="exampleInputEmail1">Enter Keyword </label>
          <input
            ref={keyInputRef}
            type="text"
            class="form-control"
            placeholder="Enter keyword"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
          <button
            onClick={(e) => {
              onSumbitKeyword(keyword);
              console.log("Pressing");
            }}
            type="submit"
            className="btn btn-primary mt-4 w-100 p-2"
          >
            Search
          </button>
        </div> */}
        {/* <div style={{ margin: "2rem" }}>
          <ReactAudioPlayer style={{ width: "100%" }} autoPlay controls />
        </div> */}
        {/* <ReactPlayer
          url={audio}
          controls={true}
          width="50%"
          volume={0.5}
          playsinline
          config={{
            file: {
              attributes: { borderRadius: 10 },
              forceAudio: true,
              forceVideo: false,
            },
          }}
        /> */}
        {/* <audio src={audio} controls style={{ width: "100%" }} /> */}

        {/* Generating Timestamps */}
      </div>
    </div>
  );
};

export default KeywordPage;
