import React, { useEffect, useState } from 'react'
import {
  Typography,
  Card,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TextField
} from '@mui/material'

import { getAllWithdrawRequest, updateWithdrawRequest } from 'src/helpers'
import moment from 'moment'
import { useRouter } from 'next/router'

const columnBid = [
  {
    id: 'name',
    label: '#',
    minWidth: 100
  },
  {
    id: 'userName',
    label: 'User Name',
    minWidth: 160
  },
  {
    id: 'mobile',
    label: 'Mobile',
    minWidth: 170
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 170
  },
  {
    id: 'requestNo',
    label: 'request No',
    minWidth: 170
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 170
  },
  {
    id: 'status',
    label: 'status',
    minWidth: 170
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170
  }
]
function createBid(name, senderName, receiverName, amount, date) {
  return {
    name,
    senderName,
    receiverName,
    amount,
    date
  }
}
const rowBid = [createBid('India', 'IN', 1324171354, 3287263, 3287263)]

function WithdrawRequest() {
  let router = useRouter()

  const [allWithdrawRequest, setAllWithdrawRequest] = useState([])
  const [withdrawHistoryTotalDoc, setWithdrawHistoryTotalDoc] = useState(10)
  const [isPopupOpenView, setPopupOpenView] = useState(false)
  const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false)
  const [remark, setRemark] = useState('')
  const [rejectRemark, setRejectRemark] = useState('')
  const [image, setImage] = useState('')
  const [rowWalletSliderFirstPage, setrowWalletSliderFirstPage] = useState(10)
  const [walletsliderFirstPage, setWalletsliderFirstPage] = useState(0)
  const [withdrawRequestData, setWithdrawRequestData] = useState({
    withdrawReqId: '',
    name: '',
    mobileNumber: '',
    requestNo: '',
    amount: ''
  })

  const togglePopupView = () => {
    setPopupOpenView(!isPopupOpenView)
  }

  const toggleRejectPopupView = () => {
    setIsRejectPopupOpen(!isRejectPopupOpen)
  }

  const handleChangewalletsliderFirstPage = (event, newPage) => {
    setWalletsliderFirstPage(newPage)
  }

  const handleChangeRowsWalletsliderFirstPage = event => {
    setrowWalletSliderFirstPage(+event.target.value)
    setWalletsliderFirstPage(0)
  }

  const handleUpdateWithdrawRequest = () => {
    let params
    if (!rejectRemark) {
      params = {
        withdrawReqId: withdrawRequestData.withdrawReqId,
        status: 'ACCEPTED',
        remark: remark,
        image: image ? image : '',
        requestAcceptDate: moment(new Date()).format('YYYY-MM-DD')
      }
    } else {
      params = {
        withdrawReqId: withdrawRequestData.withdrawReqId,
        status: 'REJECTED',
        remark: rejectRemark,
        requestRejectedDate: moment(new Date()).format('YYYY-MM-DD')
      }
    }
    console.log('params', params)
    updateWithdrawRequest(params)
      .then(data => {
        if (data.success) {
          getAllWithdrawRequestApi()
          if (!rejectRemark) {
            setPopupOpenView(!isPopupOpenView)
          } else {
            setIsRejectPopupOpen(!isRejectPopupOpen)
          }
        } else {
          console.log('error in update req', data)
        }
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const getAllWithdrawRequestApi = () => {
    getAllWithdrawRequest()
      .then(data => {
        if (data.success) {
          setAllWithdrawRequest(data.data)
          setWithdrawHistoryTotalDoc(data.totalDocument)
        } else {
          console.log('error')
        }
      })
      .catch(e => {
        console.log('error', e)
      })
  }

  useEffect(() => {
    getAllWithdrawRequestApi()
  }, [])
  return (
    <>
      <Card sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h6' style={{ padding: '20px' }}>
            Withdraw Request List
          </Typography>
          {/* <Button style={{ backgroundColor: '#9155FD', color: 'white', height: '2.5rem', marginRight: '20px' }}>
            Total Transfer Amount: ₹ {totalTransferAmount ? totalTransferAmount : 0}
          </Button> */}
        </div>
        <TableContainer sx={{ maxHeight: 950 }}>
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
              {allWithdrawRequest
                .slice(
                  walletsliderFirstPage * rowWalletSliderFirstPage,
                  walletsliderFirstPage * rowWalletSliderFirstPage + rowWalletSliderFirstPage
                )
                .map((row, rowIndex) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                      {columnBid.map(column => {
                        const value = row[column.id]

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'name' ? (
                              <span>{rowIndex + 1}</span>
                            ) : column.id === 'mobile' ? (
                              <span>{row.mobileNumber}</span>
                            ) : column.id === 'userName' ? (
                              <span
                                style={{ color: 'blue', cursor: 'pointer' }}
                                onClick={() =>
                                  router.push({
                                    pathname: '/users/userdetails',
                                    query: { userId: row.userId._id }
                                  })
                                }
                              >
                                {row.userId.name}
                              </span>
                            ) : column.id === 'date' ? (
                              <span>{moment(row.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                            ) : column.id === 'status' ? (
                              row.status === 'ACCEPTED' ? (
                                <Button style={{ color: 'green', cursor: 'text' }}>{row.status}</Button>
                              ) : row.status === 'REJECTED' ? (
                                <Button style={{ color: 'red', cursor: 'text' }}>{row.status}</Button>
                              ) : (
                                <Button style={{ color: 'orange', cursor: 'text' }}>{row.status}</Button>
                              )
                            ) : column.id === 'action' ? (
                              <div>
                                <Button
                                  variant='contained'
                                  style={{ marginRight: '10px', color: 'white' }}
                                  disabled={row.status != 'PENDING'}
                                  //   onClick={togglePopupView}
                                  onClick={() => {
                                    setWithdrawRequestData({
                                      ...withdrawRequestData,
                                      withdrawReqId: row._id,
                                      requestNo: row.requestNo,
                                      name: row.userId.name,
                                      mobileNumber: row.mobileNumber,
                                      amount: row.amount
                                    })
                                    setPopupOpenView(!isPopupOpenView)
                                  }}
                                >
                                  Approve
                                </Button>

                                <Button
                                  variant='contained'
                                  color='error'
                                  disabled={row.status != 'PENDING'}
                                  //   onClick={toggleRejectPopupView}
                                  onClick={() => {
                                    setWithdrawRequestData({
                                      ...withdrawRequestData,
                                      withdrawReqId: row._id
                                    })
                                    setIsRejectPopupOpen(!isRejectPopupOpen)
                                  }}
                                >
                                  Reject
                                </Button>
                              </div>
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
                      width: '35%',
                      position: 'fixed',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: '#F7F7F7',
                      padding: '20px',
                      zIndex: 9999 // Ensure the popup is above the overlay
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant='h6'>Approve Withdraw Request</Typography>
                      <div onClick={togglePopupView} style={{ cursor: 'pointer' }}>
                        &#10006;
                      </div>
                    </div>

                    <Card sx={{ padding: '20px' }}>
                      <Typography style={{ margin: '10px 0 5px 0' }}>User Name : {withdrawRequestData.name}</Typography>
                      <Typography style={{ margin: '10px 0 5px 0' }}>
                        Mobile : {withdrawRequestData.mobileNumber}
                      </Typography>
                      <Typography style={{ margin: '10px 0 5px 0' }}>
                        Request Number :{withdrawRequestData.requestNo}
                      </Typography>
                      <Typography style={{ margin: '10px 0 5px 0' }}>
                        Request Amount :{withdrawRequestData.amount}
                      </Typography>
                      <Typography style={{ margin: '10px 0 5px 0' }}>
                        Payment Receipt Image(Allow Only.jpeg,.jpg,.png)
                      </Typography>

                      <TextField
                        type='file'
                        style={{
                          width: '95%',
                          marginBottom: '20px'
                        }}
                        onChange={e => {
                          setImage(e.target.files[0])
                        }}
                      />
                      <Typography style={{ margin: '10px 0 5px 0' }}>Remark</Typography>
                      <TextField
                        type='text'
                        style={{
                          width: '95%',
                          marginBottom: '20px'
                        }}
                        value={remark}
                        onChange={e => {
                          setRemark(e.target.value)
                        }}
                      />
                    </Card>

                    <Button
                      style={{
                        backgroundColor: '#9155FD',
                        color: 'white',
                        fontSize: '13px',
                        marginTop: '10px'
                      }}
                      onClick={handleUpdateWithdrawRequest}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              )}
              {isRejectPopupOpen && (
                <div>
                  <div
                    className='overlay'
                    onClick={toggleRejectPopupView}
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
                      width: '35%',
                      position: 'fixed',
                      top: '30%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: '#F7F7F7',
                      padding: '20px',
                      zIndex: 9999 // Ensure the popup is above the overlay
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant='h6'>Reject Withdraw Request</Typography>
                      <div onClick={toggleRejectPopupView} style={{ cursor: 'pointer' }}>
                        &#10006;
                      </div>
                    </div>

                    <Card sx={{ padding: '20px' }}>
                      <Typography style={{ margin: '10px 0 5px 0' }}>Remark</Typography>
                      <TextField
                        type='text'
                        style={{
                          width: '95%',
                          marginBottom: '20px'
                        }}
                        value={rejectRemark}
                        onChange={e => {
                          setRejectRemark(e.target.value)
                        }}
                      />
                    </Card>

                    <Button
                      style={{
                        backgroundColor: '#9155FD',
                        color: 'white',
                        fontSize: '13px',
                        marginTop: '10px'
                      }}
                      onClick={handleUpdateWithdrawRequest}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={withdrawHistoryTotalDoc}
          rowsPerPage={rowWalletSliderFirstPage}
          page={walletsliderFirstPage}
          onPageChange={handleChangewalletsliderFirstPage}
          onRowsPerPageChange={handleChangeRowsWalletsliderFirstPage}
        />
      </Card>
    </>
  )
}

export default WithdrawRequest
