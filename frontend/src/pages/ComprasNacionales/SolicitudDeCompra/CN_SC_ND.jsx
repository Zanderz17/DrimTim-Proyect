import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../../../components/sidebar/Sidebar'
import Title from '../../../components/title/Title'
import '../../../css/pages-styles/ComprasNacionales/SolicitudDeCompra/CN_SC_ND.css'

function CN_SC_ND() {
    const navigate = useNavigate();
    var userRol = '';
    useEffect( () => {    
        const isLoggedIn = async () => {
            const user = (await Axios({
                method: 'GET',
                withCredentials: true,
                url: "http://localhost:9000/users/login/return"
            })).data;
            userRol = user.rol;
            if(!user){
                navigate('/users/signin');
            }
        };
        isLoggedIn()
    }, []);

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
                estado: 'Pendiente'
            },
            withCredentials: true,
            url: "http://localhost:9000/compras-nacionales/solicitud-compra/nuevo-documento"
        })
        .then(() => {
            toast.success("Documento Registrado", {
                duration: 3000
            });
        })
        .catch(() => {
            toast.error("Ocurrió un error", {
                duration: 3000
            });
        })
        e.preventDefault();
        resetAll();
    };

    const handleinputchange=(e, index)=>{
        const {name, value}= e.target;
        const list= [...inputList];
        list[index][name]= value;
        setinputList(list);
    }

    const handleremove = index => {
        const list=[...inputList];
        list.splice(index,1);
        setinputList(list);
    }

    const handleaddclick = () => { 
        setinputList([...inputList, {id_material:'', cant_requerida:''}]);
    }

    const resetAll = () => {
        setinputList([{id_material:'', cant_requerida:''}]);
        setNroSolicitudCompra("");
        setFechaElaboracion("");
        setDescripcion("");
        setPuntoPedido("");
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    };

    return (
        <div className='d-flex'>
            <div><Toaster/></div>
            <Sidebar />
            <div className='w-100'>
                <Title 
                    document="Solicitud de compra" 
                    type="Compras nacionales" 
                    subType="Nuevo documento"
                    active1={true}
                    active2={false}
                    active3={false}
                    link1="/compras-nacionales/solicitud-compra/nuevo-documento"
                    link2="/compras-nacionales/solicitud-compra/aceptar-documento"
                    link3="/compras-nacionales/solicitud-compra/historial-documento"
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
                                    <input className="form-control" type="number" id="IDSolCompra" placeholder="0000-0000-0000-0000" onChange={(e) => setNroSolicitudCompra(e.target.value)} value={nroSolicitudCompra} required />
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-12'>
                                    <label className="form-label" htmlFor="fechaSolCompra">Fecha de elaboración</label>
                                    <input className="form-control" type="date" id="fechaSolCompra" onChange={(e) => setFechaElaboracion(e.target.value)} value={fechaElaboracion} required />
                                </div>
                            </div>

                            {    
                            inputList.map((x,i) => {
                                return(
                                    <div className="list-products row form-group" key={i}>
                                        <div className='col-5'>
                                            <label className="form-label" htmlFor="id_material">Identificador del material</label>
                                            <input className="form-control" type="text" name="id_material" placeholder="XXXX-XXXX-XXXX-XXXX" onChange={e=>handleinputchange(e,i)} value={x.id_material} required />
                                        </div>
                                        <div className='col-3'>
                                            <label className="form-label" htmlFor="cant_requerida">Cantidad Requerida</label>
                                            <input className="form-control" type="number" name="cant_requerida" placeholder="000" onChange={e=>handleinputchange(e,i)} value={x.cant_requerida} required />
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
                                    <input className="form-control" type="text" id="descripcion" placeholder='Descripción...' onChange={(e) => setDescripcion(e.target.value)} value={descripcion} required />
                                    </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-12'>
                                    <label className="form-label" htmlFor="puntoDePedido">Punto de pedido</label>
                                    <input className="form-control" type="text" id="puntoDePedido" placeholder='Punto de pedido...' onChange={(e) => setPuntoPedido(e.target.value)} value={puntoPedido} required/>
                                </div>
                            </div>

                            <div className='final-submit row'>
                                <div className='col-2'>
                                    <button className="btn btn-success register w-100" type="submit">Registrar</button>
                                </div>
                                <div className='col-2'>
                                    <button className="btn btn-danger anular w-100" type="reset" onClick={resetAll}>Anular</button>
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