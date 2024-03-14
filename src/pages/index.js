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
import { getBetCategory, getUserCount } from 'src/helpers'
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
function createFundRequestData(name, userName, amount, requestNo, txnId, rejectRemark, date, status, action) {
  return { name, userName, amount, requestNo, txnId, rejectRemark, date, status, action }
}

const rowFundRequest = [
  createFundRequestData('India', 'IN', 1324171354, 3287263, 'data', 'data', 'data', 'data', 'data')
]
function DashBoardNew() {
  const router = useRouter()
  let [bid, setBid] = useState([])
  const [selectedGameValue, setSelectedGameValue] = useState(0)
  const [selectedMarketTimeValue, setSelectedMarketTimeValue] = useState(0)
  let [userCount, setUserCount] = useState('')

  console.log('userCount', userCount)

  useEffect(() => {
    let data = window?.localStorage.getItem('user')
    if (data == null || data == '') {
      router.replace('/admin/login')
    }
  }, [])
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
  const handleMarketTimeChange = event => {
    setSelectedMarketTimeValue(event.target.value)
  }

  let getAllBids = () => {
    getBetCategory()
      .then(data => {
        setBid(data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  let getUserCountApi = () => {
    getUserCount()
      .then(data => {
        setUserCount(data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

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
                <div style={{}}>
                  <h4 style={{ margin: '5px' }}>{userCount.unApproveUserCount}</h4>
                  <h5 style={{ margin: '5px', fontWeight: '400' }}>Unapproved Users</h5>
                </div>
                <div>
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
                <div>
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
                <div>
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
                  <h3 style={{ margin: '5px' }}> 0</h3>
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
                      <MenuItem value='active'>Open Market</MenuItem>
                      <MenuItem value='inactive'>Close Market</MenuItem>
                    </Select>
                  </div>
                  <div>
                    <Button style={{ backgroundColor: '#9155fd', color: 'white', width: '6rem' }}>Get</Button>
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
            <h2 style={{ marginBottom: '5px' }}>125</h2>
            <h5 style={{ margin: '0', fontWeight: '500' }}>Market Amount</h5>
          </Card>
          <Card style={{ marginTop: '20px', padding: '20px', marginLeft: '20px', width: '75%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px', width: '100%' }}>
              <div style={{ textAlign: 'center', border: '1px solid #556ee6', borderRadius: '5px' }}>
                <div style={{ padding: '8px' }}>
                  <h4 style={{ margin: '0', fontWeight: '500', color: '#556ee6' }}>Total Bids 0</h4>
                  <h2 style={{ margin: '3px' }}>0</h2>
                  <h5 style={{ margin: '0', fontWeight: '500' }}>Total Bid Amount</h5>
                </div>
                <h5 style={{ margin: '0', backgroundColor: '#556ee6', color: 'white', fontWeight: '500' }}>Ank 0</h5>
              </div>
              <div style={{ textAlign: 'center', border: '1px solid #34c38f', borderRadius: '5px' }}>
                <div style={{ padding: '8px' }}>
                  <h4 style={{ margin: '0', fontWeight: '500', color: '#556ee6' }}>Total Bids 0</h4>
                  <h2 style={{ margin: '3px' }}>0</h2>
                  <h5 style={{ margin: '0', fontWeight: '500' }}>Total Bid Amount</h5>
                </div>
                <h5 style={{ margin: '0', backgroundColor: '#34c38f', color: 'white', fontWeight: '500' }}>Ank 1</h5>
              </div>
              <div style={{ textAlign: 'center', border: '1px solid #50a5f1', borderRadius: '5px' }}>
                <div style={{ padding: '8px' }}>
                  <h4 style={{ margin: '0', fontWeight: '500', color: '#556ee6' }}>Total Bids 0</h4>
                  <h2 style={{ margin: '3px' }}>0</h2>
                  <h5 style={{ margin: '0', fontWeight: '500' }}>Total Bid Amount</h5>
                </div>
                <h5 style={{ margin: '0', backgroundColor: '#50a5f1', color: 'white', fontWeight: '500' }}>Ank 2</h5>
              </div>
              <div style={{ textAlign: 'center', border: '1px solid #f1b44c', borderRadius: '5px' }}>
                <div style={{ padding: '8px' }}>
                  <h4 style={{ margin: '0', fontWeight: '500', color: '#556ee6' }}>Total Bids 0</h4>
                  <h2 style={{ margin: '3px' }}>0</h2>
                  <h5 style={{ margin: '0', fontWeight: '500' }}>Total Bid Amount</h5>
                </div>
                <h5 style={{ margin: '0', backgroundColor: '#f1b44c', color: 'white', fontWeight: '500' }}>Ank 3</h5>
              </div>
              <div style={{ textAlign: 'center', border: '1px solid #af3ede', borderRadius: '5px' }}>
                <div style={{ padding: '8px' }}>
                  <h4 style={{ margin: '0', fontWeight: '500', color: '#556ee6' }}>Total Bids 0</h4>
                  <h2 style={{ margin: '3px' }}>0</h2>
                  <h5 style={{ margin: '0', fontWeight: '500' }}>Total Bid Amount</h5>
                </div>
                <h5 style={{ margin: '0', backgroundColor: '#af3ede', color: 'white', fontWeight: '500' }}>Ank 4</h5>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '5px', justifyContent: 'space-around' }}>
              <div style={{ textAlign: 'center', border: '1px solid #f1673e', borderRadius: '5px' }}>
                <div style={{ padding: '8px' }}>
                  <h4 style={{ margin: '0', fontWeight: '500', color: '#556ee6' }}>Total Bids 0</h4>
                  <h2 style={{ margin: '3px' }}>0</h2>
                  <h5 style={{ margin: '0', fontWeight: '500' }}>Total Bid Amount</h5>
                </div>
                <h5 style={{ margin: '0', backgroundColor: '#f1673e', color: 'white', fontWeight: '500' }}>Ank 5</h5>
              </div>
              <div style={{ textAlign: 'center', border: '1px solid #ea31ba', borderRadius: '5px' }}>
                <div style={{ padding: '8px' }}>
                  <h4 style={{ margin: '0', fontWeight: '500', color: '#556ee6' }}>Total Bids 0</h4>
                  <h2 style={{ margin: '3px' }}>0</h2>
                  <h5 style={{ margin: '0', fontWeight: '500' }}>Total Bid Amount</h5>
                </div>
                <h5 style={{ margin: '0', backgroundColor: '#ea31ba', color: 'white', fontWeight: '500' }}>Ank 6</h5>
              </div>
              <div style={{ textAlign: 'center', border: '1px solid #5a3cff', borderRadius: '5px' }}>
                <div style={{ padding: '8px' }}>
                  <h4 style={{ margin: '0', fontWeight: '500', color: '#556ee6' }}>Total Bids 0</h4>
                  <h2 style={{ margin: '3px' }}>0</h2>
                  <h5 style={{ margin: '0', fontWeight: '500' }}>Total Bid Amount</h5>
                </div>
                <h5 style={{ margin: '0', backgroundColor: '#5a3cff', color: 'white', fontWeight: '500' }}>Ank 7</h5>
              </div>
              <div style={{ textAlign: 'center', border: '1px solid #ff3c84', borderRadius: '5px' }}>
                <div style={{ padding: '8px' }}>
                  <h4 style={{ margin: '0', fontWeight: '500', color: '#556ee6' }}>Total Bids 0</h4>
                  <h2 style={{ margin: '3px' }}>0</h2>
                  <h5 style={{ margin: '0', fontWeight: '500' }}>Total Bid Amount</h5>
                </div>
                <h5 style={{ margin: '0', backgroundColor: '#ff3c84', color: 'white', fontWeight: '500' }}>Ank 8</h5>
              </div>
              <div style={{ textAlign: 'center', border: '1px solid #0dcebc', borderRadius: '5px' }}>
                <div style={{ padding: '8px' }}>
                  <h4 style={{ margin: '0', fontWeight: '500', color: '#556ee6' }}>Total Bids 0</h4>
                  <h2 style={{ margin: '3px' }}>0</h2>
                  <h5 style={{ margin: '0', fontWeight: '500' }}>Total Bid Amount</h5>
                </div>
                <h5 style={{ margin: '0', backgroundColor: '#0dcebc', color: 'white', fontWeight: '500' }}>Ank 9</h5>
              </div>
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
