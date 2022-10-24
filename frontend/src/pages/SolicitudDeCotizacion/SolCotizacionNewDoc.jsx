import React from 'react';
import { useState } from 'react'
import Axios from 'axios';

import Sidebar from '../../components/sidebar/Sidebar'
import Title from '../../components/title/Title'
import '../../css/pages-styles/SolicitudDeCotizacion/SolCotizacionNewDoc.css'

function SolCotizacionNewDoc() {
    const [inputList, setinputList]= useState([{IDMaterial:'', stockMaterial:'', priceMaterial: ''}]);

    const [nroSolicitudCotizacion, setNroSolicitudCotizacion] = useState("");
    const [nroSolicitudCompra, setNroSolicitudCompra] = useState("");
    const [fechaElaboracion, setFechaElaboracion] = useState("");
    const [fechaLimiteRespuesta, setFechaLimiteRespuesta] = useState("");
    const [nombreProveedor, setNombreProveedor] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [plazoMaximoEntrega, setPlazoMaximoEntrega] = useState("");
    const [nombreReceptor, setNombreReceptor] = useState("");

    const registrar = (e) => {
        Axios({
            method: 'POST',
            data: {
                nro_solicitud_cotizacion: nroSolicitudCotizacion,
                nro_solicitud_compra: nroSolicitudCompra,
                fecha_elaboracion: fechaElaboracion,
                fecha_lim_respuesta: fechaLimiteRespuesta,
                nombre_proveedor: nombreProveedor,
                productos: inputList,
                descripcion: descripcion,
                plazo_max_entrega: plazoMaximoEntrega,
                nombre_receptor: nombreReceptor
            },
            withCredentials: true,
            url: "http://localhost:9000/compras-nacionales/solicitud-cotizacion"
        });
        e.preventDefault();
    };

    const handleinputchange=(e, index)=>{
        const {name, value}= e.target;
        const list= [...inputList];
        list[index][name]= value;
        setinputList(list);
    }

    const handleremove= index=>{
        const list=[...inputList];
        list.splice(index,1);
        setinputList(list);
    }

    const handleaddclick=()=>{ 
        setinputList([...inputList, { IDMaterial:'', stockMaterial:'', priceMaterial: ''}]);
        console.log(inputList);
    }

    return (
        <div className='d-flex'>
            <Sidebar />
            <div className='w-100'>
                <Title 
                    document="Solicitud de cotización" 
                    type="Compras nacionales" 
                    subType="Nuevo documento"
                    active1={true}
                    active2={false}
                    active3={false}
                >
                </Title>

                <div className='new-doc-form'>              
                    <form>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12'>
                                    <h2>Registro de solicitud de cotización</h2>  
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="IDSolCompra">Número de solicitud de cotización</label>
                                    <input className="form-control" type="number" id="IDSolCompra" placeholder="0000-0000-0000-0000" onChange={(e) => setNroSolicitudCotizacion(e.target.value)} required/>
                                </div>

                                <div className='col-6'>
                                    <label className="form-label" htmlFor="IDSolCompra">Número de solicitud de compra</label>
                                    <input className="form-control" type="number" id="IDSolCompra" placeholder="0000-0000-0000-0000" onChange={(e) => setNroSolicitudCompra(e.target.value)} required/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="fechaSolCompra">Fecha de elaboración</label>
                                    <input className="form-control" type="date" id="fechaSolCompra" onChange={(e) => setFechaElaboracion(e.target.value)} required/>
                                </div>
                                
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="fechaSolCompra">Fecha límite de respuesta</label>
                                    <input className="form-control" type="date" id="fechaSolCompra" onChange={(e) => setFechaLimiteRespuesta(e.target.value)} required/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-12'>
                                    <label className="form-label" htmlFor="proveedor">Nombre del proveedor</label>
                                    <input className="form-control" type="text" id="proveedor" placeholder="DrimTim" onChange={(e) => setNombreProveedor(e.target.value)} required/>
                                </div>
                            </div>

                            {    
                            inputList.map( (x,i)=>{
                                return(
                                    <div className="list-products row form-group" key={i}>
                                        <div className='col-4'>
                                            <label className="form-label" htmlFor="IDMaterial">Identificador del material</label>
                                            <input className="form-control" type="text" name="IDMaterial" placeholder="XXXX-XXXX-XXXX-XXXX" onChange={ e=>handleinputchange(e,i)} required />
                                        </div>
                                        <div className='col-2'>
                                            <label className="form-label" htmlFor="stockMaterial">Cantidad Requerida</label>
                                            <input className="form-control" type="number" name="stockMaterial" placeholder="000" onChange={ e=>handleinputchange(e,i)} required />
                                        </div>
                                        <div className='col-2'>
                                            <label className="form-label" htmlFor="priceMaterial">Precio por Unidad</label>
                                            <input className="form-control" type="number" name="priceMaterial" placeholder="000" onChange={ e=>handleinputchange(e,i)} required />
                                        </div>
                                        {
                                            inputList.length!==1 &&
                                            <div className='col-2 my-auto'>
                                                <button  className="btn btn-danger w-100" onClick={()=> handleremove(i)}>Eliminar</button>
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
                                    <input className="form-control" type="text" id="descripcion" placeholder='Descripción...' onChange={(e) => setDescripcion(e.target.value)} required/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-12'>
                                    <label className="form-label" htmlFor="fechaMax">Plazo máximo de entrega de mercancias</label>
                                    <input className="form-control" type="date" id="fechaMax" onChange={(e) => setPlazoMaximoEntrega(e.target.value)} required/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-12'>
                                    <label className="form-label" htmlFor="receptor">Nombre del receptor</label>
                                    <input className="form-control" type="text" id="receptor" placeholder="DrimTim" onChange={(e) => setNombreReceptor(e.target.value)} required/>
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

export default SolCotizacionNewDoc