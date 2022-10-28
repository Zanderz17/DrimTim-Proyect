import React from 'react';
import { useState } from 'react'
import Axios from 'axios';

import Sidebar from '../../../components/sidebar/Sidebar'
import Title from '../../../components/title/Title'
import '../../../css/pages-styles/ComprasNacionales/SolicitudDeCompra/CN_SC_ND.css'

function IM_SC_VD() {
    const [inputList, setinputList]= useState([{id_material:'', cant_requerida:''}]);
    
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
                    active3={true}
                    link1="/importaciones/solicitud-compra"
                    link2="/importaciones/solicitud-compra/aceptar-documento"
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
                                <input className="form-control" type="number" id="IDSolCompra" value={44422} disabled/>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className='col-12'>
                                <label className="form-label" htmlFor="fechaSolCompra">Fecha de elaboración</label>
                                <input className="form-control" type="date" id="fechaSolCompra" value={"2018-07-22" /* Use YYY-MM-DD*/} disabled/>
                            </div>
                        </div>

                        {    
                        inputList.map((x,i) => {
                            return(
                                <div className="list-products row form-group" key={i}>
                                    <div className='col-5'>
                                        <label className="form-label" htmlFor="IDMaterial">Identificador del material</label>
                                        <input className="form-control" type="text" name="id_material" value={322323} disabled/>
                                    </div>
                                    <div className='col-3'>
                                        <label className="form-label" htmlFor="stockMaterial">Cantidad Requerida</label>
                                        <input className="form-control" type="number" name="cant_requerida" value={322323} disabled />
                                    </div>
                                </div> 
                            );
                            })
                        }

                        <div className="row form-group">
                            <div className='col-12'>
                                <label className="form-label" htmlFor="descripcion">Descripción</label>
                                <input className="form-control" type="text" id="descripcion" value={"Bla, bla, bla"} disabled/>
                                </div>
                        </div>

                        <div className="row form-group">
                            <div className='col-12'>
                                <label className="form-label" htmlFor="puntoDePedido">Punto de pedido</label>
                                <input className="form-control" type="text" id="puntoDePedido" value={"Bla, bla, bla"} disabled/>
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
