import axios from 'axios';

const AxiosInst = axios.create({
  baseURL: 'http://127.0.0.1:5000/'
});


let API = {};

// Upload a audio file
API.uploadAudio = (file) => AxiosInst.post('upload', { file });


export default API;

