import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import Sidebar from '../../../components/sidebar/Sidebar';
import Title from '../../../components/title/Title';

import MaterialTable from 'material-table';

function CN_OC_AD() {
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
            field: 'fecha_elaboracion'
        }
    ];

    const [data, setData] = useState([]);
    const [nroOrdCompraKeeper, setNroOrdCompraKeeper] = useState('');
    const [stateKeeper, setStateKeeper] = useState('');
    
    const [reload, setReload] = useState(false);
    useEffect( () => {}, [reload]);

    useEffect( () => {
        const getList = async () => {
            const req = (await Axios({
                method: 'GET',
                withCredentials: true,
                url: "http://localhost:9000/compras-nacionales/orden-compra/aceptar-documento/pendiente"
            })).data;
            setData(req);
        };
        getList();
    }, [reload]);

    useEffect( () => {
        const aceptar = async (nOrdCompra) => { 
            (await Axios({
                method: 'PUT',
                params: { nroOrdenCompra: nOrdCompra },
                data: { state: 'aceptado' },
                withCredentials: true,
                url: "http://localhost:9000/compras-nacionales/orden-compra/aceptar-documento/aceptado"
            }));
            setStateKeeper(''); 
            setReload(!reload);
        };
        if (stateKeeper === 'aceptado'){
            aceptar(nroOrdCompraKeeper); 
        }
    }, [nroOrdCompraKeeper, stateKeeper, reload]); // previously: [nroOrdCompraKeeper]
    // https://stackoverflow.com/questions/66017049/react-hook-useeffect-has-missing-dependencies-colors-and-options-either-in

    useEffect( () => {
        const rechazar = async (nOrdCompra) => {
            (await Axios({
                method: 'PUT',
                params: { nroOrdenCompra: nOrdCompra },
                data: { state: 'rechazado' },
                withCredentials: true,
                url: "http://localhost:9000/compras-nacionales/orden-compra/aceptar-documento/rechazado"
            }));
            setStateKeeper('');
            setReload(!reload);
        };
        if (stateKeeper === 'rechazado'){
            rechazar(nroOrdCompraKeeper);
        }
    }, [nroOrdCompraKeeper, stateKeeper, reload]); // previously: [nroOrdCompraKeeper]
    // https://stackoverflow.com/questions/66017049/react-hook-useeffect-has-missing-dependencies-colors-and-options-either-in

    return (
        <div>
            <div className='d-flex'>
                <Sidebar />

                <div className='w-100'>
                    <Title 
                        document="Orden de Compra" 
                        type="Compras nacionales" 
                        subType="Aceptar Documento"
                        active1={false}
                        active2={true}
                        active3={false}
                        link1="/compras-nacionales/orden-compra/nuevo-documento"
                        link2="/compras-nacionales/orden-compra/aceptar-documento"
                        link3="/compras-nacionales/orden-compra/visualizar-documento"
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
                                    onClick: (event, rowData) => { setNroOrdCompraKeeper(rowData.nro_orden_compra); setStateKeeper('aceptado'); }
                                },
                                {
                                    icon: 'clear',
                                    tooltip: 'ELiminar',
                                    onClick: (event, rowData) => { setNroOrdCompraKeeper(rowData.nro_orden_compra); setStateKeeper('rechazado') }
                                },
                                {
                                    icon: 'visibility',
                                    tooltip: 'Ver',
                                    onClick: (event, rowData) => { /*Agregar*/ }
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
        </div>
    )
};

export default CN_OC_AD;
