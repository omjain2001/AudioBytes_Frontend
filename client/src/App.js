import AudioInput from "./components/AudioInput";
import WebFont from 'webfontloader';
import { useEffect } from "react";
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home";
import KeywordPage from "./pages/KeywordPage";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Droid Sans', 'Chilanka']
      }
    });
   }, []);
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/searchKeyword" element={<KeywordPage/>} />
  </Routes>;
}

export default App;
