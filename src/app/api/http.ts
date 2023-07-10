import axios from 'axios';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// axios.interceptors.response.use(
//   response => response,
//   (error) => {
//     if (error.response.status === 401) {
//       store.dispatch(actions.authLogout());
//     }
//     return Promise.reject(error);
//   }
// );
export default axios;
