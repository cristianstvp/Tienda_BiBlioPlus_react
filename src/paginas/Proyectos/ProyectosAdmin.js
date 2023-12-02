import React, { useState, useEffect } from 'react'
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import APIInvoke from '../../utils/APIInvoke';
import { Link, Navigate, useParams, useNavigate  } from 'react-router-dom';
import swal from 'sweetalert';

const ProyectosAdmin = () => {
    const { id } = useParams(); // Obtener la ID del libro de la URL

    const [proyectos, setProyectos] = useState([]);
    const Navigate = useNavigate();
    const cargarProyectos = async () => {
        const response = await APIInvoke.invokeGET(`/api/libro/lista/${id}`)
        console.log(response);
        setProyectos(response);
    }

    useEffect(() => {
        cargarProyectos();
    }, [id])

    const decrementarNumero = async () => {
        const nuevoNumero = proyectos.cantidadDisponible - 1;
        // Realiza alguna lógica para enviar el nuevo número al backend y actualizarlo en la base de datos
        if (nuevoNumero === 0 ) {
            const msg = "No fue posible realizar esta accion";
            swal({
                title: 'No hay disponibilidad por el momento',
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
            const data = {
                libro:{
                    idLibro:id,
                    cantidadDisponible: nuevoNumero,
                    anioPublicacion: proyectos.anioPublicacion,
                    genero: proyectos.genero,
                    titulo:proyectos.titulo
                },
                id_autor:proyectos.autorFK.idAutor
            }
            console.log(data)
            const response = await APIInvoke.invokePUT(`/api/libro/`, data);
            console.log(response);
            {
                const msg = "Se realizo el prestamo del libro";
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
            Navigate('/home');
        }
        
    };

    const incrementarNumero = async () => {
        const nuevoNumero = proyectos.cantidadDisponible + 1;
        // Realiza alguna lógica para enviar el nuevo número al backend y actualizarlo en la base de datos
        if (nuevoNumero>=0) {
            const data = {
                libro:{
                    idLibro:id,
                    cantidadDisponible: nuevoNumero,
                    anioPublicacion: proyectos.anioPublicacion,
                    genero: proyectos.genero,
                    titulo:proyectos.titulo
                },
                id_autor:proyectos.autorFK.idAutor
            }
            console.log(data)
            const response = await APIInvoke.invokePUT(`/api/libro/`, data);
            console.log(response);
            {
                const msg = "Se regreso el libro";
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
            Navigate('/home');
        } else {
            const msg = "No fue posible realizar esta accion";
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
        
    };
    
    return (<div className="wrapper">
        <Navbar></Navbar>
        <SidebarContainer></SidebarContainer>
        <div className="content-wrapper">
            <ContentHeader
                Titulo={'Prestamo'}
                breadcrumb1={'Inicio'}
                breadcrumb2={'Dashboard'}
                ruta={'/home'}
            />
            <section className="content">
                <div className='container-fluid'>
                    <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Libro</h3>{/**<Link to={"/Proyectos-Registro"} className="btn btn-block btn-primary">Crear Usuario</Link> */}
                                <div className="card-tools">
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                        <i className="fas fa-minus" />
                                    </button>
                                    <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                        <i className="fas fa-times" />
                                    </button>
                                </div>
                            </div>
                        <div className="card-body">
                            <p>ID del libro: {id}</p>
                            <h2>{proyectos.titulo}</h2>
                            <p>Autor: {proyectos.autorFK && proyectos.autorFK.nombre}</p>
                            <p>Género: {proyectos.genero}</p>
                            <p>Año de Publicación: {proyectos.anioPublicacion}</p>
                            <p>Cantidad Disponible: {proyectos.cantidadDisponible}</p>
                        </div>
                        <div className="card-footer">
                            {proyectos.cantidadDisponible !== 0 ? (
                                <p>Disponible para Prestar</p>
                            ) : (
                                <p>No hay disponibilidad</p>
                            )}
                        </div>
                    </div>

                </div>
                <div className='container-fluid'>
                    <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Acciones</h3>{/**<Link to={"/Proyectos-Registro"} className="btn btn-block btn-primary">Crear Usuario</Link> */}
                                <div className="card-tools">
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                        <i className="fas fa-minus" />
                                    </button>
                                    <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                        <i className="fas fa-times" />
                                    </button>
                                </div>
                            </div>
                        <div className="card-body">
                            <button type='submit' className="btn btn-success" onClick={decrementarNumero}>Predir prestado</button>    
                            &nbsp; &nbsp; &nbsp; &nbsp; 
                            <Link to={"/home"} className="btn btn-info">regresar</Link>
                            &nbsp; &nbsp; &nbsp; &nbsp; 
                            <button type='submit' className="btn btn-success" onClick={incrementarNumero}>Regresar libro</button>    
                        </div>
                    </div>

                </div>
            </section>
        </div>
        <Footer></Footer>
    </div>);
}

export default ProyectosAdmin;