import React from "react";
import Progress from "./Progress";
import {useFormik} from "formik"

const AudioInput = () => {
  const [file, setFile] = React.useState("");

  const formik = useFormik({
    initialValues: {
      audioFile: null
    },
    onSubmit : (values) => {
      console.log("Formik values", values)
    }
  })

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    formik.setFieldValue("audioFile", file)
  }

  return (
    <div className="container mb-4">
      <form onSubmit={formik.handleSubmit}>
      <div class="input-group mb-3">
        <input
          type="file"
          class="form-control"
          id="inputGroupFile02"
          onClick={handleChange}
        />
        <label class="input-group-text" for="inputGroupFile02">
          Upload
        </label>
      </div>
      <Progress percentage={0} />
      <button type="submit" class="btn btn-primary mt-4 w-100">
        Submit
      </button>
      </form>
    </div>
  );
};

export default AudioInput;
