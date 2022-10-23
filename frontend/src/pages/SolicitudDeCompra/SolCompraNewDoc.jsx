import React from 'react';
import { useState } from 'react'
import Axios from 'axios';

import Sidebar from '../../components/sidebar/Sidebar'
import Title from '../../components/title/Title'
import '../../css/pages-styles/SolicitudDeCompra/SolCompraNewDoc.css'

function SolCompraNewDoc() {
    const [inputList, setinputList]= useState([{IDMaterial:'', stockMaterial:''}]);

    //
    const [nroSolicitudCompra, setNroSolicitudCompra] = useState("");
    const [fechaElaboracion, setFechaElaboracion] = useState("");
    const [identificadorMaterial, setIdentificadorMaterial] = useState("");
    const [cantidadRequerida, setCantidadRequerida] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [puntoPedido, setPuntoPedido] = useState("");
    
    const registrar = (e) => {
        Axios({
            method: 'POST',
            data: {
                nro_solicitud_compra: nroSolicitudCompra,
                fecha_elaboracion: fechaElaboracion,
                productos: 
                    [{
                        id_material: identificadorMaterial,
                        cant_requerida: cantidadRequerida
                    }],
                descripcion: descripcion,
                punto_pedido: puntoPedido
            },
            withCredentials: true,
            url: "http://localhost:9000/compras-nacionales/solicitud-compra"
        });
        console.log('ok');
        e.preventDefault();
    };
    //

    const handleinputchange=(e, i)=>{
        const {IDMaterial, stockMaterial}= e.target;
        const list= [...inputList];
        list[i][IDMaterial]= stockMaterial;
        setinputList(list);
    }

    const handleremove= index=>{
        const list=[...inputList];
        list.splice(index,1);
        setinputList(list);
    }

    const handleaddclick=()=>{ 
        setinputList([...inputList, { IDMaterial:'', stockMaterial:''}]);
    }

    return (
        <div className='d-flex'>
            <Sidebar />
            <div className='w-100'>
                <Title 
                    document="Solicitud de compra" 
                    type="Compras nacionales" 
                    subType="Nuevo documento"
                    active1={true}
                    active2={false}
                    active3={false}
                >
                </Title>

                <div className='new-doc-form'>  
                    <form onSubmit={registrar}>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12'>
                                    <h2>Registro de solicitud de compra</h2> 
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-12'>
                                    <label className="form-label" htmlFor="IDSolCompra">Número de solicitud de compra</label>
                                    <input className="form-control" type="number" id="IDSolCompra" placeholder="0000-0000-0000-0000" onChange={(e) => setNroSolicitudCompra(e.target.value)} required/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-12'>
                                    <label className="form-label" htmlFor="fechaSolCompra">Fecha de elaboración</label>
                                    <input className="form-control" type="date" id="fechaSolCompra" onChange={(e) => setFechaElaboracion(e.target.value)} required/>
                                </div>
                            </div>

                            {    
                            inputList.map( (x,i)=>{
                                return(
                                    <div className="list-products row form-group" key={i}>
                                        <div className='col-5'>
                                            <label className="form-label" htmlFor="IDMaterial" onChange={e=>handleinputchange(e,i)} >Identificador del material</label>
                                            <input className="form-control" type="text" id="IDMaterial" placeholder="XXXX-XXXX-XXXX-XXXX" onChange={(e) => setIdentificadorMaterial(e.target.value)} required />
                                        </div>
                                        <div className='col-3'>
                                            <label className="form-label" htmlFor="stockMaterial" onChange={ e=>handleinputchange(e,i)} >Cantidad Requerida</label>
                                            <input className="form-control" type="number" id="IDMaterial" placeholder="000" onChange={(e) => setCantidadRequerida(e.target.value)} required />
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
                                    <label className="form-label" htmlFor="puntoDePedido">Punto de pedido</label>
                                    <input className="form-control" type="text" id="puntoDePedido" placeholder='Punto de pedido...' onChange={(e) => setPuntoPedido(e.target.value)} required/>
                                </div>
                            </div>

                            <div className='final-submit row'>
                                <div className='col-2'>
                                    <button className="btn btn-success register w-100" type="submit">Registrar</button>
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

export default SolCompraNewDoc