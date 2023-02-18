import axios from "axios";

const AxiosInst = axios.create({
  baseURL: "http://127.0.0.1:5000/",
  headders: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "multipart/form-data;application/json",
  },
});

let API = {};

// Upload a audio file
API.uploadAudio = (file) => AxiosInst.post("upload", { file });

API.getTimestampsFromAudio = (formData) =>
  AxiosInst.post("getTimestampsFromAudio", formData);

export default API;
