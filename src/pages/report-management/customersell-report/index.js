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
  TablePagination
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputBox from 'src/components/InputBox'
import dayjs from 'dayjs'
import { customerSellReport, getAllBets, getBetCategory } from 'src/helpers'

const data = [
  { id: 'Digit', age: 'Point' },
  { id: 0, age: 0 },
  { id: 1, age: 0 },
  { id: 2, age: 0 },
  { id: 3, age: 0 },
  { id: 4, age: 0 },
  { id: 5, age: 0 },
  { id: 6, age: 0 },
  { id: 7, age: 0 },
  { id: 8, age: 0 },
  { id: 9, age: 0 }
]
const singeDigit = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const chunkArray = (arr, chunkSize) => {
  const chunks = []
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize))
  }
  return chunks
}

function CustomerSellReportPage() {
  const transposedData = singeDigit.length > 0 ? Object.keys(data[0]).map(colName => data.map(row => row[colName])) : []

  const today = new Date()

  let [bid, setBid] = useState([])
  const [selectedGameValue, setSelectedGameValue] = useState(0)
  const [selectedGameType, setSelectedGameType] = useState(0)
  const [gameTypeData, setGameTypeData] = useState(0)
  const [selectedMarketTimeValue, setSelectedMarketTimeValue] = useState(0)
  const [customerReport, setCustomerReport] = useState([])
  const [selectedDate, setSelectDate] = useState(dayjs(today))
  const [error, setError] = useState('')

  const jodiDigit = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '60',
    '61',
    '62',
    '63',
    '64',
    '65',
    '66',
    '67',
    '68',
    '69',
    '70',
    '71',
    '72',
    '73',
    '74',
    '75',
    '76',
    '77',
    '78',
    '79',
    '80',
    '81',
    '82',
    '83',
    '84',
    '85',
    '86',
    '87',
    '88',
    '89',
    '90',
    '91',
    '92',
    '93',
    '94',
    '95',
    '96',
    '97',
    '98',
    '99'
  ]
  console.log('customerReport', customerReport)

  const handleGameSelectChange = event => {
    setSelectedGameValue(event.target.value)
  }

  const handleGameTypeSelectChange = event => {
    setSelectedGameType(event.target.value)
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
          console.log('Error while fetching bids')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  let getAllGames = () => {
    getAllBets()
      .then(data => {
        if (data.success) {
          setGameTypeData(data.data)
        } else {
          console.log('error')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  let validator = () => {
    if (selectedGameValue == 0) {
      setError('Please select game name')
      return false
    } else if (selectedMarketTimeValue == 0) {
      setError('Please select market session ')
      return false
    } else {
      setError('')
      return true
    }
  }

  const customerSellReportApi = () => {
    console.log('validator', validator())
    if (validator()) {
      if (selectedGameType == 0) {
        selectedGameType = ''
      }
      let params = {
        date: selectedDate,
        betCategoryId: selectedGameValue,
        betId: selectedGameType,
        state: selectedMarketTimeValue
      }

      console.log('params', params)

      customerSellReport(params)
        .then(data => {
          if (data.success) {
            console.log('data', data.data)
            setCustomerReport(data.data)
          } else {
            console.log('error', data.message)
          }
        })
        .catch(e => {
          console.log('e', e)
        })
    }
  }

  const jodiDigitChunks = chunkArray(jodiDigit, 10)

  useEffect(() => {
    getAllBids()
    getAllGames()
  }, [])

  return (
    <>
      <Card style={{ padding: '20px' }}>
        <Typography variant='h6'>Customer Sell Report</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
          <FormControl style={{ width: '14rem' }}>
            <Typography>Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                maxDate={dayjs(today)}
                value={dayjs(selectedDate)}
                onChange={newValue => setSelectDate(dayjs(newValue).format('YYYY-MM-DD'))}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl>
            <Typography>Game Name</Typography>
            <Select style={{ width: '18rem' }} value={selectedGameValue} onChange={handleGameSelectChange}>
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
            <Typography>Game Type</Typography>
            <Select style={{ width: '15rem' }} value={selectedGameType} onChange={handleGameTypeSelectChange}>
              <MenuItem value={0}>All Type</MenuItem>
              {gameTypeData &&
                gameTypeData.map(d => (
                  <MenuItem key={d._id} value={d._id}>
                    {d.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl>
            <Typography>Session</Typography>

            <Select style={{ width: '13rem' }} value={selectedMarketTimeValue} onChange={handleMarketTimeChange}>
              <MenuItem value={0}>-- Select Session --</MenuItem>
              <MenuItem value='OPEN'>Open Market</MenuItem>
              <MenuItem value='CLOSE'>Close Market</MenuItem>
            </Select>
          </FormControl>
          <div style={{ display: 'flex', alignItems: 'center', paddingTop: '23px' }}>
            <Button
              style={{ backgroundColor: '#9155FD', color: 'white', width: '10rem', height: '3rem' }}
              onClick={customerSellReportApi}
            >
              Submit
            </Button>
          </div>
        </div>
        {error ? <Typography color='red'>{error}</Typography> : null}
      </Card>
      {/* <Card style={{ padding: '20px', marginTop: '20px' }}>
        <Typography style={{ textAlign: 'center', marginBottom: '20px' }}>Single Digit</Typography>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {transposedData.map((column, columnIndex) => (
              <tr key={columnIndex}>
                {customerReport.map((value, cellIndex) => (
                  <td
                    style={{ border: '1px solid black', textAlign: 'center', borderCollapse: 'collapse' }}
                    // key={cellIndex}
                  >
                    <span style={{ color: 'red' }}>{value._id}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card> */}
      <Card style={{ padding: '20px', marginTop: '20px' }}>
        <Typography style={{ textAlign: 'center', marginBottom: '20px' }}>Single digit</Typography>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {transposedData.map((column, columnIndex) => (
              <tr key={columnIndex}>
                {column.map((value, cellIndex) => (
                  <td
                    style={{ border: '1px solid black', textAlign: 'center', borderCollapse: 'collapse' }}
                    key={cellIndex}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* <Card style={{ padding: '20px', marginTop: '20px' }}>
        <Typography style={{ textAlign: 'center', marginBottom: '20px' }}>Jodi digit</Typography>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {jodiDigitChunks.map((chunk, chunkIndex) => (
              <tr key={chunkIndex}>
                <td style={{ border: '1px solid black', textAlign: 'center', borderCollapse: 'collapse' }}>digit</td>
                <td style={{ border: '1px solid black', textAlign: 'center', borderCollapse: 'collapse' }}>point</td>
                {chunk.map((value, cellIndex) => (
                  <React.Fragment key={cellIndex}>
                    <td style={{ border: '1px solid black', textAlign: 'center', borderCollapse: 'collapse' }}>
                      {value}
                    </td>
                    <td style={{ border: '1px solid black', textAlign: 'center', borderCollapse: 'collapse' }}>
                      {value}
                    </td>
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card> */}
    </>
  )
}

export default CustomerSellReportPage
