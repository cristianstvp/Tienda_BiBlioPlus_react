import React, { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import SidebarContainer from "../componentes/SidebarContainer";
import ContentHeader from "../componentes/ContentHeader";
import Footer from "../componentes/Footer";
import { Link } from "react-router-dom";
import APIInvoke from "../utils/APIInvoke";
import { Button, Modal } from "react-bootstrap";
import swal from "sweetalert";

const Home = () => {
  const [proyectos, setProyectos] = useState([]);
  const [show, setShow] = useState(false);
  const [codigoPrestamo, setCodigoPrestamo] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cargarProyectos = async () => {
    const response = await APIInvoke.invokeGET("/api/libro/lista");
    console.log(response);
    setProyectos(response);
  };
  useEffect(() => {
    cargarProyectos();
  }, []);

  const chunk = (arr, size) => {
    return arr.reduce((chunks, el, i) => {
      if (i % size === 0) {
        chunks.push([el]);
      } else {
        chunks[chunks.length - 1].push(el);
      }
      return chunks;
    }, []);
  };

  // Divide los libros en grupos de tres
  const librosPorFila = chunk(proyectos, 3);

  // Crea las filas con los small-box dentro de cada fila
  const filasDeLibros = librosPorFila.map((fila, index) => (
    <div key={index} className="row">
      {fila.map((libro) => (
        <div key={libro.idLibro} className="col-lg-4 col-12">
          <div className="info-box">
            <span className="info-box-icon bg-info elevation-1">
              <i className="fa fa-book"></i>
            </span>
            <div className="info-box-content">
              <h5>{libro.titulo}</h5>
              <p>Autor: {libro.autorFK?.nombre}</p>
              <p>Género: {libro.genero}</p>
              <p>Año de Publicación: {libro.anioPublicacion}</p>
              <p>Cantidad Disponible: {libro.cantidadDisponible}</p>
            </div>
            <div className="icon">
              <i className="fa fa-bookmark" />
            </div>
            <Link
              to={`/Prestamo/${libro.idLibro}`}
              className="small-box-footer"
            >
              Rentar Libro <i className="fas fa-arrow-circle-right" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  ));

  const incrementarDisponibilidad = async () => {
    try {
      if (codigoPrestamo == null) {
        throw new Error('Prestamo no encontrado');
      }
      const responseExistePrestamo = await APIInvoke.invokeGET(`/api/prestamo/lista/${parseInt(codigoPrestamo)}`
      );
      if (responseExistePrestamo !== null) {
        const responseBorrarPrestam = await APIInvoke.invokeDELETE(`/api/prestamo/${parseInt(codigoPrestamo)}`
        );
        if (
          responseExistePrestamo.idPrestamo === responseBorrarPrestam.idPrestamo
        ) {
          //borrar prestamo
          const msg = "Se Regreso el libro correctamente";
          swal({
            title: "Prestamo Borrado",
            text: msg,
            icon: "success",
            buttons: {
              confirm: {
                text: "Ok",
                value: true,
                visible: true,
                className: "btn btn-danger",
                closeModal: true,
              },
            },
          });

          //Aumentar la cantidad disponible
          const nuevoNumero =
            responseExistePrestamo.libroFK.cantidadDisponible + 1;
          const data = {
            libro: {
              idLibro: responseExistePrestamo.libroFK.idLibro,
              cantidadDisponible: nuevoNumero,
              anioPublicacion: responseExistePrestamo.libroFK.anioPublicacion,
              genero: responseExistePrestamo.libroFK.genero,
              titulo: responseExistePrestamo.libroFK.titulo,
            },
            id_autor: responseExistePrestamo.libroFK.autorFK.idAutor,
          };
          console.log(data);
          const responseLibro = await APIInvoke.invokePUT(`/api/libro/`, data);
          console.log(responseLibro);
          cargarProyectos();
        } else {
          const msg = "no se pudo eliminar el prestamo";
          swal({
            title: "Prestamo No Eliminado",
            text: msg,
            icon: "error",
            buttons: {
              confirm: {
                text: "Ok",
                value: true,
                visible: true,
                className: "btn btn-danger",
                closeModal: true,
              },
            },
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
        </Modal>;
      }
    } catch (error) {
      console.log(error);
      const msg = "No existe este usuario";
      swal({
        title: "Prestamo no encontrado",
        text: msg,
        icon: "error",
        buttons: {
          confirm: {
            text: "Ok",
            value: true,
            visible: true,
            className: "btn btn-danger",
            closeModal: true,
          },
        },
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
    <div className="wrapper">
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

      <Navbar></Navbar>
      <SidebarContainer></SidebarContainer>
      <div className="content-wrapper">
        <ContentHeader
          Titulo={"Dashboard"}
          breadcrumb1={"Inicio"}
          breadcrumb2={"Dashboard"}
          ruta={"/home"}
        />
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>Libro</h3>
                    <p>&nbsp;</p>
                  </div>
                  <div className="icon">
                    <i className="nav-icon fas fa-edit" />
                  </div>
                  <Link onClick={handleShow} className="small-box-footer">
                    regresar Libro <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">{filasDeLibros}</div>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
