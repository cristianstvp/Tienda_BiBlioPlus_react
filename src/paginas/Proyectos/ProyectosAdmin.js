import React, { useState, useEffect } from 'react'
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import APIInvoke from '../../utils/APIInvoke';
import swal from "sweetalert";
import { Link } from 'react-router-dom';

const ProyectosAdmin = () => {
    const [proyectos, setProyectos] = useState([]);

    const cargarProyectos = async () => {
        const response = await APIInvoke.invokeGET('/api/usuarios/list')
        console.log(response);
        setProyectos(response);
    }

    useEffect(() => {
        cargarProyectos();
    }, [])

    const eliminarProyecto = async (e, idProyecto) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/usuarios/${idProyecto}`);
        console.log(response)
        if (response.id == idProyecto) {
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
            cargarProyectos();
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
        <div className="content-wrapper">
            <ContentHeader
                Titulo={'Listado Proyectos'}
                breadcrumb1={'Inicio'}
                breadcrumb2={'Dashboard'}
                ruta={'/home'}
            />
            <section className="content">
                <div className='container-fluid'>
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title"><Link to={"/Proyectos-Registro"} className="btn btn-block btn-primary">Crear Usuario</Link></h3>
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
                            Start creating your amazing application!
                        </div>
                        <div className="card-footer">
                            Footer
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Responsive Hover Table</h3>
                                    <div className="card-tools">
                                        <div className="input-group input-group-sm" style={{ width: 150 }}>
                                            <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                                            <div className="input-group-append">
                                                <button type="submit" className="btn btn-default">
                                                    <i className="fas fa-search" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th >Usuario</th>
                                                <th>Tipo Documento</th>
                                                <th>Numero Documento</th>
                                                <th>Nombre</th>
                                                <th>Email</th>
                                                <th>Password</th>
                                                <th>Opciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                proyectos.map(
                                                    item =>
                                                        <tr key={item.id}>
                                                            <td>{item.id}</td>
                                                            <td>{item.nombreUsuario}</td>
                                                            <td>{item.idTipoDocumento.tipo}</td>
                                                            <td>{item.numeroDocumento}</td>
                                                            <td>{item.nombre}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.password}</td>
                                                            <td>
                                                                <Link to={`/Proyectos-editar/${item.id}@${item.nombreUsuario}@${item.idTipoDocumento.id_tipodocumento}@${item.numeroDocumento}@${item.nombre}@${item.email}@${item.password}`} className='btn btn-sm btn-primary'>Editar</Link>&nbsp;&nbsp;
                                                                <button onClick={(e) => eliminarProyecto(e, item.id)} className='btn btn-sm btn-danger'>Borrar</button>
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

export default ProyectosAdmin;