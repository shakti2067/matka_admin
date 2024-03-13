import React, { useState } from 'react'
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

const data = [
  { id: 'Digit', age: 'Point' },
  { id: 2, age: 30 },
  { id: 4, age: 28 },
  { id: 5, age: 28 },
  { id: 6, age: 28 },
  { id: 7, age: 28 },
  { id: 8, age: 28 },
  { id: 9, age: 28 },
  { id: 10, age: 28 },
  { id: 11, age: 28 }
]

function index() {
  const transposedData = data.length > 0 ? Object.keys(data[0]).map(colName => data.map(row => row[colName])) : []
  return (
    <>
      <Card style={{ padding: '20px' }}>
        <Typography variant='h6'>Customer Sell Report</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
          <FormControl style={{ width: '14rem' }}>
            <Typography>Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker />
            </LocalizationProvider>
          </FormControl>
          <FormControl>
            <Typography>Game Name</Typography>
            <Select style={{ width: '18rem' }} defaultValue='USA'>
              <MenuItem value='USA'>USA</MenuItem>
              <MenuItem value='UK'>UK</MenuItem>
              <MenuItem value='Australia'>Australia</MenuItem>
              <MenuItem value='Germany'>Germany</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <Typography>Game Type</Typography>
            <Select style={{ width: '15rem' }} defaultValue='USA'>
              <MenuItem value='USA'>USA</MenuItem>
              <MenuItem value='UK'>UK</MenuItem>
              <MenuItem value='Australia'>Australia</MenuItem>
              <MenuItem value='Germany'>Germany</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <Typography>Session</Typography>
            <Select style={{ width: '13rem' }} defaultValue='USA'>
              <MenuItem value='USA'>USA</MenuItem>
              <MenuItem value='UK'>UK</MenuItem>
              <MenuItem value='Australia'>Australia</MenuItem>
              <MenuItem value='Germany'>Germany</MenuItem>
            </Select>
          </FormControl>
          <div style={{ display: 'flex', alignItems: 'center', paddingTop: '23px' }}>
            <Button style={{ backgroundColor: '#9155FD', color: 'white', width: '10rem', height: '3rem' }}>
              Submit
            </Button>
          </div>
        </div>
      </Card>

      <Card style={{ padding: '20px', marginTop: '20px' }}>
        <Typography style={{ textAlign: 'center', marginBottom: '20px' }}>Double Pana</Typography>
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
    </>
  )
}

export default index
