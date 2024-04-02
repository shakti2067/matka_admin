import { Avatar, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import Icon from '@mdi/react'
import { mdiAccountOutline, mdiPackageDown, mdiTagOutline } from '@mdi/js'
import React from 'react'
import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import InputBox from 'src/components/InputBox'
import { useRouter } from 'next/router'
import { getBetCategory, getTotalBidAnk, getUserCount, getOverAllBid } from 'src/helpers'
import moment from 'moment'

const columnFundRequest = [
  {
    id: 'name',
    label: '#',
    minWidth: 170
  },
  {
    id: 'userName',
    label: 'User Name',
    minWidth: 170
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 170
  },
  {
    id: 'requestNo',
    label: 'Request No.',
    minWidth: 170
  },
  {
    id: 'txnId',
    label: 'Txn Id',
    minWidth: 170
  },
  {
    id: 'rejectRemark',
    label: 'Reject Remark',
    minWidth: 170
  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 170
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170
  }
]
const localAnks = [
  { amount: 0, bids: 0, color: '#556ee6' },
  {
    amount: 0,
    bids: 0,
    color: '#34c38f'
  },
  {
    amount: 0,
    bids: 0,
    color: '#50a5f1'
  },
  {
    amount: 0,
    bids: 0,
    color: '#f1b44c'
  },
  { amount: 0, bids: 0, color: '#af3ede' },
  { amount: 0, bids: 0, color: '#f1673e' },
  { amount: 0, bids: 0, color: '#ea31ba' },
  { amount: 0, bids: 0, color: '#5a3cff' },
  { amount: 0, bids: 0, color: '#ff3c84' },
  { amount: 0, bids: 0, color: '#0dcebc' }
]
function createFundRequestData(name, userName, amount, requestNo, txnId, rejectRemark, date, status, action) {
  return { name, userName, amount, requestNo, txnId, rejectRemark, date, status, action }
}

const rowFundRequest = [
  // createFundRequestData('India', 'IN', 1324171354, 3287263, 'data', 'data', 'data', 'data', 'data')
]
function DashBoardNew() {
  const router = useRouter()
  const [bid, setBid] = useState([])
  const [selectedGameValue, setSelectedGameValue] = useState(0)
  const [selectedMarketTimeValue, setSelectedMarketTimeValue] = useState(0)
  const [userCount, setUserCount] = useState('')
  const [totalBidAnk, setTotalBidAnk] = useState([])
  let [selectedMarket, setSelectedMarket] = useState(0)
  const [bidCount, setBidCount] = useState({
    bidAmount: 0,
    marketAmount: 0
  })

  useEffect(() => {
    let data = window?.localStorage.getItem('user')
    if (data == null || data == '') {
      router.replace('/admin/login')
    }
  }, [])
  let serverOverAllBisCount = () => {
    let params = {
      betCategoryId: selectedMarket,
      date: moment().format('YYYY-MM-DD')
    }
    getOverAllBid(params)
      .then(({ data }) => {
        setBidCount({
          bidAmount: data?.getOverAllTotal[0]?.amount || 0,
          marketAmount: data?.getTotalBidAnk == null ? 0 : data?.getTotalBidAnk[0]?.amount || 0
        })
      })
      .catch(err => {
        console.log(err, 'this is error')
      })
  }
  const [fundRequestPage, setFundRequestPage] = useState(0)
  const [rowsFundRequestPerPage, setRowsFundRequestPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setFundRequestPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsFundRequestPerPage(+event.target.value)
    setFundRequestPage(0)
  }

  const handleGameSelectChange = event => {
    setSelectedGameValue(event.target.value)
  }
  const handleMarketSelectChange = event => {
    setSelectedMarket(event.target.value)
  }
  const handleMarketTimeChange = event => {
    setSelectedMarketTimeValue(event.target.value)
  }

  let getAllBids = () => {
    getBetCategory()
      .then(data => {
        if (data.success) {
          setBid(data.data)
        } else {
          if (data.message == 'Unauthorized User') {
            router.push('/admin/login')
          }
          console.log(' getBetCategory err', data.message)
        }
      })
      .catch(err => {
        console.log('  err', err)
      })
  }

  let getUserCountApi = () => {
    getUserCount()
      .then(data => {
        if (data.success) {
          setUserCount(data.data)
        } else {
          if (data.message == 'Unauthorized User') {
            router.push('/admin/login')
          }
          console.log(' getUserCountApi err', data.message)
        }
      })
      .catch(err => {
        console.log('getUserCount err', err)
      })
  }

  let getTotalBidAnkApi = () => {
    let params = {
      betCategoryId: selectedGameValue,
      state: selectedMarketTimeValue,
      date: moment().format('YYYY-MM-DD')
    }
    getTotalBidAnk(params)
      .then(data => {
        setTotalBidAnk(data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    serverOverAllBisCount()
  }, [selectedMarket])
  useEffect(() => {
    getAllBids()
    getUserCountApi()
  }, [])

  return (
    <div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0' }}></div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Card sx={{ position: 'relative', width: '33%' }}>
            <div
              style={{
                backgroundImage: 'linear-gradient(98deg, #C6A7FE, #9155FD 94%)',
                height: '9rem',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0' }}>Welcome Back !</h3>
                <h5 style={{ marginTop: '5px', display: 'flex', alignItems: 'center', fontSize: '13px' }}>
                  Admin Dashboard
                </h5>
              </div>
              <Avatar
                alt='Robert Meyer'
                src='/images/avatars/1.png'
                style={{ width: '9rem', height: '9rem', marginRight: '20px' }}
              />
            </div>
            <Avatar
              alt='Robert Meyer'
              src='/images/avatars/1.png'
              sx={{
                width: 75,
                height: 75,
                left: '1.313rem',
                top: '7rem',
                position: 'absolute',
                border: theme => `0.25rem solid ${theme.palette.common.white}`
              }}
            />
            <CardContent>
              <div style={{ display: 'flex', height: '6rem', justifyContent: 'space-around' }}>
                <div style={{ alignSelf: 'flex-end' }}>
                  <h4 style={{ margin: '5px' }}>Admin</h4>
                  <h5 style={{ margin: '5px', fontWeight: '400' }}>Admin</h5>
                </div>
                <div style={{ cursor: 'pointer' }} onClick={() => router.push('/users/unapproveuser')}>
                  <h4 style={{ margin: '5px' }}>{userCount.unApproveUserCount}</h4>
                  <h5 style={{ margin: '5px', fontWeight: '400' }}>Unapproved Users</h5>
                </div>
                <div
                  onClick={() => {
                    router.push('/users')
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <h4 style={{ margin: '5px' }}>{userCount.approveUserCount}</h4>
                  <h5 style={{ margin: '5px', fontWeight: '400' }}>Approved Users</h5>
                </div>
              </div>
            </CardContent>
          </Card>
          <div style={{ width: '65%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Card
                style={{
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  width: '30%',
                  justifyContent: 'space-around'
                }}
              >
                <div
                  onClick={() => {
                    router.push('/users')
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <h5 style={{ margin: '5px' }}>Users</h5>
                  <h3 style={{ margin: '5px' }}>{userCount.totalUser}</h3>
                </div>
                <Icon
                  path={mdiAccountOutline}
                  size={1}
                  style={{
                    backgroundColor: '#9155fd',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '50%',
                    boxSizing: 'content-box'
                  }}
                />
              </Card>
              <Card
                style={{
                  padding: '',
                  display: 'flex',
                  alignItems: 'center',
                  width: '30%',
                  justifyContent: 'space-around'
                }}
              >
                <div
                  onClick={() => {
                    router.push('/bids')
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <h5 style={{ margin: '5px' }}>Games</h5>
                  <h3 style={{ margin: '5px' }}>{userCount.totalGame}</h3>
                </div>
                <Icon
                  path={mdiPackageDown}
                  size={1}
                  style={{
                    backgroundColor: '#9155fd',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '50%',
                    boxSizing: 'content-box'
                  }}
                />
              </Card>
              <Card
                style={{
                  padding: '',
                  display: 'flex',
                  alignItems: 'center',
                  width: '30%',
                  justifyContent: 'space-around'
                }}
              >
                <div>
                  <h5 style={{ margin: '5px' }}>Bid Amount</h5>
                  <h3 style={{ margin: '5px' }}>{bidCount.bidAmount}</h3>
                </div>
                <Icon
                  path={mdiTagOutline}
                  size={1}
                  style={{
                    backgroundColor: '#9155fd',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '50%',
                    boxSizing: 'content-box'
                  }}
                />
              </Card>
            </div>
            <div>
              <Card style={{ padding: '20px', marginTop: '20px' }}>
                <h4>{`Total Bids On Single Ank Of Date ${moment(new Date()).format('LL')}`}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
                    <h5 style={{ margin: '0', fontWeight: '500' }}>Game Name</h5>
                    <Select style={{ height: '40px' }} value={selectedGameValue} onChange={handleGameSelectChange}>
                      <MenuItem value={0}>-- Select game name --</MenuItem>
                      {bid &&
                        bid.map(d => (
                          <MenuItem key={d._id} value={d._id}>
                            {d.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
                    <h5 style={{ margin: '0', fontWeight: '500' }}>Market Time</h5>
                    <Select
                      style={{ height: '40px' }}
                      value={selectedMarketTimeValue}
                      onChange={handleMarketTimeChange}
                    >
                      <MenuItem value={0}>-- Select Market time --</MenuItem>
                      <MenuItem value='OPEN'>Open Market</MenuItem>
                      <MenuItem value='CLOSE'>Close Market</MenuItem>
                    </Select>
                  </div>
                  <div>
                    <Button
                      style={{ backgroundColor: '#9155fd', color: 'white', width: '6rem' }}
                      onClick={getTotalBidAnkApi}
                    >
                      Get
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <Card style={{ marginTop: '20px', padding: '20px', width: '33%' }}>
            <h4 style={{ marginTop: '0' }}>Market Bid Details</h4>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h5 style={{ margin: '0', fontWeight: '500' }}>Game Name</h5>
              <Select style={{ height: '40px' }} value={selectedMarket} onChange={handleMarketSelectChange}>
                <MenuItem value={0}>-- Select game name --</MenuItem>
                {bid &&
                  bid.map(d => (
                    <MenuItem key={d._id} value={d._id}>
                      {d.name}
                    </MenuItem>
                  ))}
              </Select>
            </div>
            <h2 style={{ marginBottom: '5px' }}>{bidCount.marketAmount}</h2>
            <h5 style={{ margin: '0', fontWeight: '500' }}>Market Amount</h5>
          </Card>

          <Card style={{ marginTop: '20px', padding: '20px', marginLeft: '20px', width: '75%' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: '10px',
                width: '100%',
                flexWrap: 'wrap'
              }}
            >
              {localAnks?.map((data, i) => {
                let serverVal = totalBidAnk?.filter(d => d.ank == i + '')[0]
                return (
                  <div
                    style={{
                      textAlign: 'center',
                      border: `1px solid ${data.color}`,
                      borderRadius: '5px',
                      marginBottom: 10,
                      width: 'calc(20% - 20px)'
                    }}
                  >
                    <div style={{ padding: '8px' }}>
                      <h4 style={{ margin: '0', fontWeight: '500', color: '#556ee6' }}>
                        Total Bids {serverVal?.totalBidCount || data.bids}
                      </h4>
                      <h2 style={{ margin: '3px' }}>{serverVal?.amount || data.amount}</h2>
                      <h5 style={{ margin: '0', fontWeight: '500' }}>Total Bid Amount</h5>
                    </div>
                    <h5 style={{ margin: '0', backgroundColor: data.color, color: 'white', fontWeight: '500' }}>
                      Ank {i}
                    </h5>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        <Card sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
          <div style={{ display: 'flex', padding: '0  20px', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4>Fund Request Auto Deposit History</h4>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <label>Search :</label>
              <InputBox />
            </div>
          </div>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columnFundRequest.map(column => (
                    <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rowFundRequest
                  .slice(
                    fundRequestPage * rowsFundRequestPerPage,
                    fundRequestPage * rowsFundRequestPerPage + rowsFundRequestPerPage
                  )
                  .map(row => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                        {columnFundRequest.map(column => {
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
            count={rowFundRequest.length}
            rowsPerPage={rowsFundRequestPerPage}
            page={fundRequestPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </div>
    </div>
  )
}

export default DashBoardNew
