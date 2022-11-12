import React from 'react'

import '../../css/title-styles/Title.css';

function TitleNotification() {
    return (
        <div className='container'>
            <div className='row navigation-bar'>
                <div className='col-7 my-auto'>
                    <a href='/' className='link-2'>
                        Notificaciones de inventario
                    </a>
                </div>
            </div>

            <div className='row principal-title'>
                <div className='col-7'>
                    Notificaciones de inventario
                </div>
            </div>
        </div>
    )
}

export default TitleNotification
