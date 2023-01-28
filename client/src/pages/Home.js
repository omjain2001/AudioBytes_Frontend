import React from "react";
import AudioInput from "../components/AudioInput";
import { COLORS } from "../constant";

const Home = () => {
  return (
    <div className="container vh-100 py-5">
      <h1
        className="text-center"
        style={{ fontWeight: 600, letterSpacing: 1, color: COLORS.PRIMARY }}
      >
        AUDIOBYTES
      </h1>
      <div
        className="card w-35 home py-4 px-4"
        style={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}
      >
        <div className="card-body">
          <h3
            className="card-title text-center"
            style={{
              fontWeight: 600,
              color: COLORS.SECONDARY,
            }}
          >
            <i className="fas fa-cloud-arrow-up" />
            &nbsp; Upload your file
          </h3>
          <h6
            className="card-subtitle text-center"
            style={{ fontWeight: 400, color: "#b3bdcc" }}
          >
            Upload only .mp3 and .wav files
          </h6>
          <div className="card-text">
            {" "}
            <AudioInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
