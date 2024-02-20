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

export let getUser = () => {
  return apis
    .get(`/master/getAllUsers?page=1&limit=20`)
    .then(res => {
      console.log(res)
      return res.data
    })
    .catch(error => {
      return error
    })
}
export let getBetCategory = () => {
  return apis
    .get(`game/getBatCategory`)
    .then(res => {
      console.log(res)
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let createBids = data => {
  return apis
    .post('game/createBatCategory', data)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let getAllWinner = data => {
  return apis
    .get('game/getAllWinnerUser', data)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}
