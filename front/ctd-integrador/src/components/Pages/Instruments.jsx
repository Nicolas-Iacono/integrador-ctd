import { useState, useEffect } from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Checkbox
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'
import { getInstruments, deleteInstrument } from '../../api/instruments'
import { removeImage } from '../../api/images'
import MainWrapper from '../common/MainWrapper'
import { MessageDialog } from '../common/MessageDialog'
import {
  EnhancedTableHead,
  EnhancedTableToolbar,
  getLabelDisplayedRows,
  isSelected,
  handleSort,
  handleSelectAll,
  handleSelected,
  getEmptyRows,
  useVisibleRows
} from './Admin/common/tableHelper'

import '../styles/instruments.styles.css'

const headCells = [
  {
    id: 'idInstrument',
    numeric: true,
    disablePadding: false,
    label: 'ID'
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Nombre'
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Acciones'
  }
]

export const Instruments = () => {
  const [instruments] = getInstruments()
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
  const navigate = useNavigate()

  useEffect(() => {
    if (!instruments) return

    setRows(instruments.data)
    setLoading(false)
  }, [instruments])

  const handleAdd = () => {
    navigate('/agregarInstrumento')
  }

  const handleSelectAllClick = (event) => {
    handleSelectAll(event, rows, 'idInstrument', setSelected)
  }

  const handleClick = (event, id) => {
    handleSelected(event, id, selected, setSelected)
  }

  const handleRequestSort = (event, property) => {
    handleSort(event, property, orderBy, order, setOrderBy, setOrder)
  }

  const handleEdit = (id) => {
    navigate(`/editarInstrumento/${id}`)
  }

  const handleConfirmDelete = () => {
    setMessage('¿Desea eliminar este instrumento?')
    setShowCancelButton(true)
    setOnButtonPressed(true)
    setShowMessage(true)
  }

  const handleDelete = () => {
    setShowMessage(false)
    removeImages().then(() => {
      deleteSelectedInstrument()
    })
  }

  const deleteSelectedInstrument = () => {
    const idInstrument = selected[0]

    deleteInstrument(idInstrument)
      .then(() => {
        setMessage('Instrumento eliminado exitosamente')
        setShowCancelButton(false)
        setOnButtonPressed(false)
      })
      .catch(() => {
        setMessage(
          'No fue posible eliminar instrumento. Por favor, vuelva a intentarlo'
        )
        setShowCancelButton(false)
        setOnButtonPressed(false)
      })
      .finally(() => {
        setSelected([])
        setShowMessage(true)
      })
  }

  const removeImages = () => {
    return new Promise((resolve, reject) => {
      const idInstrument = selected[0]
      const instrument = rows.filter((row) => row.idInstrument === idInstrument)
      const images = instrument[0].imageUrls
      const imagesToUpdate = []

      if (images.length === 0) resolve()

      images.forEach((image) => {
        removeImage(image.idImage, idInstrument)
          .then(() => {
            imagesToUpdate.push('ok')
          })
          .catch(() => {
            imagesToUpdate.push('nok')
          })
          .finally(() => {
            if (imagesToUpdate.length === images.length) {
              resolve()
            }
          })
      })
    })
  }

  const handleClose = () => {
    setShowMessage(false)
    setSelected([])
  }

  const handleDeletes = () => {
    console.log('SELECTED', selected)
    setRows(rows.filter((row) => row.id !== id))
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = getEmptyRows(page, rowsPerPage, rows)

  const visibleRows = useVisibleRows(rows, order, orderBy, page, rowsPerPage)

  if (loading) return <p>Loading...</p>

  return (
    <MainWrapper>
      <Paper
        sx={{
          display: { xs: 'none', lg: 'initial' },
          width: '100%',
          mb: 2,
          maxWidth: 1200
        }}
      >
        <EnhancedTableToolbar
          title="Instrumentos"
          titleAdd="Agregar instrumento"
          handleAdd={handleAdd}
          numSelected={selected.length}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.idInstrument, selected)
                const labelId = `enhanced-table-checkbox-${index}`
                const isRowEven = index % 2 === 0

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.idInstrument}
                    selected={isItemSelected}
                    className={isRowEven ? 'table-row-even' : 'table-row-odd'}
                    sx={{ cursor: 'pointer' }}
                    onClick={(event) => handleClick(event, row.idInstrument)}
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
                      align="center"
                    >
                      {row.idInstrument}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left" className="actions-cell">
                      <Tooltip title="Editar">
                        <IconButton
                          onClick={() => handleEdit(row.idInstrument)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
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
                  <TableCell colSpan={6} />
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
          labelRowsPerPage="Filas por página"
          labelDisplayedRows={getLabelDisplayedRows}
        />
      </Paper>
      <Box
        sx={{
          display: { xs: 'flex', lg: 'none' },
          height: '100vh'
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="h6"
          textAlign="center"
          sx={{
            paddingTop: 30,
            fontWeight: 'bold'
          }}
        >
          Funcionalidad no disponible en esta resolución
        </Typography>
      </Box>
      <MessageDialog
        title="Eliminar Instrumento"
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

export default Instruments
