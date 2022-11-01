import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import Sidebar from '../../../components/sidebar/Sidebar';
import Title from '../../../components/title/Title';

import MaterialTable from 'material-table';

function IM_SCZ_AD() {

    const columnas = [
        {
            title: 'Nro. Solicitud de cotización',
            field: 'nro_solicitud_cotizacion'
        },
        {
            title: 'Nro. Solicitud de compra',
            field: 'nro_solicitud_compra'
        },
        {
            title: 'Fecha de elaboración',
            field: 'fecha_elaboracion',
            type: 'date'
        }
    ];

    const data = [
        {
            'nro_solicitud_cotizacion': "11111",
            'nro_solicitud_compra': "22222",
            'fecha_elaboracion': "03-12-2020"
        }
    ]

    return (
        <div>
            <div className='d-flex'>
                <Sidebar />

                <div className='w-100'>
                    <Title 
                        document="Solicitud de cotización" 
                        type="Importaciones" 
                        subType="Aceptar Documento"
                        active1={false}
                        active2={true}
                        active3={false}
                        link1="/importaciones/solicitud-cotizacion/nuevo-documento"
                        link2="/importaciones/solicitud-cotizacion/aceptar-documento"
                        link3="/importaciones/solicitud-cotizacion/historial-documento"
                    >
                    </Title>

                    <div className='dataTable container'>
                        <MaterialTable
                            columns={columnas}
                            data={data}
                            title='Lista de solicitudes de cotización'
                            actions={[
                                {
                                    icon: 'check',
                                    tooltip: 'Aceptar',
                                    onClick: (event, rowData) => { /*Agregar*/ },
                                    iconProps: { style: { color: "#16A34A" } }
                                },
                                {
                                    icon: 'clear',
                                    tooltip: 'ELiminar',
                                    onClick: (event, rowData) => { /*Agregar*/ },
                                    iconProps: { style: { color: "#FF3C3C" } }                                
                                },
                                {
                                    icon: 'visibility',
                                    tooltip: 'Ver',
                                    onClick: (event, rowData) => { /*Agregar*/ },
                                    iconProps: { style: { color: "#4763E4" } }
                                }
                            ]}
                            options= {{
                                actionsColumnIndex: -1,
                                exportButton: true,
                                exportAllData: true,
                                exportFileName: 'Importaciones-SolicitudCompras-Pendientes'
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

export default IM_SCZ_AD;
