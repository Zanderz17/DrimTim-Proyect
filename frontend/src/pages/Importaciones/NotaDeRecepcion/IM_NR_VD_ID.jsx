import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import { jsPDF } from "jspdf";
import Sidebar from '../../../components/sidebar/Sidebar'
import Title from '../../../components/title/Title'
import '../../../css/pages-styles/ComprasNacionales/SolicitudDeCompra/CN_SC_ND.css'

function IM_NR_VD() {
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
    const [inputList, setinputList]= useState([{id_material:'', cant_recibida:'', precio_unitario: ''}]);
    const [nroNotaRecepcion, setNroNotaRecepcion] = useState("");
    const [nroOrdenCompra, setNroOrdenCompra] = useState("");
    const [fechaRecepcion, setFechaRecepcion] = useState("");
    const [fechaElaboracion, setFechaElaboracion] = useState("");
    const [nombreProveedor, setNombreProveedor] = useState("");
    const [condicionesPago, setCondicionesPago] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [importeTotalMercanciaRecibida, setImporteTotalMercanciaRecibida] = useState("");
    const [nombreReceptor, setNombreReceptor] = useState("");

    useEffect( () => {
        const getData = async () => {
            const data = (await Axios({
                method: 'GET',
                withCredentials: true,
                url: `http://localhost:9000/importaciones/nota-recepcion/visualizar-documento/${id}`
            })).data;
            setinputList(data.productos);
            setNroNotaRecepcion(data.nro_nota_recepcion);
            setNroOrdenCompra(data.nro_orden_compra);
            setFechaRecepcion(data.fecha_recepcion);
            setFechaElaboracion(data.fecha_elaboracion);
            setNombreProveedor(data.nombre_proveedor);
            setCondicionesPago(data.condiciones_pago);
            setDescripcion(data.descripcion);
            setImporteTotalMercanciaRecibida(data.importe_total_mercancia_recibida);
            setNombreReceptor(data.nombre_receptor);
        };
        getData();
    }, []);

    const generatePDF = () => {
        var doc = new jsPDF("l", "pt", "a3",true);

        doc.html(document.querySelector('#content'),{
            callback: function(pdf){
                pdf.save('Importaciones-NotaDeRecepcion-' + id + '.pdf')
            },
        })
    }
    
    return (
        <div className='d-flex'>
            <Sidebar />
            <div className='w-100'>
                <Title 
                    document="Nota de recepción" 
                    type="Compras nacionales" 
                    subType="Ver documento"
                    active1={false}
                    active2={false}
                    active3={false}
                    link1="/importaciones/nota-recepcion/nuevo-documento"
                    link2="/importaciones/nota-recepcion/aceptar-documento"
                    link3="/importaciones/nota-recepcion/historial-documento"
                >
                </Title>

                <div className='new-doc-form'>
                    <div id='content'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12'>
                                    <h2>Ver nota de recepción</h2>   
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="IDNotaRec">Número de nota de recpción</label>
                                    <input className="form-control" type="number" id="IDNotaRec" value={nroNotaRecepcion} disabled/>
                                </div>

                                <div className='col-6'>
                                    <label className="form-label" htmlFor="IDOrCompra">Número de orden de compra</label>
                                    <input className="form-control" type="number" id="IDOrCompra" value={nroOrdenCompra} disabled/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="fechaRecepcion">Fecha de recepción</label>
                                    <input className="form-control" type="date" id="fechaRecepcion" value={fechaRecepcion} disabled/>
                                </div>
                                
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="fechaElaboracion">Fecha de elaboración de orden de compra</label>
                                    <input className="form-control" type="date" id="fechaElaboracion" value={fechaElaboracion} disabled/>
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
                                            <label className="form-label" htmlFor="IDMaterial"> Identificador del material </label>
                                            <input className="form-control" type="text" name="IDMaterial" value={product.id_material} disabled/>
                                        </div>
                                        <div className='col-2'>
                                            <label className="form-label" htmlFor="stockMaterial"> Cantidad Recibida </label>
                                            <input className="form-control" type="number" name="stockMaterial" value={product.cant_recibida} disabled/>
                                        </div>
                                        <div className='col-2'>
                                            <label className="form-label" htmlFor="priceMaterial"> Precio por Unidad </label>
                                            <input className="form-control" type="number" name="priceMaterial" value={product.precio_unitario} disabled/>
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
                                <div className='col-12'>
                                    <label className="form-label" htmlFor="importeTotal">Importe total de la mercancia recibida</label>
                                    <input className="form-control" type="number" id="importeTotal" value={importeTotalMercanciaRecibida} disabled/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-12'>
                                    <label className="form-label" htmlFor="receptor">Nombre del receptor</label>
                                    <input className="form-control" type="text" id="receptor" value={nombreReceptor} disabled/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='final-submit row'>
                        <div className='col-2'>
                            <button className="btn btn-success register w-100">Regresar</button>
                        </div>
                        <div className='col-2'>
                            <button className="btn btn-danger anular w-100" onClick={generatePDF}>Descargar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IM_NR_VD
