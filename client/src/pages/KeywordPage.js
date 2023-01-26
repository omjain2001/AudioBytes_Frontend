import axios from "axios";
import React, { useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useLocation } from "react-router-dom";

const KeywordPage = () => {
  const { state } = useLocation();
  const keyInputRef = useRef();
  const { data } = state;

  const [timestamps, setTimestamps] = useState([]);

  const onSumbitKeyword = async (e) => {
    let keyword = e.target.value;

    const res = await axios
      .post("http://127.0.0.1:5000/timestamps", {
        transcript_data: data,
        search_word: keyword,
      })
      .then((res) => {
        console.log(res.data);
        setTimestamps(res.data);
        keyInputRef.current.value = "";
      });
  };
  return (
    <div style={{ width: "50rem" }} className="container mt-4">
      <h4 className="display-4 text-center mb-5">
        Search Keyword <i class="fa fa-search" aria-hidden="true" />
      </h4>
      <div style={{ flexDirection: "column" }}>
        <div class="form-group">
          <label for="exampleInputEmail1">Enter Keyword </label>
          <input ref={keyInputRef} type="text" class="form-control" placeholder="Enter keyword" />
          {/* <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small> */}
          <button
            onClick={(e) => {
              onSumbitKeyword(e);
              console.log("Pressing");
            }}
            type="submit"
            className="btn btn-primary mt-4 w-100 p-2"
          >
            Search
          </button>
        </div>
        {/* <div style={{ margin: "2rem" }}>
          <ReactAudioPlayer style={{ width: "100%" }} autoPlay controls />
        </div> */}

        {/* Generating Timestamps */}
        <div className="flex-row mt-4">
          <h4>Timestamps</h4>
          {timestamps.map((timestamp) => {
            return (
              <button
                type="button"
                class="btn btn-success"
                style={{ marginRight: 10 }}
              >
                {timestamp[0]} - {timestamp[1]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KeywordPage;
