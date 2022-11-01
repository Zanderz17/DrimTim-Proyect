import React from 'react';
import { useState } from 'react'
import Axios from 'axios';

import Sidebar from '../../../components/sidebar/Sidebar'
import Title from '../../../components/title/Title'
import '../../../css/pages-styles/ComprasNacionales/SolicitudDeCotizacion/CN_SCZ_ND.css'

function IM_SCZ_VD() {

    const [inputList, setinputList]= useState([{IDMaterial:'', stockMaterial:'', priceMaterial: ''}]);

    return (
        <div className='d-flex'>
            <Sidebar />
            <div className='w-100'>
                <Title 
                    document="Solicitud de cotización" 
                    type="Compras nacionales" 
                    subType="Ver documento"
                    active1={false}
                    active2={false}
                    active3={false}
                    link1="/importaciones/solicitud-cotizacion/nuevo-documento"
                    link2="/importaciones/solicitud-cotizacion/aceptar-documento"
                    link3="/importaciones/solicitud-cotizacion/historial-documento"
                >
                </Title>

                <div className='new-doc-form'>              
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <h2>Ver solicitud de cotización</h2>  
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className='col-6'>
                                <label className="form-label" htmlFor="IDSolCompra">Número de solicitud de cotización</label>
                                <input className="form-control" type="number" id="IDSolCompra" value={4343} disabled/>
                            </div>

                            <div className='col-6'>
                                <label className="form-label" htmlFor="IDSolCompra">Número de solicitud de compra</label>
                                <input className="form-control" type="number" id="IDSolCompra" value={424} disabled/>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className='col-6'>
                                <label className="form-label" htmlFor="fecha_elaboracion">Fecha de elaboración</label>
                                <input className="form-control" type="date" id="fecha_elaboracion" value={"2018-07-22" /* Use YYY-MM-DD*/} disabled/>
                            </div>
                            
                            <div className='col-6'>
                                <label className="form-label" htmlFor="fecha_limite">Fecha límite de respuesta</label>
                                <input className="form-control" type="date" id="fecha_limite" value={"2018-07-22" /* Use YYY-MM-DD*/} disabled/>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className='col-12'>
                                <label className="form-label" htmlFor="proveedor">Nombre del proveedor</label>
                                <input className="form-control" type="text" id="proveedor" value={"DrimTim"} disabled/>
                            </div>
                        </div>

                        {    
                        inputList.map( (x,i)=>{
                            return(
                                <div className="list-products row form-group" key={i}>
                                    <div className='col-4'>
                                        <label className="form-label" htmlFor="IDMaterial">Identificador del material</label>
                                        <input className="form-control" type="text" name="IDMaterial" value={"XXXX-XXXX-XXXX-XXXX"} disabled />
                                    </div>
                                    <div className='col-2'>
                                        <label className="form-label" htmlFor="stockMaterial">Cantidad Requerida</label>
                                        <input className="form-control" type="number" name="stockMaterial" value={422} disabled/>
                                    </div>
                                    <div className='col-2'>
                                        <label className="form-label" htmlFor="priceMaterial">Precio por Unidad</label>
                                        <input className="form-control" type="number" name="priceMaterial" value={42} disabled/>
                                    </div>
                                </div> 
                            );
                            })
                        }

                        <div className="row form-group">
                            <div className='col-12'>
                                <label className="form-label" htmlFor="descripcion">Descripción</label>
                                <input className="form-control" type="text" id="descripcion" value={'Descripción...'} disabled />
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className='col-12'>
                                <label className="form-label" htmlFor="fechaMax">Plazo máximo de entrega de mercancias</label>
                                <input className="form-control" type="date" id="fechaMax" value={"2018-07-22" /* Use YYY-MM-DD*/} disabled/>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className='col-12'>
                                <label className="form-label" htmlFor="receptor">Nombre del receptor</label>
                                <input className="form-control" type="text" id="receptor" value={"DrimTim"} disabled/>
                            </div>
                        </div>

                        <div className='final-submit row'>
                            <div className='col-2'>
                                <button className="btn btn-success register w-100">Regresar</button>
                            </div>
                            <div className='col-2'>
                                <button className="btn btn-danger anular w-100">Desacargar</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default IM_SCZ_VD;
