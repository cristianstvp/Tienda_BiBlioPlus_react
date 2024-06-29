import React, { useState, useEffect } from 'react'
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import APIInvoke from '../../utils/APIInvoke';
import swal from "sweetalert";
import { Link } from 'react-router-dom';

const PanelAdministracion = () => {
    const [usuario, setUsuario] = useState([]);
    const [autores, setAutores] = useState([]);
    const [libros, setLibros] = useState([]);
    const [prestamos, setPrestamos] = useState([]);

    const cargarUsuario = async () => {
        const response = await APIInvoke.invokeGET('/api/usuario/lista')
        console.log("Usuario");
        console.log(response);
        setUsuario(response);
    }

    const cargarAutores = async () => {
        const response = await APIInvoke.invokeGET('/api/autor/lista')
        console.log(response);
        setAutores(response);
    }

    const cargarLibros = async () => {
        const response = await APIInvoke.invokeGET('/api/libro/lista')
        console.log(response);
        setLibros(response);
    }

    const cargarPrestamos = async () => {
        const response = await APIInvoke.invokeGET('/api/prestamo/lista')
        console.log(response);
        setPrestamos(response);
    }

    useEffect(() => {
        cargarUsuario();
        cargarAutores();
        cargarLibros();
        cargarPrestamos();
    }, [])

    const eliminarUsuario = async (e, idUsuario) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/usuario/${idUsuario}`);
        console.log(response)
        if (Number(response.usuarioID) === Number(idUsuario)) {
            const msg = "El Usuario fue borrado exitosamente"
            swal({
                title: 'El usuario fue borrado',
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
            cargarUsuario();
        } else {
            const msg = "El usuario no fue borrado"
            swal({
                title: 'Error',
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
            cargarUsuario();
        }
    }

    const eliminarAutor = async (e, idAutor) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/autor/${idAutor}`);
        console.log(response)
        if (Number(response.idAutor) === Number(idAutor)) {
            const msg = "El Autor fue borrado exitosamente"
            swal({
                title: 'El Autor fue borrado',
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
            cargarAutores();
        } else {
            const msg = "El usuario no fue borrado"
            swal({
                title: 'Error',
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
        }
    }

    const eliminarLibro = async (e, idLibro) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/libro/${idLibro}`);
        console.log(response)
        if (Number(response.idLibro) === Number(idLibro)) {
            const msg = "El Autor fue borrado exitosamente"
            swal({
                title: 'El Autor fue borrado',
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
            cargarLibros();
        } else {
            const msg = "El usuario no fue borrado"
            swal({
                title: 'Error',
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
        }
    }

    const eliminarPrestamo = async (e, idPrestamo) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/prestamo/${idPrestamo}`);
        console.log(response)
        if (Number(response.idPrestamo) === Number(idPrestamo)) {
            const msg = "El Autor fue borrado exitosamente"
            swal({
                title: 'El Autor fue borrado',
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
            cargarPrestamos();
        } else {
            const msg = "El usuario no fue borrado"
            swal({
                title: 'Error',
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
        }
    }

    return (<div className="wrapper">
        <Navbar></Navbar>
        <SidebarContainer></SidebarContainer>
        <div className="content-wrapper" style={{ backgroundColor: '#FAD4F8' }}>
            <ContentHeader
                Titulo={'Administracion de Tablas'}
                breadcrumb1={'Inicio'}
                breadcrumb2={'Dashboard'}
                ruta={'/home'}
            />
            <section className="content">
                <div className='container-fluid'>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header" style={{ backgroundColor: '#DAFDFF' }}>
                                    <h3 className="card-title">Tabla de Usuarios</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                        <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                            <i className="fas fa-times" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover text-nowrap"style={{ backgroundColor: '#DAFDFF' }}>
                                        <thead>
                                            <tr>
                                                <th>usuario ID</th>
                                                <th >Primer Nombre</th>
                                                <th>Apellido</th>
                                                <th>Nombre Usuario</th>
                                                <th>contrasena</th>
                                                <th>Admin</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                usuario.map(
                                                    item =>
                                                        <tr key={item.usuarioID}>
                                                            <td>{item.usuarioID}</td>
                                                            <td>{item.primerNombre}</td>
                                                            <td>{item.apellido}</td>
                                                            <td>{item.nombreUsuario}</td>
                                                            <td>{item.contrasena}</td>
                                                            <td>{item.es_admin? 'Sí' : 'No'}</td>
                                                            <td>
                                                                <Link to={`/Proyectos-editar/${item.usuarioID}`} className="btn btn-sm btn-success" >Editar</Link>&nbsp; &nbsp; &nbsp;
                                                                <button onClick={(e) => eliminarUsuario(e, item.usuarioID)} className='btn btn-sm btn-danger'>Borrar</button>
                                                            </td>
                                                        </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header" style={{ backgroundColor: '#D4FAE6' }}>
                                    <h3 className="card-title">Tabla de Autores</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                        <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                            <i className="fas fa-times" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover text-nowrap" style={{ backgroundColor: '#D4FAE6' }}>
                                        <thead>
                                            <tr>
                                                <th>Autor ID</th>
                                                <th >Nombre</th>
                                                <th>Nacionalidad</th>
                                                <th>Fecha Nacimiento</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                autores.map(
                                                    item =>
                                                        <tr key={item.idAutor}>
                                                            <td>{item.idAutor}</td>
                                                            <td>{item.nombre}</td>
                                                            <td>{item.nacionalidad}</td>
                                                            <td>{item.fechaNacimiento}</td>
                                                            <td>
                                                                <Link to={`/Proyectos-editar/${item.usuarioID}`} className="btn btn-sm btn-success" >Editar</Link>&nbsp; &nbsp; &nbsp;
                                                                <button onClick={(e) => eliminarAutor(e, item.idAutor)} className='btn btn-sm btn-danger'>Borrar</button>
                                                            </td>
                                                        </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header" style={{ backgroundColor: '#DFD4FA' }}>
                                    <h3 className="card-title">Tabla de Libros</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                        <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                            <i className="fas fa-times" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover text-nowrap" style={{ backgroundColor: '#DFD4FA' }}>
                                        <thead>
                                            <tr>
                                                <th>Libro ID</th>
                                                <th >Titulo</th>
                                                <th>Autor</th>
                                                <th>genero</th>
                                                <th>Año de Publicacion</th>
                                                <th>Cantidad Disponible</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                libros.map(
                                                    item =>
                                                        <tr key={item.idLibro}>
                                                            <td>{item.idLibro}</td>
                                                            <td>{item.titulo}</td>
                                                            <td>{item.autorFK.nombre}</td>
                                                            <td>{item.genero}</td>
                                                            <td>{item.anioPublicacion}</td>
                                                            <td>{item.cantidadDisponible}</td>
                                                            <td>
                                                                <Link to={`/Proyectos-editar/${item.usuarioID}`} className="btn btn-sm btn-success" >Editar</Link>&nbsp; &nbsp; &nbsp;
                                                                <button onClick={(e) => eliminarLibro(e, item.idLibro)} className='btn btn-sm btn-danger'>Borrar</button>
                                                            </td>
                                                        </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header"style={{ backgroundColor: '#FAD4D4' }}>
                                    <h3 className="card-title">Tabla de Prestamos</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                        <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                            <i className="fas fa-times" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover text-nowrap" style={{ backgroundColor: '#FAD4D4' }}>
                                        <thead>
                                            <tr>
                                                <th>Prestamo ID</th>
                                                <th>Usuario</th>
                                                <th>Libro</th>
                                                <th>Fecha Prestamo</th>
                                                <th>Fecha Devolucion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                prestamos.map(
                                                    item =>
                                                        <tr key={item.idPrestamo}>
                                                            <td>{item.idPrestamo}</td>
                                                            <td>{item.usuarioFK.nombreUsuario}</td>
                                                            <td>{item.libroFK.titulo}</td>
                                                            <td>{item.fechaPrestamo}</td>
                                                            <td>{item.fechaDevolucion}</td>
                                                            <td>
                                                                <Link to={`/Proyectos-editar/${item.usuarioID}`} className="btn btn-sm btn-success" >Editar</Link>&nbsp; &nbsp; &nbsp;
                                                                <button onClick={(e) => eliminarPrestamo(e, item.idPrestamo)} className='btn btn-sm btn-danger'>Borrar</button>
                                                            </td>
                                                        </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
        <Footer></Footer>
    </div>);
}

export default PanelAdministracion;