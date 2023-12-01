import React, { useState, useEffect } from "react";
import {Link, useSubmit, Navigate} from 'react-router-dom';
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const ProyectoRegistro = () => {
    const [Usuario, setUsuario] = useState({
        idTipoDocumento : '',
        numeroDocumento : '',
        email : '',
        nombre :'',
        password : '',
        nombreUsuario : '',
        confirmar:''
      })
    
      const {idTipoDocumento,numeroDocumento,email,nombre,password,confirmar,nombreUsuario} = Usuario;
    
      const onChange = (e) =>{
        setUsuario(e.target.value);
    
        setUsuario({ ...Usuario, [e.target.name]:e.target.value});
      }
    
      const [redirectLogin, setRedirectLogin] = useState(false); // Nuevo estado para la redirección
    
      const crearCuenta = async() =>{
        const data = {
          nombre: Usuario.nombre,
          idTipoDocumento: Usuario.idTipoDocumento,
          numeroDocumento: Usuario.numeroDocumento,
          nombreUsuario: Usuario.nombreUsuario,
          email: Usuario.email,
          password: Usuario.password
        }
        const response = await APIInvoke.invokePOST(`/api/usuarios/`,data);
        console.log(response);
        setRedirectLogin(true);
      }
    
      const onSubmit = (e) =>{
        e.preventDefault();
        crearCuenta();
      }
    
      useEffect(() => {
        document.getElementById("nombre").focus();
      }, [])
      
      if (redirectLogin) {
        return <Navigate to="/Proyectos-Admin" />;
      }
    
      return (
        <div className="hold-transition register-page">
          <div className="register-box">
            <div className="register-logo">
              <Link to={"#"}>
                <b>Crear</b> Usuario
              </Link>
            </div>
            <div className="card">
              <div className="card-body register-card-body">
                <p className="login-box-msg">Admin</p>
                  <form onSubmit={onSubmit}>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre completo"
                        id="nombre"
                        name="nombre"
                        value={nombre}
                        onChange={onChange}
                        required
                      />
                    </div>
    
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre de Usuario"
                        id="nombreUsuario"
                        name="nombreUsuario"
                        value={nombreUsuario}
                        onChange={onChange}
                        required
                      />
                    </div>
    
                    <div className="input-group mb-3">
                      <select
                        className="form-control"
                        value={idTipoDocumento}
                        id="idTipoDocumento"
                        name="idTipoDocumento"
                        onChange={onChange}
                        required
                        >
                        <option value="">Selecciona un tipo de documento</option>
                        <option value="5">Cédula</option>
                        <option value="6">Tarjeta</option>
                        <option value="7">Pasaporte</option>
                        </select>
                    </div>
    
                    <div className="input-group mb-3">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Numero de documento"
                        id="numeroDocumento"
                        name="numeroDocumento"
                        value={numeroDocumento}
                        onChange={onChange}
                        required
                      />
                    </div>
    
                    <div className="input-group mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                      />
                    </div>
    
                    <div className="input-group mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        id="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className="input-group mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Repite tu contraseña"
                        id="confirmar"
                        name="confirmar"
                        value={confirmar}
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className="social-auth-links text-center">
                    <button type='submit' className="btn btn-block btn-primary">
                      Crear Usuario
                    </button>
                  </div>
                  <Link to={"/Proyectos-Admin"} className="btn btn-block btn-danger">
                    Regresar a Proyectos
                  </Link>
                </form>
                
              </div>
            </div>
          </div>
        </div>
  )
}

export default ProyectoRegistro