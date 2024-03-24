import axios from 'axios'
// export const URL = 'http://alphadevinfotech.com:5000/api/v1/'
// export const URL = 'https://api.kalyandpboss.co.in/api/v1/'
export const URL = 'http://192.168.1.6:5000/api/v1/'

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

    // console.log('window.location.href1', window.location.pathname)
    if (window.location.pathname != '/admin/login/') {
      // console.log('inside token expired')
      const tokenExpired = isTokenExpired(authToken)
      if (tokenExpired) {
        // Handle token expiration (e.g., log out the user)
        console.log('Token expired!')
        window.location.href = '/admin/login'
        // You can perform actions here like logging out the user or redirecting to a login page
      }
    }

    return config
  },
  error => {
    console.log(error, 'this is error call')
    return Promise.reject(error)
  }
)

function isTokenExpired(token) {
  if (!token) return true // Token doesn't exist, so consider it expired

  try {
    const tokenData = JSON.parse(atob(token.split('.')[1])) // Decoding token payload
    const expirationTime = tokenData.exp * 1000 // Expiration time in milliseconds
    const currentTime = Date.now() // Current time in milliseconds

    return expirationTime < currentTime // Token is expired if expiration time is less than current time
  } catch (error) {
    console.error('Error parsing token:', error)
    return true // Treat any parsing error as token expired
  }
}

export default axiosInstance
