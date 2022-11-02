import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import Sidebar from '../../../components/sidebar/Sidebar';
import Title from '../../../components/title/Title';

import MaterialTable from 'material-table';

function CN_OC_HD() {
    const columnas = [
        {
            title: 'Nro. Orden de compra',
            field: 'nro_orden_compra'
        },
        {
            title: 'Nro. Solicitud de cotización',
            field: 'nro_sol_cotizacion'
        },
        {
            title: 'Fecha de elaboración',
            field: 'fecha_elaboracion',
            //type: 'date'
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
                url: "http://localhost:9000/compras-nacionales/orden-compra/historial-documento"
            })).data;
            setData(req);
        };
        getList();
    }, [reload]);

    const navigate = useNavigate();
    const view = (id) => {
        navigate(`/compras-nacionales/orden-compra/visualizar-documento/${id}`);
    };

    return (
        <div className='d-flex'>
            <Sidebar />

            <div className='w-100'>
                <Title 
                    document="Orden de Compra" 
                    type="Compras nacionales" 
                    subType="historial de documentos"
                    active1={false}
                    active2={false}
                    active3={true}
                    link1="/compras-nacionales/orden-compra/nuevo-documento"
                    link2="/compras-nacionales/orden-compra/aceptar-documento"
                    link3="/compras-nacionales/orden-compra/historial-documento"
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
                            exportFileName: 'ComprasNacionales-OrdenCompra-Historial'    
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
};

export default CN_OC_HD;
