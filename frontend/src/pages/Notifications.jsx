import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import "../css/pages-styles/Notifications.css";

import Sidebar from "../components/sidebar/Sidebar";
import TitleNotification from "../components/title/TitleNotification";
import MaterialTable from "material-table";

function Notifications() {
  const columnas = [
    {
      title: "Nro. de Notificación",
      field: "nro_notificacion",
    },
    {
      title: "ID de producto",
      field: "id_producto",
    },
    {
      title: "Stock",
      field: "stock",
    },
    {
      title: "Prioridad",
      field: "prioridad",
    },
  ];

  const [data, setData] = useState([]);
  const [nroNotificacionKeeper, setNroNotificacionKeeper] = useState("");
  const [stateKeeper, setStateKeeper] = useState("");

  /*New. Tratar de jugar con la variable "typeDoc" Ej: Si es Importatación navegar a /imporaciones/nuevo-documento*/
  const [typeDoc, setTypeDoc] = useState("");
  /**/

  const [reload, setReload] = useState(false);
  useEffect(() => {}, [reload]);

  useEffect(() => {
    const getList = async () => {
      const req = (
        await Axios({
          method: "GET",
          withCredentials: true,
          url: "http://localhost:9000/notificaciones",
        })
      ).data;
      setData(req);
    };
    getList();
  }, [reload]);

  useEffect(() => {
    const agregar = async (nNotificacion) => {
      await Axios({
        method: "PUT",
        params: { nroNotificacion: nNotificacion },
        data: { state: "true" },
        withCredentials: true,
        url: "http://localhost:9000/notificaciones/agregar",
      });
      setStateKeeper("");
      setReload(!reload);
    };
    if (stateKeeper === "true") {
      agregar(nroNotificacionKeeper);
    }
  }, [nroNotificacionKeeper, stateKeeper, reload]); // previously: [nroNotificacionKeeper]

  useEffect(() => {
    const desagregar = async (nNotificacion) => {
      await Axios({
        method: "PUT",
        params: { nroNotificacion: nNotificacion },
        data: { state: "false" },
        withCredentials: true,
        url: "http://localhost:9000/notificaciones/desagregar",
      });
      setStateKeeper("");
      setReload(!reload);
    };
    if (stateKeeper === "false") {
      desagregar(nroNotificacionKeeper);
    }
  }, [nroNotificacionKeeper, stateKeeper, reload]); // previously: [nroNotificacionKeeper]

  /*
    const data = [
        {
            nro_notificacion: 313131,
            id_producto: 43243,
            stock: 3424,
            prioridad: 422442,
            agregado: true  // Propiedad que no se muestra pero sirve para estilizar el carrito
        },
        {
            nro_notificacion: 313131,
            id_producto: 43243,
            stock: 3424,
            prioridad: 422442,
            agregado: false   // Propiedad que no se muestra pero sirve para estilizar el carrito
        }
    ]
  
  */
    const [type, setType] = useState('compras-nacionales');
    const [travel, setTravel] = useState('');
    
    const navigate = useNavigate();
    useEffect( () => {
        const getListAdded = async () => {
            const dataToSend = (await Axios({
                method: 'GET',
                withCredentials: true,
                url: "http://localhost:9000/notificaciones/to-send"
            })).data;
            navigate(`/Notificaciones/${type}/solicitud-compra/nuevo-documento`, { state: dataToSend});
        };
        if(travel !== ''){
            getListAdded();
        }
    }, [travel]);

    const [id, setId] = useState('');
    useEffect( () => {
        const remove = async () => {
            const req = (await Axios({
                method: 'DELETE',
                withCredentials: true,
                url: `http://localhost:9000/notificaciones/${id}`
            })).data;
            setReload(!reload);
        };
        if(id != ''){
            remove();
        }
    }, [id, reload]);

    return (
      <>
        <div>
            <div className='notifications d-flex'>

                <Sidebar />
                
                <div className='w-100'>
                    <TitleNotification />

                    <div className='d-flex'>
                        <div className='buttonCompras-div'>
                            <button type="button" className="btn btn-warning" onClick={() => {setTravel('true')}}>Generar Solicitud de compra</button>
                        </div>

                        <div className='selectDocument-div'>
                            <select className="form-select" aria-label="Default" onChange={(e) => setTypeDoc(e.target.value)} value={typeDoc} required>
                                <option value="">Elige una opción</option>
                                <option value="Compras Nacionales">Compras Nacionales</option>
                                <option value="Importaciones">Importaciones</option>
                            </select>
                        </div>
                    </div>

                    <div className='dataTable container'>
                        <MaterialTable
                            columns={columnas}
                            data={data}
                            title='Lista de solicitudes de cotización'
                            actions={[
                                (rowData) => {
                                    return rowData.agregado=="true"? 
                                        {
                                            icon: () => <i className="bi bi-cart-check icon-green"></i>,
                                            tooltip: 'Agregado',
                                            onClick: (event, rowData) => { setNroNotificacionKeeper(rowData.nro_notificacion); setStateKeeper('false'); },
                                        }:
                                        {
                                            icon: () => <i className="bi bi-cart-plus icon-normal"></i>,
                                            tooltip: 'Agregar',
                                            onClick: (event, rowData) => { setNroNotificacionKeeper(rowData.nro_notificacion); setStateKeeper('true'); },
                                        }  
                                },
                                {
                                    icon: () => <i className="bi bi-trash icon-red"></i>,
                                    tooltip: 'ELiminar',
                                    onClick: (event, rowData) => { setId(rowData.nro_notificacion) },
                                    iconProps: { style: { color: "#FF3C3C" } }
                                }
                            ]}
                            options= {{
                                actionsColumnIndex: -1,
                                exportButton: true,
                                exportAllData: true,
                                exportFileName: 'Notificaciones'
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
        
        <div>
            <div className="dataTable container">
                <MaterialTable
                    columns={columnas}
                    data={data}
                    title="Lista de solicitudes de cotización"
                    actions={[
                        (rowData) => {
                            return rowData.agregado == "true"
                                ? {
                                    icon: () => (
                                        <i className="bi bi-cart-check icon-green"></i>
                                    ),
                                    tooltip: "Agregado",
                                    onClick: (event, rowData) => {
                                        setNroNotificacionKeeper(rowData.nro_notificacion);
                                        setStateKeeper("false");
                                    },
                                }
                                : {
                                    icon: () => (
                                        <i className="bi bi-cart-plus icon-normal"></i>
                                    ),
                                    tooltip: "Agregar",
                                    onClick: (event, rowData) => {
                                        setNroNotificacionKeeper(rowData.nro_notificacion);
                                        setStateKeeper("true");
                                    },
                                };
                        },
                        {
                            icon: () => <i className="bi bi-trash icon-red"></i>,
                            tooltip: "ELiminar",
                            onClick: (event, rowData) => {},
                            iconProps: { style: { color: "#FF3C3C" } },
                        },
                    ]}
                    options={{
                        actionsColumnIndex: -1,
                        exportButton: true,
                        exportAllData: true,
                        exportFileName: "Notificaciones",
                    }}
                    localization={{
                        header: {
                            actions: "Acciones",
                        },
                    }}
                />
            </div>
        </div>
      </>
    );
}

export default Notifications;
