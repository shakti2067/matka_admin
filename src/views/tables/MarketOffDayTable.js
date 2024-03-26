// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Switch from '@mui/material/Switch'
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material'
import moment from 'moment'
import { useRouter } from 'next/router'
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import dayjs from 'dayjs'

const MarketOffDayTable = ({ columns = [], rows = [], onChange = () => {} }) => {
  // ** States
  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 700 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={index} align={column.align} sx={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, rowIndex) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={rowIndex}>
                    {columns.map((column, index) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={index} align={column.align} onClick={() => {}}>
                          {column.id === 'no' ? (
                            <Checkbox
                              checked={row?.isActive}
                              value={row?.isActive}
                              onChange={() => {
                                onChange('isActive', !row.isActive, rowIndex)
                              }}
                            />
                          ) : column.id === 'day' ? (
                            row.day
                          ) : column.id === 'todayOpen' ? (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <Box components={['TimePicker']}>
                                <TimePicker
                                  value={dayjs(row.startTime, 'hh:mm A')}
                                  onChange={newValue => {
                                    onChange('startTime', dayjs(newValue).format('hh:mm A'), rowIndex)
                                  }}
                                />
                              </Box>
                            </LocalizationProvider>
                          ) : column.id === 'todayClose' ? (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <Box components={['TimePicker']}>
                                <TimePicker
                                  value={dayjs(row.endTime, 'hh:mm A')}
                                  onChange={newValue => {
                                    onChange('endTime', dayjs(newValue).format('hh:mm A'), rowIndex)
                                  }}
                                />
                              </Box>
                            </LocalizationProvider>
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
      </Paper>
    </>
  )
}

export default MarketOffDayTable
