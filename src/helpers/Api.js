import axios from 'axios'
// export const URL = 'http://alphadevinfotech.com:5000/api/v1/'
export const URL = 'http://127.0.0.1:5000/api/v1/'

let authToken = ''

// Check if localStorage is available before using it
if (typeof localStorage !== 'undefined') {
  const userData = JSON.parse(localStorage.getItem('user'))
  console.log('userData', userData)
  authToken = userData?.token || ''
}

const axiosInstance = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: authToken
  }
})

axiosInstance.interceptors.request.use(
  config => {
    // Retrieve token from localStorage before each request
    const userData = JSON.parse(localStorage.getItem('user'))
    authToken = userData?.token || ''

    if (authToken) {
      config.headers['Authorization'] = authToken
    }
    return config
  },
  error => {
    console.log(error, 'this is error call')
    return Promise.reject(error)
  }
)

export default axiosInstance
