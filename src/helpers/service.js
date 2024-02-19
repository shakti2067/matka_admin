import apis from './Api'

//Auth api
export function adminLogin(credentials) {
  return apis
    .post(`/auth/adminLogin`, credentials)
    .then(res => {
      console.log(res)
      return res.data
    })
    .catch(error => {
      return error
    })
}

export function adminRegister(credentials) {
  return apis
    .post(`/auth/createAdmin`, credentials)
    .then(res => {
      console.log(res)
      return res.data
    })
    .catch(error => {
      return error
    })
}

export function adminLogout() {
  return apis
    .get(`/auth/adminLogout`)
    .then(res => {
      console.log(res)
      return res.data
    })
    .catch(error => {
      return error
    })
}
