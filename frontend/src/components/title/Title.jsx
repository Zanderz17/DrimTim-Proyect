import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import '../../css/title-styles/Title.css';

function Title(props) {
    const [userRol, setUserRol] = useState('');
    useEffect( () => {    
        const isLoggedIn = async () => {
            const user = (await Axios({
                method: 'GET',
                withCredentials: true,
                url: "http://localhost:9000/users/login/return"
            })).data;
            setUserRol(user.rol);
        };
        isLoggedIn()
    }, []);

    return (
        <div className='container'>
            <div className='row navigation-bar'>
                <div className='col-7 my-auto'>
                    <a href='/' className='link-1'>
                        {props.type}
                    </a>
                    <i className="bi bi-chevron-right"></i>
                    <a href='/' className='link-2'>
                        {props.document}
                    </a>
                </div>
            </div>

            <div className='row principal-title'>
                <div className='col-5'>
                    {props.document}
                </div>
            </div>

            <div className='row bottom-navbar'>
                <div className='col-7'>
                    <a className= {props.active1 ? 'active' : "no-active"} href={props.link1}>
                        Nuevo documento
                    </a>
                    {userRol==="Jefe de Compras" ? 
                        <a className= { props.active2 ? 'active' : "no-active"} href={props.link2}>
                            Aceptar documento
                        </a>
                    :null}
                    <a className= {props.active3 ? 'active' : "no-active"} href={props.link3}>
                        Historial de documentos
                    </a>
                    <hr></hr>
                </div>
            </div>
        </div>
    )
}

export default Title

