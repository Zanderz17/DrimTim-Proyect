import React from 'react';
import { useState, useEffect} from 'react';
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import Sidebar from '../../../components/sidebar/Sidebar'
import Title from '../../../components/title/Title'
import '../../../css/pages-styles/ComprasNacionales/SolicitudDeCotizacion/CN_SCZ_ND.css'

function CN_SCZ_VD() {
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

    let { id } = useParams();
    const [inputList, setinputList]= useState([{id_material:'', cant_requerida:'', precio_unitario: ''}]);
    const [nroSolicitudCotizacion, setNroSolicitudCotizacion] = useState("");
    const [nroSolicitudCompra, setNroSolicitudCompra] = useState("");
    const [fechaElaboracion, setFechaElaboracion] = useState("");
    const [fechaLimiteRespuesta, setFechaLimiteRespuesta] = useState("");
    const [nombreProveedor, setNombreProveedor] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [plazoMaximoEntrega, setPlazoMaximoEntrega] = useState("");
    const [nombreReceptor, setNombreReceptor] = useState("");

    useEffect( () => {
        const getData = async () => {
            const data = (await Axios({
                method: 'GET',
                withCredentials: true,
                url: `http://localhost:9000/compras-nacionales/solicitud-cotizacion/visualizar-documento/${id}`
            })).data;
            setinputList(data.productos);
            setNroSolicitudCotizacion(data.nro_solicitud_cotizacion)
            setNroSolicitudCompra(data.nro_solicitud_compra);
            setFechaElaboracion(data.fecha_elaboracion);
            setFechaLimiteRespuesta(data.fecha_lim_respuesta);
            setNombreProveedor(data.nombre_proveedor);
            setDescripcion(data.descripcion);
            setPlazoMaximoEntrega(data.plazo_max_entrega);
            setNombreReceptor(data.nombre_receptor);
        };
        getData();
    }, []);

    return (
        <div className='d-flex'>
            <Sidebar />
            <div className='w-100'>
                <Title 
                    document="Solicitud de cotización" 
                    type="Compras nacionales" 
                    subType="Ver documento"
                    active1={false}
                    active2={false}
                    active3={false}
                    link1="/compras-nacionales/solicitud-cotizacion/nuevo-documento"
                    link2="/compras-nacionales/solicitud-cotizacion/aceptar-documento"
                    link3="/compras-nacionales/solicitud-cotizacion/visualizar-documento"
                >
                </Title>

                <div className='new-doc-form'>              
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <h2>Ver solicitud de cotización</h2>  
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className='col-6'>
                                <label className="form-label" htmlFor="IDSolCompra">Número de solicitud de cotización</label>
                                <input className="form-control" type="number" id="IDSolCompra" value={nroSolicitudCotizacion} disabled/>
                            </div>

                            <div className='col-6'>
                                <label className="form-label" htmlFor="IDSolCompra">Número de solicitud de compra</label>
                                <input className="form-control" type="number" id="IDSolCompra" value={nroSolicitudCompra} disabled/>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className='col-6'>
                                <label className="form-label" htmlFor="fecha_elaboracion">Fecha de elaboración</label>
                                <input className="form-control" type="date" id="fecha_elaboracion" value={fechaElaboracion} disabled/>
                            </div>
                            
                            <div className='col-6'>
                                <label className="form-label" htmlFor="fecha_limite">Fecha límite de respuesta</label>
                                <input className="form-control" type="date" id="fecha_limite" value={fechaLimiteRespuesta} disabled/>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className='col-12'>
                                <label className="form-label" htmlFor="proveedor">Nombre del proveedor</label>
                                <input className="form-control" type="text" id="proveedor" value={nombreProveedor} disabled/>
                            </div>
                        </div>

                        {    
                        inputList.map( (product,i)=>{
                            return(
                                <div className="list-products row form-group" key={i}>
                                    <div className='col-4'>
                                        <label className="form-label" htmlFor="IDMaterial">Identificador del material</label>
                                        <input className="form-control" type="text" name="IDMaterial" value={product.id_material} disabled />
                                    </div>
                                    <div className='col-2'>
                                        <label className="form-label" htmlFor="stockMaterial">Cantidad Requerida</label>
                                        <input className="form-control" type="number" name="stockMaterial" value={product.cant_requerida} disabled/>
                                    </div>
                                    <div className='col-2'>
                                        <label className="form-label" htmlFor="priceMaterial">Precio por Unidad</label>
                                        <input className="form-control" type="number" name="priceMaterial" value={product.precio_unitario} disabled/>
                                    </div>
                                </div> 
                            );
                            })
                        }

                        <div className="row form-group">
                            <div className='col-12'>
                                <label className="form-label" htmlFor="descripcion">Descripción</label>
                                <input className="form-control" type="text" id="descripcion" value={descripcion} disabled />
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className='col-12'>
                                <label className="form-label" htmlFor="fechaMax">Plazo máximo de entrega de mercancias</label>
                                <input className="form-control" type="date" id="fechaMax" value={plazoMaximoEntrega} disabled/>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className='col-12'>
                                <label className="form-label" htmlFor="receptor">Nombre del receptor</label>
                                <input className="form-control" type="text" id="receptor" value={nombreReceptor} disabled/>
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

export default CN_SCZ_VD;
