import React, { useState, useEffect, useMemo } from 'react';
import { alpha } from '@mui/material/styles';
import '../styles/instruments.styles.css';
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
  IconButton,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { visuallyHidden } from '@mui/utils';
import { useNavigate } from 'react-router-dom';

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const headCells = [
  {
    id: 'number',
    numeric: true,
    disablePadding: false,
    label: 'No',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Nombre',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Acciones',
  },
];

const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={headCell.id === 'actions' ? 'actions-header-cell' : ''}
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
  );
};

export const Instruments = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('number');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstruments = async () => {
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              { id: 1, name: 'Guitarra' },
              { id: 2, name: 'Piano' },
              { id: 3, name: 'Violín' },
              { id: 4, name: 'Bateria' },

            ]),
          1000
        )
      );
      setRows(response);
      setLoading(false);
    };

    fetchInstruments();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleEdit = (id) => {
    navigate(`/editarInstrumento/${id}`);
  };

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleAdd = () => {
    navigate('/añadirInstrumento');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [rows, order, orderBy, page, rowsPerPage]
  );

  if (loading) return <p>Loading...</p>;

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'absolute', bottom: 0 }}>
      <Paper sx={{ width: '100%', mb: 2, maxWidth: 1200 }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
        </Toolbar>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
  {visibleRows.map((row, index) => {
    const labelId = `enhanced-table-checkbox-${index}`;
    const isRowEven = index % 2 === 0;

    return (
      <TableRow
        hover
        tabIndex={-1}
        key={row.id}
        className={isRowEven ? 'table-row-even' : 'table-row-odd'}
        sx={{ cursor: 'pointer' }}
      >
        <TableCell component="th" id={labelId} scope="row" align="center">
          {page * rowsPerPage + index + 1}
        </TableCell>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left" className="actions-cell">
          <Tooltip title="Editar">
            <IconButton onClick={() => handleEdit(row.id)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton onClick={() => handleDelete(row.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Añadir">
            <IconButton onClick={handleAdd}>
              <AddIcon />
            </IconButton>
          </Tooltip>             
        </TableCell>
      </TableRow>
    );
  })}
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
        />
      </Paper>
    </Box>
  );
};

export default Instruments;
