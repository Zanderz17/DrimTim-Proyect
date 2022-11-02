import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import Axios from 'axios';

import Sidebar from '../../../components/sidebar/Sidebar'
import Title from '../../../components/title/Title'
import '../../../css/pages-styles/ComprasNacionales/SolicitudDeCompra/CN_SC_ND.css'

function IM_OC_VD() {
    let { id } = useParams();

    const [inputList, setinputList]= useState([{id_material:'', cant_requerida:'', precio_unitario: '', importe_parcial: ''}]);
    const [nroOrdenCompra, setNroOrdenCompra] = useState("");
    const [nroSolicitudCotizacion, setNroSolicitudCotizacion] = useState("");
    const [fechaElaboracion, setFechaElaboracion] = useState("");
    const [fechaEntregaMercancias, setFechaEntregaMercancias] = useState("");
    const [nombreProveedor, setNombreProveedor] = useState("");
    const [condicionesPago, setCondicionesPago] = useState("Contado");
    const [descripcion, setDescripcion] = useState("");
    const [impuesto, setImpuesto] = useState("");
    const [importeTotal, setImporteTotal] = useState("");
    const [transporte, setTransporte] = useState("");
    const [costoTransporte, setCostoTransporte] = useState("");
    const [fraccionAduanal, setFraccionAduanal] = useState("");
    const [costoTotal, setCostoTotal] = useState("");

    useEffect( () => {
        const getData = async () => {
            const data = (await Axios({
                method: 'GET',
                withCredentials: true,
                url: `http://localhost:9000/importaciones/orden-compra/visualizar-documento/${id}`
            })).data;
            setinputList(data.productos);
            setNroOrdenCompra(data.nro_orden_compra);
            setNroSolicitudCotizacion(data.nro_sol_cotizacion);
            setFechaElaboracion(data.fecha_elaboracion);
            setFechaEntregaMercancias(data.fecha_entrega_mercancias);
            setNombreProveedor(data.nombre_proveedor);
            setCondicionesPago(data.condiciones_pago);
            setDescripcion(data.descripcion);
            setImpuesto(data.impuesto);
            setImporteTotal(data.importe_total);
            setTransporte(data.transporte);
            setCostoTransporte(data.costo_transporte);
            setFraccionAduanal(data.fraccion_aduanal);
            setCostoTotal(data.costo_total);
        };
        getData();
    }, []);

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
                    link3="/importaciones/orden-compra/historial-documento"
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
                                <input className="form-control" type="number" id="IDOrCompra" value={nroOrdenCompra} disabled/>
                            </div>

                            <div className='col-6'>
                                <label className="form-label" htmlFor="IDSolCompra">Número de solicitud de cotización</label>
                                <input className="form-control" type="number" id="IDSolCompra" value={nroSolicitudCotizacion} disabled/>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className='col-6'>
                                <label className="form-label" htmlFor="fechaSolCompra">Fecha de elaboración</label>
                                <input className="form-control" type="date" id="fechaSolCompra" value={fechaElaboracion} disabled/>
                            </div>
                            
                            <div className='col-6'>
                                <label className="form-label" htmlFor="fechaEntrega">Fecha de entrega de mercancias</label>
                                <input className="form-control" type="date" id="fechaEntrega" value={fechaEntregaMercancias} disabled/>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className='col-6'>
                                <label className="form-label" htmlFor="proveedor">Nombre del proveedor</label>
                                <input className="form-control" type="text" id="proveedor" value={nombreProveedor} disabled/>
                            </div>

                            <div className='col-6'>
                                <label className="form-label" htmlFor="condPago">Condiciones de pago</label>
                                <input className="form-control" type="text" id="condPago" value={condicionesPago} disabled/>
                            </div>
                        </div>

                        {    
                            inputList.map( (product,i)=>{
                                return(
                                    <div className="list-products row form-group" key={i}>
                                        <div className='col-4'>
                                            <label className="form-label" htmlFor="id_material">Identificador del material</label>
                                            <input className="form-control" type="text" name="id_material" value={product.id_material} disabled />
                                        </div>
                                        <div className='col-2'>
                                            <label className="form-label" htmlFor="cant_requerida">Cantidad Requerida</label>
                                            <input className="form-control" type="number" name="cant_requerida" value={product.cant_requerida} disabled />
                                        </div>
                                        <div className='col-2'>
                                            <label className="form-label" htmlFor="precio_unitario">Precio por Unidad</label>
                                            <input className="form-control" type="number" name="precio_unitario" value={product.precio_unitario} disabled/>
                                        </div>
                                        <div className='col-2'>
                                            <label className="form-label" htmlFor="importe_parcial">Importe Parcial</label>
                                            <input className="form-control" type="number" name="importe_parcial" value={product.importe_parcial} disabled/>
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
                            <div className='col-6'>
                                <label className="form-label" htmlFor="impuesto">Impuesto</label>
                                <input className="form-control" type="number" id="impuesto" value={impuesto} disabled/>
                            </div>

                            <div className='col-6'>
                                <label className="form-label" htmlFor="importeTotal">Importe total</label>
                                <input className="form-control" type="number" id="importeTotal" value={importeTotal} disabled/>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className='col-6'>
                                <label className="form-label" htmlFor="transporte">Transporte</label>
                                <input className="form-control" type="text" id="transporte" value={transporte} disabled/>
                            </div>

                            <div className='col-6'>
                                <label className="form-label" htmlFor="costoTransporte">Costo de transporte</label>
                                <input className="form-control" type="number" id="costoTransporte" value={costoTransporte} disabled/>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className='col-6'>
                                <label className="form-label" htmlFor="aduana">Fracción aduanal aplicable</label>
                                <input className="form-control" type="number" id="aduana" value={fraccionAduanal} disabled/>
                            </div>

                            <div className='col-6'>
                                <label className="form-label" htmlFor="costoTotal">Costo de total</label>
                                <input className="form-control" type="number" id="costoTotal" value={costoTotal} disabled/>
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
