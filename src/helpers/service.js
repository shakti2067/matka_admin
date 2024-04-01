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

export let getUser = isBetting => {
  return apis
    .get(`/master/getAllUsers?page=1&limit=1000&isBetting=${isBetting}`)
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
export let getDaysByCategoryId = id => {
  return apis
    .get(`game/getDaysByCategoryId?id=${id}`)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}
export let updateDays = data => {
  return apis
    .post(`/game/updateDays`, { data })
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}
export let getBatCategoryByToday = () => {
  return apis
    .get(`game/getBatCategoryByToday`)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}
export let createOpenWinner = data => {
  return apis
    .post('game/createOpenWinner', data)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}
export let declareOpenWinner = data => {
  return apis
    .post('game/declareOpenWinner', data)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}
export let createCloseWinner = data => {
  return apis
    .post('game/createCloseWinner', data)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}
export let declareCloseWinner = data => {
  return apis
    .post('game/declareCloseWinner', data)
    .then(res => {
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
export let getWinnerResultChart = (sDate, eDate) => {
  return apis
    .get(`game/getWinnerResultChart?startDate=${sDate}&endDate=${eDate}`)
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

export let getUserDebitOrCreditWalletHistory = (userId, transactionType) => {
  return apis
    .get(`/game/getUserWalletHistory?pageNumber=1&pageSize=100&userId=${userId}&transactionType=${transactionType}`)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let userGameHistory = userId => {
  return apis
    .get(`/game/getGameHistory?pageNumber=1&pageSize=1000&userId=${userId}`)
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

export let createPin = (userId, data) => {
  return apis
    .post(`/auth/createPin?userId=${userId}`, data)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let adminAddBalance = data => {
  return apis
    .post('/game/adminAddBalance', data)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let getUserCount = () => {
  return apis
    .get(`/master/getUserCount`)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let getAllBets = () => {
  return apis
    .get(`/game/getAllBets`)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}
export let winningReport = (startDate, endDate, betCategoryId, state) => {
  return apis
    .get(`/game/winnerHistory?startDate=${startDate}&endDate=${endDate}&betCategoryId=${betCategoryId}&state=${state}`)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}
export let withdrawRequestAdmin = (startDate, endDate) => {
  return apis
    .get(`/game/getWithdrawRequest?pageNumber=1&pageSize=1000&startDate=${startDate}&endDate=${endDate}`)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}
export let updateAllBets = bodyData => {
  return apis
    .post(`/game/updateAllBet`, bodyData)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let userChangePassword = (userId, password) => {
  return apis
    .post(`/auth/changePassword?userId=${userId}`, password)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let getWithdrawRequest = userId => {
  return apis
    .get(`/game/getWithdrawRequest?pageNumber=1&pageSize=100&userId=${userId}`)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let createWithdrawRequest = user => {
  return apis
    .post(`/game/createWithdrawRequest`, user)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let getTotalBidAnk = bodyData => {
  return apis
    .post(`/game/getTotalBidAnk`, bodyData)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let getOverAllBid = bodyData => {
  return apis
    .post(`/game/getBidAmountByBid`, bodyData)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let transferReport = date => {
  console.log('date', date)
  return apis
    .get(`/game/transferReport?pageNumber=1&pageSize=1000&date=${date}`)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let createGameWinner = parameter => {
  return apis
    .post(`/game/createWinner`, parameter)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let getAllWithdrawRequest = () => {
  return apis
    .get(`/game/getWithdrawRequest?pageNumber=1&pageSize=1000`)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let updateWithdrawRequest = sliderData => {
  let formData = new FormData()
  for (let key in sliderData) {
    formData.append(key, sliderData[key])
  }

  return apis
    .post('game/updateWithdrawRequest', formData, {
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

export let userGameHistoryReport = (startDate, endDate, betId, betCategoryId) => {
  return apis
    .get(
      `/game/getGameHistory?pageSize=100&pageNumber=1&startDate=${startDate}&endDate=${endDate}&betId=${betId}&betCategoryId=${betCategoryId}`
    )
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let deleteWinnerResult = parameter => {
  return apis
    .post(`/game/deleteWinnerResult`, parameter)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let customerSellReport = parameter => {
  return apis
    .post(`/game/customerSellReport`, parameter)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let deleteUser = parameter => {
  return apis
    .post(`/auth/deleteUser`, parameter)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}

export let bidWinReport = parameter => {
  return apis
    .post(`/game/bidWinReport`, parameter)
    .then(res => {
      return res.data
    })
    .catch(error => {
      return error
    })
}
