import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'

import './App.css';
import LoginForm from './pages/LoginForm.jsx';
import CodeVerification from './pages/CodeVerification.jsx';
import RegisterForm from './pages/RegisterForm';
import TestSidebar from './components/test-components/TestSidebar';

/* Compras Nacionales */
// Solicitud de compra
import CN_SC_ND from './pages/ComprasNacionales/SolicitudDeCompra/CN_SC_ND';
import CN_SC_AD from './pages/ComprasNacionales/SolicitudDeCompra/CN_SC_AD';
import CN_SC_HD from './pages/ComprasNacionales/SolicitudDeCompra/CN_SC_HD';
import CN_SC_VD_ID from './pages/ComprasNacionales/SolicitudDeCompra/CN_SC_VD_ID';
// Solicitud de cotizacion
import CN_SCZ_ND from './pages/ComprasNacionales/SolicitudDeCotizacion/CN_SCZ_ND';
import CN_SCZ_AD from './pages/ComprasNacionales/SolicitudDeCotizacion/CN_SCZ_AD';
import CN_SCZ_HD from './pages/ComprasNacionales/SolicitudDeCotizacion/CN_SCZ_HD';
import CN_SCZ_VD_ID from './pages/ComprasNacionales/SolicitudDeCotizacion/CN_SCZ_VD_ID';
// Orden de compra
import CN_OC_ND from './pages/ComprasNacionales/OrdenDeCompra/CN_OC_ND';
import CN_OC_AD from './pages/ComprasNacionales/OrdenDeCompra/CN_OC_AD';
import CN_OC_HD from './pages/ComprasNacionales/OrdenDeCompra/CN_OC_HD';
import CN_OC_VD_ID from './pages/ComprasNacionales/OrdenDeCompra/CN_OC_VD_ID';
// Nota de recepcion
import CN_NR_ND from './pages/ComprasNacionales/NotaDeRecepcion/CN_NR_ND';
import CN_NR_AD from './pages/ComprasNacionales/NotaDeRecepcion/CN_NR_AD';
import CN_NR_HD from './pages/ComprasNacionales/NotaDeRecepcion/CN_NR_HD';
import CN_NR_VD_ID from './pages/ComprasNacionales/NotaDeRecepcion/CN_NR_VD_ID';

/* Importaciones */
// Solicitud de compra
import IM_SC_ND from './pages/Importaciones/SolicitudDeCompra/IM_SC_ND';
import IM_SC_AD from './pages/Importaciones/SolicitudDeCompra/IM_SC_AD';
import IM_SC_HD from './pages/Importaciones/SolicitudDeCompra/IM_SC_HD';
import IM_SC_VD_ID from './pages/Importaciones/SolicitudDeCompra/IM_SC_VD_ID';
// Solicitud de cotizacion
import IM_SCZ_ND from './pages/Importaciones/SolicitudDeCotizacion/IM_SCZ_ND';
import IM_SCZ_AD from './pages/Importaciones/SolicitudDeCotizacion/IM_SCZ_AD';
import IM_SCZ_HD from './pages/Importaciones/SolicitudDeCotizacion/IM_SCZ_HD';
import IM_SCZ_VD_ID from './pages/Importaciones/SolicitudDeCotizacion/IM_SCZ_VD_ID';
// Orden de compra
import IM_OC_ND from './pages/Importaciones/OrdenDeCompra/IM_OC_ND';
import IM_OC_AD from './pages/Importaciones/OrdenDeCompra/IM_OC_AD';
import IM_OC_HD from './pages/Importaciones/OrdenDeCompra/IM_OC_HD';
import IM_OC_VD_ID from './pages/Importaciones/OrdenDeCompra/IM_OC_VD_ID';
// Nota de recepcion
import IM_NR_ND from './pages/Importaciones/NotaDeRecepcion/IM_NR_ND';
import IM_NR_AD from './pages/Importaciones/NotaDeRecepcion/IM_NR_AD';
import IM_NR_HD from './pages/Importaciones/NotaDeRecepcion/IM_NR_HD';
import IM_NR_VD_ID from './pages/Importaciones/NotaDeRecepcion/IM_NR_VD_ID';

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
        *VD: Visualizar documento
