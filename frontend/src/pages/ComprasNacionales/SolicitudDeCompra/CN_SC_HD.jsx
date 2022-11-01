import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import Sidebar from '../../../components/sidebar/Sidebar';
import Title from '../../../components/title/Title';

import MaterialTable from 'material-table';

function CN_SC_HD() {
    const columnas = [
        {
            title: 'Nro. Solicitud de compra',
            field: 'nro_solicitud_compra'
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

    const dataTest = [
        {
            nro_solicitud_compra: '121213',
            fecha_elaboracion: '2020-01-10',
            estado: 'Aceptado'
        },
        {
            nro_solicitud_compra: '121213',
            fecha_elaboracion: '2021-01-22',
            estado: 'En progreso'
        },
        {
            nro_solicitud_compra: '121213',
            fecha_elaboracion: '2022-01-30',
            estado: 'Rechazado'
        }
    ];

    const [data, setData] = useState([]);
    const [nroSolCompraKeeper, setNroSolCompraKeeper] = useState('');
    const [stateKeeper, setStateKeeper] = useState('');
    
    const [reload, setReload] = useState(false);
    useEffect( () => {}, [reload]);

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
    }, [nroSolCompraKeeper, stateKeeper, reload]); // previously: [nroSolCompraKeeper]
    // https://stackoverflow.com/questions/66017049/react-hook-useeffect-has-missing-dependencies-colors-and-options-either-in

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
    }, [nroSolCompraKeeper, stateKeeper, reload]); // previously: [nroSolCompraKeeper]
    // https://stackoverflow.com/questions/66017049/react-hook-useeffect-has-missing-dependencies-colors-and-options-either-in

    return (
        <div className='d-flex'>
            <Sidebar />

            <div className='w-100'>
                <Title 
                    document="Solicitud de compra" 
                    type="Compras nacionales" 
                    subType="Historial de documentos"
                    active1={false}
                    active2={false}
                    active3={true}
                    link1="/compras-nacionales/solicitud-compra/nuevo-documento"
                    link2="/compras-nacionales/solicitud-compra/aceptar-documento"
                    link3="/compras-nacionales/solicitud-compra/historial-documento"
                >
                </Title>

                <div className='dataTable container'>
                    <MaterialTable
                        columns={columnas}
                        data={dataTest}
                        title='Lista de solicitudes de compra'
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
                            exportFileName: 'ComprasNacionales-SolicitudCompras-Historial'
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

export default CN_SC_HD;