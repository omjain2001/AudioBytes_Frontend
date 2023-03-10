import Lottie from "lottie-react";
import React from "react";
import { COLORS, MODE } from "../constant";
import welcomeAnimation from "../assets/musicScan.json";
import welcomeAnimation2 from "../assets/musicScan2.json";
import { Link, useNavigate } from "react-router-dom";
import RightDirectionImage from "../components/RightDirectionImage";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="container vh-100 py-5">
      <h1
        className="text-center text-uppercase"
        style={{ fontWeight: 600, letterSpacing: 1, color: COLORS.PRIMARY }}
      >
        <span className="text-uppercase" style={{ color: COLORS.SECONDARY }}>
          welcome to{" "}
        </span>
        audiobytes
      </h1>
      <div className="row mt-5 py-3">
        <div className="col-md-6 d-flex justify-content-center">
          {/* <Lottie animationData={welcomeAnimation} style={{ width: "75%" }} /> */}
          <RightDirectionImage style={{ width: "80%" }} />
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          <div
            className="card p-4 custom-welcome-card"
            style={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}
          >
            <div className="custom-welcome-blur-card" />
            <div className="card-body">
              <h4
                className="card-title justify-content-center d-flex align-items-center mb-4"
                style={{
                  fontWeight: 600,
                  color: "#FFF",
                }}
              >
                Search audio
              </h4>
              <div className="d-flex flex-column">
                <Link
                  to={{
                    pathname: "/uploadAudio",
                  }}
                  state={{ mode: MODE.SEARCH_KEYWORD }}
                >
                  <button className="btn welcomeBtn my-2 w-100">Keyword</button>
                </Link>
                <Link
                  to={{
                    pathname: "/uploadAudio",
                  }}
                  state={{ mode: MODE.SEARCH_CONTEXT }}
                >
                  <button className="btn welcomeBtn my-2 w-100">Context</button>
                </Link>
                <Link to="searchAudio">
                  <button className="btn welcomeBtn my-2 w-100">
                    Audio Clip
                  </button>
                </Link>
                <div className="d-flex justify-content-center mt-1">
                  <Lottie
                    animationData={welcomeAnimation2}
                    style={{ width: "50%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
