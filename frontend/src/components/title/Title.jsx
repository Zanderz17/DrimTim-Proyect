import React from 'react'
import '../../css/title-styles/Title.css'

function Title(props) {
    return (
        <div className='container'>
            <div className='row navigation-bar'>
                <div className='col-7 my-auto'>
                    <a href='/' className='link-1'>
                        {props.type}
                    </a>
                    <i class="bi bi-chevron-right"></i>
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
                    <a className= {props.active1 ? 'active' : "no-active"}>
                        Nuevo documento
                    </a>
                    <a className= { props.active2 ? 'active' : "no-active"}>
                        Aceptar documento
                    </a>
                    <a className= {props.active3 ? 'active' : "no-active"}>
                        Historial de documentos
                    </a>
                    <hr></hr>
                </div>
            </div>
        </div>
    )
}

export default Title

