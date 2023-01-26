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
        families: ["Droid Sans", "Chilanka", "Unbounded"],
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
