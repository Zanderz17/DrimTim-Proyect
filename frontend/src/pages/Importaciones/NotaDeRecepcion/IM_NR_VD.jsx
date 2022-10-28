import React from 'react';
import { useState } from 'react'
import Axios from 'axios';

import Sidebar from '../../../components/sidebar/Sidebar'
import Title from '../../../components/title/Title'
import '../../../css/pages-styles/ComprasNacionales/SolicitudDeCompra/CN_SC_ND.css'

function IM_NR_VD() {
    const [inputList, setinputList]= useState([{IDMaterial:'', stockMaterial:'', priceMaterial: ''}]);

    
    return (
        <div className='d-flex'>
            <Sidebar />
            <div className='w-100'>
                <Title 
                    document="Nota de recepción" 
                    type="Compras nacionales" 
                    subType="Ver documento"
                    active1={false}
                    active2={false}
                    active3={false}
                    link1="/importaciones/nota-recepcion"
                    link2="/importaciones/nota-recepcion/aceptar-documento"
                >
                </Title>

                <div className='new-doc-form'>
                    <form>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12'>
                                    <h2>Ver nota de recepción</h2>   
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="IDNotaRec">Número de nota de recpción</label>
                                    <input className="form-control" type="number" id="IDNotaRec" value={322323} disabled/>
                                </div>

                                <div className='col-6'>
                                    <label className="form-label" htmlFor="IDOrCompra">Número de orden de compra</label>
                                    <input className="form-control" type="number" id="IDOrCompra" value={4343} disabled/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="fechaRecepcion">Fecha de recepción</label>
                                    <input className="form-control" type="date" id="fechaRecepcion" disabled/>
                                </div>
                                
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="fechaElaboracion">Fecha de elaboración de orden de compra</label>
                                    <input className="form-control" type="date" id="fechaElaboracion" disabled/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="proveedor">Nombre del proveedor</label>
                                    <input className="form-control" type="text" id="proveedor" value="DrimTim" disabled/>
                                </div>

                                <div className='col-6'>
                                    <label className="form-label" htmlFor="condPago">Condiciones de pago</label>
                                    <input className="form-control" type="text" id="condPago" value="Contado/Cuotas" disabled/>
                                </div>
                            </div>

                            {    
                            inputList.map( (x,i)=>{
                                return(
                                    <div className="list-products row form-group" key={i}>
                                        <div className='col-4'>
                                            <label className="form-label" htmlFor="IDMaterial"> Identificador del material </label>
                                            <input className="form-control" type="text" name="IDMaterial" value={"fsafdsfd"} disabled/>
                                        </div>
                                        <div className='col-2'>
                                            <label className="form-label" htmlFor="stockMaterial"> Cantidad Recibida </label>
                                            <input className="form-control" type="number" name="stockMaterial" value={323223} disabled/>
                                        </div>
                                        <div className='col-2'>
                                            <label className="form-label" htmlFor="priceMaterial"> Precio por Unidad </label>
                                            <input className="form-control" type="number" name="priceMaterial" value={323223} disabled/>
                                        </div>
                                    </div> 
                                );
                                })
                            }

                            <div className="row form-group">
                                <div className='col-12'>
                                    <label className="form-label" htmlFor="descripcion">Descripción</label>
                                    <input className="form-control" type="text" id="descripcion" value={'Descripcion ...'} disabled/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-12'>
                                    <label className="form-label" htmlFor="importeTotal">Importe total de la mercancia recibida</label>
                                    <input className="form-control" type="number" id="importeTotal" value={3223} disabled/>
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
                                    <button className="btn btn-danger anular w-100">Descargar</button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default IM_NR_VD
