import React from 'react';
import { useState } from 'react';
import Axios from 'axios';

import Sidebar from '../../../components/sidebar/Sidebar'
import Title from '../../../components/title/Title'
import '../../../css/pages-styles/ComprasNacionales/OrdenDeCompra/CN_OC_AD.css'

function CN_OC_ND() {
    const [inputList, setinputList]= useState([{id_material:'', cant_requerida:'', precio_unitario: '', importe_parcial: ''}]);

    const [nroOrdenCompra, setNroOrdenCompra] = useState("");
    const [nroSolicitudCotizacion, setNroSolicitudCotizacion] = useState("");
    const [fechaElaboracion, setFechaElaboracion] = useState("");
    const [fechaEntregaMercancias, setFechaEntregaMercancias] = useState("");
    const [nombreProveedor, setNombreProveedor] = useState("");
    const [condicionesPago, setCondicionesPago] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [impuesto, setImpuesto] = useState("");
    const [importeTotal, setImporteTotal] = useState("");

    const registrar = (e) => {
        Axios({
            method: 'POST',
            data: {
                nro_orden_compra: nroOrdenCompra,
                nro_sol_cotizacion: nroSolicitudCotizacion,
                fecha_elaboracion: fechaElaboracion,
                fecha_entrega_mercancias: fechaEntregaMercancias,
                nombre_proveedor: nombreProveedor,
                condiciones_pago: condicionesPago,
                productos: inputList,
                descripcion: descripcion,
                impuesto: impuesto,
                importe_total: importeTotal,
                estado: 'pendiente'
            },
            withCredentials: true,
            url: "http://localhost:9000/compras-nacionales/orden-compra/nuevo-documento"
        });
        e.preventDefault();
    };

    const handleinputchange=(e, index)=>{
        const {name, value}= e.target;
        const list= [...inputList];
        list[index][name]= value;
        setinputList(list);
    }

    const handleremove= index =>{
        const list=[...inputList];
        list.splice(index,1);
        setinputList(list);
    }

    const handleaddclick=()=>{ 
        setinputList([...inputList, {id_material:'', cant_requerida:'', precio_unitario: '', importe_parcial: ''}]);
    }

    return (
        <div className='d-flex'>
            <Sidebar />
            <div className='w-100'>
                <Title 
                    document="Orden de compra" 
                    type="Compras nacionales" 
                    subType="Nuevo documento"
                    active1={true}
                    active2={false}
                    active3={false}
                    link1="/compras-nacionales/orden-compra/nuevo-documento"
                    link2="/compras-nacionales/orden-compra/aceptar-documento"
                    link3="/compras-nacionales/orden-compra/historial-documento"
                >
                </Title>

                <div className='new-doc-form'> 
                    <form>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12'>
                                    <h2>Registro de orden de compra</h2>  
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="IDOrCompra">Número de orden de compra</label>
                                    <input className="form-control" type="number" id="IDOrCompra" placeholder="0000-0000-0000-0000" onChange={(e) => setNroOrdenCompra(e.target.value)} required/>
                                </div>

                                <div className='col-6'>
                                    <label className="form-label" htmlFor="IDSolCompra">Número de solicitud de cotización</label>
                                    <input className="form-control" type="number" id="IDSolCompra" placeholder="0000-0000-0000-0000" onChange={(e) => setNroSolicitudCotizacion(e.target.value)} required/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="fechaSolCompra">Fecha de elaboración</label>
                                    <input className="form-control" type="date" id="fechaSolCompra" onChange={(e) => setFechaElaboracion(e.target.value)} required/>
                                </div>
                                
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="fechaEntrega">Fecha de entrega de mercancias</label>
                                    <input className="form-control" type="date" id="fechaEntrega" onChange={(e) => setFechaEntregaMercancias(e.target.value)} required/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="proveedor">Nombre del proveedor</label>
                                    <input className="form-control" type="text" id="proveedor" placeholder="DrimTim" onChange={(e) => setNombreProveedor(e.target.value)} required/>
                                </div>

                                <div className='col-6'>
                                    <label className="form-label" htmlFor="condPago">Condiciones de pago</label>
                                    <select className="form-select" aria-label="Default" onChange={(e) => setCondicionesPago(e.target.value)} required>
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
                                                <input className="form-control" type="text" name="id_material" placeholder="XXXX-XXXX-XXXX-XXXX" onChange={e=>handleinputchange(e,i)} required />
                                            </div>
                                            <div className='col-2'>
                                                <label className="form-label" htmlFor="cant_requerida">Cantidad Requerida</label>
                                                <input className="form-control" type="number" name="cant_requerida" placeholder="000" onChange={e=>handleinputchange(e,i)} required />
                                            </div>
                                            <div className='col-2'>
                                                <label className="form-label" htmlFor="precio_unitario">Precio por Unidad</label>
                                                <input className="form-control" type="number" name="precio_unitario" placeholder="000" onChange={e=>handleinputchange(e,i)} required />
                                            </div>
                                            <div className='col-2'>
                                                <label className="form-label" htmlFor="importe_parcial">Importe Parcial</label>
                                                <input className="form-control" type="number" name="importe_parcial" placeholder="000" onChange={e=>handleinputchange(e,i)} required />
                                            </div>
                                            {
                                                inputList.length!==1 &&
                                                <div className='col-2 my-auto'>
                                                    <button  className="btn btn-danger w-100" onClick={()=> handleremove(i)}>Eliminar</button>
                                                </div>
                                            }
                                            { 
                                                inputList.length-1===i &&
                                                <div className='col-2 my-auto'>
                                                    <button className="btn btn-success w-100" onClick={handleaddclick}>Añadir</button>
                                                </div>
                                            }
                                            
                                        </div> 
                                    );
                                })
                            }

                            <div className="row form-group">
                                <div className='col-12'>
                                    <label className="form-label" htmlFor="descripcion">Descripción</label>
                                    <input className="form-control" type="text" id="descripcion" placeholder='Descripción...' onChange={(e) => setDescripcion(e.target.value)} required/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="impuesto">Impuesto</label>
                                    <input className="form-control" type="number" id="impuesto" placeholder="DrimTim" onChange={(e) => setImpuesto(e.target.value)} required/>
                                </div>

                                <div className='col-6'>
                                    <label className="form-label" htmlFor="importeTotal">Importe total</label>
                                    <input className="form-control" type="number" id="importeTotal" placeholder="999999999" onChange={(e) => setImporteTotal(e.target.value)} required/>
                                </div>
                            </div>

                            <div className='final-submit row'>
                                <div className='col-2'>
                                    <button className="btn btn-success register w-100" onClick={registrar}>Registrar</button>
                                </div>
                                <div className='col-2'>
                                    <button className="btn btn-danger anular w-100">Anular</button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CN_OC_ND;