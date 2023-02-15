// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import CircularProgress from '@mui/material/CircularProgress';
// import {useState} from 'react'
// import axios from 'axios'




// function sleep(delay = 0) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// }




// export default function Matricula() {
//   const [open, setOpen] = React.useState(false);
//   const [options, setOptions] = React.useState([]);
//   const loading = open && options.length === 0;
//   const [usuarios, setUsuarios]= useState([]);

//   const peticionGet=async() => {
//     await axios.get('https://api.sampleapis.com/coffee/hot')
//     .then(response=>{
//       setUsuarios(response.data);
//     }).catch(error=>{
//       console.log(error);
//     })
//   }



//   React.useEffect(() => {
//     let active = true;

//     if (!loading) {
//       return undefined;
//     }
    
//     (async () => {
//       await sleep(1e3); // For demo purposes.

//       if (active) {
//         setOptions([...usuarios]);
//       }
//     })();

//     return () => {
//       active = false;
//     };
//   }, [loading]);
  
//   React.useEffect(() => {
//     peticionGet();
//   },[])


//   React.useEffect(() => {
//     if (!open) {
//       setOptions([]);
//     }
//   }, [open]);

//   return (
//     <Autocomplete sx={{ minWidth: "40%" }}
//       id="Matricula"
//       open={open}
//       onOpen={() => {
//         setOpen(true);
//       }}
//       onClose={() => {
//         setOpen(false);
//       }}
//       isOptionEqualToValue={(option, value) => option.title === value.title}
//       getOptionLabel={(option) => option.title}
//       options={options}
//       loading={loading}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label="Matricula"
//           InputProps={{
//             ...params.InputProps,
//             endAdornment: (
//               <React.Fragment>
//                 {loading ? <CircularProgress color="inherit" size={20} /> : null}
//                 {params.InputProps.endAdornment}
//               </React.Fragment>
//             ),
//           }}
//         />
//       )}
//     />
//   );
// }

// // Top films as rated by IMDb users. http://www.imdb.com/chart/top
