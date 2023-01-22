import React from "react";
import ReactAudioPlayer from "react-audio-player";
import AudioInput from "../components/AudioInput";

const KeywordPage = () => {
  return (
    <div style={{ width: "50rem" }} className="container mt-4">
      <h4 className="display-4 text-center mb-5">
        Search Keyword <i class="fa fa-search" aria-hidden="true"/>
      </h4>
      <div style={{ flexDirection: "column" }}>
        <div class="form-group">
          <label for="exampleInputEmail1">Enter Keyword </label>
          <input type="text" class="form-control" placeholder="Enter keyword" />
          {/* <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small> */}
          <button type="submit" className="btn btn-primary mt-4 w-100 p-2">
            Search
          </button>
        </div>
        <div style={{ margin: "2rem" }}>
          <ReactAudioPlayer style={{ width: "100%" }} autoPlay controls />
        </div>

        {/* Generating Timestamps */}
        <div>
          <h4>Timestamps</h4>
          <button type="button" class="btn btn-success">
                1 HR : 10 MIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeywordPage;
