import React, { useState, useEffect } from 'react'
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import APIInvoke from '../../utils/APIInvoke';
import { Link, useParams, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Modal, Button } from 'react-bootstrap';

const Prestamo = () => {
    const { id } = useParams(); // Obtener la ID del libro de la URL
    //Obtener codigo prestamo
    const [show, setShow] = useState(false);
    const [codigoPrestamo, setCodigoPrestamo] = useState('');
    const handleClose = () => setShow(false);
    // porque quite el boton de regresar libro esto no se usa
    // const handleShow = () => setShow(true);
    //obtener datos usuario
    const datosUsuario = localStorage.getItem('DatosUsuario');
    const usuario = JSON.parse(datosUsuario);
    //Libro
    const [Libro, setLibro] = useState([]);
    const Navigate = useNavigate();
    const cargarLibro = async () => {
        const response = await APIInvoke.invokeGET(`/api/libro/lista/${id}`)
        console.log(response);
        setLibro(response);
    }

    useEffect(() => {
        cargarLibro();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])


    const decrementarDisponibilidad = async () => {
        
        // Realiza alguna lógica para enviar el nuevo número al backend y actualizarlo en la base de datos
        if (Libro.cantidadDisponible > 0) {
            const nuevoNumero = Libro.cantidadDisponible - 1;
            const data = {
                libro: {
                    idLibro: id,
                    cantidadDisponible: nuevoNumero,
                    anioPublicacion: Libro.anioPublicacion,
                    genero: Libro.genero,
                    titulo: Libro.titulo
                },
                id_autor: Libro.autorFK.idAutor
            }
            const response = await APIInvoke.invokePUT(`/api/libro/`, data);

            PrestamoRealizado(response);
            Navigate('/home');
        } else {
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
        }
    };

    const PrestamoRealizado = async (response) => {
        const fechaActual = obtenerFechaActual(); // Obtener la fecha actual en formato 'YYYY-MM-DD'
        const fechaUnaSemanaDespues = obtenerFechaUnaSemanaDespues(); // Obtener la fecha una semana después en formato 'YYYY-MM-DD'

        const dataPrestamo = {
            prestamo: {
                fechaPrestamo: fechaActual,
                fechaDevolucion: fechaUnaSemanaDespues
            },
            id_libro: response.idLibro,
            id_usuario: usuario.usuarioID
        }

        const responsePrestamo = await APIInvoke.invokePOST(`/api/prestamo/`, dataPrestamo);

        const msg = "Señor usuario, por favor conserve el codigo de su prestamo: ";
        swal({
            title: 'Prestamo Realizado',
            text: `${msg} ${responsePrestamo.idPrestamo}`,
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

    const obtenerFechaActual = () => {
        const fechaActual = new Date();
        const year = fechaActual.getFullYear();
        const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Sumar 1 porque los meses van de 0 a 11
        const day = fechaActual.getDate().toString().padStart(2, '0');

        const fechaEnFormato = `${year}-${month}-${day}`;
        return fechaEnFormato;
    };

    const obtenerFechaUnaSemanaDespues = () => {
        const fechaActual = new Date();
        fechaActual.setDate(fechaActual.getDate() + 7);

        const year = fechaActual.getFullYear();
        const month = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
        const day = fechaActual.getDate().toString().padStart(2, '0');

        const fechaEnFormato = `${year}-${month}-${day}`;
        return fechaEnFormato;
    };

    const incrementarDisponibilidad = async () => {
        try {
            if(codigoPrestamo === null){
                throw new Error('Prestamo no encontrado');
            }
            const responseExistePrestamo = await APIInvoke.invokeGET(`/api/prestamo/lista/${parseInt(codigoPrestamo)}`)
            if (responseExistePrestamo !== null) {
                const responseBorrarPrestam = await APIInvoke.invokeDELETE(`/api/prestamo/${parseInt(codigoPrestamo)}`)
                if (responseExistePrestamo.idPrestamo === responseBorrarPrestam.idPrestamo) {

                    //borrar prestamo
                    const msg = "Se Regreso el libro correctamente";
                    swal({
                        title: 'Prestamo Borrado',
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

                    //Aumentar la cantidad disponible
                    const nuevoNumero = Libro.cantidadDisponible + 1;
                    const data = {
                        libro: {
                            idLibro: id,
                            cantidadDisponible: nuevoNumero,
                            anioPublicacion: Libro.anioPublicacion,
                            genero: Libro.genero,
                            titulo: Libro.titulo
                        },
                        id_autor: Libro.autorFK.idAutor
                    }
                    // eslint-disable-next-line no-unused-vars
                    const responseLibro = await APIInvoke.invokePUT(`/api/libro/`, data);

                    Navigate('/home');

                } else {
                    const msg = "no se pudo eliminar el prestamo";
                    swal({
                        title: 'Prestamo No Eliminado',
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
            } else {
                <Modal onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>No se encontro El codigo </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        }
        catch (error) {
            const msg = "No existe este usuario";
            swal({
                title: 'Prestamo no encontrado',
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

    const handleGuardar = () => {
        // Aquí puedes manejar la lógica para guardar el código de préstamo (codigoPrestamo)
        console.log(`Código de préstamo ingresado: ${codigoPrestamo}`);
        handleClose();
        incrementarDisponibilidad();
    };

    

    return (
        
        <div className="wrapper" style={{ backgroundColor: '#767FA7' }}>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Ingresa el código del préstamo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                type="text"
                placeholder="Código de préstamo"
                value={codigoPrestamo}
                onChange={(e) => setCodigoPrestamo(e.target.value)}
                className="form-control"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleGuardar}>
                Guardar
              </Button>
            </Modal.Footer>
          </Modal>
      
          <Navbar style={{ backgroundColor: '#767FA7' }}></Navbar>
          <SidebarContainer style={{ backgroundColor: '#767FA7' }}></SidebarContainer>
          <div className="content-wrapper" style={{ backgroundColor: '#C2D4DB' }}>
            <ContentHeader
              Titulo={'Prestamo'}
              breadcrumb1={'Inicio'}
              breadcrumb2={'Dashboard'}
              ruta={'/home'}
              style={{ color: '#fff' }} // Cambia el color del texto si es necesario
            />
            <section className="content">
              <div className="container-fluid">
                <div className="card" style={{ backgroundColor: '#3FCADD' }}>
                  <div className="card-header">
                    <h3 className="card-title">Libro</h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                        title="Collapse">
                        <i className="fas fa-minus" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="remove"
                        title="Remove">
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body"style={{ backgroundColor: '#F9F3DC' }} >
                    <p>ID del libro: {id}</p>
                    <h2>{Libro.titulo}</h2>
                    <p>Autor: {Libro.autorFK && Libro.autorFK.nombre}</p>
                    <p>Género: {Libro.genero}</p>
                    <p>Año de Publicación: {Libro.anioPublicacion}</p>
                    <p>Cantidad Disponible: {Libro.cantidadDisponible}</p>
                  </div>
                  <div className="card-footer">
                    {Libro.cantidadDisponible !== 0 ? (
                      <p>Disponible para Prestar</p>
                    ) : (
                      <p>No hay disponibilidad</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="card" style={{ backgroundColor: '#F9F3DC' }}>
                  <div className="card-header">
                    <h3 className="card-title">Acciones</h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                        title="Collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="remove"
                        title="Remove"
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={decrementarDisponibilidad}
                    >
                      Pedir prestado
                    </button>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <Link
                      to={"/home"}
                      className="btn btn-info"
                      style={{ color: '#fff' }} // Cambia el color del texto si es necesario
                    >
                      Regresar
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Footer style={{ backgroundColor: '#767FA7' }}></Footer>
        </div>
      );
      
};

export default Prestamo;