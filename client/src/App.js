import AudioInput from "./components/AudioInput";

function App() {
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
