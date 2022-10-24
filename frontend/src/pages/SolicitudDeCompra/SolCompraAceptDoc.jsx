import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Title from '../../components/title/Title'

import MaterialTable from 'material-table';

function SolCompraAceptDoc() {

    const columnas = [
        {
            title: 'Nro. Solicitud de compra',
            field: 'nroSolicitudCompra'
        },
        {
            title: 'Fecha de elaboración',
            field: 'fechaElaboracion'
        }
    ];

    const data = [
        {
            'nroSolicitudCompra':  '0000-0000-0000-0001',
            'fechaElaboracion': '28/07/2022'
        },
        {
            'nroSolicitudCompra':  '0000-0000-0000-0002',
            'fechaElaboracion': '28/07/2023'
        }
    ]

    return (
        <div className='d-flex'>
            <Sidebar />

            <div className='w-100'>
                <Title 
                    document="Solicitud de compra" 
                    type="Compras nacionales" 
                    subType="Aceptar Documento"
                    active1={false}
                    active2={true}
                    active3={false}
                >
                </Title>

                <div className='dataTable container'>
                    <MaterialTable
                        columns={columnas}
                        data={data}
                        title='Lista de solicitudes de compra'
                        actions={[
                            {
                                icon: 'check',
                                tooltip: 'Aceptar',
                                onClick: (event, rowData) => alert ("Aceptado... " + rowData.nroSolicitudCompra)
                            },
                            {
                                icon: 'clear',
                                tooltip: 'ELiminar',
                                onClick: (event, rowData) => alert ("Eliminado... " + rowData.nroSolicitudCompra)
                            },
                            {
                                icon: 'visibility',
                                tooltip: 'Ver',
                                onClick: (event, rowData) => alert ("Viendo... " + rowData.nroSolicitudCompra)
                            }
                        ]}
                        options= {{
                            actionsColumnIndex: -1
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
)
}

export default SolCompraAceptDoc
