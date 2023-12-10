import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';
import { useNavigate, useParams } from 'react-router-dom';


const ProyectosEditar = () => {

    const navigate = useNavigate();
    const { idproyecto } = useParams();


    const cargarUsuario = async () => {
        const response = await APIInvoke.invokeGET(`/api/usuario/lista/${idproyecto}`)
        setProyectos(response);
    }

    const [proyectos, setProyectos] = useState({
        primerNombre: '',
        apellido: '',
        contrasena: '',
        nombreUsuario: '',
        es_admin: false
    });

    useEffect(() => {
        cargarUsuario();
    }, [idproyecto])

    const onChange = (e) => {
        setProyectos(e.target.value);

        setProyectos({ ...proyectos, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        editarProyecto();
    }

    const editarProyecto = async () => {
        const data = {
            usuarioID: parseInt(idproyecto),
            primerNombre: proyectos.primerNombre,
            apellido: proyectos.apellido,
            contrasena: proyectos.contrasena,
            nombreUsuario: proyectos.nombreUsuario,
            es_admin: Boolean(proyectos.es_admin)
        }
        const response = await APIInvoke.invokePUT(`/api/usuario/`, data);
        const idProyectoEditado = response.usuarioID;
        if (idProyectoEditado != idproyecto) {
            const msg = "No fue posible Actualizar el usuario";
            swal({
                title: 'Actualizacion Fallida',
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
        } else {
            navigate('/administracion-datos')
            const msg = "Usuario Editado";
            swal({
                title: 'OK',
                text: msg,
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
                                    placeholder="Nombre de Usuario"
                                    id="nombreUsuario"
                                    name="nombreUsuario"
                                    value={proyectos.nombreUsuario}
                                    onChange={onChange}
                                    required
                                />
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Primer Nombre"
                                    id="primerNombre"
                                    name="primerNombre"
                                    value={proyectos.primerNombre}
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
                                    value={proyectos.apellido}
                                    onChange={onChange}
                                    required
                                />
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    id="contrasena"
                                    name="contrasena"
                                    value={proyectos.contrasena}
                                    onChange={onChange}
                                    required
                                />
                            </div>

                            <div className="input-group mb-3">
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="es_admin"
                                        name="es_admin"
                                        checked={proyectos.es_admin}
                                        onChange={(e) => setProyectos({ ...proyectos, es_admin: e.target.checked })}
                                    />
                                    <label className="form-check-label" htmlFor="es_admin">¿Es administrador?</label>
                                </div>
                            </div>

                            <div className="social-auth-links text-center">
                                <button type='submit' className="btn btn-block btn-primary">
                                    Editar
                                </button>
                            </div>
                            <Link to={"/administracion-datos"} className="btn btn-block btn-secondary">
                                Ya no quiero editar
                            </Link>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );

}

export default ProyectosEditar;