import React, {Fragment} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./paginas/auth/Login";
import Registro from "./paginas/auth/Registro";
import Home from "./paginas/Home";
import ProyectosAdmin from "./paginas/Proyectos/ProyectosAdmin";
import ProyectoRegistro from "./paginas/Proyectos/ProyectoRegistro";
import ProyectosEditar from "./paginas/Proyectos/ProyectosEditar";

function App() {

  return (
    <Fragment> 
      <Router>
        <Routes>
          <Route path="/" exact element={<Login/>}/>
          <Route path="/Registro" exact element={<Registro/>}/>
          <Route path="/home" exact element={<Home/>}/>
          <Route path="/Proyectos-Admin" exact element={<ProyectosAdmin/>}/>
          <Route path="/Proyectos-Registro" exact element={<ProyectoRegistro/>}/>
          <Route path="/Proyectos-editar/:idproyecto" exact element={<ProyectosEditar/>}/>

        </Routes>
      </Router>
    </Fragment>/* actua como un div */
  );
}

export default App;
