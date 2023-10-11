import axios from 'axios';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      console.log(error.response);
    }
    console.log(error.response);
  }
);

export default axios.create({
  baseURL: `http://localhost:3000/`
});
