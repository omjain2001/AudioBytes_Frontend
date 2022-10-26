import axios from 'axios';

const AxiosInst = axios.create({
  baseURL: 'http://localhost:5000/',
});



export default AxiosInst;