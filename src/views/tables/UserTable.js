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
import { Button, FormControlLabel, FormGroup, Typography } from '@mui/material'
import moment from 'moment'
import { useRouter } from 'next/router'
import { updateUser } from 'src/helpers'

const UserTable = ({ columns = [], rows = [], refreshPage }) => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const router = useRouter()

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleActiveChange = event => {
    let params = {
      userId: event.target.value,
      isActive: event.target.checked
      // isDeleted: !event.target.checked
    }

    updateUser(params)
      .then(data => {
        if (data.success) {
          console.log('data', data)
          refreshPage()
        } else {
          console.log('error')
        }
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const handleTransferChange = event => {
    let params = {
      userId: event.target.value,
      isTransfer: event.target.checked
    }

    updateUser(params)
      .then(data => {
        if (data.success) {
          console.log('data', data)
          refreshPage()
        } else {
          console.log('error')
        }
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const handleDeleteUser = event => {
    let params = {
      userId: event.target.value,
      isDeleted: event.target.checked,
      isActive: !event.target.checked
    }

    updateUser(params)
      .then(data => {
        if (data.success) {
          console.log('data', data)
          refreshPage()
        } else {
          console.log('error')
        }
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const handleBettingChange = event => {
    let params = {
      userId: event.target.value,
      isBetting: event.target.checked
    }

    updateUser(params)
      .then(data => {
        if (data.success) {
          console.log('data', data)
          refreshPage()
        } else {
          console.log('error')
        }
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  return (
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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => {
              // console.log('row', row)
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={rowIndex}>
                  {columns.map((column, index) => {
                    const value = row[column.id]

                    return (
                      <TableCell key={index} align={column.align}>
                        {column.id === 'isActive' ? (
                          <Switch checked={row.isActive} value={row._id} onClick={handleActiveChange} />
                        ) : column.id === 'name' ? (
                          <Typography
                            style={{ color: 'blue', cursor: 'pointer' }}
                            onClick={() => {
                              // router.push('/users/userdetails')
                              router.push({
                                pathname: '/users/userdetails',
                                query: { userId: row._id }
                                // query: { user: '' }
                              })
                            }}
                          >
                            {value}
                          </Typography>
                        ) : column.id === 'no' ? (
                          <span>{rowIndex + 1}</span>
                        ) : column.id === 'isBetting' ? (
                          <Switch checked={row.isBetting} value={row._id} onClick={handleBettingChange} />
                        ) : column.id === 'isTransfer' ? (
                          <Switch checked={row.isTransfer} value={row._id} onClick={handleTransferChange} />
                        ) : column.id === 'isDeleted' ? (
                          <Switch checked={row.isDeleted} value={row._id} onClick={handleDeleteUser} />
                        ) : column.id === 'createdAt' ? (
                          moment(value).format('YYYY-MM-DD')
                        ) : column.format && typeof value === 'number' ? (
                          column.format(value)
                        ) : (
                          <span>{value}</span>
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default UserTable
