import React, { useEffect, useState } from 'react';

import '../css/pages-styles/Notifications.css';

import Sidebar from '../components/sidebar/Sidebar';
import TitleNotification from '../components/title/TitleNotification';
import MaterialTable from 'material-table';


function Notifications() {

    const columnas = [
        {
            title: 'Nro. de Notificación',
            field: 'nro_notificacion'
        },
        {
            title: 'ID de producto',
            field: 'id_producto'
        },
        {
            title: 'Stock',
            field: 'stock',
        },
        {
            title: 'Prioridad',
            field: 'prioridad',
        }
    ];

    const data = [
        {
            nro_notificacion: 313131,
            id_producto: 43243,
            stock: 3424,
            prioridad: 422442,
            agregado: true  // Propiedad que no se muestra pero sirve para estilizar el carrito
        },
        {
            nro_notificacion: 313131,
            id_producto: 43243,
            stock: 3424,
            prioridad: 422442,
            agregado: false   // Propiedad que no se muestra pero sirve para estilizar el carrito
        }
    ]

    return (
        <div>
            <div className='notifications d-flex'>

                <Sidebar />
                
                <div className='w-100'>
                    <TitleNotification />

                    <div className='d-flex'> 
                        <div className='buttonCompras-div'>
                            <button type="button" class="btn btn-warning">Generar Solicitud de compra</button>
                        </div>
                    </div>

                    <div className='dataTable container'>
                        <MaterialTable
                            columns={columnas}
                            data={data}
                            title='Lista de solicitudes de cotización'
                            actions={[
                                (rowData) => {
                                    return rowData.agregado? 
                                        {
                                            icon: () => <i class="bi bi-cart-check icon-green"></i>,
                                            tooltip: 'Agregado',
                                            onClick: (event, rowData) => { },
                                        }:
                                        {
                                            icon: () => <i class="bi bi-cart-plus icon-normal"></i>,
                                            tooltip: 'Agregar',
                                            onClick: (event, rowData) => {},
                                        }  
                                },
                                {
                                    icon: () => <i class="bi bi-trash icon-red"></i>,
                                    tooltip: 'ELiminar',
                                    onClick: (event, rowData) => { },
                                    iconProps: { style: { color: "#FF3C3C" } }
                                }
                            ]}
                            options= {{
                                actionsColumnIndex: -1,
                                exportButton: true,
                                exportAllData: true,
                                exportFileName: 'Notificaciones'
                            }}
                            localization = {{
                                header:{
                                    actions:'Acciones'
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notifications;
