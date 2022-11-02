import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import Axios from 'axios';

import Sidebar from '../../../components/sidebar/Sidebar'
import Title from '../../../components/title/Title'
import '../../../css/pages-styles/ComprasNacionales/SolicitudDeCompra/CN_SC_ND.css'

function IM_SC_VD() {
    let { id } = useParams();
    
    const [inputList, setinputList]= useState([{id_material:'', cant_requerida:''}]);
    const [nroSolicitudCompra, setNroSolicitudCompra] = useState("");
    const [fechaElaboracion, setFechaElaboracion] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [puntoPedido, setPuntoPedido] = useState("");

    useEffect( () => {
        const getData = async () => {
            const data = (await Axios({
                method: 'GET',
                withCredentials: true,
                url: `http://localhost:9000/importaciones/solicitud-compra/visualizar-documento/${id}`
            })).data;
            setinputList(data.productos);
            setNroSolicitudCompra(data.nro_solicitud_compra);
            setFechaElaboracion(data.fecha_elaboracion);
            setDescripcion(data.descripcion);
            setPuntoPedido(data.punto_pedido);
        };
        getData();
    }, []);

    return (
        <div className='d-flex'>
            <Sidebar />
            <div className='w-100'>
                <Title 
                    document="Solicitud de compra" 
                    type="Compras nacionales" 
                    subType="Nuevo documento"
                    active1={false}
                    active2={false}
                    active3={false}
                    link1="/importaciones/solicitud-compra/nuevo-documento"
                    link2="/importaciones/solicitud-compra/aceptar-documento"
                    link3="/importaciones/solicitud-compra/historial-documento"
                >
                </Title>

                <div className='new-doc-form'>  
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <h2>Registro de solicitud de compra</h2> 
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className='col-12'>
                                <label className="form-label" htmlFor="IDSolCompra">Número de solicitud de compra</label>
                                <input className="form-control" type="number" id="IDSolCompra" value={nroSolicitudCompra} disabled/>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className='col-12'>
                                <label className="form-label" htmlFor="fechaSolCompra">Fecha de elaboración</label>
                                <input className="form-control" type="date" id="fechaSolCompra" value={fechaElaboracion} disabled/>
                            </div>
                        </div>

                        {    
                        inputList.map((product,i) => {
                            return(
                                <div className="list-products row form-group" key={i}>
                                    <div className='col-5'>
                                        <label className="form-label" htmlFor="IDMaterial">Identificador del material</label>
                                        <input className="form-control" type="text" name="id_material" value={product.id_material} disabled/>
                                    </div>
                                    <div className='col-3'>
                                        <label className="form-label" htmlFor="stockMaterial">Cantidad Requerida</label>
                                        <input className="form-control" type="number" name="cant_requerida" value={product.cant_requerida} disabled />
                                    </div>
                                </div> 
                            );
                            })
                        }

                        <div className="row form-group">
                            <div className='col-12'>
                                <label className="form-label" htmlFor="descripcion">Descripción</label>
                                <input className="form-control" type="text" id="descripcion" value={descripcion} disabled/>
                                </div>
                        </div>

                        <div className="row form-group">
                            <div className='col-12'>
                                <label className="form-label" htmlFor="puntoDePedido">Punto de pedido</label>
                                <input className="form-control" type="text" id="puntoDePedido" value={puntoPedido} disabled/>
                            </div>
                        </div>

                        <div className='final-submit row'>
                            <div className='col-2'>
                                <button className="btn btn-success register w-100">Regresar</button>
                            </div>
                            <div className='col-2'>
                                <button className="btn btn-danger anular w-100">Descargar</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default IM_SC_VD;
