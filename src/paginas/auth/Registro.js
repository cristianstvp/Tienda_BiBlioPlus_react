import React, { useState, useEffect } from "react";
import {Link, useSubmit, Navigate} from 'react-router-dom';
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";


const Registro = () => {
  const [Usuario, setUsuario] = useState({
    primerNombre :'',
    apellido : '',
    contrasena : '',
    nombreUsuario : '',
    confirmar:''
  })

  const {primerNombre,apellido,contrasena,confirmar,nombreUsuario} = Usuario;

  const onChange = (e) =>{
    setUsuario(e.target.value);

    setUsuario({ ...Usuario, [e.target.name]:e.target.value});
  }

  const [redirectLogin, setRedirectLogin] = useState(false); // Nuevo estado para la redirección

  const crearCuenta = async() =>{
    const data = {
      primerNombre: Usuario.primerNombre,
      apellido: Usuario.apellido,
      contrasena: Usuario.contrasena,
      nombreUsuario: Usuario.nombreUsuario
    }
    const response = await APIInvoke.invokePOST(`/api/usuario/`,data);
    console.log(response);
    setRedirectLogin(true);
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

  return (
    <div className="hold-transition register-page">
      <div className="register-box">
        <div className="register-logo">
          <Link to={"#"}>
            <b>Bienvenido</b> Usuario
          </Link>
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Registro</p>
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
              <Link to={"/"} className="btn btn-block btn-danger">
                Estoy Registrado
              </Link>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
