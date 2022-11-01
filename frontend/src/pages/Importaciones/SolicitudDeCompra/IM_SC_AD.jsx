import React, { useEffect } from 'react';
import Axios from 'axios';

import Sidebar from '../../../components/sidebar/Sidebar';
import Title from '../../../components/title/Title';

import MaterialTable from 'material-table';
import { useState } from 'react';

function IM_SC_AD() {
    const columnas = [
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

    const [data, setData] = useState([]);
    const [nroSolCompraKeeper, setNroSolCompraKeeper] = useState('');
    const [stateKeeper, setStateKeeper] = useState('');
    
    const [reload, setReload] = useState(false);
    useEffect( () => {}, [reload]);

    /* --- CAMBIAR --- */
    useEffect( () => {
        const getList = async () => {
            const req = (await Axios({
                method: 'GET',
                withCredentials: true,
                url: "http://localhost:9000/compras-nacionales/solicitud-compra/aceptar-documento/pendiente"
            })).data;
            setData(req);
        };
        getList();
    }, [reload]);

    useEffect( () => {
        const aceptar = async (nSolCompra) => { 
            (await Axios({
                method: 'PUT',
                params: { nroSolicitudCompra: nSolCompra },
                data: { state: 'aceptado' },
                withCredentials: true,
                url: "http://localhost:9000/compras-nacionales/solicitud-compra/aceptar-documento/aceptado"
            }));
            setStateKeeper('');
            setReload(!reload);
        };
        if (stateKeeper === 'aceptado'){
            aceptar(nroSolCompraKeeper);
        }
    }, [nroSolCompraKeeper]);

    useEffect( () => {
        const rechazar = async (nSolCompra) => {
            (await Axios({
                method: 'PUT',
                params: { nroSolicitudCompra: nSolCompra },
                data: { state: 'rechazado' },
                withCredentials: true,
                url: "http://localhost:9000/compras-nacionales/solicitud-compra/aceptar-documento/rechazado"
            }));
            setStateKeeper('');
            setReload(!reload);
        };
        if (stateKeeper === 'rechazado'){
            rechazar(nroSolCompraKeeper);
        }
    }, [nroSolCompraKeeper]);
    /* -------------- */

    return (
        <div className='d-flex'>
            <Sidebar />

            <div className='w-100'>
                <Title 
                    document="Solicitud de compra" 
                    type="Importaciones" 
                    subType="Aceptar Documento"
                    active1={false}
                    active2={true}
                    active3={false}
                    link1="/importaciones/solicitud-compra/nuevo-documento"
                    link2="/importaciones/solicitud-compra/aceptar-documento"
                    link3="/importaciones/solicitud-compra/historial-documento"
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
                                onClick: (event, rowData) => { setNroSolCompraKeeper(rowData.nro_solicitud_compra); setStateKeeper('aceptado') },
                                iconProps: { style: { color: "#16A34A" } }
                            },
                            {
                                icon: 'clear',
                                tooltip: 'ELiminar',
                                onClick: (event, rowData) => { setNroSolCompraKeeper(rowData.nro_solicitud_compra); setStateKeeper('rechazado') },
                                iconProps: { style: { color: "#FF3C3C" } }                                
                            },
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
    )
}

export default IM_SC_AD;