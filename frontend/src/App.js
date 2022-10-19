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
import SolCompraNewDoc from './pages/SolicitudDeCompra/SolCompraNewDoc';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route exact path="/users/signup" element={<RegisterForm />} />
            <Route exact path="/codeVerification" element={<CodeVerification />} />
            <Route exact path="/sidebar" element={<TestSidebar />} />
            <Route exact path="/users/signin" element={<LoginForm />} />
            <Route exact path="/solCompraNewDoc" element={<SolCompraNewDoc />} />
            <Route exact path="/" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;