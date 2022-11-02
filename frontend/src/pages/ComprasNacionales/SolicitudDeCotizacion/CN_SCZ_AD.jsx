import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import Sidebar from '../../../components/sidebar/Sidebar';
import Title from '../../../components/title/Title';

import MaterialTable from 'material-table';

function CN_SCZ_AD() {
    const columnas = [
        {
            title: 'Nro. Solicitud de cotización',
            field: 'nro_solicitud_cotizacion'
        },
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
    const [nroSolCotizacionKeeper, setNroSolCotizacionKeeper] = useState('');
    const [stateKeeper, setStateKeeper] = useState('');

    const [reload, setReload] = useState(false);
    useEffect( () => {}, [reload]);

    useEffect( () => {
        const getList = async () => {
            const req = (await Axios({
                method: 'GET',
                withCredentials: true,
                url: "http://localhost:9000/compras-nacionales/solicitud-cotizacion/aceptar-documento/pendiente"
            })).data;
            setData(req);
        };
        getList();
    }, [reload]);

    useEffect( () => {
        const aceptar = async (nSolCotizacion) => { 
            (await Axios({
                method: 'PUT',
                params: { nroSolicitudCotizacion: nSolCotizacion },
                data: { state: 'Aceptado' },
                withCredentials: true,
                url: "http://localhost:9000/compras-nacionales/solicitud-cotizacion/aceptar-documento/aceptado"
            }));
            setStateKeeper(''); 
            setReload(!reload);
        };
        if (stateKeeper === 'Aceptado'){
            aceptar(nroSolCotizacionKeeper); 
        }
    }, [nroSolCotizacionKeeper, stateKeeper, reload]); // previously: [nroSolCotizacionKeeper]
    // https://stackoverflow.com/questions/66017049/react-hook-useeffect-has-missing-dependencies-colors-and-options-either-in

    useEffect( () => {
        const rechazar = async (nSolCotizacion) => {
            (await Axios({
                method: 'PUT',
                params: { nroSolicitudCotizacion: nSolCotizacion },
                data: { state: 'Rechazado' },
                withCredentials: true,
                url: "http://localhost:9000/compras-nacionales/solicitud-cotizacion/aceptar-documento/rechazado"
            }));
            setStateKeeper('');
            setReload(!reload);
        };
        if (stateKeeper === 'Rechazado'){
            rechazar(nroSolCotizacionKeeper);
        }
    }, [nroSolCotizacionKeeper, stateKeeper, reload]); // previously: [nroSolCotizacionKeeper]
    // https://stackoverflow.com/questions/66017049/react-hook-useeffect-has-missing-dependencies-colors-and-options-either-in

    const navigate = useNavigate();
    const view = (id) => {
        navigate(`/compras-nacionales/solicitud-cotizacion/visualizar-documento/${id}`);
    };

    return (
        <div>
            <div className='d-flex'>
                <Sidebar />

                <div className='w-100'>
                    <Title 
                        document="Solicitud de cotización" 
                        type="Compras nacionales" 
                        subType="Aceptar Documento"
                        active1={false}
                        active2={true}
                        active3={false}
                        link1="/compras-nacionales/solicitud-cotizacion/nuevo-documento"
                        link2="/compras-nacionales/solicitud-cotizacion/aceptar-documento"
                        link3="/compras-nacionales/solicitud-cotizacion/historial-documento"
                    >
                    </Title>

                    <div className='dataTable container'>
                        <MaterialTable
                            columns={columnas}
                            data={data}
                            title='Lista de solicitudes de cotización'
                            actions={[
                                {
                                    icon: 'check',
                                    tooltip: 'Aceptar',
                                    onClick: (event, rowData) => { setNroSolCotizacionKeeper(rowData.nro_solicitud_cotizacion); setStateKeeper('Aceptado'); },
                                    iconProps: { style: { color: "#16A34A" } }
                                },
                                {
                                    icon: 'clear',
                                    tooltip: 'ELiminar',
                                    onClick: (event, rowData) => { setNroSolCotizacionKeeper(rowData.nro_solicitud_cotizacion); setStateKeeper('Rechazado'); },
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
                                exportFileName: 'ComprasNacionales-SolicitudCotizacion-Pendientes'
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

export default CN_SCZ_AD;
