import { useState, useEffect, useMemo } from 'react'
import { alpha } from '@mui/material/styles'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'
import { Edit } from '@mui/icons-material'
import { visuallyHidden } from '@mui/utils'
import MainWrapper from '../../common/MainWrapper'
import { UsersApi } from '../../../api/users'
import { useNavigate } from 'react-router-dom'

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const headCells = [
  {
    id: 'idUser',
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
    id: 'lastName',
    numeric: false,
    disablePadding: false,
    label: 'Apellido'
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

const EnhancedTableHead = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props
  const navigate = useNavigate()

  const handleAdd = () => {
    navigate('/agregarUsuario')
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} seleccionado{numSelected > 1 ? 's' : ''}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Usuarios
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Agregar usuario">
          <IconButton onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

export const Usuarios = () => {
  const [usuarios] = UsersApi.getAllUsers()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('idUser')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const navigate = useNavigate()

  useEffect(() => {
    if (!usuarios) return

    if (usuarios) {
      setRows(usuarios.data)
      setLoading(false)
    }
  }, [usuarios])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.idUser)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const handleEdit = (idUser) => {
    navigate(`/editarUsuario/${idUser}`)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (idUser) => selected.indexOf(idUser) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [rows, order, orderBy, page, rowsPerPage]
  )

  const getLabelDisplayedRows = ({ from, to, count }) => {
    {
      return `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <>
      {!loading && (
        <MainWrapper sx={{ width: '100%' }}>
          <Paper
            sx={{
              display: { xs: 'none', lg: 'initial' },
              width: '100%',
              mb: 2
            }}
          >
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="medium"
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {visibleRows &&
                    visibleRows.map((row, index) => {
                      const isItemSelected = isSelected(row.idUser)
                      const labelId = `enhanced-table-checkbox-${index}`
                      const isRowEven = index % 2 === 0

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.idUser}
                          selected={isItemSelected}
                          sx={{
                            cursor: 'pointer',
                            backgroundColor: isRowEven ? '#fbf194' : 'inherit'
                          }}
                          onClick={(event) => handleClick(event, row.idUser)}
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
                            {row.idUser}
                          </TableCell>
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">{row.lastName}</TableCell>
                          <TableCell align="left">{row.email}</TableCell>
                          <TableCell align="left">
                            <Tooltip title="Editar">
                              <IconButton
                                onClick={() => handleEdit(row.idUser)}
                              >
                                <Edit />
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
        </MainWrapper>
      )}
    </>
  )
}
