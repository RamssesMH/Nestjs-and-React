import React from 'react'
import ResponsiveAppBar from './AppBar';
import TablaDatos from './Buscador';
import FormDialog from './Modal';
// FC
const PrimeraApp = () => {


    return (
    <>
        <ResponsiveAppBar />
        <FormDialog />
        <TablaDatos/>
    </>
    );


}



export default PrimeraApp;



