import React from 'react'
import Navbar from '../componentes/Navbar'
import SidebarContainer from '../componentes/SidebarContainer';
import ContentHeader from '../componentes/ContentHeader';
import Footer from '../componentes/Footer';
import { Link } from 'react-router-dom';


const Home = () => {
   return (
      <div className="wrapper">
         <Navbar></Navbar>
         <SidebarContainer></SidebarContainer>
         <div className="content-wrapper">
            <ContentHeader
               Titulo={'Dashboard'}
               breadcrumb1={'Inicio'}
               breadcrumb2={'Dashboard'}
               ruta={'/home'}
            />
            <section className="content">
               <div className='container-fluid'>
                  
                  <div className='row'>
                     <div className="col-lg-3 col-6">
                        <div className="small-box bg-info">
                           <div className="inner">
                              <h3>Proyectos</h3>
                              <p>&nbsp;</p>
                           </div>
                           <div className="icon">
                              <i className="nav-icon fas fa-edit" />
                           </div>
                           <Link to={"/Proyectos-Admin"}className="small-box-footer">Ver proyectos <i className="fas fa-arrow-circle-right" /></Link>
                        </div>
                     </div>
                  </div>

               </div>
            </section>
         </div>
         <Footer></Footer>
      </div>

   )
}

export default Home;