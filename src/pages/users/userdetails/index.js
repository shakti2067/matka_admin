import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Button,
  CardContent,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material'
import { Card } from '@mui/material'
import AntSwitch from 'src/components/AntSwitchToggle'
import InputBox from 'src/components/InputBox'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useRouter } from 'next/router'
import { getPaymentInfo, getUserById, userGameHistory, userWalletHistory } from 'src/helpers'
import moment from 'moment'

const columnAddFund = [
  {
    id: 'name',
    label: '#',
    minWidth: 170
  },
  {
    id: 'requestAmount',
    label: 'Request Amount',
    minWidth: 100
  },
  {
    id: 'requestNo',
    label: 'Request No.',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'receiptImage',
    label: 'Receipt Image',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'right'
  }
]
function createAddFundData(name, requestAmount, requestNo, receiptImage, date, status, action) {
  return {
    name,
    requestAmount,
    requestNo,
    receiptImage,
    date,
    status,
    action
  }
}
const rowAddFund = [createAddFundData('India', 'IN', 1324171354, 3287263, 3287263, 3287263, 3287263)]

const columnWithdrawFund = [
  {
    id: 'name',
    label: '#',
    minWidth: 170
  },
  {
    id: 'requestAmount',
    label: 'Request Amount',
    minWidth: 100
  },
  {
    id: 'requestNo',
    label: 'Request No.',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'receiptImage',
    label: 'Receipt Image',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'right'
  }
]
function createBidData(name, requestAmount, requestNo, receiptImage, status, action) {
  return {
    name,
    requestAmount,
    requestNo,
    receiptImage,
    status,
    action
  }
}
const rowWithdrawFund = [createBidData('India', 'IN', 1324171354, 3287263, 3287263, 3287263)]

const columnBid = [
  {
    id: 'name',
    label: '#',
    minWidth: 170
  },
  {
    id: 'gameName',
    label: 'Game Name',
    minWidth: 100
  },
  {
    id: 'gameType',
    label: 'Game Type',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'session',
    label: 'Session',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'openPana',
    label: 'Open Paana',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'openDigit',
    label: 'Open Digit',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'closePana',
    label: 'Close Paana',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'closeDigit',
    label: 'Close Digit',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'points',
    label: 'Points',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'date',
    label: 'Date',
    // minWidth: 170,
    align: 'right'
  }
]
function createWithdrawFundData2(
  name,
  gameName,
  gameType,
  session,
  openPaana,
  openDigit,
  closePaana,
  closeDigit,
  points
) {
  return {
    name,
    gameName,
    gameType,
    session,
    openPaana,
    openDigit,
    closePaana,
    closeDigit,
    points
  }
}
const rowBid = [createWithdrawFundData2('India', 'IN', 1324171354, 3287263, 3287263, 3287263, 'data', 'data2', 'data3')]

const columnWalletSliderFirst = [
  {
    id: 'name',
    label: '#',
    minWidth: 170
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 100
  },
  {
    id: 'transactionNote',
    label: 'Transaction Note',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'transferNote',
    label: 'Transfer Note',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 200,
    align: 'right'
  },
  {
    id: 'txReqNo',
    label: 'Tx Req. No.',
    minWidth: 170,
    align: 'right'
  }
]
function createWalletSliderFirstData(name, amount, transactionNote, transferNote, date, txReqNo) {
  return {
    name,
    amount,
    transactionNote,
    transferNote,
    date,
    txReqNo
  }
}
const rowWalletSliderFirst = [createWalletSliderFirstData('India', 'IN', 1324171354, 3287263, 3287263, 3287263)]

const columnWalletSliderSecond = [
  {
    id: 'name',
    label: '#',
    minWidth: 170
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 100
  },
  {
    id: 'transactionNote',
    label: 'Transaction Note',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'transferNote',
    label: 'Transfer Note',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'txReqNo',
    label: 'Tx Req. No.',
    minWidth: 170,
    align: 'right'
  }
]
function createWalletSliderSecondData(name, amount, transactionNote, transferNote, date, txReqNo) {
  return {
    name,
    amount,
    transactionNote,
    transferNote,
    date,
    txReqNo
  }
}
const rowWalletSliderSecond = [createWalletSliderSecondData('India', 'IN', 1324171354, 3287263, 3287263, 3287263)]

