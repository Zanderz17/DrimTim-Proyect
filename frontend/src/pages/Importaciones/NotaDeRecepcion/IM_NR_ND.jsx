import React from 'react';
import { useState } from 'react'
import Axios from 'axios';

import Sidebar from '../../../components/sidebar/Sidebar'
import Title from '../../../components/title/Title'
import '../../../css/pages-styles/ComprasNacionales/NotaDeRecepcion/CN_NR_ND.css'

function IM_NR_ND() {
    const [inputList, setinputList]= useState([{IDMaterial:'', stockMaterial:'', priceMaterial: ''}]);
    
    const [nroNotaRecepcion, setNroNotaRecepcion] = useState("");
    const [nroOrdenCompra, setNroOrdenCompra] = useState("");
    const [fechaRecepcion, setFechaRecepcion] = useState("");
    const [fechaElaboracionOrdenCompra, setFechaElaboracionOrdenCompra] = useState("");
    const [nombreProveedor, setNombreProveedor] = useState("");
    const [condicionesPago, setCondicionesPago] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [importeTotalMercanciaRecibida, setImporteTotalMercanciaRecibida] = useState("");
    const [nombreReceptor, setNombreReceptor] = useState("");

    /*---- Cambiar --- */
    const registrar = (e) => {
        Axios({
            method: 'POST',
            data: {
                nro_nota_recepcion: nroNotaRecepcion,
                nro_orden_compra: nroOrdenCompra,
                fecha_recepcion: fechaRecepcion,
                fecha_elaboracion_orden_compra: fechaElaboracionOrdenCompra,
                nombre_proveedor: nombreProveedor,
                condiciones_pago: condicionesPago,
                productos: inputList,
                descripcion: descripcion,
                importe_total_mercancia_recibida: importeTotalMercanciaRecibida,
                nombre_receptor: nombreReceptor,
                estado: 'pendiente'
            },
            withCredentials: true,
            url: "http://localhost:9000/importaciones/nota-recepcion/nuevo-documento"
        });
        e.preventDefault();
    };

    const handleinputchange=(e, index)=>{
        const {name, value}= e.target;
        const list=[...inputList];
        list[index][name]= value;
        setinputList(list);
    }

    const handleremove= index=>{
        const list=[...inputList];
        list.splice(index,1);
        setinputList(list);
    }

    const handleaddclick=()=>{ 
        setinputList([...inputList, {IDMaterial:'', stockMaterial:'', priceMaterial: ''}]);
        console.log(inputList);
    }

    return (
        <div className='d-flex'>
            <Sidebar />
            <div className='w-100'>
                <Title 
                    document="Nota de recepción" 
                    type="Importaciones" 
                    subType="Nuevo documento"
                    active1={true}
                    active2={false}
                    active3={false}
                    link1="/importaciones/nota-recepcion/nuevo-documento"
                    link2="/importaciones/nota-recepcion/aceptar-documento"
                    link3="/importaciones/nota-recepcion/historial-documento"
                >
                </Title>

                <div className='new-doc-form'>
                    <form>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12'>
                                    <h2>Registro de nota de recepción</h2>   
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="IDNotaRec">Número de nota de recpción</label>
                                    <input className="form-control" type="number" id="IDNotaRec" placeholder="0000-0000-0000-0000" onChange={(e) => setNroNotaRecepcion(e.target.value)} required/>
                                </div>

                                <div className='col-6'>
                                    <label className="form-label" htmlFor="IDOrCompra">Número de orden de compra</label>
                                    <input className="form-control" type="number" id="IDOrCompra" placeholder="0000-0000-0000-0000" onChange={(e) => setNroOrdenCompra(e.target.value)} required/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="fechaRecepcion">Fecha de recepción</label>
                                    <input className="form-control" type="date" id="fechaRecepcion" onChange={(e) => setFechaRecepcion(e.target.value)} required/>
                                </div>
                                
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="fechaElaboracion">Fecha de elaboración</label>
                                    <input className="form-control" type="date" id="fechaElaboracion" onChange={(e) => setFechaElaboracionOrdenCompra(e.target.value)} required/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="proveedor">Nombre del proveedor</label>
                                    <input className="form-control" type="text" id="proveedor" placeholder="DrimTim" onChange={(e) => setNombreProveedor(e.target.value)} required/>
                                </div>

                                <div className='col-6'>
                                    <label className="form-label" htmlFor="condPago">Condiciones de pago</label>
                                    <input className="form-control" type="text" id="condPago" placeholder="Contado/Cuotas" onChange={(e) => setCondicionesPago(e.target.value)} required/>
                                </div>
                            </div>

                            {    
                            inputList.map( (x,i)=>{
                                return(
                                    <div className="list-products row form-group" key={i}>
                                        <div className='col-4'>
                                            <label className="form-label" htmlFor="IDMaterial"> Identificador del material </label>
                                            <input className="form-control" type="text" name="IDMaterial" placeholder="XXXX-XXXX-XXXX-XXXX" onChange={ e=>handleinputchange(e,i)} required />
                                        </div>
                                        <div className='col-2'>
                                            <label className="form-label" htmlFor="stockMaterial"> Cantidad Recibida </label>
                                            <input className="form-control" type="number" name="stockMaterial" placeholder="000" onChange={ e=>handleinputchange(e,i)} required />
                                        </div>
                                        <div className='col-2'>
                                            <label className="form-label" htmlFor="priceMaterial"> Precio por Unidad </label>
                                            <input className="form-control" type="number" name="priceMaterial" placeholder="000" onChange={ e=>handleinputchange(e,i)} required />
                                        </div>
                                        {
                                            inputList.length!==1 &&
                                            <div className='col-2 my-auto'>
                                                <button className="btn btn-danger w-100" onClick={()=> handleremove(i)}>Eliminar</button>
                                            </div>
                                        }
                                        { inputList.length-1===i &&
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
                                    <input className="form-control" type="text" id="descripcion" placeholder='Descripcion ...' onChange={(e) => setDescripcion(e.target.value)} required/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-12'>
                                    <label className="form-label" htmlFor="importeTotal">Importe total de la mercancia recibida</label>
                                    <input className="form-control" type="number" id="importeTotal" placeholder='000' onChange={(e) => setImporteTotalMercanciaRecibida(e.target.value)} required/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-12'>
                                    <label className="form-label" htmlFor="receptor">Nombre del receptor</label>
                                    <input className="form-control" type="text" id="receptor" placeholder='DrimTim' onChange={(e) => setNombreReceptor(e.target.value)} required/>
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

export default  IM_NR_ND;