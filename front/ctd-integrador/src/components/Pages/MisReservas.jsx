import { useState, useEffect } from 'react';
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
  Checkbox,
  IconButton,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MainWrapper from '../common/MainWrapper';
import { useNavigate } from 'react-router-dom';
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
} from '../Pages/Admin/common/tableHelper';
import { MessageDialog } from '../common/MessageDialog';
import { Loader } from '../common/loader/Loader';
import { useAuthContext } from '../utils/context/AuthGlobal';
import { ReservationApi } from '../../api/reservations';

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
    id: 'idInstrument',
    numeric: true,
    disablePadding: false,
    label: 'Instrumento'
  },
  {
    id: 'fechaInicio',
    numeric: false,
    Date: true,
    disablePadding: false,
    label: 'Reserva desde'
  },
  {
    id: 'fechaFin',
    numeric: false,
    Date: true,
    disablePadding: false,
    label: 'Reserva Hasta'
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
];

const MisReservas = () => {
  const [reservations, setReservations] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('idUser');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState();
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [onButtonPressed, setOnButtonPressed] = useState();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) return;
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const response = await ReservationApi.getReservationById(user.idUser);
        const userReservations = response[0].data
        setReservations(userReservations);
        setRows(reservations);

      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [user]);

  const handleRequestSort = (event, property) => {
    handleSort(event, property, orderBy, order, setOrderBy, setOrder);
  };

  const handleSelectAllClick = (event) => {
    handleSelectAll(event, rows, 'idUser', setSelected);
  };

  const handleClick = (event, id) => {
    handleSelected(event, id, selected, setSelected);
  };



  const handleEdit = (id) => {
    navigate(`/path-to-edit-reservation/${id}`);
  };

  const handleConfirmDelete = () => {
    setMessage('¿Desea eliminar esta reserva?');
    setShowCancelButton(true);
    setOnButtonPressed(true);
    setShowMessage(true);
  };


  const handleClose = () => {
    setShowMessage(false);
    setSelected([]);
  };

  const handleDelete = async () => {
    setShowMessage(false);
    const idReservation = selected[0];

    try {
      // Simular la eliminación de la reserva
      const updatedReservations = reservations.filter(res => res.idReservation !== idReservation);
      setReservations(updatedReservations);
      setRows(updatedReservations);
      setMessage('Reserva eliminada exitosamente');
    } catch (error) {
      setMessage('No fue posible eliminar la reserva');
      console.error('Error deleting reservation:', error);
    } finally {
      setShowCancelButton(false);
      setOnButtonPressed(false);
      setShowMessage(true);
      setSelected([]);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = getEmptyRows(page, rowsPerPage, rows);

  const visibleRows = useVisibleRows(rows, order, orderBy, page, rowsPerPage);

  if (loading) return <Loader title="Cargando reservas" />;

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
                  {visibleRows &&
                    visibleRows.map((row, index) => {
                      const isItemSelected = isSelected(row.idUser, selected);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      const isRowEven = index % 2 === 0;

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
                            {row.idReservation}
                          </TableCell>
                          <TableCell align="left"><img src={row.imageUrl} alt="" width="100px" /></TableCell>
                          <TableCell align="left">{row.instrumentName}</TableCell>
                          <TableCell align="left">{row.startDate}</TableCell>
                          <TableCell align="left">{row.endDate}</TableCell>
                          <TableCell align="left">$ {row.totalPrice}</TableCell>
                          <TableCell align="left">{row.email}</TableCell>
                          <TableCell align="left">
                            <Tooltip title="Editar">
                              <IconButton
                                onClick={() => handleEdit(row.idUser)}
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
                      );
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
              labelDisplayedRows={({ from, to, count }) => getLabelDisplayedRows(from, to, count)}
            />
          </Paper>
          <MessageDialog
            open={showMessage}
            onClose={handleClose}
            onConfirm={onButtonPressed ? handleDelete : null}
            showCancelButton={showCancelButton}
            message={message}
          />
        </MainWrapper>
      )}
    </>
  );
};

export default MisReservas;
