import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {

  // Obtener los datos del usuario del localStorage
  const datosUsuario = localStorage.getItem('DatosUsuario');
  const usuario = JSON.parse(datosUsuario);

  return (
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <li className="nav-item">
          <Link to="/home" className="nav-link">
            <i className="nav-icon fas fa-list" />
            <p>
              Inicio
            </p>
          </Link>
        </li>
        {usuario.es_admin && (
          <li className="nav-item">
            <Link to="/administracion-datos/" className="nav-link">
              <i className="nav-icon fas fa-edit" />
              <p>Admin</p>
            </Link>
          </li>
        )}
    </ul>
    </nav>
  );
};

export default Menu;
