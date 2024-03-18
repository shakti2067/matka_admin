import * as React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputBox from 'src/components/InputBox'
import { useState } from 'react'
import { getBetCategory } from 'src/helpers'
import dayjs from 'dayjs'

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

  React.useEffect(() => {
    getAllBids()
  }, [])

  return (
    <div>
      <Card style={{ padding: '20px' }}>
        <Typography variant='h6'>Select Game</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', marginBottom: '10px' }}>
          <div>
            <Typography>Result Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker maxDate={dayjs(today)} />
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
              <MenuItem value='active'>Open Market</MenuItem>
              <MenuItem value='inactive'>Close Market</MenuItem>
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
            >
              Go
            </Button>
          </div>
        </div>
      </Card>

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