const columnWalletSliderThird = [
  {
    id: 'name',
    label: '#',
    minWidth: 170
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 100
  },
  {
    id: 'transactionNote',
    label: 'Transaction Note',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'transferNote',
    label: 'Transfer Note',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'txReqNo',
    label: 'Tx Req. No.',
    minWidth: 170,
    align: 'right'
  }
]
function createWalletSliderThirdData(name, amount, transactionNote, transferNote, date, txReqNo) {
  return {
    name,
    amount,
    transactionNote,
    transferNote,
    date,
    txReqNo
  }
}
const rowWalletSliderThird = [createWalletSliderThirdData('India', 'IN', 1324171354, 3287263, 3287263, 3287263)]

const winningHistory = [
  {
    id: 'name',
    label: 'Amount(₹)',
    minWidth: 170
  },
  {
    id: 'gameName',
    label: 'Game Name',
    minWidth: 100
  },
  {
    id: 'txId',
    label: 'Tx Id',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'txDate',
    label: 'Tx Date',
    minWidth: 170,
    align: 'right'
  }
]
function createWinningHistory(name, gameName, txId, txDate) {
  return {
    name,
    gameName,
    txId,
    txDate
  }
}
const rowwinningHistory = [createWinningHistory('1000', 'Dream Kalyan Mantra', 1324171354, '26/02/2024')]

function UserDetails() {
  const [addFundPage, setAddFundPage] = useState(0)
  const [withdrawFundPage, setwithdrawFundPage] = useState(0)
  const [bidPage, setBidPage] = useState(0)
  const [value, setValue] = useState('1')
  const [walletsliderFirstPage, setWalletsliderFirstPage] = useState(0)
  const [walletsliderSecondPage, setWalletsliderSecondPage] = useState(0)
  const [walletsliderThirdPage, setWalletsliderThirdPage] = useState(0)
  const [winningHistoryPage, setWinningHistoryPage] = useState(0)

  const [rowsaddFundPage, setrowsaddFundPage] = useState(10)
  const [rowsWithdrawFundPage, setRowsWithdrawFundPage] = useState(10)
  const [rowsBidPage, setRowsBidPage] = useState(10)
  const [rowWalletSliderFirstPage, setrowWalletSliderFirstPage] = useState(10)
  const [rowWalletSliderSecondPage, setrowWalletSliderSecondPage] = useState(10)
  const [rowWalletSliderThirdPage, setrowWalletSliderThirdPage] = useState(10)
  const [rowWinningHistoryPage, setroWinningHistoryPage] = useState(10)
  const [userDetails, setUserDetails] = useState([])
  const [isPopupOpen, setPopupOpen] = useState(false)
  let [paymentInfo, setPaymentInfo] = useState([])
  let [walletHistory, setWallerHistory] = useState([])
  let [gameHistory, setGameHistory] = useState([])
  let [gameHistoryTotalDoc, setGameHistoryTotalDoc] = useState(10)
  let [walletHistoryTotalDoc, setWalletHistoryTotalDoc] = useState(10)

  console.log('gameHistory', gameHistory)

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen)
  }

  const [isPopupOpenAddFund, setPopupOpenAddFund] = useState(false)
  const togglePopupAddFund = () => {
    setPopupOpenAddFund(!isPopupOpenAddFund)
  }

  const [isPopupOpenWithdrow, setPopupOpenWithdrow] = useState(false)
  const togglePopupWithdrow = () => {
    setPopupOpenWithdrow(!isPopupOpenWithdrow)
  }

  const router = useRouter()

  const userId = router.query.userId ? router.query.userId : null

  const getUserApi = () => {
    getUserById(userId)
      .then(data => {
        if (data.success) {
          console.log('data', data)
          setUserDetails(data.data)
        } else {
          console.log('error')
        }
      })
      .catch(e => {
        console.log('error', error)
      })
  }

  const getPaymentInfoApi = () => {
    getPaymentInfo(userId)
      .then(data => {
        if (data.success) {
          console.log('data', data)
          setPaymentInfo(data.data)
        } else {
          console.log('error')
        }
      })
      .catch(e => {
        console.log('error', error)
      })
  }

  const userWalletHistoryApi = () => {
    userWalletHistory(userId)
      .then(data => {
        if (data.success) {
          setWallerHistory(data.data)
          setWalletHistoryTotalDoc(data.totalDocument)
        } else {
          console.log('error')
        }
      })
      .catch(e => {
        console.log('error', error)
      })
  }

  const userGameHistoryApi = () => {
    userGameHistory(userId)
      .then(data => {
        if (data.success) {
          setGameHistory(data.data)
          setGameHistoryTotalDoc(data.totalDocument)
        } else {
          console.log('error')
        }
      })
      .catch(e => {
        console.log('error', error)
      })
  }

  const rowPersonalInfo = [
    {
      id: 'Full Name :',
      userId: userDetails.name,
      data: 'Email :',
      userData: ''
    },
    {
      id: 'Mobile :',
      userId: userDetails.mobile,
      data: 'Password :',
      userData: userDetails.password
    },
    {
      id: 'District Name :',
      userId: 'N/A',
      data: 'Flat/Plot No. :',
      userData: 'N/A'
    },
    {
      id: 'Address Lane 1 :',
      userId: 'N/A',
      data: 'Address Lane 2 :',
      userData: 'N/A'
    },
    {
      id: 'Area :',
      userId: 'N/A',
      data: 'Pin Code :',
      userData: 'N/A'
    },
    {
      id: 'State Name :',
      userId: 'N/A',
      data: '',
      userData: ''
    },
    {
      id: 'Creation Date :',
      userId: moment(userDetails.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      data: 'Last Seen :',
      userData: moment(userDetails.updatedAt).format('YYYY-MM-DD HH:mm:ss')
    }
  ]

  useEffect(() => {
    getUserApi()
  }, [userId])

  useEffect(() => {
    getPaymentInfoApi()
    userWalletHistoryApi()
    userGameHistoryApi()
  }, [])
  const today = new Date().toISOString().split('T')[0]

  const [selectedDate, setSelectedDate] = useState(today)

  const handleDateChange = e => {
    setSelectedDate(e.target.value)
  }

  const handleChangeAddFundPage = (event, newPage) => {
    setAddFundPage(newPage)
  }
  const handleChangeAddFundRowsPerPage = event => {
    setrowsaddFundPage(+event.target.value)
    setAddFundPage(0)
  }

  const handleChangewithdrawFundPerPage = (event, newPage) => {
    setwithdrawFundPage(newPage)
  }
  const handleChangeRowswithdrawFundPerPage = event => {
    setRowsWithdrawFundPage(+event.target.value)
    setwithdrawFundPage(0)
  }

  const handleChangeBidPerPage = (event, newPage) => {
    setBidPage(newPage)
  }
  const handleChangeRowsBidPerPage = event => {
    setRowsBidPage(+event.target.value)
    setBidPage(0)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangewalletsliderFirstPage = (event, newPage) => {
    setWalletsliderFirstPage(newPage)
  }
  const handleChangeRowsWalletsliderFirstPage = event => {
    setrowWalletSliderFirstPage(+event.target.value)
    setWalletsliderFirstPage(0)
  }

  const handleChangewalletsliderSecondPage = (event, newPage) => {
    setWalletsliderSecondPage(newPage)
  }
  const handleChangeRowsWalletsliderSecondPage = event => {
    setrowWalletSliderSecondPage(+event.target.value)
    setWalletsliderSecondPage(0)
  }

  const handleChangewalletsliderThirdPage = (event, newPage) => {
    setWalletsliderThirdPage(newPage)
  }
  const handleChangeRowsWalletsliderThirdPage = event => {
    setrowWalletSliderThirdPage(+event.target.value)
    setWalletsliderThirdPage(0)
  }

  const collumnPayment = [
    {
      id: 'Bank Name :',
      userId: 'N/A',
      data: 'Branch Address :',
      userData: 'N/A',
      newData: '',
      newUserData: 'N/A'
    },
    {
      id: 'A/c Holder Name :',
      userId: 'N/A',
      data: 'A/c Number :',
      userData: 'N/A',
      newData: 'IFSC Code :',
      newUserData: 'N/A'
    },
    {
      id: 'PhonePe No. :',
      userId: 'N/A',
      data: 'Google Pay No. :',
      userData: 'N/A',
      newData: 'Paytm No. :',
      newUserData: 'N/A'
    }
  ]

  return (
    <div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h4>USER DETAILS</h4>
          <div style={{ display: 'flex' }}>
            <h5>User Management &nbsp; / &nbsp; User Details</h5>
            {/* <h5>User Details</h5> */}
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '35%' }}>
            <Card sx={{ position: 'relative' }}>
              <div
                style={{
                  backgroundImage: 'linear-gradient(98deg,rgb(85 98 253), rgb(254 220 167)  94%)',
                  height: '14rem',
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h4 style={{ margin: '0' }}>{userDetails.name}</h4>
                  <h6 style={{ marginTop: '5px', display: 'flex', alignItems: 'center', fontSize: '13px' }}>
                    {userDetails.mobile}
                  </h6>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                    <h5 style={{ margin: '0', marginRight: '5px' }}>Active:</h5>
                    {/* <AntSwitch /> */}
                    <Switch value={userDetails._id} checked={userDetails.isActive} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                    <h5 style={{ margin: '0', marginRight: '5px' }}>Batting:</h5>
                    <Switch value={userDetails._id} checked={userDetails.isBetting} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                    <h5 style={{ margin: '0', marginRight: '5px' }}>TP:</h5>
                    <Switch value={userDetails._id} checked={userDetails.isTransfer} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                    <h5 style={{ margin: '0', marginRight: '5px' }}>Logout Status:</h5>
                    {/* <Button style={{ backgroundColor: '#f46a6a', color: 'white', padding: '5px', fontSize: '10px' }}>
                      Logout Now
                    </Button> */}
                    <Switch value={userDetails._id} checked={userDetails.isActive} />
                    {userDetails.isActive ? 'Login' : 'Logout'}
                  </div>
                </div>
              </div>
              <Avatar
                alt='Robert Meyer'
                src='/images/avatars/1.png'
                sx={{
                  width: 75,
                  height: 75,
                  left: '1.313rem',
                  top: '11rem',
                  position: 'absolute',
                  border: theme => `0.25rem solid ${theme.palette.common.white}`
                }}
              />
              <CardContent>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    marginLeft: '20px',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <h5 style={{ margin: '5px' }}>Security Pin</h5>
                    <h5 style={{ margin: '5px' }}>{userDetails.pin}</h5>
                  </div>
                  <div>
                    <Button
                      onClick={togglePopup}
                      style={{ backgroundColor: '#9155FD', color: 'white', fontSize: '13px' }}
                    >
                      Change
                    </Button>
                    {isPopupOpen && (
                      <div>
                        <div
                          className='overlay'
                          onClick={togglePopup}
                          style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 9998 // Ensure the overlay is below the popup but above the rest of the content
                          }}
                        />
                        <div
                          style={{
                            borderRadius: '5px',
                            width: '35%',
                            position: 'fixed',
                            top: '20%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#F7F7F7',
                            padding: '20px',
                            zIndex: 9999 // Ensure the popup is above the overlay
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant='h6'>Change Pin</Typography>
                            <div onClick={togglePopup} style={{ cursor: 'pointer' }}>
                              &#10006;
                            </div>
                          </div>
                          <Typography style={{ margin: '10px 0 5px 0' }}>Enter New Pin</Typography>
                          <TextField
                            type='number'
                            style={{
                              width: '95%',
                              marginBottom: '20px'
                            }}
                          />
                          <Button style={{ backgroundColor: '#9155FD', color: 'white', fontSize: '13px' }}>
                            Submit
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <Button style={{ backgroundColor: '#D31FA4', color: 'white', fontSize: '13px' }}>
                      Change password
                    </Button>
                  </div>
                </div>
                <hr style={{ border: '1px solid #F2F1F1 ' }} />
                <div>
                  <div style={{ margin: '10px 0 5px 0' }}>
                    <h5 style={{ margin: '5px' }}>Available Balance</h5>
                    <h4 style={{ margin: '5px' }}>{userDetails.balance}</h4>
                  </div>
                  <div style={{ paddingTop: '1rem', display: 'flex', gap: '20px' }}>
                    <Button
                      onClick={togglePopupAddFund}
                      style={{ backgroundColor: '#34c38f', color: 'white', fontSize: '13px' }}
                    >
                      Add Fund
                    </Button>
                    {isPopupOpenAddFund && (
                      <div>
                        <div
                          className='overlay'
                          onClick={togglePopupAddFund}
                          style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 9998 // Ensure the overlay is below the popup but above the rest of the content
                          }}
                        />
                        <div
                          style={{
                            borderRadius: '5px',
                            width: '35%',
                            position: 'fixed',
                            top: '20%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#F7F7F7',
                            padding: '20px',
                            zIndex: 9999 // Ensure the popup is above the overlay
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant='h6'>Add Fund</Typography>
                            <div onClick={togglePopupAddFund} style={{ cursor: 'pointer' }}>
                              &#10006;
                            </div>
                          </div>
                          <Typography style={{ margin: '10px 0 5px 0' }}>Amount</Typography>
                          <TextField
                            type='number'
                            style={{
                              width: '95%',
                              marginBottom: '20px'
                            }}
                          />
                          <Button style={{ backgroundColor: '#9155FD', color: 'white', fontSize: '13px' }}>
                            Submit
                          </Button>
                        </div>
                      </div>
                    )}
                    <Button
                      onClick={togglePopupWithdrow}
                      style={{ backgroundColor: '#f46a6a', color: 'white', fontSize: '13px' }}
                    >
                      Withdrow Fund
                    </Button>
                    {isPopupOpenWithdrow && (
                      <div>
                        <div
                          className='overlay'
                          onClick={togglePopupWithdrow}
                          style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 9998 // Ensure the overlay is below the popup but above the rest of the content
                          }}
                        />
                        <div
                          style={{
                            borderRadius: '5px',
                            width: '35%',
                            position: 'fixed',
                            top: '20%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#F7F7F7',
                            padding: '20px',
                            zIndex: 9999 // Ensure the popup is above the overlay
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant='h6'>Withdrow Fund</Typography>
                            <div onClick={togglePopupWithdrow} style={{ cursor: 'pointer' }}>
                              &#10006;
                            </div>
                          </div>
                          <Typography style={{ margin: '10px 0 5px 0' }}>Amount</Typography>
                          <TextField
                            type='number'
                            style={{
                              width: '95%',
                              marginBottom: '20px'
                            }}
                          />
                          <Button style={{ backgroundColor: '#9155FD', color: 'white', fontSize: '13px' }}>
                            Submit
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card sx={{ overflow: 'hidden', marginLeft: '20px', padding: '20px', width: '70%' }}>
            <h4 style={{ margin: '0', paddingBottom: '10px' }}>Personal Information</h4>
            <hr style={{ opacity: '0.2' }} />
            <TableContainer sx={{ maxHeight: 440, marginTop: '20px' }}>
              <Table stickyHeader aria-label='sticky table'>
                <TableBody>
                  {rowPersonalInfo.map((item, index) => (
                    <tr key={index}>
                      <td style={{ fontWeight: 600, fontSize: '14px' }}>{item.id}</td>
                      <td style={{ fontSize: '14px' }}>{item.userId}</td>
                      <td style={{ fontWeight: 600, fontSize: '14px' }}>{item.data}</td>
                      <td style={{ fontSize: '14px' }}>{item.userData}</td>
                    </tr>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </div>
        <div>
          <Card sx={{ overflow: 'hidden', marginTop: '20px', padding: '20px' }}>
            <h4 style={{ margin: '0', paddingBottom: '10px' }}>Payment Information</h4>
            <hr style={{ opacity: '0.2' }} />
            <TableContainer sx={{ maxHeight: 440, marginTop: '20px' }}>
              <Table stickyHeader aria-label='sticky table'>
                <TableBody>
                  {collumnPayment.map((item, index) => (
                    <tr key={index}>
                      <td style={{ fontWeight: 600, fontSize: '14px' }}>{item.id}</td>
                      <td style={{ fontSize: '14px' }}>{item.userId}</td>
                      <td style={{ fontWeight: 600, fontSize: '14px' }}>{item.data}</td>
                      <td style={{ fontSize: '14px' }}>{item.userData}</td>
                      <td style={{ fontWeight: 600, fontSize: '14px' }}>{item.newData}</td>
                      <td style={{ fontSize: '14px' }}>{item.newUserData}</td>
                    </tr>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
          <Card sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
            <div style={{ display: 'flex', padding: '0  20px', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4>Add Fund Request List</h4>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <label>Search :</label>
                <InputBox />
              </div>
            </div>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    {columnAddFund.map(column => (
                      <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowAddFund
                    .slice(addFundPage * rowsaddFundPage, addFundPage * rowsaddFundPage + rowsaddFundPage)
                    .map(row => {
                      return (
                        <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                          {columnAddFund.map(column => {
                            const value = row[column.id]

                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                              </TableCell>
                            )
                          })}
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component='div'
              count={rowAddFund.length}
              rowsPerPage={rowsaddFundPage}
              page={addFundPage}
              onPageChange={handleChangeAddFundPage}
              onRowsPerPageChange={handleChangeAddFundRowsPerPage}
            />
          </Card>
          <Card sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
            <div style={{ display: 'flex', padding: '0  20px', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4>Withdraw Fund Request List</h4>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <label>Search :</label>
                <InputBox />
              </div>
            </div>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    {columnWithdrawFund.map(column => (
                      <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowWithdrawFund
                    .slice(
                      withdrawFundPage * rowsWithdrawFundPage,
                      withdrawFundPage * rowsWithdrawFundPage + rowsWithdrawFundPage
                    )
                    .map(row => {
                      return (
                        <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                          {columnWithdrawFund.map(column => {
                            const value = row[column.id]

                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                              </TableCell>
                            )
                          })}
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component='div'
              count={rowWithdrawFund.length}
              rowsPerPage={rowsWithdrawFundPage}
              page={withdrawFundPage}
              onPageChange={handleChangewithdrawFundPerPage}
              onRowsPerPageChange={handleChangeRowswithdrawFundPerPage}
            />
          </Card>
          <Card sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
            <div style={{ display: 'flex', padding: '0  20px', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4>Bid History</h4>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <label>Search :</label>
                <InputBox />
              </div>
            </div>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>
                    {columnBid.map(column => (
                      <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {gameHistory
                    .slice(bidPage * rowsBidPage, bidPage * rowsBidPage + rowsBidPage)
                    .map((row, rowIndex) => {
                      return (
                        <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                          {columnBid.map(column => {
                            const value = row[column.id]

                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.id === 'name' ? (
                                  <span>{rowIndex + 1}</span>
                                ) : column.id === 'gameName' ? (
                                  <span>{row.betCategoryId.name}</span>
                                ) : column.id === 'session' ? (
                                  <span>{row.state}</span>
                                ) : column.id === 'gameType' ? (
                                  <span>{row.betId.name}</span>
                                ) : column.id === 'date' ? (
                                  <span>{moment(row.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                                ) : column.id === 'points' ? (
                                  <span>{row.amount}</span>
                                ) : column.id === 'openPana' ? (
                                  <span>
                                    {row.betId.name == 'Single Pana' && row.state == 'OPEN' ? row.choiceNumber : 'N/A'}
                                  </span>
                                ) : column.id === 'closePana' ? (
                                  <span>
                                    {row.betId.name == 'Single Pana' && row.state == 'CLOSE' ? row.choiceNumber : 'N/A'}
                                  </span>
                                ) : column.id === 'openDigit' ? (
                                  <span>{row.state == 'OPEN' ? row.choiceNumber : 'N/A'}</span>
                                ) : column.id === 'closeDigit' ? (
                                  <span>{row.state == 'CLOSE' ? row.choiceNumber : 'N/A'}</span>
                                ) : column.format && typeof value === 'number' ? (
                                  column.format(value)
                                ) : (
                                  value
                                )}
                              </TableCell>
                            )
                          })}
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component='div'
              count={gameHistoryTotalDoc}
              rowsPerPage={rowsBidPage}
              page={bidPage}
              onPageChange={handleChangeBidPerPage}
              onRowsPerPageChange={handleChangeRowsBidPerPage}
            />
          </Card>
          <Card sx={{ marginTop: '20px', padding: '0' }}>
            <h4 style={{ marginLeft: '20px', marginBottom: '0px' }}>Wallet Transaction History</h4>
            <TabContext value={value}>
              <TabList centered onChange={handleChange}>
                <Tab value='1' label='All' />
                <Tab value='2' label='Credit' />
                <Tab value='3' label='Debit' />
              </TabList>
              <CardContent sx={{ textAlign: 'center', padding: '0' }}>
                <TabPanel value='1' sx={{ p: 0 }}>
                  <div sx={{ width: '100%', overflow: 'hidden' }}>
                    <div
                      style={{
                        display: 'flex',
                        padding: '20px',
                        gap: '10px',
                        justifyContent: 'end',
                        alignItems: 'center'
                      }}
                    >
                      <label>Search :</label>
                      <InputBox />
                    </div>
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader aria-label='sticky table'>
                        <TableHead>
                          <TableRow>
                            {columnWalletSliderFirst.map(column => (
                              <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {walletHistory
                            .slice(
                              walletsliderFirstPage * rowWalletSliderFirstPage,
                              walletsliderFirstPage * rowWalletSliderFirstPage + rowWalletSliderFirstPage
                            )
                            .map((row, rowIndex) => {
                              return (
                                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                                  {columnWalletSliderFirst.map(column => {
                                    const value = row[column.id]

                                    return (
                                      <TableCell key={column.id} align={column.align}>
                                        {column.id === 'name' ? (
                                          <span>{rowIndex + 1}</span>
                                        ) : column.id === 'transactionNote' ? (
                                          <span>{row.transactionName}</span>
                                        ) : column.id === 'date' ? (
                                          <span>{moment(row.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                                        ) : column.id === 'txReqNo' ? (
                                          <span>{row.transactionId}</span>
                                        ) : column.id === 'amount' ? (
                                          <span>
                                            {row.transactionType == 'DEBIT' ? `${-row.amount} ₹ ` : `${row.amount} ₹`}
                                          </span>
                                        ) : column.format && typeof value === 'number' ? (
                                          column.format(value)
                                        ) : (
                                          value
                                        )}
                                      </TableCell>
                                    )
                                  })}
                                </TableRow>
                              )
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component='div'
                      count={walletHistoryTotalDoc}
                      rowsPerPage={rowWalletSliderFirstPage}
                      page={walletsliderFirstPage}
                      onPageChange={handleChangewalletsliderFirstPage}
                      onRowsPerPageChange={handleChangeRowsWalletsliderFirstPage}
                    />
                  </div>
                </TabPanel>

                <TabPanel value='2' sx={{ p: 0 }}>
                  <div sx={{ width: '100%', overflow: 'hidden' }}>
                    <div
                      style={{
                        display: 'flex',
                        padding: '20px',
                        gap: '10px',
                        justifyContent: 'end',
                        alignItems: 'center'
                      }}
                    >
                      <label>Search :</label>
                      <InputBox />
                    </div>
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader aria-label='sticky table'>
                        <TableHead>
                          <TableRow>
                            {columnWalletSliderSecond.map(column => (
                              <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rowWalletSliderSecond
                            .slice(
                              walletsliderSecondPage * rowWalletSliderSecondPage,
                              walletsliderSecondPage * rowWalletSliderSecondPage + rowWalletSliderSecondPage
                            )
                            .map(row => {
                              return (
                                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                                  {columnWalletSliderSecond.map(column => {
                                    const value = row[column.id]

                                    return (
                                      <TableCell key={column.id} align={column.align}>
                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                      </TableCell>
                                    )
                                  })}
                                </TableRow>
                              )
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component='div'
                      count={rowWalletSliderSecond.length}
                      rowsPerPage={rowWalletSliderSecondPage}
                      page={walletsliderSecondPage}
                      onPageChange={handleChangewalletsliderSecondPage}
                      onRowsPerPageChange={handleChangeRowsWalletsliderSecondPage}
                    />
                  </div>
                </TabPanel>

                <TabPanel value='3' sx={{ p: 0 }}>
                  <div sx={{ width: '100%', overflow: 'hidden' }}>
                    <div
                      style={{
                        display: 'flex',
                        padding: '20px',
                        gap: '10px',
                        justifyContent: 'end',
                        alignItems: 'center'
                      }}
                    >
                      <label>Search :</label>
                      <InputBox />
                    </div>
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader aria-label='sticky table'>
                        <TableHead>
                          <TableRow>
                            {columnWalletSliderThird.map(column => (
                              <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rowWalletSliderThird
                            .slice(
                              walletsliderThirdPage * rowWalletSliderThirdPage,
                              walletsliderThirdPage * rowWalletSliderThirdPage + rowWalletSliderThirdPage
                            )
                            .map(row => {
                              return (
                                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                                  {columnWalletSliderThird.map(column => {
                                    const value = row[column.id]

                                    return (
                                      <TableCell key={column.id} align={column.align}>
                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                      </TableCell>
                                    )
                                  })}
                                </TableRow>
                              )
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component='div'
                      count={rowWalletSliderThird.length}
                      rowsPerPage={rowWalletSliderThirdPage}
                      page={walletsliderThirdPage}
                      onPageChange={handleChangewalletsliderThirdPage}
                      onRowsPerPageChange={handleChangeRowsWalletsliderThirdPage}
                    />
                  </div>
                </TabPanel>
              </CardContent>
            </TabContext>
          </Card>

          <Card style={{ marginTop: '20px', paddingBottom: '20px' }}>
            <h4 style={{ marginLeft: '20px' }}>Winning History Report</h4>
            <div>
              <h5 style={{ marginBottom: '5px', marginLeft: '20px' }}>Date</h5>
              <div
                style={{ marginLeft: '20px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '20px' }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker />
                </LocalizationProvider>
                <Button
                  style={{ backgroundColor: '#9155FD', color: 'white', width: '11rem', padding: '5px', height: '3rem' }}
                >
                  Submit
                </Button>
              </div>
              <div sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                      <TableRow>
                        {winningHistory.map(column => (
                          <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rowwinningHistory
                        .slice(
                          winningHistoryPage * rowWinningHistoryPage,
                          winningHistoryPage * rowWinningHistoryPage + rowWinningHistoryPage
                        )
                        .map(row => {
                          return (
                            <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                              {winningHistory.map(column => {
                                const value = row[column.id]
                                return (
                                  <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                  </TableCell>
                                )
                              })}
                            </TableRow>
                          )
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default UserDetails
