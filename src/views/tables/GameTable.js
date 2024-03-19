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
import { Button, FormControlLabel, FormGroup } from '@mui/material'
import moment from 'moment'
import { useRouter } from 'next/router'
import { updateBatCategory } from 'src/helpers'

const GameTable = ({ columns = [], rows = [], refreshPage }) => {
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
      betCategoryId: event.target.value,
      isActive: event.target.checked
    }

    updateBatCategory(params)
      .then(data => {
        refreshPage()
      })
      .catch(err => {
        console.log(err, 'this is error')
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
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={rowIndex}>
                  {columns.map((column, index) => {
                    const value = row[column.id]

                    return (
                      <TableCell key={index} align={column.align} onClick={() => {}}>
                        {column.id === 'isActive' ? (
                          // <Switch checked={value} />
                          <Switch checked={row.isActive} value={row._id} onClick={handleActiveChange} />
                        ) : column.id === 'no' ? (
                          <span>{rowIndex + 1}</span>
                        ) : column.id === 'action' ? (
                          <div>
                            <Button
                              variant='contained'
                              style={{ marginRight: 5, color: 'white' }}
                              //   onClick={() => {
                              //     router.push('/bids/create')
                              //   }}
                              onClick={() => {
                                router.push({
                                  pathname: '/bids/create',
                                  query: { gameData: JSON.stringify(row) }
                                })
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant='contained'
                              style={{ color: 'white' }}
                              onClick={() => {
                                router.push({
                                  pathname: '//bids/marketoffday',
                                  query: { gameId: 'gameid' }
                                })
                              }}
                            >
                              market off day
                            </Button>
                          </div>
                        ) : column.id === 'isTransfer' ? (
                          <Switch checked={value} />
                        ) : column.id === 'createdAt' ? (
                          moment(value).format('YYYY-MM-DD')
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default GameTable
