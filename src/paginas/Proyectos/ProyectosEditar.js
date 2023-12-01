import React, { useState, useEffect } from 'react'
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import APIInvoke from '../../utils/APIInvoke';
import swal from "sweetalert";
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

const ProyectosEditar = () => {

    const navigate = useNavigate();

    const { idproyecto } = useParams();

    let arreglo = idproyecto.split('@');
    const idUs = arreglo[0];
    const NombreUs = arreglo[1];
    const idTipoDocUs = arreglo[2];
    const NumDocUs = arreglo[3];
    const nombreCompletoUs = arreglo[4];
    const emailUs = arreglo[5];
    const passwordUs = arreglo[6];

    const [proyectos, setProyectos] = useState({
        idTipoDocumento: idTipoDocUs,
        numeroDocumento: NumDocUs,
        nombre: nombreCompletoUs,
        password: passwordUs,
        nombreUsuario: NombreUs,
        email: emailUs
    });

    const { idTipoDocumento, numeroDocumento, email, nombre, password, confirmar, nombreUsuario } = proyectos;

    useEffect(() => {
        document.getElementById("nombre").focus();
    }, [])

    const onChange = (e) => {
        setProyectos(e.target.value);

        setProyectos({ ...proyectos, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        editarProyecto();
    }

    const editarProyecto = async () => {
        let arreglo = idproyecto.split('@');
        const idProyecto = arreglo[0];

        const data = {
            id:idProyecto,
            idTipoDocumento: proyectos.idTipoDocumento,
            numeroDocumento: proyectos.numeroDocumento,
            nombre: proyectos.nombre,
            password: proyectos.password,
            nombreUsuario: proyectos.nombreUsuario,
            email: proyectos.email
        }

        const response = await APIInvoke.invokePUT(`/api/usuarios/`, data);
        const idProyectoEditado = response.id;
        console.log(response);
        if (idProyectoEditado != idProyecto) {
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
            navigate('/Proyectos-Admin')
            const msg = "Usuario Creado";
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
                            <div className="social-auth-links text-center">
                                <button type='submit' className="btn btn-block btn-primary">
                                    Registrarme
                                </button>
                            </div>
                            <Link to={"/Proyectos-Admin"} className="btn btn-block btn-danger">
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