*/

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
            <Route exact path='/sidebar' element={<TestSidebar />} />
            <Route exact path='/users/signin' element={<LoginForm />} />
            <Route exact path='/users/signup' element={<RegisterForm />} />
            <Route exact path='/codeVerification' element={<CodeVerification />} />

            {/* ---- START COMPRAS NACIONALES ---- */}
            <Route exact path='/compras-nacionales/solicitud-compra/nuevo-documento' element={<CN_SC_ND />} />
            <Route exact path='/compras-nacionales/solicitud-compra/aceptar-documento' element={<CN_SC_AD />} />
            <Route exact path='/compras-nacionales/solicitud-compra/historial-documento' element={<CN_SC_HD />} />
            <Route exact path='/compras-nacionales/solicitud-compra/visualizar-documento/:id' element={<CN_SC_VD_ID />} />

            <Route exact path='/compras-nacionales/solicitud-cotizacion/nuevo-documento' element={<CN_SCZ_ND />} />
            <Route exact path='/compras-nacionales/solicitud-cotizacion/aceptar-documento' element={<CN_SCZ_AD />} />
            <Route exact path='/compras-nacionales/solicitud-cotizacion/historial-documento' element={<CN_SCZ_HD />} />
            <Route exact path='/compras-nacionales/solicitud-cotizacion/visualizar-documento/:id' element={<CN_SCZ_VD_ID />} />

            <Route exact path='/compras-nacionales/orden-compra/nuevo-documento' element={<CN_OC_ND />} />
            <Route exact path='/compras-nacionales/orden-compra/aceptar-documento' element={<CN_OC_AD />} />
            <Route exact path='/compras-nacionales/orden-compra/historial-documento' element={<CN_OC_HD />} />
            <Route exact path='/compras-nacionales/orden-compra/visualizar-documento/:id' element={<CN_OC_VD_ID />} />
            
            <Route exact path='/compras-nacionales/nota-recepcion/nuevo-documento' element={<CN_NR_ND />} />
            <Route exact path='/compras-nacionales/nota-recepcion/aceptar-documento' element={<CN_NR_AD />} />
            <Route exact path='/compras-nacionales/nota-recepcion/historial-documento' element={<CN_NR_HD />} />
            <Route exact path='/compras-nacionales/nota-recepcion/visualizar-documento/:id' element={<CN_NR_VD_ID />} />
            {/* ---- END COMPRAS NACIONALES ---- */}

            {/* ---- START IMPORTACIONES ----*/}
            <Route exact path='/importaciones/solicitud-compra/nuevo-documento' element={<IM_SC_ND/>} />
            <Route exact path='/importaciones/solicitud-compra/aceptar-documento' element={<IM_SC_AD />} />
            <Route exact path='/importaciones/solicitud-compra/historial-documento' element={<IM_SC_HD />} />
            <Route exact path='/importaciones/solicitud-compra/visualizar-documento/:id' element={<IM_SC_VD_ID />} />

            <Route exact path='/importaciones/solicitud-cotizacion/nuevo-documento' element={<IM_SCZ_ND />} />
            <Route exact path='/importaciones/solicitud-cotizacion/aceptar-documento' element={<IM_SCZ_AD />} />
            <Route exact path='/importaciones/solicitud-cotizacion/historial-documento' element={<IM_SCZ_HD />} />
            <Route exact path='/importaciones/solicitud-cotizacion/visualizar-documento/:id' element={<IM_SCZ_VD_ID />} />
            
            <Route exact path='/importaciones/orden-compra/nuevo-documento' element={<IM_OC_ND />} />
            <Route exact path='/importaciones/orden-compra/aceptar-documento' element={<IM_OC_AD />} />
            <Route exact path='/importaciones/orden-compra/historial-documento' element={<IM_OC_HD />} />
            <Route exact path='/importaciones/orden-compra/visualizar-documento/:id' element={<IM_OC_VD_ID />} />

            <Route exact path='/importaciones/nota-recepcion/nuevo-documento' element={<IM_NR_ND />} />
            <Route exact path='/importaciones/nota-recepcion/aceptar-documento' element={<IM_NR_AD />} />
            <Route exact path='/importaciones/nota-recepcion/historial-documento' element={<IM_NR_HD />} />
            <Route exact path='/importaciones/nota-recepcion/visualizar-documento/:id' element={<IM_NR_VD_ID />} />
            {/* ---- END IMPORTACIONES ----*/}

            <Route exact path='/' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;