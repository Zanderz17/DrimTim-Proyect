import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar'
import Title from '../../components/title/Title'
import { useState } from 'react'

function SolCompraNewDoc() {
    const [inputList, setinputList]= useState([{IDMaterial:'', stockMaterial:''}]);

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

                <div className='new-doc-form ml-2'>
                    <h2>Registro de solicitud de compra</h2>   
                    <form>
                        <div className='container'>
                            <div className="row form-group">
                                <label className="form-label" htmlFor="IDSolCompra">Número de solicitud de compra</label>
                                <input className="form-control" type="number" id="IDSolCompra" placeholder="0000-0000-0000-0000" required/>
                            </div>

                            <div className="row form-group">
                                <label className="form-label" htmlFor="fechaSolCompra">Fecha de elaboración</label>
                                <input className="form-control" type="date" id="fechaSolCompra" required/>
                            </div>

                            {    
                                inputList.map( (x,i)=>{
                                    return(
                                        <div className="row form-group">
                                            <div className='col-5'>
                                                <label className="form-label" htmlFor="IDMaterial" onChange={e=>handleinputchange(e,i)} >Identificador del material</label>
                                                <input className="form-control" type="number" id="IDMaterial" placeholder="XXXX-XXXX-XXXX-XXXX" required />
                                            </div>
                                            <div className='col-2'>
                                                <label className="form-label" htmlFor="stockMaterial" onChange={ e=>handleinputchange(e,i)} >Cantidad Requerida</label>
                                                <input className="form-control" type="number" id="IDMaterial" placeholder="000" required />
                                            </div>
                                            {
                                                inputList.length!==1 &&
                                                <div className='col-3 my-auto'>
                                                    <button  className="btn btn-danger" onClick={()=> handleremove(i)}>Remove</button>
                                                </div>
                                            }
                                            { 
                                                inputList.length-1===i &&
                                                <div className='col-2 my-auto'>
                                                    <button className="btn btn-success" onClick={handleaddclick}>Añadir</button>
                                                </div>
                                            }
                                        </div> 
                                    );
                                })
                            }

                            <div className="row form-group">
                                <label className="form-label" htmlFor="descripcion">Descripción</label>
                                <input className="form-control" type="text" id="descripcion" placeholder='Descripción...' required/>
                            </div>

                            <div className="row form-group">
                                <label className="form-label" htmlFor="puntoDePedido">Punto de pedido</label>
                                <input className="form-control" type="text" id="puntoDePedido" placeholder='Punto de pedido...' required/>
                            </div>

                            <div className='final-submit row'>
                                <div className='col-2'>
                                    <button className="btn btn-success register w-100">Registrar</button>
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
};

export default SolCompraNewDoc
