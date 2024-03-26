import { Box, Button, FormControl, Switch, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import dayjs from 'dayjs'
import {
  addAmountValue,
  addUpiId,
  createAppLink,
  getAmountValue,
  getAppLink,
  getGlobalSettings,
  getUpiId
} from 'src/helpers'
import Datetime from 'react-datetime'

function MainSetting() {
  const [todayOpenTime, setTodayOpenTime] = useState(dayjs(Date.now()))
  const [todayCloseTime, setTodayCloseTime] = useState(dayjs(Date.now()))
  const [appForm, setAppForm] = useState({
    link: '',
    shareMessage: '',
    referralMessage: '',
    afterLoginMessage: ''
  })

  const [appFormErr, setAppFormErr] = useState({
    linkErr: '',
    shareMessageErr: '',
    referralMessageErr: '',
    afterLoginMessageErr: ''
  })

  const [upiForm, setUpiForm] = useState({
    googleUpi: '',
    phonePayUpi: '',
    otherUpi: ''
  })

  const [valueForm, setValueForm] = useState({
    minDeposite: '',
    maxDeposite: '',
    minWithdrawal: '',
    maxWithdrawal: '',
    minTransfer: '',
    maxTransfer: '',
    minBidAmount: '',
    maxBidAmount: '',
    welcomeBounce: '',
    referralPoint: '',
    withdrawalOpenTime: dayjs(new Date()),
    withdrawalCloseTime: dayjs(new Date()),
    globalBatting: true,
    withdrawalStatus: false
  })

  // console.log('valueForm', valueForm)

  let appFormValidation = () => {
    let { link, shareMessage, referralMessage, afterLoginMessage } = appForm

    if (link.length === 0) {
      setAppFormErr({ ...appFormErr, linkErr: 'Please enter app link' })
      return false
    }

    if (shareMessage.length === 0) {
      setAppFormErr({ ...appFormErr, shareMessageErr: 'Please enter share message' })
      return false
    }
    // if (referralMessage.length === 0) {
    //   setAppFormErr({ ...appFormErr, referralMessageErr: 'Please enter referral message' })
    //   return false
    // }
    if (afterLoginMessage.length === 0) {
      setAppFormErr({ ...appFormErr, afterLoginMessageErr: 'Please enter after login message' })
      return false
    }
    return true
  }

  const handleAppLinkSubmit = () => {
    if (appFormValidation()) {
      let { link, referralMessage, shareMessage, afterLoginMessage } = appForm
      let params = { link, referralMessage, shareMessage, afterLoginMessage }
      createAppLink(params)
        .then(data => {
          if (data.success) {
            console.log('data', data)
            getGlobalSettingsApi()
          } else {
            console.error('error')
          }
        })
        .catch(error => {
          console.log('error', error)
        })
    }
  }

  const handleUpiIdSubmit = () => {
    let { googleUpi, phonePayUpi, otherUpi } = upiForm

    let params = {
      googleUpi,
      phonePayUpi,
      otherUpi
    }
    addUpiId(params)
      .then(data => {
        if (data.success) {
          getGlobalSettingsApi()
          console.log('data', data)
        } else {
          console.log('error')
        }
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const handleAddValueSubmit = () => {
    let {
      globalBatting,
      maxBidAmount,
      maxDeposite,
      maxTransfer,
      maxWithdrawal,
      minBidAmount,
      minDeposite,
      minTransfer,
      minWithdrawal,
      referralPoint,
      welcomeBounce,
      withdrawalCloseTime,
      withdrawalOpenTime,
      withdrawalStatus
    } = valueForm

    let params = {
      globalBatting,
      maxBidAmount,
      maxDeposit: maxDeposite,
      maxTransfer,
      maxWithdrawal,
      minBidAmount,
      minDeposit: minDeposite,
      minTransfer,
      minWithdrawal,
      referralPoint,
      welcomeBounce,
      withdrawCloseTime: dayjs(withdrawalCloseTime).format('hh:mm A'),
      withdrawOpenTime: dayjs(withdrawalOpenTime).format('hh:mm A'),
      withdrawStatus: withdrawalStatus
    }
    console.log('params', params)

    console.log('withdrawalOpenTime', valueForm.withdrawalOpenTime)
    console.log('withdrawalCloseTime', withdrawalCloseTime)

    addAmountValue(params)
      .then(data => {
        if (data.success) {
          console.log('data', data)
          getGlobalSettingsApi()
        } else {
          console.error('error')
        }
      })
      .catch(error => {
        console.error('error', error)
      })
  }

  const getGlobalSettingsApi = () => {
    getGlobalSettings()
      .then(data => {
        if (data.success) {
          setUpiForm({
            googleUpi: data.data.upiId.googleUpi,
            phonePayUpi: data.data.upiId.phonePayUpi,
            otherUpi: data.data.upiId.otherUpi
          })
          setAppForm({
            link: data.data.link,
            afterLoginMessage: data.data.appLink.afterLoginMessage,
            shareMessage: data.data.appLink.shareMessage,
            referralMessage: data.data.appLink.referralMessage
          })

          setAppForm({
            link: data.data.appLink.link,
            afterLoginMessage: data.data.appLink.afterLoginMessage,
            shareMessage: data.data.appLink.shareMessage,
            referralMessage: data.data.appLink.referralMessage
          })
          setValueForm({
            globalBatting: data.data.amountValue.globalBatting,
            maxBidAmount: data.data.amountValue.maxBidAmount,
            maxDeposite: data.data.amountValue.maxDeposit,
            maxTransfer: data.data.amountValue.maxTransfer,
            maxWithdrawal: data.data.amountValue.maxWithdrawal,
            minBidAmount: data.data.amountValue.minBidAmount,
            minDeposite: data.data.amountValue.minDeposit,
            minTransfer: data.data.amountValue.minTransfer,
            minWithdrawal: data.data.amountValue.minWithdrawal,
            referralPoint: data.data.amountValue.referralPoint,
            welcomeBounce: data.data.amountValue.welcomeBounce,
            // withdrawalCloseTime: dayjs(data.data.amountValue.withdrawCloseTime, 'h:mm A').format('HH:mm'),
            // withdrawalOpenTime: dayjs(data.data.amountValue.withdrawOpenTime, 'h:mm A').format('HH:mm'),
            withdrawalCloseTime: dayjs(data.data.amountValue.withdrawCloseTime, 'hh:mm A'),
            withdrawalOpenTime: dayjs(data.data.amountValue.withdrawOpenTime, 'hh:mm A'),
            withdrawalStatus: data.data.amountValue.withdrawStatus
          })
        } else {
          console.error('error')
        }
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  useEffect(() => {
    // getAmountValueApi()
    getGlobalSettingsApi()
  }, [])

  return (
    <div>
      <div style={{ display: 'flex' }}>
        {/* <div style={{ width: '50%', backgroundColor: 'white', borderRadius: '5px', margin: '5px' }}>
          <div style={{ width: '99%', margin: 'auto', padding: '10px' }}>
            <Typography sx={{ marginBottom: 5 }} variant='h6'>
              Add Bank Details
            </Typography>
            <Typography sx={{ marginBottom: '5px' }}>Account Holder Name</Typography>
            <TextField
              type='text'
              defaultValue='Babu'
              style={{
                width: '95%',
                marginBottom: '20px'
              }}
            />
            <Typography sx={{ marginBottom: '5px' }}>Account Number</Typography>
            <TextField
              type='number'
              defaultValue='445577884499'
              style={{
                width: '95%',
                marginBottom: '20px'
              }}
            />
            <Typography style={{ marginBottom: '5px', opacity: '0.9' }}>IFSC Code</Typography>
            <TextField
              type='text'
              defaultValue='SBIN0007492'
              style={{
                width: '95%'
              }}
            />
            <br />
            <Button style={{ marginTop: 15 }} type='submit' variant='contained' size='large' onClick={handleBankSubmit}>
              submit
            </Button>
          </div>
        </div> */}
        <div style={{ width: '50%', backgroundColor: 'white', borderRadius: '5px', margin: '5px' }}>
          <div style={{ width: '99%', margin: 'auto', padding: '10px' }}>
            <Typography style={{ margin: '6px' }} variant='h6'>
              Add App Link
            </Typography>
            <Typography style={{ margin: '5px' }}>App Link</Typography>
            <TextField
              type='text'
              // defaultValue='https://Timebazzar.com'
              value={appForm.link}
              onChange={e => {
                setAppForm({ ...appForm, link: e.target.value })
                setAppFormErr({ ...appFormErr, linkErr: '' })
              }}
              style={{
                width: '95%',
                marginBottom: '20px'
              }}
            />

            {appFormErr.linkErr && <Typography sx={{ color: 'red' }}>{appFormErr.linkErr}</Typography>}

            <Typography style={{ marginBottom: '5px' }}>Share Message</Typography>
            <textarea
              // defaultValue='https://Timebazzar.com'
              rows={5}
              value={appForm.shareMessage}
              onChange={e => {
                setAppForm({ ...appForm, shareMessage: e.target.value })
                setAppFormErr({ ...appFormErr, shareMessageErr: '' })
              }}
              style={{
                width: '95%',
                marginBottom: '20px',
                fontSize: '16px'
              }}
            />
            {appFormErr.shareMessageErr && <Typography sx={{ color: 'red' }}>{appFormErr.shareMessageErr}</Typography>}
            <Typography style={{ marginBottom: '5px', opacity: '0.9' }}>Referral Message</Typography>
            <textarea
              rows={5}
              value={appForm.referralMessage}
              onChange={e => {
                setAppForm({ ...appForm, referralMessage: e.target.value })
                setAppFormErr({ ...appFormErr, referralMessageErr: '' })
              }}
              style={{
                width: '95%',
                marginBottom: '20px',
                fontSize: '16px'
              }}
            />
            {appFormErr.referralMessageErr && (
              <Typography sx={{ color: 'red' }}>{appFormErr.referralMessageErr}</Typography>
            )}

            <Typography style={{ marginBottom: '5px', opacity: '0.9' }}>Message after First login</Typography>
            <textarea
              rows={5}
              value={appForm.afterLoginMessage}
              onChange={e => {
                setAppForm({ ...appForm, afterLoginMessage: e.target.value })
                setAppFormErr({ ...appFormErr, afterLoginMessageErr: '' })
              }}
              style={{
                width: '95%',
                marginBottom: '20px',
                fontSize: '16px'
              }}
            />
            {appFormErr.afterLoginMessageErr && (
              <Typography sx={{ color: 'red' }}>{appFormErr.afterLoginMessageErr}</Typography>
            )}
            <br />
            <Button
              style={{ marginTop: 15, marginBottom: 10 }}
              type='submit'
              variant='contained'
              size='large'
              onClick={handleAppLinkSubmit}
            >
              submit
            </Button>
          </div>
        </div>
        <div style={{ width: '50%', backgroundColor: 'white', borderRadius: '5px', margin: '5px' }}>
          <div style={{ width: '99%', margin: 'auto', padding: '10px' }}>
            <Typography style={{ margin: '6px' }} variant='h6'>
              Add UPI ID
            </Typography>
            <Typography style={{ margin: '5px' }}>Google UPI Payment Id</Typography>
            <TextField
              type='text'
              defaultValue='merchant723369.augp@aubank'
              style={{
                width: '95%',
                marginBottom: '20px'
              }}
              value={upiForm.googleUpi}
              onChange={e => {
                setUpiForm({ ...upiForm, googleUpi: e.target.value })
              }}
            />
            <Typography style={{ marginBottom: '5px' }}>Phone Pe UPI Payment Id</Typography>
            <TextField
              type='text'
              defaultValue='merchant723369.augp@aubank'
              style={{
                width: '95%',
                marginBottom: '20px'
              }}
              value={upiForm.phonePayUpi}
              onChange={e => {
                setUpiForm({ ...upiForm, phonePayUpi: e.target.value })
              }}
            />
            <Typography style={{ marginBottom: '5px', opacity: '0.9' }}>Other UPI Payment Id</Typography>
            <TextField
              type='text'
              defaultValue='merchant723369.augp@aubank'
              style={{
                width: '95%',
                marginBottom: '20px'
              }}
              value={upiForm.otherUpi}
              onChange={e => {
                setUpiForm({ ...upiForm, otherUpi: e.target.value })
              }}
            />
            <br />
            <Button
              style={{ marginTop: 15, marginBottom: 10 }}
              type='submit'
              variant='contained'
              size='large'
              onClick={handleUpiIdSubmit}
            >
              submit
            </Button>
          </div>
        </div>
      </div>

      <div>
        <div style={{ backgroundColor: 'white', padding: '15px 15px 30px 15px', margin: '5px', borderRadius: '5px' }}>
          <div>
            <Typography style={{ marginBottom: '5px' }} variant='h6'>
              Add Value's
            </Typography>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '33%' }}>
                <Typography style={{ marginBottom: '5px', marginTop: '5px' }}>Minimum Deposite</Typography>
                <TextField
                  InputProps={{ inputProps: { min: 0 } }}
                  type='number'
                  defaultValue='300'
                  style={{
                    width: '95%',
                    marginBottom: '15px'
                  }}
                  value={valueForm.minDeposite}
                  onChange={e => {
                    setValueForm({ ...valueForm, minDeposite: e.target.value })
                  }}
                />
              </div>

              <div style={{ width: '33%' }}>
                <Typography style={{ marginBottom: '5px', marginTop: '5px' }}>Maximum Deposite</Typography>
                <TextField
                  InputProps={{ inputProps: { min: 0 } }}
                  type='number'
                  defaultValue='100000'
                  style={{
                    width: '95%',
                    marginBottom: '15px'
                  }}
                  value={valueForm.maxDeposite}
                  onChange={e => {
                    setValueForm({ ...valueForm, maxDeposite: e.target.value })
                  }}
                />
              </div>
              <div style={{ width: '33%' }}>
                <Typography style={{ marginBottom: '5px', marginTop: '5px' }}>Minimum Withdrawal</Typography>
                <TextField
                  InputProps={{ inputProps: { min: 0 } }}
                  type='number'
                  defaultValue='300'
                  style={{
                    width: '95%',
                    marginBottom: '15px'
                  }}
                  value={valueForm.minWithdrawal}
                  onChange={e => {
                    setValueForm({ ...valueForm, minWithdrawal: e.target.value })
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '33%' }}>
                <Typography>Maximum Withdrawal</Typography>
                <TextField
                  InputProps={{ inputProps: { min: 0 } }}
                  type='number'
                  defaultValue='100000'
                  style={{
                    width: '95%',
                    marginTop: '15px'
                  }}
                  value={valueForm.maxWithdrawal}
                  onChange={e => {
                    setValueForm({ ...valueForm, maxWithdrawal: e.target.value })
                  }}
                />
              </div>
              <div style={{ width: '33%' }}>
                <Typography>Minimum Transfer</Typography>
                <TextField
                  InputProps={{ inputProps: { min: 0 } }}
                  type='number'
                  defaultValue='10'
                  style={{
                    width: '95%',
                    marginTop: '15px'
                  }}
                  value={valueForm.minTransfer}
                  onChange={e => {
                    setValueForm({ ...valueForm, minTransfer: e.target.value })
                  }}
                />
              </div>
              <div style={{ width: '33%' }}>
                <Typography>Maximum Transfer</Typography>
                <TextField
                  InputProps={{ inputProps: { min: 0 } }}
                  type='number'
                  defaultValue='10000'
                  style={{
                    width: '95%',
                    marginTop: '15px'
                  }}
                  value={valueForm.maxTransfer}
                  onChange={e => {
                    setValueForm({ ...valueForm, maxTransfer: e.target.value })
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '33%' }}>
                <Typography style={{ marginTop: '15px' }}>Minimum Bid Amount</Typography>
                <TextField
                  InputProps={{ inputProps: { min: 0 } }}
                  type='number'
                  defaultValue='10'
                  style={{
                    width: '95%',
                    marginTop: '15px'
                  }}
                  value={valueForm.minBidAmount}
                  onChange={e => {
                    setValueForm({ ...valueForm, minBidAmount: e.target.value })
                  }}
                />
              </div>
              <div style={{ width: '33%' }}>
                <Typography style={{ marginTop: '15px' }}>Maximum Bid Amount</Typography>
                <TextField
                  InputProps={{ inputProps: { min: 0 } }}
                  type='number'
                  defaultValue='25000'
                  style={{
                    width: '95%',
                    marginTop: '15px'
                  }}
                  value={valueForm.maxBidAmount}
                  onChange={e => {
                    setValueForm({ ...valueForm, maxBidAmount: e.target.value })
                  }}
                />
              </div>
              <div style={{ width: '33%' }}>
                <Typography style={{ marginTop: '15px' }}>Welcome Bonus</Typography>
                <TextField
                  InputProps={{ inputProps: { min: 0 } }}
                  type='number'
                  defaultValue='5'
                  style={{
                    width: '95%',
                    marginTop: '15px'
                  }}
                  value={valueForm.welcomeBounce}
                  onChange={e => {
                    setValueForm({ ...valueForm, welcomeBounce: e.target.value })
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '33%' }}>
                <Typography style={{ marginTop: '15px' }}>Referral Points</Typography>
                <TextField
                  InputProps={{ inputProps: { min: 0 } }}
                  type='number'
                  defaultValue='50'
                  style={{
                    width: '95%',
                    marginTop: '15px'
                  }}
                  value={valueForm.referralPoint}
                  onChange={e => {
                    setValueForm({ ...valueForm, referralPoint: e.target.value })
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '33%' }}>
                <Typography style={{ marginTop: '15px' }}>Withdraw Open Time</Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box components={['TimePicker']}>
                    <TimePicker
                      value={valueForm.withdrawalOpenTime}
                      // value={todayOpenTime}
                      onChange={newValue => setValueForm({ ...valueForm, withdrawalOpenTime: newValue })}
                    />
                  </Box>
                </LocalizationProvider>

                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      value={valueForm.withdrawalOpenTime}
                      // value={todayOpenTime}
                      onChange={newValue =>
                        setValueForm({ ...valueForm, withdrawalOpenTime: dayjs(newValue).format('h:mm A') })
                      }
                    />
                  </DemoContainer>
                </LocalizationProvider> */}
              </div>
              <div style={{ width: '33%' }}>
                <Typography style={{ marginTop: '15px' }}>Withdraw Close Time</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box components={['TimePicker']}>
                    <TimePicker
                      // value={valueForm.withdrawalCloseTime}
                      value={valueForm.withdrawalCloseTime}
                      onChange={newValue => setValueForm({ ...valueForm, withdrawalCloseTime: newValue })}
                    />
                  </Box>
                </LocalizationProvider>
              </div>
              <div style={{ width: '33%', display: 'flex', alignItems: 'center', paddingTop: '40px' }}>
                <Switch
                  checked={valueForm.globalBatting}
                  value={valueForm.globalBatting}
                  onChange={() => {
                    setValueForm({ ...valueForm, globalBatting: !valueForm.globalBatting })
                  }}
                />
                <Typography>Global Batting</Typography>

                <Switch
                  checked={valueForm.withdrawalStatus}
                  value={valueForm.withdrawalStatus}
                  onChange={() => {
                    setValueForm({ ...valueForm, withdrawalStatus: !valueForm.withdrawalStatus })
                  }}
                />
                <Typography>Withdraw Status</Typography>
              </div>
            </div>
            <Button
              style={{ marginTop: 15, marginBottom: 10 }}
              type='submit'
              variant='contained'
              size='large'
              onClick={handleAddValueSubmit}
            >
              submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainSetting
