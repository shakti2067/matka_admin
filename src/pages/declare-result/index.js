import * as React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import {
  Button,
  Card,
  Grid,
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
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputBox from 'src/components/InputBox'
import { useState } from 'react'
import { createGameWinner, getBetCategory, getGlobalSettings } from 'src/helpers'
import dayjs from 'dayjs'
import moment from 'moment'

const columnGameResult = [
  {
    id: 'name',
    label: '#',
    minWidth: 10
  },
  {
    id: 'gameName',
    label: 'Game Name',
    minWidth: 190
  },
  {
    id: 'resultDate',
    label: 'Result Date',
    minWidth: 130,
    align: 'left'
  },
  {
    id: 'openDeclareDate',
    label: 'Open Declare Date',
    minWidth: 190,
    align: 'left'
  },
  {
    id: 'closeDeclareDate',
    label: 'Close Declare Date',
    minWidth: 190,
    align: 'left'
  },
  {
    id: 'openPana',
    label: 'Open Pana',
    minWidth: 170,
    align: 'left'
  },
  {
    id: 'closePana',
    label: 'Close Pana',
    minWidth: 170,
    align: 'left'
  }
]
const showWinner = [
  {
    id: 'name',
    label: '#',
    minWidth: 10
  },
  {
    id: 'userName',
    label: 'User Name',
    minWidth: 190
  },
  {
    id: 'bidPoints',
    label: 'Bid Points',
    minWidth: 130,
    align: 'left'
  },
  {
    id: 'winningAmount',
    label: 'Winning Amount',
    minWidth: 190,
    align: 'left'
  },
  {
    id: 'type',
    label: 'Type',
    minWidth: 190,
    align: 'left'
  },
  {
    id: 'bidTxId',
    label: 'Bid TX ID',
    minWidth: 170,
    align: 'left'
  }
]
function createGameResult(name, gameName, resultDate, openDeclareDate, closeDeclareDate, openPana, closePana) {
  return {
    name,
    gameName,
    resultDate,
    openDeclareDate,
    closeDeclareDate,
    openPana,
    closePana
  }
}
const rowGameResult = [
  createGameResult(1, 'STAR MORNING', '27 Feb 2024', '27 Feb 2024 09:24:01 AM', '27 Feb 2024 11:33:17 AM', '', ''),
  createGameResult(2, 'STAR MORNING', '28 Feb 2024', '27 Feb 2024 09:24:01 AM', '27 Feb 2024 11:33:17 AM', '', ''),
  createGameResult(3, 'STAR MORNING', '29 Feb 2024', '27 Feb 2024 09:24:01 AM', '27 Feb 2024 11:33:17 AM', '', '')
]

function DeclareResult() {
  const today = new Date()

  const [gameResult, setGameResult] = React.useState(0)
  const [rowsGameResult, setRowsGameResult] = React.useState(10)
  const [isPopupOpenDelete, setPopupOpenDelete] = useState(false)
  const [sliderImageId, setSliderImageId] = useState('')
  const [bid, setBid] = useState([])
  const [selectedGameValue, setSelectedGameValue] = useState(0)
  const [selectedMarketTimeValue, setSelectedMarketTimeValue] = useState(0)
  const [open, setOpen] = useState(false)
  const [pana, setPana] = useState([])
  const [selectedPana, setSelectedPana] = useState(0)
  const [digit, setDigit] = useState(0)
  const [save, setSave] = useState(false)
  const [isPopupOpenChangePass, setPopupOpenChangePass] = useState(false)
  const [createWinner, setCreateWinner] = useState([])
  const [selectResultDate, setSelectResultDate] = useState(today)

  console.log('selectResultDate', selectResultDate)

  const togglePopupDelete = event => {
    setPopupOpenDelete(!isPopupOpenDelete)
    setSliderImageId(event.target.value)
  }

  const handleChangeGameResultPage = (event, newPage) => {
    setGameResult(newPage)
  }
  const handleChangeGameResultPerPage = event => {
    setRowsGameResult(+event.target.value)
    setGameResult(0)
  }

  const handleGameSelectChange = event => {
    setSelectedGameValue(event.target.value)
  }
  const handlePanaSelect = event => {
    setSelectedPana(event.target.value)
    let lastDigit = sumOfDigitsAndLastDigit(event.target.value)

    setDigit(lastDigit)
  }
  const handleMarketTimeChange = event => {
    setSelectedMarketTimeValue(event.target.value)
  }

  const togglePopupChangePass = () => {
    setPopupOpenChangePass(!isPopupOpenChangePass)
    createWinnerApi()
  }

  let handleOpen = () => {
    if (selectedGameValue != 0 && selectedMarketTimeValue != 0) {
      setOpen(true)
    }
  }

  let getAllBids = () => {
    getBetCategory()
      .then(data => {
        if (data.success) {
          setBid(data.data)
        } else {
          console.log('Error while fetching bids')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  let createWinnerApi = () => {
    let param = {
      date: dayjs(selectResultDate).format('YYYY-MM-DD'),
      betCategoryId: selectedGameValue,
      state: selectedMarketTimeValue,
      digit: digit,
      pana: selectedPana
    }
    createGameWinner(param)
      .then(data => {
        if (data.success) {
          setCreateWinner(data.data)
        } else {
          console.log('Error while fetching create Winner')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  // Sum of digit function
  function sumOfDigitsAndLastDigit(number) {
    if (number) {
      let sum = 0
      let temp = number
      while (temp > 0) {
        sum += temp % 10
        temp = Math.floor(temp / 10)
      }

      return sum % 10
    } else {
      return number
    }
  }

  const globalSettingApi = () => {
    getGlobalSettings()
      .then(data => {
        if (data.success) {
          setPana(data.data.gameNumber.fullSangam.openAnk)
        } else {
          console.log('error', data.message)
        }
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  React.useEffect(() => {
    getAllBids()
    globalSettingApi()
  }, [])

  return (
    <div>
      <Card style={{ padding: '20px' }}>
        <Typography variant='h6'>Select Game</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', marginBottom: '10px' }}>
          <div>
            <Typography>Result Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                maxDate={dayjs(today)}
                value={dayjs(selectResultDate)}
                onChange={newValue => setSelectResultDate(newValue)}
              />
            </LocalizationProvider>
          </div>
          <FormControl>
            <Typography>Game Name</Typography>
            <Select style={{ width: '25rem' }} value={selectedGameValue} onChange={handleGameSelectChange}>
              <MenuItem value={0}>-- Select game name --</MenuItem>
              {bid &&
                bid.map(d => (
                  <MenuItem key={d._id} value={d._id}>
                    {d.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl>
            <Typography>Session</Typography>
            <Select style={{ width: '15rem' }} value={selectedMarketTimeValue} onChange={handleMarketTimeChange}>
              <MenuItem value={0}>-- Select Session --</MenuItem>
              <MenuItem value='OPEN'>Open Market</MenuItem>
              <MenuItem value='CLOSE'>Close Market</MenuItem>
            </Select>
          </FormControl>
          <div style={{ alignItems: 'end', display: 'flex' }}>
            <Button
              style={{
                backgroundColor: '#9155FD',
                color: 'white',
                height: '3rem',
                width: '10rem',
                marginBottom: '5px'
              }}
              onClick={handleOpen}
            >
              Go
            </Button>
          </div>
        </div>
      </Card>
      {open ? (
        <Card style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant='h6'>Declare Result</Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', marginBottom: '10px' }}>
            <FormControl>
              <Typography>Panna:</Typography>
              <Select style={{ width: '25rem' }} value={selectedPana} onChange={handlePanaSelect}>
                <MenuItem value={0}>-- Select pana --</MenuItem>
                {pana &&
                  pana.map(d => (
                    <MenuItem key={d} value={d}>
                      {d}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl>
              <Typography>Digit</Typography>
              <Grid item xs={12}>
                <TextField fullWidth type='number' value={digit} />
              </Grid>
            </FormControl>
            <div style={{ alignItems: 'end', display: 'flex' }}>
              <Button
                style={{
                  backgroundColor: '#9155FD',
                  color: 'white',
                  height: '3rem',
                  width: '10rem',
                  marginBottom: '5px',
                  marginRight: '10px'
                }}
                onClick={() => {
                  setSave(true)
                }}
              >
                save
              </Button>
              {save ? (
                <div>
                  <Button
                    style={{
                      backgroundColor: '#9155FD',
                      color: 'white',
                      height: '3rem',
                      width: '10rem',
                      marginBottom: '5px',
                      marginRight: '10px'
                    }}
                    onClick={togglePopupChangePass}
                  >
                    show winner
                  </Button>
                  {isPopupOpenChangePass && (
                    <div>
                      <div
                        className='overlay'
                        onClick={togglePopupChangePass}
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
                          width: '70%',
                          position: 'fixed',
                          // top: '20%',
                          height: '80%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: '#F7F7F7',
                          padding: '20px',
                          zIndex: 9999 // Ensure the popup is above the overlay
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant='h6'>Winner List</Typography>
                          <Typography variant='h6'>Total Bid Amount : 0</Typography>
                          <Typography variant='h6'>Total Winning Amount : 0</Typography>

                          <div onClick={togglePopupChangePass} style={{ cursor: 'pointer' }}>
                            &#10006;
                          </div>
                        </div>
                        <TableContainer sx={{ maxHeight: 440 }}>
                          <Table stickyHeader aria-label='sticky table'>
                            <TableHead>
                              <TableRow>
                                {showWinner.map(column => (
                                  <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                                    {column.label}
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {rowGameResult
                                .slice(gameResult * rowsGameResult, gameResult * rowsGameResult + rowsGameResult)
                                .map(row => {
                                  return (
                                    <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                                      {showWinner.map(column => {
                                        const value = row[column.id]

                                        return (
                                          <TableCell key={column.id} align={column.align}>
                                            {value}
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
                  )}
                  <Button
                    style={{
                      backgroundColor: '#9155FD',
                      color: 'white',
                      height: '3rem',
                      width: '10rem',
                      marginBottom: '5px',
                      marginRight: '10px'
                    }}
                  >
                    Declare
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </Card>
      ) : null}

      <Card sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
        <div style={{ padding: '20px' }}>
          <Typography variant='h6'>Game Result History</Typography>
          <div style={{ marginTop: '15px', marginBottom: '10px' }}>
            <Typography>Select Result Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker maxDate={dayjs(today)} />
            </LocalizationProvider>
          </div>
        </div>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columnGameResult.map(column => (
                  <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowGameResult
                .slice(gameResult * rowsGameResult, gameResult * rowsGameResult + rowsGameResult)
                .map(row => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                      {columnGameResult.map(column => {
                        const value = row[column.id]

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'openPana' ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Typography variant='body2'>124-7</Typography>
                                <Button
                                  style={{
                                    backgroundColor: '#f46a6a',
                                    color: 'white',
                                    fontSize: '12px',
                                    padding: '4px'
                                  }}
                                  onClick={togglePopupDelete}
                                >
                                  Delete
                                </Button>
                              </div>
                            ) : column.id === 'closePana' ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Typography variant='body2'>8-288</Typography>
                                <Button
                                  style={{
                                    backgroundColor: '#f46a6a',
                                    color: 'white',
                                    fontSize: '12px',
                                    padding: '4px'
                                  }}
                                  onClick={togglePopupDelete}
                                >
                                  Delete
                                </Button>{' '}
                              </div>
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
          count={rowGameResult.length}
          rowsPerPage={rowsGameResult}
          page={gameResult}
          onPageChange={handleChangeGameResultPage}
          onRowsPerPageChange={handleChangeGameResultPerPage}
        />
      </Card>
      {isPopupOpenDelete && (
        <div
          style={{
            borderRadius: '5px',
            width: '30%',
            position: 'fixed',
            top: '10%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#F7F7F7',
            padding: '20px',
            boxShadow: '0 0 10px #d3bdff'
          }}
        >
          <div>
            <h5 style={{ marginTop: '5px' }}>Are you sure you want to delete this?</h5>
            <div>
              <Button
                onClick={togglePopupDelete}
                style={{ backgroundColor: '#f46a6a', color: 'white', width: '6rem', padding: '5px' }}
              >
                No
              </Button>
              <Button
                style={{
                  backgroundColor: '#9155FD',
                  color: 'white',
                  width: '6rem',
                  padding: '5px',
                  marginLeft: '30px'
                }}
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeclareResult
