import AudioInput from "./components/AudioInput";
import WebFont from "webfontloader";
import { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import KeywordPage from "./pages/KeywordPage";

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
      <Route path="/" element={<Home />} />
      <Route path="/searchKeyword" element={<KeywordPage />} />
    </Routes>
  );
}

export default App;
