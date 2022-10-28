import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom"

import './App.css';
import LoginForm from './pages/LoginForm.jsx';
import CodeVerification from './pages/CodeVerification.jsx';
import RegisterForm from './pages/RegisterForm';
import TestSidebar from './components/test-components/TestSidebar';

import CN_SC_ND from './pages/ComprasNacionales/SolicitudDeCompra/CN_SC_ND';
import CN_SC_AD from './pages/ComprasNacionales/SolicitudDeCompra/CN_SC_AD';

import CN_SCZ_ND from './pages/ComprasNacionales/SolicitudDeCotizacion/CN_SCZ_ND';
import CN_SCZ_AD from './pages/ComprasNacionales/SolicitudDeCotizacion/CN_SCZ_AD';

import CN_OC_ND from './pages/ComprasNacionales/OrdenDeCompra/CN_OC_ND';
import CN_OC_AD from './pages/ComprasNacionales/OrdenDeCompra/CN_OC_AD';

import CN_NR_ND from './pages/ComprasNacionales/NotaDeRecepcion/CN_NR_ND';
import CN_NR_AD from './pages/ComprasNacionales/NotaDeRecepcion/CN_NR_AD';

import IM_SC_ND from './pages/Importaciones/SolicitudDeCompra/IM_SC_ND';
import IM_SC_AD from './pages/Importaciones/SolicitudDeCompra/IM_SC_AD';

import IM_SCZ_ND from './pages/Importaciones/SolicitudDeCotizacion/IM_SCZ_ND';
import IM_SCZ_AD from './pages/Importaciones/SolicitudDeCotizacion/IM_SCZ_AD';
import IM_OC_ND from './pages/Importaciones/OrdenDeCompra/IM_OC_ND';
import IM_OC_AD from './pages/Importaciones/OrdenDeCompra/IM_OC_AD';
import IM_NR_ND from './pages/Importaciones/NotaDeRecepcion/IM_NR_ND';
import IM_NR_AD from './pages/Importaciones/NotaDeRecepcion/IM_NR_AD';
import CN_SC_VD from './pages/ComprasNacionales/SolicitudDeCompra/CN_SC_VD';
import CN_SCZ_VD from './pages/ComprasNacionales/SolicitudDeCotizacion/CN_SCZ_VD';
import CN_OC_VD from './pages/ComprasNacionales/OrdenDeCompra/CN_OC_VD';
import CN_NR_VD from './pages/ComprasNacionales/NotaDeRecepcion/CN_NR_VD';
import IM_SC_VD from './pages/Importaciones/SolicitudDeCompra/IM_SC_VD';
import IM_SCZ_VD from './pages/Importaciones/SolicitudDeCotizacion/IM_SCZ_VD';
import IM_OC_VD from './pages/Importaciones/OrdenDeCompra/IM_OC_VD';
import IM_NR_VD from './pages/Importaciones/NotaDeRecepcion/IM_NR_VD';


/*
        IMPORTANT!
  The components are named as follows:

      AA-BBB-CC

  Where:
  - AA: It refers to the type of purchase:
        *CN: Compra Nacional
        *IM: Importación

  - BBB: It refers to the type of document:
        *SC: Solicitud de compra
        *SCZ: Solicitud de cotización
        *OC: Orden de compra
        *NR: Nota de recepción 
  
  - CC: It refers to the type of action on documents:
        *ND: Nuevo Documento
        *AD: Aceptar Documento
        *HD: Historial de Documento
*/


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route exact path="/users/signup" element={<RegisterForm />} />
            <Route exact path="/codeVerification" element={<CodeVerification />} />
            <Route exact path="/sidebar" element={<TestSidebar />} />
            <Route exact path="/users/signin" element={<LoginForm />} />

            {/* ---- START COMPRAS NACIONALES ---- */}
            <Route exact path="/compras-nacionales/solicitud-compra" element={<CN_SC_ND />} />
            <Route exact path="/compras-nacionales/solicitud-compra/aceptar-documento" element={<CN_SC_AD />} />
            <Route exact path="/compras-nacionales/solicitud-compra/ver-documento/:id" element={<CN_SC_VD />} />

            <Route exact path="/compras-nacionales/solicitud-cotizacion" element={<CN_SCZ_ND />} />
            <Route exact path="/compras-nacionales/solicitud-cotizacion/aceptar-documento" element={<CN_SCZ_AD />} />
            <Route exact path="/compras-nacionales/solicitud-cotizacion/ver-documento/:id" element={<CN_SCZ_VD />} />

            <Route exact path="/compras-nacionales/orden-compra" element={<CN_OC_ND />} />
            <Route exact path="/compras-nacionales/orden-compra/aceptar-documento" element={<CN_OC_AD />} />
            <Route exact path="/compras-nacionales/orden-compra/ver-documento/:id" element={<CN_OC_VD />} />
            
            <Route exact path="/compras-nacionales/nota-recepcion" element={<CN_NR_ND />} />
            <Route exact path="/compras-nacionales/nota-recepcion/aceptar-documento" element={<CN_NR_AD />} />
            <Route exact path="/compras-nacionales/nota-recepcion/ver-documento/:id" element={<CN_NR_VD />} />
            {/* ---- END COMPRAS NACIONALES ---- */}

            {/* ---- START IMPORTACIONES ----*/}
            <Route exact path="/importaciones/solicitud-compra" element={<IM_SC_ND/>} />
            <Route exact path="/importaciones/solicitud-compra/aceptar-documento" element={<IM_SC_AD />} />
            <Route exact path="/importaciones/solicitud-compra/ver-documento/:id" element={<IM_SC_VD />} />

            <Route exact path="/importaciones/solicitud-cotizacion" element={<IM_SCZ_ND />} />
            <Route exact path="/importaciones/solicitud-cotizacion/aceptar-documento" element={<IM_SCZ_AD />} />
            <Route exact path="/importaciones/solicitud-cotizacion/ver-documento/:id" element={<IM_SCZ_VD />} />
            
            <Route exact path="/importaciones/orden-compra" element={<IM_OC_ND />} />
            <Route exact path="/importaciones/orden-compra/aceptar-documento" element={<IM_OC_AD />} />
            <Route exact path="/importaciones/orden-compra/ver-documento/:id" element={<IM_OC_VD />} />

            <Route exact path="/importaciones/nota-recepcion" element={<IM_NR_ND />} />
            <Route exact path="/importaciones/nota-recepcion/aceptar-documento" element={<IM_NR_AD />} />
            <Route exact path="/importaciones/nota-recepcion/aceptar-documento" element={<IM_NR_VD />} />
            {/* ---- END IMPORTACIONES ----*/}

            <Route exact path="/" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;