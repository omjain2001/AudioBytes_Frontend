import AudioInput from "./components/AudioInput";
import WebFont from "webfontloader";
import { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import KeywordPage from "./pages/KeywordPage";
import AudioInAudio from "./pages/AudioInAudio";
import Welcome from "./pages/Welcome";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: [
          "Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900",
        ],
      },
    });
  }, []);
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/searchKeyword" element={<KeywordPage />} />
    //   </Routes>
    // </BrowserRouter>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/uploadAudio" element={<Home />} />
      <Route path="/searchKeyword" element={<KeywordPage />} />
      <Route path="/searchAudio" element={<AudioInAudio />} />
    </Routes>
  );
}

export default App;
