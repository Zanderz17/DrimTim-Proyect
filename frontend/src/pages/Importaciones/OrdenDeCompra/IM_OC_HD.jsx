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

    const [data, setData] = useState([]);
    //const [nroOrdCompraKeeper, setNroOrdCompraKeeper] = useState('');
    //const [stateKeeper, setStateKeeper] = useState('');
    
    const [reload, setReload] = useState(false);
    useEffect( () => {}, [reload]);

    useEffect( () => {
        const getList = async () => {
            const req = (await Axios({
                method: 'GET',
                withCredentials: true,
                url: "http://localhost:9000/importaciones/orden-compra/historial-documento"
            })).data;
            setData(req);
        };
        getList();
    }, [reload]);

    return (
        <div>
            <div className='d-flex'>
                <Sidebar />

                <div className='w-100'>
                    <Title 
                        document="Orden de Compra" 
                        type="Importaciones" 
                        subType="Historial de Documentos"
                        active1={false}
                        active2={false}
                        active3={true}
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
                                exportFileName: 'Importaciones-OrdenCompra-Historial'
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
