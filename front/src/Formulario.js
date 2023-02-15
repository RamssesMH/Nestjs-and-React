import * as React from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import {useState, useEffect} from 'react'
import axios from 'axios'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import swal from 'sweetalert';

const tabla = 'http://127.0.0.1/api/catalogos/empleados?q=';



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

const Formulario = () => {
  
  const [open, setOpen] = React.useState(false);  
  var [usuarios, setUsuarios]= useState([]);

  var [busca, setInputBusca] = useState("");
  var [urlTabla, setUrlTabla] = useState('http://127.0.0.1/api/catalogos/empleados?q=');
  urlTabla = tabla + busca


  useEffect(async()=>{
    setUrlTabla(()=> tabla+busca);
    const data = await promesaurl(urlTabla);
    setUsuarios(data);
  },[busca])


  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let fecha = `${year}-${month}-${day}`;
  const [mat, setInputMat] = useState("");
  const [name, setInputName] = useState("");
  const [rfc, setInputRfc] = useState("");
  const [rol, setInputRol] = useState("");
  const [usr, setInputUsr] = useState("");
  const [tr, setInputTr] = useState("");
  const [data, setData] = useState({
    matricula: "",
    nombre: "",
    rfc: "",
    rol: "",
    usuario: "",
    tipoResponsiva: "",
    fecha: "",
    codigo: "",
  })
   
  const handleSubmit = () => {

    var cont= tr.length
    cont--;
    var sist=''
    var cod
    var matT = mat.split("::")
    data.matricula = matT[0]
    data.nombre = name
    data.rfc = rfc
    data.rol = rol
    data.usuario = usr
    data.fecha = fecha
    // console.log(data)

    while (cont >= 0) {
      sist=tr[cont]
      cod= matT[0] + sist;
      data.codigo = cod
      data.tipoResponsiva = sist
      // console.log (data)
      const postUrl ='http://localhost:3001/api/responsivas/'
      axios.post(postUrl, data).then(res => {
        if(res.status==201){
          swal('Bien', 'Tu responsiva fue creada con exito', 'success')
        }
        this.setState({ status: true });
      })
      .catch(function (error) {
        // console.log(error.response.status);
        
        if(error.response.status==500){
          swal('Error', 'Esta responsiva ya fue creada anteriormente', 'error')
        }
        if(error.response.status==400){
          swal('Advertencia', 'Ingresa datos validos', 'warning')
        }
      });
      cont --;
    }

  }


  const MenuProps = {
    PaperProps: {
      style: {
        // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(' ,') : value,
    );
  };

  const names = [
    'FANUEVO',
    'SIRE',
    'HCEMP',
  ];

    return(
      
      <Box>
        <div>
          <FormControl  sx={{ justifyContent: "left", width: '28.7%'}}>
          <Autocomplete sx={{m:0.97 }}
            value={setData.mat} 
            onChange={(event, newValue) => {
              setInputMat(newValue.descripcionbusqueda)
            }}
            size="false"
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            getOptionLabel={(option) => option.descripcionbusqueda}
            options={usuarios}
            id="matricula"
            
            renderInput={(params) => (
              <TextField 
                {...params}
                label="Matricula"
                onChange={(e) => {setInputBusca(e.target.value);}}
                InputProps={{
                  ...params.InputProps,
                }}
              />
            )}
          />
          </FormControl>
          
          <TextField sx={{m: 1,}} onChange={(e) => setInputName(e.target.value)} value={setData.nombre}id="nombre" label="Nombre" variant="outlined" />
          <TextField sx={{m: 1,}} helperText="Longitud de 12-13 caracteres" value={setData.ref} onChange={(e) => setInputRfc(e.target.value)}id="rfc"  label="RFC" variant="outlined" />
        </div>
        <div>
        <FormControl sx={{ m: 1, justifyContent: "rigth", width: 210 }}>
        <InputLabel id="demo-multiple-checkbox-label">Sistemas</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="tipoResponsiva"
          multiple
          value={personName}
          onChange={(e) => { handleChange(e); setInputTr(e.target.value);  } }
          input={<OutlinedInput label="Sistemas" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
          <TextField sx={{m: 1,}} value={setData.rol} onChange={(e) => setInputRol(e.target.value)} id="rol" label="Rol" variant="outlined" />
          <TextField sx={{m: 1,}} value={setData.usr} onChange={(e) => setInputUsr(e.target.value)} id="usuario" label="Usuario" variant="outlined" />

        </div>
        <div align='right'>
          <br></br>
          <Button
            color='primary'
            variant='contained'
            onClick={ handleSubmit }
          >
          Guardar
          </Button>
        </div>
      </Box>
    );
}
export default Formulario;