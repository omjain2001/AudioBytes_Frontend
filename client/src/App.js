import AudioInput from "./components/AudioInput";
import WebFont from 'webfontloader';
import { useEffect } from "react";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Droid Sans', 'Chilanka']
      }
    });
   }, []);
  return (
    <div className="container mt-4">
      <h4 className="display-4 text-center mb-5">
        <i className="fab fa-react" /> Audio File Upload
      </h4>
      <AudioInput />
    </div>
  );
}

export default App;
