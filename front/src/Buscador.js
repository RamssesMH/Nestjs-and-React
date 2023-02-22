import TextField from '@mui/material/TextField';
import axios from 'axios'
import { useState, useEffect} from 'react'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';



function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const tabla = 'http://localhost:3001/api/responsivas/';


const promesaurl = (urlTabla) => {
  return new Promise(async(resolve, reject) => {
    try {
      let data = await axios.get(urlTabla)
      resolve(data.data)
    }
    catch {
      reject([])
    }
  });
};


const handleClick = (id) => {
  window.open('http://localhost:3001/api/responsivas/pdf/download/' + id)
}

const handleChange = async (item) => {
  const voteupdate = { status: '' };
  if (item.status == "activo") {
    voteupdate.status="inactivo"
    console.log(voteupdate)

  }
  else {
    voteupdate.status="activo"
    console.log(voteupdate)
  }
  const { data } = await axios.patch("http://localhost:3001/api/responsivas/"+item._id, voteupdate);
  console.log (data)
}

export default function CustomizedTables() {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  var [busca, setInputBusca] = useState("");
  var [urlTabla, setUrlTabla] = useState('http://localhost:3001/api/responsivas/');
  urlTabla = tabla + busca
  const [usuarios, setUsuarios] = useState([]);


  useEffect(async()=>{
    setUrlTabla(()=> tabla+busca);
    const data = await promesaurl(urlTabla);
    setUsuarios(data);
  },[])
  



  const handleTable = async() => {
    setUrlTabla(() => tabla+busca);
    const data =  await promesaurl( urlTabla );
    setUsuarios(data);
  }

  const handleRefresh = async() => {
    const data =  await promesaurl( tabla );
    setUsuarios(data);
  }
  return (


    <TableContainer component={Paper} sx={{ marginBlock: '15px' }}>
      <TextField onChange={(e) => setInputBusca(e.target.value)} size='small' sx={{ m: 1, }} label="Buscar" variant="outlined" />
      <Button onClick={() => handleTable()} size='small' variant="contained" color='primary' sx={{ marginTop: '12px', minWidth: 100, }}>
        Buscar
      </Button>
      <Button onClick={() => handleRefresh()} size='small' variant="contained" color='primary' sx={{ marginTop: '12px', minWidth: 100, marginLeft: '27%'}}>
        actualizar tabla
      </Button>
      <Grid item xs={6} md={4}>
        <h3>{usuarios.length} Resultados disponibles</h3>
        </Grid>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ width: '25%' }}align='center'>Nombre</StyledTableCell>
            <StyledTableCell align="center">Matricula</StyledTableCell>
            <StyledTableCell align="center">Sistema</StyledTableCell>
            <StyledTableCell align="center">Rol</StyledTableCell>
            <StyledTableCell align="center">estatus</StyledTableCell>
            <StyledTableCell style={{ width: 90 }} align="right">Cambiar status</StyledTableCell>
            <StyledTableCell style={{ width: 130 }}align="right">Generar responsiva</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
            ? usuarios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : usuarios
          ).map((usuario) => (
            <StyledTableRow key={usuario._id}>
              <StyledTableCell component="th" scope="row" align='center'>
                {usuario.nombre}
              </StyledTableCell>
              <StyledTableCell  align="center">{usuario.matricula}</StyledTableCell>
              <StyledTableCell align="center">{usuario.tipoResponsiva}</StyledTableCell>
              <StyledTableCell align="center">{usuario.rol}</StyledTableCell>
              <StyledTableCell align="center">{usuario.status}</StyledTableCell>
              <StyledTableCell align="right"><Button variant="contained" onClick={() => handleChange(usuario)}>Cambiar</Button></StyledTableCell>
              <StyledTableCell align="right"><Button variant="contained" onClick={() => handleClick(usuario._id)}>Generar</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={usuarios.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'registros por pagina',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
