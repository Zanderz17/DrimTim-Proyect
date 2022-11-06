import React, { useState } from 'react';    
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import '../css/pages-styles/LoginForm.css';


function LoginForm() {
    const [loginCorreo, setLoginCorreo] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const navigate = useNavigate();
    const login = (e) => {
        Axios({
            method: 'POST',
            data: {
                correo: loginCorreo,
                password: loginPassword
            },
            withCredentials: true,
            url: "http://localhost:9000/users/login"
        }).then((res) => {
            if(res.data === 'Successfully Authenticated'){
                navigate('/compras-nacionales/solicitud-compra/nuevo-documento');
            };
        });
        e.preventDefault();
    };

    return (
        <div className="principal-login">
            <div className="login">
                <img src={require('../img/logo.jpg')} alt='logoimg'/>
                <h1 className="text-center">Iniciar sesión</h1>   
                <form className="needs-validation" onSubmit={login}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Correo electrónico</label>
                        <input className="form-control" type="email" id="email" placeholder="sanders@hotmail.com" onChange={(e) => setLoginCorreo(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Contraseña</label>
                        <input className="form-control" type="password" id="password" placeholder="********************" onChange={(e) => setLoginPassword(e.target.value)} required />
                        {/* 
                            <div className="invalid-feedback">
                                Su correo electrónico o contraseña no coinciden
                            </div>
                        */}
                    </div>

                    <input className="btn btn-success w-100" type="submit" value="Iniciar Sesión" />

                    <div className="form-check text-center">
                        <label className="form-check-label">¿No tienes cuenta? <a href='/users/signup'>Regístrate</a></label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;