import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import Axios from 'axios';
import '../css/pages-styles/RegisterForm.css';

function RegisterForm() {
    const [registerCorreo, setRegisterCorreo] = useState("");
    const [registerNombre, setRegisterNombre] = useState("");
    const [registerApellidos, setRegisterApellidos] = useState("");
    const [registerRol, setRegisterRol] = useState("Analista de Compras");
    const [registerPassword, setRegisterPassword] = useState("");
    const navigate = useNavigate();
    const register = (e) => {
        Axios({
            method: 'POST',
            data: {
                correo: registerCorreo,
                nombre: registerNombre,
                apellidos: registerApellidos,
                rol: registerRol,
                password: registerPassword
            },
            withCredentials: true,
            url: "http://localhost:9000/users/register"
        }).then((res) => {
            if (res.data === 'Successfully Registered'){
                navigate('/users/signin');
            };
        });
        e.preventDefault();
    };

    return (
        <div className="principal-register-form">
            <div className="register-form">
                <img src={require('../img/logo.jpg')} alt='logoimg'/>
                <h1 className="text-center">Verifique que los datos mostrados sean correctos</h1>   
                <form className="needs-validation" onSubmit={register}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Correo electrónico</label>
                        <input className="form-control" type="email" id="email" placeholder="brayan@gmail.com" onChange={e => setRegisterCorreo(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Nombre</label>
                        <input className="form-control" type="text" id="name" placeholder="Brayan" onChange={e => setRegisterNombre(e.target.value)} required />
                    </div>  

                    <div className="form-group">
                        <label className="form-label" htmlFor="lastName">Apellidos</label>
                        <input className="form-control" type="text" id="lastName" placeholder="Gomero" onChange={e => setRegisterApellidos(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="role">Rol</label>
                        <select className="form-select" aria-label="Default" onChange={e => setRegisterRol(e.target.value)} required>
                            <option value="Analista de Compras">Analista de Compras</option>
                            <option value="Jefe de Compras">Jefe de Compras</option>
                        </select>

                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Contraseña</label>
                        <input className="form-control" type="password" id="password" placeholder="********************" onChange={e => setRegisterPassword(e.target.value)} required />
                    </div> 

                    <input className="btn btn-success w-100" type="submit" value="Registrar" />
                    
                    <div className="form-group text-center">
                        <label className="form-check-label">¿Ya tienes cuenta? <a href='/users/signin'>Conéctate</a></label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;