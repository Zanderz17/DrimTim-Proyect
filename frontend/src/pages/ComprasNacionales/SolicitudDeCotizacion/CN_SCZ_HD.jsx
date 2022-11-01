import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import Sidebar from '../../../components/sidebar/Sidebar';
import Title from '../../../components/title/Title';

import MaterialTable from 'material-table';

function CN_SCZ_HD() {
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
            type: 'date'
        },
        {
            title: 'Estado',
            field: 'estado',
            render: (rowData) => 
                <div style={{color: rowData.estado==='Aceptado'?'#099440': rowData.estado==='En progreso'?'#0A4ED1': '#B42D1B'}}>
                    {rowData.estado}
                </div>
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
                data: { state: 'aceptado' },
                withCredentials: true,
                url: "http://localhost:9000/compras-nacionales/solicitud-cotizacion/aceptar-documento/aceptado"
            }));
            setStateKeeper(''); 
            setReload(!reload);
        };
        if (stateKeeper === 'aceptado'){
            aceptar(nroSolCotizacionKeeper); 
        }
    }, [nroSolCotizacionKeeper, stateKeeper, reload]); // previously: [nroSolCotizacionKeeper]
    // https://stackoverflow.com/questions/66017049/react-hook-useeffect-has-missing-dependencies-colors-and-options-either-in

    useEffect( () => {
        const rechazar = async (nSolCotizacion) => {
            (await Axios({
                method: 'PUT',
                params: { nroSolicitudCotizacion: nSolCotizacion },
                data: { state: 'rechazado' },
                withCredentials: true,
                url: "http://localhost:9000/compras-nacionales/solicitud-cotizacion/aceptar-documento/rechazado"
            }));
            setStateKeeper('');
            setReload(!reload);
        };
        if (stateKeeper === 'rechazado'){
            rechazar(nroSolCotizacionKeeper);
        }
    }, [nroSolCotizacionKeeper, stateKeeper, reload]); // previously: [nroSolCotizacionKeeper]
    // https://stackoverflow.com/questions/66017049/react-hook-useeffect-has-missing-dependencies-colors-and-options-either-in

    return (
        <div>
            <div className='d-flex'>
                <Sidebar />

                <div className='w-100'>
                    <Title 
                        document="Solicitud de cotización" 
                        type="Compras nacionales" 
                        subType="Historial de documentos"
                        active1={false}
                        active2={false}
                        active3={true}
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
                                    icon: 'visibility',
                                    tooltip: 'Ver',
                                    onClick: (event, rowData) => alert ("Viendo... " + rowData.nro_solicitud_compra),
                                    iconProps: { style: { color: "#4763E4" } }
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
}

export default CN_SCZ_HD;
