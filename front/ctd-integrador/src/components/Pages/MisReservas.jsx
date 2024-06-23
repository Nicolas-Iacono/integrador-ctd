import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import MainWrapper from '../common/MainWrapper'
import {
  EnhancedTableHead,
  getLabelDisplayedRows,
  isSelected,
  handleSort,
  handleSelected,
  getEmptyRows,
  useVisibleRows
} from '../Pages/Admin/common/tableHelper'
import { MessageDialog } from '../common/MessageDialog'
import { Loader } from '../common/loader/Loader'
import { useAuthContext } from '../utils/context/AuthGlobal'
import { ReservationApi } from '../../api/reservations'
import { Code } from '../../api/constants'
import dayjs from 'dayjs'

const headCells = [
  {
    id: 'idReservation',
    numeric: true,
    disablePadding: false,
    label: 'ID Reserva'
  },
  {
    id: 'idUser',
    numeric: true,
    disablePadding: false,
    label: 'Imagen'
  },
  {
    id: 'instrumentName',
    numeric: true,
    disablePadding: false,
    label: 'Instrumento'
  },
  {
    id: 'idInstrument',
    numeric: true,
    disablePadding: false,
    label: 'Instrumento',
    hidden: true
  },
  {
    id: 'startDate',
    numeric: false,
    Date: true,
    disablePadding: false,
    label: 'Inicio'
  },
  {
    id: 'endDate',
    numeric: false,
    Date: true,
    disablePadding: false,
    label: 'Entrega'
  },
  {
    id: 'totalPrice',
    numeric: true,
    disablePadding: false,
    label: 'Precio Total'
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'email'
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Acciones'
  }
]

const MisReservas = () => {
  const [reservations, setReservations] = useState()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('number')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState()
  const [showCancelButton, setShowCancelButton] = useState(false)
  const [onButtonPressed, setOnButtonPressed] = useState()
  const { user } = useAuthContext()

  useEffect(() => {
    if (!user) return

    getReservations()
  }, [user])

  useEffect(() => {
    if (!reservations) return

    setRows(reservations.data)
    setLoading(false)
  }, [reservations])

  const getReservations = () => {
    setLoading(true)
    ReservationApi.getReservationById(user.idUser, [])
      .then(([data, _]) => {
        setReservations(data)
      })
      .catch(([_, code]) => {
        setReservations({ data: [] })
      })
  }

  const handleRequestSort = (event, property) => {
    handleSort(event, property, orderBy, order, setOrderBy, setOrder)
  }

  const handleClick = (event, id) => {
    handleSelected(event, id, selected, setSelected)
  }

  const handleConfirmDelete = () => {
    setMessage('¿Desea eliminar esta reserva?')
    setShowCancelButton(true)
    setOnButtonPressed(true)
    setShowMessage(true)
  }

  const handleClose = () => {
    setShowMessage(false)
    setSelected([])
  }

  const handleDelete = () => {
    setShowMessage(false)
    const idReservation = selected[0]
    const reservation = rows.filter(
      (rows) => rows.idReservation === idReservation
    )

    if (!reservation.length > 0) return

    ReservationApi.deleteReservation(
      reservation[0]?.idInstrument,
      user.idUser,
      idReservation
    )
      .then(() => {
        setMessage('Reserva eliminada exitosamente')
        setShowCancelButton(false)
        setOnButtonPressed(false)
      })
      .catch(([error, code]) => {
        setMessage(
          code === Code.NOT_FOUND
            ? 'Reserva no encontrada.'
            : 'No fue posible eliminar reserva.'
        )
        setShowCancelButton(false)
        setOnButtonPressed(false)
      })
      .finally(() => {
        setSelected([])
        setShowMessage(true)
        getReservations()
      })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows = getEmptyRows(page, rowsPerPage, rows)

  const visibleRows = useVisibleRows(rows, order, orderBy, page, rowsPerPage)

  if (loading) return <Loader title="Cargando reservas" />

  return (
    <MainWrapper sx={{ width: '100%', minHeight: '90vh' }}>
      <Paper
        sx={{
          width: '100%',
          mb: 2
        }}
      >
        <TableContainer>
          <Table
            sx={{ minWidth: { xs: '100%', md: 750 } }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
              disableSelectAll
            />
            <TableBody>
              {visibleRows &&
                visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.idUser, selected)
                  const labelId = `enhanced-table-checkbox-${index}`
                  const isRowEven = index % 2 === 0

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.idReservation}
                      selected={isItemSelected}
                      sx={{
                        cursor: 'pointer',
                        backgroundColor: isRowEven ? '#fbf194' : 'inherit'
                      }}
                      onClick={(event) => handleClick(event, row.idReservation)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.idReservation}
                      </TableCell>
                      <TableCell align="left">
                        <img src={row.imageUrl} alt="" width="100px" />
                      </TableCell>
                      <TableCell align="left">{row.instrumentName}</TableCell>
                      <TableCell sx={{ display: 'none' }} align="left">
                        {row.idInstrument}
                      </TableCell>
                      <TableCell align="left">
                        {dayjs(row.startDate).format('DD-MM-YYYY')}
                      </TableCell>
                      <TableCell align="left">
                        {dayjs(row.endDate).format('DD-MM-YYYY')}
                      </TableCell>
                      <TableCell align="left">$ {row.totalPrice}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">
                        <Tooltip title="Eliminar">
                          <IconButton onClick={handleConfirmDelete}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows
                  }}
                >
                  <TableCell colSpan={9} />
                </TableRow>
              )}
              {page === 0 && rows.length === 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows
                  }}
                >
                  <TableCell colSpan={9}>
                    <Typography align="center">
                      No se encontraron reservas
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={getLabelDisplayedRows}
        />
      </Paper>
      <MessageDialog
        title="Eliminar reserva"
        message={message}
        isOpen={showMessage}
        buttonText="Ok"
        onClose={handleClose}
        onButtonPressed={() =>
          onButtonPressed ? handleDelete() : handleClose()
        }
        showCancelButton={showCancelButton}
      />
    </MainWrapper>
  )
}

export default MisReservas
