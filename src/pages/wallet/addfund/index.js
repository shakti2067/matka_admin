import { Button, Card, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { adminAddBalance, getUser } from 'src/helpers'

function AddFund() {
  let [user, setUser] = useState([])
  let [selectUser, setSelectUser] = useState({
    userName: '',
    mobile: 0
  })
  let [amount, setAmount] = useState('')
  let [isPopupOpenView, setPopupOpenView] = useState(false)
  let [successMsg, setSuccessMessage] = useState('')
  let [error, setError] = useState('')

  const togglePopupView = () => {
    if (selectUser.mobile == 0) {
      setError('Please select user')
    } else if (amount == 0) {
      setError('amount must be greater than 0')
    } else {
      setPopupOpenView(!isPopupOpenView)
    }
    setSuccessMessage('')
  }

  const handleChangeUser = e => {
    const selectedMobile = e.target.value
    const selectedUser = user.find(user => user.mobile === selectedMobile)
    setSelectUser({
      userName: selectedUser ? selectedUser.name : '',
      mobile: selectedMobile
    })
    setError('')
  }

  const getAllUserApi = () => {
    getUser()
      .then(data => {
        if (data.success) {
          setUser(data.data)
        } else {
          console.log('error')
        }
      })
      .catch(e => {
        console.log('error', e)
      })
  }

  const adminAddBalanceApi = () => {
    let params = {
      amount: parseInt(amount),
      mobileNumber: selectUser.mobile
    }
    adminAddBalance(params)
      .then(data => {
        if (data.success) {
          console.log('data', data)
          setSelectUser({
            mobile: 0,
            userName: ''
          })
          setSuccessMessage(data.message)
          setAmount('')
          setPopupOpenView(!isPopupOpenView)
          setError('')
        } else {
          console.log('error', data.message)
          setError(data.message)
          setSuccessMessage('')
        }
      })
      .catch(e => {
        console.log('error', e)
        setSuccessMessage('')
        setError(e)
      })
  }

  useEffect(() => {
    getAllUserApi()
  }, [])
  return (
    <Card sx={{ padding: '20px', width: '50%' }}>
      <Typography style={{ margin: '10px 0 5px 0' }}>Add Balance In User Wallet</Typography>
      <Typography style={{ margin: '10px 0 5px 0' }}>User List</Typography>

      <Select style={{ margin: '10px 0 5px 0', width: '100%' }} value={selectUser.mobile} onChange={handleChangeUser}>
        <MenuItem value={0}>-- Select user --</MenuItem>
        {user &&
          user.map(d => (
            <MenuItem value={d.mobile} key={d._id}>
              {d.name} ({d.mobile})
            </MenuItem>
          ))}
      </Select>

      <Typography style={{ margin: '10px 0 5px 0', width: '100%' }}>Amount</Typography>
      <TextField
        type='number'
        style={{
          width: '100%',
          marginBottom: '20px'
        }}
        placeholder='Enter amount'
        value={amount}
        onChange={e => {
          setAmount(e.target.value)
          setError('')
        }}
      />
      <Button variant='contained' onClick={togglePopupView}>
        Submit
      </Button>
      {successMsg ? (
        <Typography style={{ margin: '10px 0 5px 0', width: '100%' }} color='green'>
          {successMsg}
        </Typography>
      ) : null}
      {error ? (
        <Typography style={{ margin: '10px 0 5px 0', width: '100%' }} color='red'>
          {error}
        </Typography>
      ) : null}

      {isPopupOpenView && (
        <div>
          <div
            className='overlay'
            onClick={togglePopupView}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '80%',
              // backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9998 // Ensure the overlay is below the popup but above the rest of the content
            }}
          />
          <div
            style={{
              borderRadius: '5px',
              width: '30%',
              position: 'fixed',
              top: '18%',
              left: '35%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#F7F7F7',
              padding: '20px',
              zIndex: 9999 // Ensure the popup is above the overlay
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='h6'>Payment Confirmation</Typography>
              <div onClick={togglePopupView} style={{ cursor: 'pointer' }}>
                &#10006;
              </div>
            </div>

            <Card sx={{ padding: '20px' }}>
              <Typography style={{ margin: '10px 0 5px 0' }}>User name :{selectUser.userName}</Typography>

              <Typography style={{ margin: '10px 0 5px 0' }}>Mobile : {selectUser.mobile}</Typography>
              <Typography style={{ margin: '10px 0 5px 0' }}>Transfer Amount :{amount}</Typography>
              <Typography style={{ margin: '10px 0 5px 0' }}>
                Are you sure you want to transfer amount to this user.
              </Typography>
              <Button variant='contained' style={{ marginRight: '10px' }} onClick={adminAddBalanceApi}>
                Yes
              </Button>
              <Button variant='contained' color='error' onClick={togglePopupView}>
                No
              </Button>
            </Card>
          </div>
        </div>
      )}
    </Card>
  )
}

export default AddFund
