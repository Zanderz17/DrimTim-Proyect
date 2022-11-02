import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import Sidebar from '../../../components/sidebar/Sidebar';
import Title from '../../../components/title/Title';

import MaterialTable from 'material-table';

function CN_NR_AD() {
    const columnas = [
        {
            title: 'Nro. Nota de recepción',
            field: 'nro_nota_recepcion'
        },
        {
            title: 'Nro. Orden de compra',
            field: 'nro_orden_compra'
        },
        {
            title: 'Fecha de elaboración',
            field: 'fecha_elaboracion',
            //type: 'date'
        }
    ];

    const [data, setData] = useState([]);
    const [nroNotaRecepcionKeeper, setNroNotaRecepcionKeeper] = useState('');
    const [stateKeeper, setStateKeeper] = useState('');
    
    const [reload, setReload] = useState(false);
    useEffect( () => {}, [reload]);

    useEffect( () => {
        const getList = async () => {
            const req = (await Axios({
                method: 'GET',
                withCredentials: true,
                url: "http://localhost:9000/compras-nacionales/nota-recepcion/aceptar-documento/pendiente"
            })).data;
            setData(req);
        };
        getList();
    }, [reload]);

    useEffect( () => {
        const aceptar = async (nNotaRecepcion) => { 
            (await Axios({
                method: 'PUT',
                params: { nroNotaRecepcion: nNotaRecepcion },
                data: { state: 'Aceptado' },
                withCredentials: true,
                url: "http://localhost:9000/compras-nacionales/nota-recepcion/aceptar-documento/aceptado"
            }));
            setStateKeeper(''); 
            setReload(!reload);
        };
        if (stateKeeper === 'Aceptado'){
            aceptar(nroNotaRecepcionKeeper); 
        }
    }, [nroNotaRecepcionKeeper, stateKeeper, reload]); // previously: [nroNotaRecepcionKeeper]
    // https://stackoverflow.com/questions/66017049/react-hook-useeffect-has-missing-dependencies-colors-and-options-either-in

    useEffect( () => {
        const rechazar = async (nNotaRecepcion) => {
            (await Axios({
                method: 'PUT',
                params: { nroNotaRecepcion: nNotaRecepcion },
                data: { state: 'Rechazado' },
                withCredentials: true,
                url: "http://localhost:9000/compras-nacionales/nota-recepcion/aceptar-documento/rechazado"
            }));
            setStateKeeper('');
            setReload(!reload);
        };
        if (stateKeeper === 'Rechazado'){
            rechazar(nroNotaRecepcionKeeper);
        }
    }, [nroNotaRecepcionKeeper, stateKeeper, reload]); // previously: [nroNotaRecepcionKeeper]
    // https://stackoverflow.com/questions/66017049/react-hook-useeffect-has-missing-dependencies-colors-and-options-either-in

    const navigate = useNavigate();
    const view = (id) => {
        navigate(`/compras-nacionales/nota-recepcion/visualizar-documento/${id}`);
    };

    return (
        <div>
            <div className='d-flex'>
                <Sidebar />

                <div className='w-100'>
                    <Title 
                        document="Nota de recepción" 
                        type="Compras nacionales" 
                        subType="Aceptar Documento"
                        active1={false}
                        active2={true}
                        active3={false}
                        link1="/compras-nacionales/nota-recepcion/nuevo-documento"
                        link2="/compras-nacionales/nota-recepcion/aceptar-documento"
                        link3="/compras-nacionales/nota-recepcion/historial-documento"
                    >
                    </Title>

                    <div className='dataTable container'>
                        <MaterialTable
                            columns={columnas}
                            data={data}
                            title='Lista de notas de recepción'
                            actions={[
                                {
                                    icon: 'check',
                                    tooltip: 'Aceptar',
                                    onClick: (event, rowData) => { setNroNotaRecepcionKeeper(rowData.nro_nota_recepcion); setStateKeeper('Aceptado'); },
                                    iconProps: { style: { color: "#16A34A" } }
                                },
                                {
                                    icon: 'clear',
                                    tooltip: 'ELiminar',
                                    onClick: (event, rowData) => { setNroNotaRecepcionKeeper(rowData.nro_nota_recepcion); setStateKeeper('Rechazado'); },
                                    iconProps: { style: { color: "#FF3C3C" } }
                                },
                                {
                                    icon: 'visibility',
                                    tooltip: 'Ver',
                                    onClick: (event, rowData) => { view(rowData.nro_nota_recepcion); },
                                    iconProps: { style: { color: "#4763E4" } }
                                }
                            ]}
                            options= {{
                                actionsColumnIndex: -1,
                                exportButton: true,
                                exportAllData: true,
                                exportFileName: 'ComprasNacionales-NotaRecepcion-Pendientes'
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

export default CN_NR_AD;
