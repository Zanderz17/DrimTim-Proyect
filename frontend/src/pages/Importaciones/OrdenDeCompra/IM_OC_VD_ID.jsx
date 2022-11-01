import React from 'react';
import { useState } from 'react'
import Axios from 'axios';

import Sidebar from '../../../components/sidebar/Sidebar'
import Title from '../../../components/title/Title'
import '../../../css/pages-styles/ComprasNacionales/SolicitudDeCompra/CN_SC_ND.css'

function IM_OC_VD() {
    const [inputList, setinputList]= useState([{id_material:'', cant_requerida:'', precio_unitario: '', importe_parcial: ''}]);

    return (
        <div className='d-flex'>
            <Sidebar />
            <div className='w-100'>
                <Title 
                    document="Orden de compra" 
                    type="Compras nacionales" 
                    subType="Ver documento"
                    active1={false}
                    active2={false}
                    active3={false}
                    link1="/importaciones/orden-compra/nuevo-documento"
                    link2="/importaciones/orden-compra/aceptar-documento"
                >
                </Title>

                <div className='new-doc-form'> 
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <h2>Ver orden de compra</h2>  
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className='col-6'>
                                <label className="form-label" htmlFor="IDOrCompra">Número de orden de compra</label>
                                <input className="form-control" type="number" id="IDOrCompra" value={2342} disabled/>
                            </div>

                            <div className='col-6'>
                                <label className="form-label" htmlFor="IDSolCompra">Número de solicitud de cotización</label>
                                <input className="form-control" type="number" id="IDSolCompra" value={3232} disabled/>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className='col-6'>
                                <label className="form-label" htmlFor="fechaSolCompra">Fecha de elaboración</label>
                                <input className="form-control" type="date" id="fechaSolCompra" value={"2018-09-21"} disabled/>
                            </div>
                            
                            <div className='col-6'>
                                <label className="form-label" htmlFor="fechaEntrega">Fecha de entrega de mercancias</label>
                                <input className="form-control" type="date" id="fechaEntrega" value={"2018-09-21"} disabled/>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className='col-6'>
                                <label className="form-label" htmlFor="proveedor">Nombre del proveedor</label>
                                <input className="form-control" type="text" id="proveedor" value={"DrimTim"} disabled/>
                            </div>

                            <div className='col-6'>
                                <label className="form-label" htmlFor="condPago">Condiciones de pago</label>
                                <select className="form-select" aria-label="Default" disabled>
                                    <option value="Contado">Contado</option>
                                    <option value="Cuotas">Cuotas</option>
                                </select>
                            </div>
                        </div>

                        {    
                            inputList.map( (x,i)=>{
                                return(
                                    <div className="list-products row form-group" key={i}>
                                        <div className='col-4'>
                                            <label className="form-label" htmlFor="id_material">Identificador del material</label>
                                            <input className="form-control" type="text" name="id_material" value={"XXXX-XXXX-XXXX-XXXX"} disabled />
                                        </div>
                                        <div className='col-2'>
                                            <label className="form-label" htmlFor="cant_requerida">Cantidad Requerida</label>
                                            <input className="form-control" type="number" name="cant_requerida" value={2323} disabled />
                                        </div>
                                        <div className='col-2'>
                                            <label className="form-label" htmlFor="precio_unitario">Precio por Unidad</label>
                                            <input className="form-control" type="number" name="precio_unitario" value={3223} disabled/>
                                        </div>
                                        <div className='col-2'>
                                            <label className="form-label" htmlFor="importe_parcial">Importe Parcial</label>
                                            <input className="form-control" type="number" name="importe_parcial" value={221} disabled/>
                                        </div>
                                    </div> 
                                );
                            })
                        }

                        <div className="row form-group">
                            <div className='col-12'>
                                <label className="form-label" htmlFor="descripcion">Descripción</label>
                                <input className="form-control" type="text" id="descripcion" value={'Descripción...'} disabled/>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className='col-6'>
                                <label className="form-label" htmlFor="impuesto">Impuesto</label>
                                <input className="form-control" type="number" id="impuesto" value={323223} disabled/>
                            </div>

                            <div className='col-6'>
                                <label className="form-label" htmlFor="importeTotal">Importe total</label>
                                <input className="form-control" type="number" id="importeTotal" value={3232} disabled/>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className='col-6'>
                                <label className="form-label" htmlFor="transporte">Transporte</label>
                                <input className="form-control" type="text" id="transporte" value={"Platillo volador"} disabled/>
                            </div>

                            <div className='col-6'>
                                <label className="form-label" htmlFor="costoTransporte">Costo de transporte</label>
                                <input className="form-control" type="number" id="costoTransporte" value={3232} disabled/>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className='col-6'>
                                <label className="form-label" htmlFor="aduana">Fracción aduanal aplicable</label>
                                <input className="form-control" type="number" id="aduana" value={3232} disabled/>
                            </div>

                            <div className='col-6'>
                                <label className="form-label" htmlFor="costoTotal">Costo de total</label>
                                <input className="form-control" type="number" id="costoTotal" value={3232} disabled/>
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
    )
}

export default IM_OC_VD;
