import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const KeywordPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Entered1 in useEffect");
    if (state?.data == null || state?.data == undefined) {
      console.log("Entered in useEffect");
      navigate("/");
    }
  }, []);

  const keyInputRef = useRef();
  // const { data=null } = state;

  const [keyword, setKeyword] = useState("");

  const [timestamps, setTimestamps] = useState([]);

  

  const onSumbitKeyword = async (ipKeyword) => {
    const res = await axios
      .post("http://127.0.0.1:5000/timestamps", {
        transcript_data: state?.data,
        search_word: ipKeyword,
      })
      .then((res) => {
        console.log(res.data);
        setTimestamps(res.data);
        if(res.data.length == 0){
          Swal.fire(
            'Empty !!',
            'There is no such keyword in the audio file',
            'info'
          )
        }
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
          <input
            ref={keyInputRef}
            type="text"
            class="form-control"
            placeholder="Enter keyword"
            onChange={(e) => setKeyword(e.target.value)}
          />
          {/* <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small> */}
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
        </div>
        {/* <div style={{ margin: "2rem" }}>
          <ReactAudioPlayer style={{ width: "100%" }} autoPlay controls />
        </div> */}

        {/* Generating Timestamps */}
        {timestamps.length > 0 && <div className="flex-row mt-4">
          <h4>Timestamps</h4> </div>}
          {timestamps.map((timestamp) => {
            return (
              <button
                type="button"
                class="btn btn-success"
                style={{ marginRight: 10 }}
              >
                {timestamp[0]} sec - {timestamp[1]} sec
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default KeywordPage;
