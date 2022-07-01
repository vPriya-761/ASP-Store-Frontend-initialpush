import axios from 'axios'
const { ASP_API_URL } = process.env
const request = axios.create({
  baseURL: ASP_API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})
request.interceptors.request.use(
  req => {
    return req
  },
  error => {
    return Promise.reject(error)
  }
)

export default request;
