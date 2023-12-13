import React, { useState, useEffect } from "react";
import {Link, Navigate} from 'react-router-dom';
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";
import fondoregistro from '../../images/fondoregistro.png'
import logo from '../../images/logo-removebg-preview.png'

const Registro = () => {
  const [Usuario, setUsuario] = useState({
    primerNombre :'',
    apellido : '',
    contrasena : '',
    nombreUsuario : '',
    es_admin: false,
    confirmar:''
  })

  const {primerNombre,apellido,contrasena,confirmar,nombreUsuario} = Usuario;

  const onChange = (e) =>{
    setUsuario(e.target.value);

    setUsuario({ ...Usuario, [e.target.name]:e.target.value});
  }

  const [redirectLogin, setRedirectLogin] = useState(false); // Nuevo estado para la redirección

  const crearCuenta = async() =>{
    
    if (Usuario.contrasena !== Usuario.confirmar) {
      // Manejar el caso en que las contraseñas no coinciden
      console.log("Las contraseñas no coinciden");
      const msg = "Las contraseñas no coinciden";
      swal({
        title: 'Wrong',
        text: msg,
        icon: 'error',
        buttons: {
          confirm: {
            text: 'Ok',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      });

      return;
    }
    
    const data = {
      primerNombre: Usuario.primerNombre,
      apellido: Usuario.apellido,
      contrasena: Usuario.contrasena,
      nombreUsuario: Usuario.nombreUsuario,
      es_admin:false
    }
    const response = await APIInvoke.invokePOST(`/api/usuario/`,data);
    setRedirectLogin(true);

    const msg = "Te damos la bienbenida";
      swal({
        title: 'Inicio Exitoso',
        text: `${msg},  ${response.primerNombre}`,
        icon: 'success',
        buttons: {
          confirm: {
            text: 'Ok',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      });

  }

  const onSubmit = (e) =>{
    e.preventDefault();
    crearCuenta();
  }

  useEffect(() => {
    document.getElementById("primerNombre").focus();
  }, [])
  
  if (redirectLogin) {
    return <Navigate to="/" />;
  }

  const RegistroContainerStyle = {
    backgroundImage: `url(${fondoregistro})`,
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
  <div style={RegistroContainerStyle}>
    
    <div className="hold-transition register-page" style={{ backgroundColor: '#F9E698' }}>
      <div className="register-box">
        <div className="register-logo" style={{ backgroundColor: '#F9E698' }}>
        <img src={logo} alt="Logo" className="mb-4 mx-auto d-block" />
          <Link to={"#"}>
            <b>Sing</b> Up
          </Link>
        </div>
        
        <div className="card" style={{ backgroundColor: '#767FA7' }}>
          <div className="card-body register-card-body" style={{ backgroundColor: '#FFFFFF' }}>
            <p className="login-box-msg">Register</p>
              <form onSubmit={onSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Primer Nombre"
                    id="primerNombre"
                    name="primerNombre"
                    value={primerNombre}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Apellido"
                    id="apellido"
                    name="apellido"
                    value={apellido}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre de usuario"
                    id="nombreUsuario"
                    name="nombreUsuario"
                    value={nombreUsuario}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    id="contrasena"
                    name="contrasena"
                    value={contrasena}
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
                <div className="row">
                  <div className="col-8">
                    <div className="icheck-primary">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        name="terms"
                        defaultValue="agree"
                      />
                      <label htmlFor="agreeTerms">
                        Acepto los <Link to={"#"}>Terminos y Condiciones</Link>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="social-auth-links text-center">
                <button type='submit' className="btn btn-block btn-primary">
                  Registrarme
                </button>
              </div>
              <Link to={"/"} className="btn btn-block btn-warning">
                Estoy Registrado
              </Link>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Registro;
