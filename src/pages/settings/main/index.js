import { Button, Switch, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import dayjs from 'dayjs'

function HowToPlay() {
  const [todayOpenTime, setTodayOpenTime] = useState(dayjs(Date.now()))
  const [todayCloseTime, setTodayCloseTime] = useState(dayjs(Date.now()))
  const [appForm, setAppForm] = useState({
    link: '',
    shareMessage: '',
    referralMessage: '',
    afterLoginMessage: ''
  })

  console.log('appForm', appForm)

  const handleBankSubmit = () => {}

  const handleAppLinkSubmit = () => {}
  const handleUpiIdSubmit = () => {}
  const handleAddValueSubmit = () => {}

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
              defaultValue='https://Timebazzar.com'
              value={appForm.link}
              onChange={e => {
                setAppForm({ ...appForm, link: e.target.value })
              }}
              style={{
                width: '95%',
                marginBottom: '20px'
              }}
            />
            <Typography style={{ marginBottom: '5px' }}>Share Message</Typography>
            <textarea
              defaultValue='https://Timebazzar.com'
              rows={5}
              value={appForm.shareMessage}
              onChange={e => {
                setAppForm({ ...appForm, shareMessage: e.target.value })
              }}
              style={{
                width: '95%',
                marginBottom: '20px'
              }}
            />
            <Typography style={{ marginBottom: '5px', opacity: '0.9' }}>Referral Message</Typography>
            <textarea
              rows={5}
              value={appForm.referralMessage}
              onChange={e => {
                setAppForm({ ...appForm, referralMessage: e.target.value })
              }}
              style={{
                width: '95%',
                marginBottom: '20px'
              }}
            />
            {/* <Typography style={{ marginBottom: '5px', opacity: '0.9' }}>Message After First Login</Typography>
            <textarea
              defaultValue='WELCOME  TOME BAZAR OFFICIAL APP
            THIS APP IS MATKA GAME PLAY APP
            FAST  RESULT AND 
            FIRST SERVICE AND FAST WITHDRAWAL
            
            फ्रॉड मटका वालों से सावधान
            Plzz alerts frod matka app
            
            
            SERVICE 24×7 AVAILABLE 
             
            Best Of Luck !
            
            🙏🙏🙏🙏🙏🙏🙏🙏'
              rows={5}
              value={appForm.afterLoginMessage}
              onChange={e => {
                setAppForm({ ...appForm, afterLoginMessage: e.target.value })
              }}
              style={{
                width: '95%',
                padding: '8px 15px',
                borderRadius: '15px',
                outline: 'none',
                border: '1px solid lightGray',
                margin: '5px',
                opacity: '0.7'
              }}
            /> */}
            <Typography style={{ marginBottom: '5px', opacity: '0.9' }}>Referral Message</Typography>
            <textarea
              defaultValue='WELCOME  TOME BAZAR OFFICIAL APP
            THIS APP IS MATKA GAME PLAY APP
            FAST  RESULT AND 
            FIRST SERVICE AND FAST WITHDRAWAL
            
            फ्रॉड मटका वालों से सावधान
            Plzz alerts frod matka app
            
            
            SERVICE 24×7 AVAILABLE 
             
            Best Of Luck !
            
            🙏🙏🙏🙏🙏🙏🙏🙏'
              rows={5}
              value={appForm.afterLoginMessage}
              onChange={e => {
                setAppForm({ ...appForm, afterLoginMessage: e.target.value })
              }}
              style={{
                width: '95%',
                marginBottom: '20px'
              }}
            />
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
            />
            <Typography style={{ marginBottom: '5px' }}>Phone Pe UPI Payment Id</Typography>
            <TextField
              type='text'
              defaultValue='merchant723369.augp@aubank'
              style={{
                width: '95%',
                marginBottom: '20px'
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
                  type='number'
                  defaultValue='300'
                  style={{
                    width: '95%',
                    marginBottom: '15px'
                  }}
                />
              </div>
              <div style={{ width: '33%' }}>
                <Typography style={{ marginBottom: '5px', marginTop: '5px' }}>Maximum Deposite</Typography>
                <TextField
                  type='number'
                  defaultValue='100000'
                  style={{
                    width: '95%',
                    marginBottom: '15px'
                  }}
                />
              </div>
              <div style={{ width: '33%' }}>
                <Typography style={{ marginBottom: '5px', marginTop: '5px' }}>Minimum Withdrawal</Typography>
                <TextField
                  type='number'
                  defaultValue='300'
                  style={{
                    width: '95%',
                    marginBottom: '15px'
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '33%' }}>
                <Typography>Maximum Withdrawal</Typography>
                <TextField
                  type='number'
                  defaultValue='100000'
                  style={{
                    width: '95%',
                    marginTop: '15px'
                  }}
                />
              </div>
              <div style={{ width: '33%' }}>
                <Typography>Minimum Transfer</Typography>
                <TextField
                  type='number'
                  defaultValue='10'
                  style={{
                    width: '95%',
                    marginTop: '15px'
                  }}
                />
              </div>
              <div style={{ width: '33%' }}>
                <Typography>Maximum Transfer</Typography>
                <TextField
                  type='number'
                  defaultValue='10000'
                  style={{
                    width: '95%',
                    marginTop: '15px'
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '33%' }}>
                <Typography style={{ marginTop: '15px' }}>Minimum Bid Amount</Typography>
                <TextField
                  type='number'
                  defaultValue='10'
                  style={{
                    width: '95%',
                    marginTop: '15px'
                  }}
                />
              </div>
              <div style={{ width: '33%' }}>
                <Typography style={{ marginTop: '15px' }}>Maximum Bid Amount</Typography>
                <TextField
                  type='number'
                  defaultValue='25000'
                  style={{
                    width: '95%',
                    marginTop: '15px'
                  }}
                />
              </div>
              <div style={{ width: '33%' }}>
                <Typography style={{ marginTop: '15px' }}>Welcome Bonus</Typography>
                <TextField
                  type='number'
                  defaultValue='5'
                  style={{
                    width: '95%',
                    marginTop: '15px'
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '33%' }}>
                <Typography style={{ marginTop: '15px' }}>Referral Points</Typography>
                <TextField
                  type='number'
                  defaultValue='50'
                  style={{
                    width: '95%',
                    marginTop: '15px'
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '33%' }}>
                <Typography style={{ marginTop: '15px' }}>Withdraw Open Time</Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      value={todayOpenTime}
                      onChange={newValue => setTodayOpenTime(dayjs(newValue).format('h:mm A'))}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div style={{ width: '33%' }}>
                <Typography style={{ marginTop: '15px' }}>Withdraw Close Time</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['TimePicker']}>
                    <TimePicker
                      value={todayCloseTime}
                      onChange={newValue => setTodayCloseTime(dayjs(newValue).format('h:mm A'))}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div style={{ width: '33%', display: 'flex', alignItems: 'center', paddingTop: '40px' }}>
                <Switch defaultChecked />
                <Typography>Global Batting</Typography>

                <Switch defaultChecked />
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

export default HowToPlay
