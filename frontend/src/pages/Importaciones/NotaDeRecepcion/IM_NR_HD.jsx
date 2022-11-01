import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import Sidebar from '../../../components/sidebar/Sidebar';
import Title from '../../../components/title/Title';

import MaterialTable from 'material-table';

function IM_NR_AD() {
    

    const columnas = [
        {
            title: 'Nro. Nota de recepción',
            field: 'nro_nota_recepcion'
        },
        {
            title: 'Nro. Orden de compra',
            field: 'nro_orden_compra'
        },
        {
            title: 'Fecha de elaboración',
            field: 'fecha_elaboracion',
            type: 'date'
        },
        {
            title: 'Estado',
            field: 'estado',
            render: (rowData) => 
                <div style={{color: rowData.estado==='Aceptado'?'#099440': rowData.estado==='Pendiente'?'#0A4ED1': '#B42D1B'}}>
                    {rowData.estado}
                </div>
        }
    ];

    const data = [
        {
            'nro_nota_recepcion': "11111",
            'nro_orden_compra': "22222",
            'fecha_elaboracion': "03-12-2020"
        }
    ]

    return (
        <div>
            <div className='d-flex'>
                <Sidebar />

                <div className='w-100'>
                    <Title 
                        document="Nota de recepción" 
                        type="Importaciones" 
                        subType="Historial de Documentos"
                        active1={false}
                        active2={false}
                        active3={false}
                        link1="/importaciones/nota-recepcion/nuevo-documento"
                        link2="/importaciones/nota-recepcion/aceptar-documento"
                        link3="/importaciones/nota-recepcion/historial-documento"
                    >
                    </Title>

                    <div className='dataTable container'>
                        <MaterialTable
                            columns={columnas}
                            data={data}
                            title='Lista de notas de recepción'
                            actions={[
                                {
                                    icon: 'visibility',
                                    tooltip: 'Ver',
                                    onClick: (event, rowData) => alert ("Viendo... " + rowData.nro_solicitud_compra),
                                    iconProps: { style: { color: "#4763E4" } }
                                }
                            ]}
                            options= {{
                                actionsColumnIndex: -1,
                                exportButton: true,
                                exportAllData: true,
                                exportFileName: 'Importaciones-NotaRecepcion-Historial'
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

export default IM_NR_AD;
