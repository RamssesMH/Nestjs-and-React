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

export default function CustomizedTables() {


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
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Nombre</StyledTableCell>
            <StyledTableCell align="center">Matricula</StyledTableCell>
            <StyledTableCell align="center">Sistema</StyledTableCell>
            <StyledTableCell align="center">Rol</StyledTableCell>
            <StyledTableCell align="right">Generar responsiva</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((usuario) => (
            <StyledTableRow key={usuario.id}>
              <StyledTableCell component="th" scope="row" align='center'>
                {usuario.nombre}
              </StyledTableCell>
              <StyledTableCell align="center">{usuario.matricula}</StyledTableCell>
              <StyledTableCell align="center">{usuario.tipoResponsiva}</StyledTableCell>
              <StyledTableCell align="center">{usuario.rol}</StyledTableCell>
              <StyledTableCell align="right"><Button variant="contained" onClick={() => handleClick(usuario._id)}>Generar</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
