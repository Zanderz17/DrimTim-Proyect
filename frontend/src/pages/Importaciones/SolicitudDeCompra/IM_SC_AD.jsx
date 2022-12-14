import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import Sidebar from '../../../components/sidebar/Sidebar';
import Title from '../../../components/title/Title';

import MaterialTable from 'material-table';

function IM_SC_AD() {
    const navigate = useNavigate();
    var userRol = '';
    useEffect( () => {    
        const isLoggedIn = async () => {
            const user = (await Axios({
                method: 'GET',
                withCredentials: true,
                url: "http://localhost:9000/users/login/return"
            })).data;
            userRol = user.rol;
            if(!user){
                navigate('/users/signin');
            }
            if(userRol == "Analista de Compras"){
                navigate(-1);
            }
        };
        isLoggedIn()
    }, []);

    const columnas = [
        {
            title: 'Nro. Solicitud de compra',
            field: 'nro_solicitud_compra'
        },
        {
            title: 'Fecha de elaboración',
            field: 'fecha_elaboracion',
            //type: 'date'
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
                url: "http://localhost:9000/importaciones/solicitud-compra/aceptar-documento/pendiente"
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
                data: { state: 'Aceptado' },
                withCredentials: true,
                url: "http://localhost:9000/importaciones/solicitud-compra/aceptar-documento/aceptado"
            }));
            setStateKeeper(''); 
            setReload(!reload);
        };
        if (stateKeeper === 'Aceptado'){
            aceptar(nroSolCompraKeeper); 
        }
    }, [nroSolCompraKeeper, stateKeeper, reload]); // previously: [nroSolCompraKeeper]
    // https://stackoverflow.com/questions/66017049/react-hook-useeffect-has-missing-dependencies-colors-and-options-either-in

    useEffect( () => {
        const rechazar = async (nSolCompra) => {
            (await Axios({
                method: 'PUT',
                params: { nroSolicitudCompra: nSolCompra },
                data: { state: 'Rechazado' },
                withCredentials: true,
                url: "http://localhost:9000/importaciones/solicitud-compra/aceptar-documento/rechazado"
            }));
            setStateKeeper('');
            setReload(!reload);
        };
        if (stateKeeper === 'Rechazado'){
            rechazar(nroSolCompraKeeper);
        }
    }, [nroSolCompraKeeper, stateKeeper, reload]); // previously: [nroSolCompraKeeper]
    // https://stackoverflow.com/questions/66017049/react-hook-useeffect-has-missing-dependencies-colors-and-options-either-in

    const view = (id) => {
        navigate(`/importaciones/solicitud-compra/visualizar-documento/${id}`);
    };

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
                                onClick: (event, rowData) => { setNroSolCompraKeeper(rowData.nro_solicitud_compra); setStateKeeper('Aceptado'); },
                                iconProps: { style: { color: "#16A34A" } }
                            },
                            {
                                icon: 'clear',
                                tooltip: 'ELiminar',
                                onClick: (event, rowData) => { setNroSolCompraKeeper(rowData.nro_solicitud_compra); setStateKeeper('Rechazado'); },
                                iconProps: { style: { color: "#FF3C3C" } }                                
                            },
                            {
                                icon: 'visibility',
                                tooltip: 'Ver',
                                onClick: (event, rowData) => { view(rowData.nro_solicitud_compra); },
                                iconProps: { style: { color: "#4763E4" } }
                            }
                        ]}
                        options= {{
                            actionsColumnIndex: -1,
                            exportButton: true,
                            exportAllData: true,
                            exportFileName: 'Importaciones-SolicitudCompra-Pendientes'
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