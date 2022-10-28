import React from 'react';
import { useState } from 'react'
import Axios from 'axios';

import Sidebar from '../../../components/sidebar/Sidebar'
import Title from '../../../components/title/Title'
import '../../../css/pages-styles/ComprasNacionales/SolicitudDeCompra/CN_SC_ND.css'

function CN_SC_ND() {
    const [inputList, setinputList]= useState([{id_material:'', cant_requerida:''}]);

    const [nroSolicitudCompra, setNroSolicitudCompra] = useState("");
    const [fechaElaboracion, setFechaElaboracion] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [puntoPedido, setPuntoPedido] = useState("");
    
    const registrar = (e) => {
        Axios({
            method: 'POST',
            data: {
                nro_solicitud_compra: nroSolicitudCompra,
                fecha_elaboracion: fechaElaboracion,
                productos: inputList,
                descripcion: descripcion,
                punto_pedido: puntoPedido,
                estado: 'pendiente'
            },
            withCredentials: true,
            url: "http://localhost:9000/compras-nacionales/solicitud-compra"
        });
        e.preventDefault();
    };

    const handleinputchange=(e, index)=>{
        const {name, value}= e.target;
        const list= [...inputList];
        list[index][name]= value;
        setinputList(list);
    }

    const handleremove = index =>{
        const list=[...inputList];
        list.splice(index,1);
        setinputList(list);
    }

    const handleaddclick = () =>{ 
        setinputList([...inputList, {id_material:'', cant_requerida:''}]);
        console.log(inputList); //Only to test inputList
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
                    link1="/compras-nacionales/solicitud-compra"
                    link2="/compras-nacionales/solicitud-compra/aceptar-documento"
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
                            inputList.map((x,i) => {
                                return(
                                    <div className="list-products row form-group" key={i}>
                                        <div className='col-5'>
                                            <label className="form-label" htmlFor="IDMaterial">Identificador del material</label>
                                            <input className="form-control" type="text" name="id_material" placeholder="XXXX-XXXX-XXXX-XXXX" onChange={e=>handleinputchange(e,i)} required />
                                        </div>
                                        <div className='col-3'>
                                            <label className="form-label" htmlFor="stockMaterial">Cantidad Requerida</label>
                                            <input className="form-control" type="number" name="cant_requerida" placeholder="000" onChange={e=>handleinputchange(e,i)} required />
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

export default CN_SC_ND;