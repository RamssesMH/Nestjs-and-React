import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Formulario from './Formulario';


export default function FormDialog() {
  const [open, setOpen] = React.useState(false);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div style={{ display:"flex", justifyContent: "center" , color: "Red" }}>
        <Button variant="outlined"  onClick={handleClickOpen} sx={{ m: 1, minWidth: 400, }}>
          Crear responsiva
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" >
        <DialogTitle>Responsiva</DialogTitle>
        <DialogContent >
          <DialogContentText>
            Escribe tu matricula y selecciona el tipo de responsiva a realizar.
          </DialogContentText>
          <br></br>
          <Formulario/>
        </DialogContent>
        <DialogActions sx={{
          maxHeight: '1px',
          display: 'flex',
          justifyContent: 'flex-start',
          marginLeft: '10px'
        }}>
          <Button onClick={handleClose} sx={{marginBottom: '86px',}}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
