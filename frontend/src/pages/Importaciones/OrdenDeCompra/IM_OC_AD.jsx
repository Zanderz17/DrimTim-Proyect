import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import Sidebar from '../../../components/sidebar/Sidebar';
import Title from '../../../components/title/Title';

import MaterialTable from 'material-table';

function IM_OC_AD() {

    const columnas = [
        {
            title: 'Nro. Orden de compra',
            field: 'nro_orden_compra'
        },
        {
            title: 'Nro. Solicitud de cotización',
            field: 'nro_solicitud_cotizacion'
        },
        {
            title: 'Fecha de elaboración',
            field: 'fecha_elaboracion',
            type: 'date'
        }
    ];

    const data = [
        {
            'nro_orden_compra': "11111",
            'nro_solicitud_cotizacion': "22222",
            'fecha_elaboracion': "03-12-2020"
        }
    ]

    return (
        <div>
            <div className='d-flex'>
                <Sidebar />

                <div className='w-100'>
                    <Title 
                        document="Orden de Compra" 
                        type="Importaciones" 
                        subType="Aceptar Documento"
                        active1={false}
                        active2={true}
                        active3={false}
                        link1="/importaciones/orden-compra/nuevo-documento"
                        link2="/importaciones/orden-compra/aceptar-documento"
                        link3="/importaciones/orden-compra/historial-documento"
                    >
                    </Title>

                    <div className='dataTable container'>
                        <MaterialTable
                            columns={columnas}
                            data={data}
                            title='Lista de órdenes de compra'
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
                                exportFileName: 'Importaciones-OrdenCompra-Pendientes'
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
};

export default IM_OC_AD;
