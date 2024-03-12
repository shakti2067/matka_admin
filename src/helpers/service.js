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

export let createAppLink = data => {
  return apis
    .post('master/addAppLink', data)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let getAppLink = () => {
  return apis
    .get(`master/getAppLink`)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let addUpiId = data => {
  return apis
    .post('master/addUpiId', data)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let getUpiId = () => {
  return apis
    .get(`master/getUpiId`)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let addAmountValue = data => {
  return apis
    .post('master/addAmountValue', data)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}
export let getAmountValue = () => {
  return apis
    .get(`master/getAmountValue`)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let getGlobalSettings = () => {
  return apis
    .get(`master/getGlobalSettings`)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let addContact = data => {
  return apis
    .post('master/addContact', data)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let getContact = () => {
  return apis
    .get('master/getContact')
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let createHowToPlay = data => {
  return apis
    .post('master/createHowToPlay', data)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let getHowToPlay = () => {
  return apis
    .get('master/getHowToPlay')
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let addSliderImage = sliderData => {
  let formData = new FormData()
  for (let key in sliderData) {
    formData.append(key, sliderData[key])
  }

  return apis
    .post('master/addSliderImage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let getAllSliderImage = () => {
  return apis
    .get('master/getAllSliderImage')
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let updateSliderImage = data => {
  return apis
    .post('master/updateSliderImage', data)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let updateUser = data => {
  return apis
    .put('master/updateUserStatus', data)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let getUserById = userId => {
  console.log('userId in api ', userId)
  return apis
    .get(`auth/getUserById/${userId}`)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let adminChangePassword = data => {
  return apis
    .post('auth/adminChangePassword', data)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let getPaymentInfo = userId => {
  return apis
    .get(`auth/getPaymentInfo?userId=${userId}`)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let userWalletHistory = userId => {
  return apis
    .get(`/game/getUserWalletHistory?pageNumber=1&pageSize=100&userId=${userId}`)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let userGameHistory = userId => {
  return apis
    .get(`/game/getGameHistory?pageNumber=1&pageSize=100&userId=${userId}`)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let updateBatCategory = data => {
  return apis
    .post('/game/updateBatCategory', data)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}
