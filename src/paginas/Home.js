import React, { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import SidebarContainer from "../componentes/SidebarContainer";
import ContentHeader from "../componentes/ContentHeader";
import Footer from "../componentes/Footer";
import { Link } from "react-router-dom";
import APIInvoke from "../utils/APIInvoke";

const Home = () => {
  const [proyectos, setProyectos] = useState([]);

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
          <span className="info-box-icon bg-info elevation-1"><i className="fa fa-book"></i></span>
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
              to={`/Proyectos-Admin/${libro.idLibro}`}
              className="small-box-footer"
            >
              Rentar Libro <i className="fas fa-arrow-circle-right" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  ));

  return (
    <div className="wrapper">
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
                    <h3>Proyectos</h3>
                    <p>&nbsp;</p>
                  </div>
                  <div className="icon">
                    <i className="nav-icon fas fa-edit" />
                  </div>
                  <Link to={"/Proyectos-Admin"} className="small-box-footer">
                    Ver proyectos <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="row">
               <div className="col-12">
                  {filasDeLibros}
               </div>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
