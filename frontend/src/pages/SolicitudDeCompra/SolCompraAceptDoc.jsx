import React, { useEffect } from 'react';
import Axios from 'axios';

import Sidebar from '../../components/sidebar/Sidebar';
import Title from '../../components/title/Title';

import MaterialTable from 'material-table';
import { useState } from 'react';

function SolCompraAceptDoc() {
    const columnas = [
        {
            title: 'Nro. Solicitud de compra',
            field: 'nro_solicitud_compra'
        },
        {
            title: 'Fecha de elaboración',
            field: 'fecha_elaboracion'
        }
    ];

    const [data, setData] = useState([]);
    useEffect( () => {
        const getList = async () => {
            const data =
                (await
                    Axios({
                        method: 'GET',
                        withCredentials: true,
                        url: "http://localhost:9000/compras-nacionales/solicitud-compra/aceptar-documento/pendiente"
                    })
                ).data
            setData(data);
        };
        getList();
    }, []);

    const [nroSolicitudCompra, setNroSolicitudCompra] = useState("");

    const aceptar = (nSolCompra) => {
        Axios({
            method: 'PUT',
            params: {
                nroSolicitudCompra: nSolCompra
            },
            data: {
                estado: 'aceptado'
            },
            withCredentials: true,
            url: "http://localhost:9000/compras-nacionales/solicitud-compra/aceptar-documento/aceptado"
        });
        //e.preventDefault();
    };

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
                                onClick: (event, rowData) => {console.log(rowData.nro_solicitud_compra); aceptar(rowData.nro_solicitud_compra); event.preventDefault();}//(event, rowData) => alert ("Aceptado... " + rowData.nro_solicitud_compra)
                            },
                            {
                                icon: 'clear',
                                tooltip: 'ELiminar',
                                onClick: (event, rowData) => alert ("Eliminado... " + rowData.nro_solicitud_compra)
                            },
                            {
                                icon: 'visibility',
                                tooltip: 'Ver',
                                onClick: (event, rowData) => alert ("Viendo... " + rowData.nro_solicitud_compra)
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
