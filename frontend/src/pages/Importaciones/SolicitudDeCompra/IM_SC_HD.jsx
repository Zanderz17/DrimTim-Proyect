import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import Sidebar from '../../../components/sidebar/Sidebar';
import Title from '../../../components/title/Title';

import MaterialTable from 'material-table';
import { useState } from 'react';

function IM_SC_HD() {
    const columnas = [
        {
            title: 'Nro. Solicitud de compra',
            field: 'nro_solicitud_compra'
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
    //const [nroSolCompraKeeper, setNroSolCompraKeeper] = useState('');
    //const [stateKeeper, setStateKeeper] = useState('');
    
    const [reload, setReload] = useState(false);
    useEffect( () => {}, [reload]);

    useEffect( () => {
        const getList = async () => {
            const req = (await Axios({
                method: 'GET',
                withCredentials: true,
                url: "http://localhost:9000/importaciones/solicitud-compra/historial-documento"
            })).data;
            setData(req);
        };
        getList();
    }, [reload]);

    const navigate = useNavigate();
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
                    subType="Historial de documentos"
                    active1={false}
                    active2={false}
                    active3={true}
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
                            exportFileName: 'Importaciones-SolicitudCompra-Historial'
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

export default IM_SC_HD;