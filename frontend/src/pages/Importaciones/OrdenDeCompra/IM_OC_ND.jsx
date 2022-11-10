import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../../../components/sidebar/Sidebar'
import Title from '../../../components/title/Title'
import '../../../css/pages-styles/ComprasNacionales/OrdenDeCompra/CN_OC_AD.css'

function IM_OC_ND() {
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
                transporte: transporte,
                costo_transporte: costoTransporte,
                fraccion_aduanal: fraccionAduanal,
                costo_total: costoTotal,
                estado: 'Pendiente'
            },
            withCredentials: true,
            url: "http://localhost:9000/importaciones/orden-compra/nuevo-documento"
        }).then(() => {
            toast.success("Documento Registrado", {
                duration: 3000
            });
        })
        .catch(() => {
            toast.error("Ocurrió un error", {
                duration: 3000
            });
        });
        e.preventDefault();
        resetAll();
    };

    const handleinputchange=(e, index)=>{
        const {name, value}= e.target;
        const list= [...inputList];
        list[index][name]= value;
        setinputList(list);

        /* Control parcial Price */
        const parcialPrice = list[index]["cant_requerida"] * list[index]["precio_unitario"];
        list[index]["importe_parcial"]= parcialPrice;
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

    useEffect(() => {
        parcialPriceCalculator()
    }, [inputList]);

    const parcialPriceCalculator = (cant, price) => {
        const parcialPrice = cant * price;
        return parcialPrice;
    }

    const totalPriceCalculator = () =>{
        let sum = 0;
        inputList.forEach(item => {
            sum += item.importe_parcial;
        });
        if (impuesto) {
            sum = sum + (sum*(impuesto/100));
        }
        return sum;
    }

    const handleTotalPrice = (e) =>{
        const sum = totalPriceCalculator();
        setImpuesto(e.target.value); 
        setImporteTotal(sum + (sum*(e.target.value/100)));
    }

    const handleTransporte = (e) => {
        setCostoTransporte(e.target.value);
        setCostoTotal(Number(importeTotal) + Number(e.target.value));
    }

    const handleAduana = (e) => {
        setFraccionAduanal(e.target.value);
        const auxTotal = Number(importeTotal) + Number(costoTransporte);
        setCostoTotal(auxTotal + (auxTotal*(e.target.value/100)))
    }

    const resetAll = () => {
        setinputList([{id_material:'', cant_requerida:'', precio_unitario: '', importe_parcial: ''}]);
        setNroOrdenCompra('');
        setNroSolicitudCotizacion('');
        setFechaElaboracion('');
        setFechaEntregaMercancias('');
        setNombreProveedor('');
        setCondicionesPago('Contado');
        setDescripcion('');
        setImpuesto('');
        setImporteTotal('');
        setTransporte("");
        setCostoTransporte("");
        setFraccionAduanal("");
        setCostoTotal("");
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    };

    const [nSolicitudesCotizacion, setNSolicitudesCotizacion] = useState([]);
    useEffect( () => {    
        const getNSolicitudesCotizacion = async () => {
            const arr = (await Axios({
                method: 'GET',
                withCredentials: true,
                url: "http://localhost:9000/importaciones/solicitud-cotizacion/get-ids"
            })).data;
            console.log(arr);
            setNSolicitudesCotizacion(arr);
        };
        getNSolicitudesCotizacion();    
    }, []);

    return (
        <div className='d-flex'>
            <div><Toaster/></div>
            <Sidebar />
            <div className='w-100'>
                <Title 
                    document="Orden de compra" 
                    type="Importaciones" 
                    subType="Nuevo documento"
                    active1={true}
                    active2={false}
                    active3={false}
                    link1="/importaciones/orden-compra/nuevo-documento"
                    link2="/importaciones/orden-compra/aceptar-documento"
                    link3="/importaciones/orden-compra/historial-documento"
                >
                </Title>

                <div className='new-doc-form'> 
                    <form onSubmit={registrar}>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12'>
                                    <h2>Registro de orden de compra</h2>  
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="IDOrCompra">Número de orden de compra</label>
                                    <input className="form-control" type="number" id="IDOrCompra" placeholder="0000-0000-0000-0000" onChange={(e) => setNroOrdenCompra(e.target.value)} value={nroOrdenCompra} required/>
                                </div>

                                <div className='col-6'>
                                    <label className="form-label" htmlFor="IDSolCompra">Número de solicitud de cotización</label>

                                    <select className="form-select" aria-label="Default" onChange={(e) => setNroSolicitudCotizacion(e.target.value)} value={nroSolicitudCotizacion} required >
                                    <option value="">Elige una opción</option>
                                        {
                                            nSolicitudesCotizacion.map ( (numberSol, numberSolIndex) => {
                                                return(
                                                    <option value={numberSol.nro_solicitud_cotizacion} key={numberSolIndex}>{numberSol.nro_solicitud_cotizacion}</option>
                                                )
                                            })
                                        }
                                    </select>

                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="fechaSolCompra">Fecha de elaboración</label>
                                    <input className="form-control" type="date" id="fechaSolCompra" onChange={(e) => setFechaElaboracion(e.target.value)} value={fechaElaboracion} required/>
                                </div>
                                
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="fechaEntrega">Fecha de entrega de mercancias</label>
                                    <input className="form-control" type="date" id="fechaEntrega" onChange={(e) => setFechaEntregaMercancias(e.target.value)} value={fechaEntregaMercancias} required/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="proveedor">Nombre del proveedor</label>
                                    <input className="form-control" type="text" id="proveedor" placeholder="DrimTim" onChange={(e) => setNombreProveedor(e.target.value)} value={nombreProveedor} required/>
                                </div>

                                <div className='col-6'>
                                    <label className="form-label" htmlFor="condPago">Condiciones de pago</label>
                                    <select className="form-select" aria-label="Default" onChange={(e) => setCondicionesPago(e.target.value)} value={condicionesPago} required>
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
                                                <input className="form-control" type="text" name="id_material" placeholder="XXXX-XXXX-XXXX-XXXX" onChange={e=>handleinputchange(e,i)} value={x.id_material} required />
                                            </div>
                                            <div className='col-2'>
                                                <label className="form-label" htmlFor="cant_requerida">Cantidad Requerida</label>
                                                <input className="form-control" type="number" name="cant_requerida" placeholder="000" onChange={e=>handleinputchange(e,i)} value={x.cant_requerida}  required />
                                            </div>
                                            <div className='col-2'>
                                                <label className="form-label" htmlFor="precio_unitario">Precio por Unidad</label>
                                                <input className="form-control" type="number" name="precio_unitario" placeholder="000" onChange={e=>handleinputchange(e,i)} value={x.precio_unitario} required />
                                            </div>
                                            <div className='col-2'>
                                                <label className="form-label" htmlFor="importe_parcial">Importe Parcial</label>
                                                <input className="form-control" type="number" name="importe_parcial" placeholder="000" value={parcialPriceCalculator(x.cant_requerida, x.precio_unitario)} disabled />
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
                                    <input className="form-control" type="text" id="descripcion" placeholder='Descripción...' onChange={(e) => setDescripcion(e.target.value)} value={descripcion} required/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="impuesto">Impuesto</label>
                                    <input className="form-control" type="number" id="impuesto" placeholder="999999999" onChange={(e) => {handleTotalPrice(e)}} value={impuesto} required/>
                                </div>

                                <div className='col-6'>
                                    <label className="form-label" htmlFor="importeTotal">Importe total</label>
                                    <input className="form-control" type="number" id="importeTotal" placeholder="999999999" value={totalPriceCalculator()} disabled/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="transporte">Transporte</label>
                                    <input className="form-control" type="text" id="transporte" placeholder="Platillo volador" onChange={(e) => setTransporte(e.target.value)} value={transporte} required/>
                                </div>

                                <div className='col-6'>
                                    <label className="form-label" htmlFor="costoTransporte">Costo de transporte</label>
                                    <input className="form-control" type="number" id="costoTransporte" placeholder="000" onChange={(e) => handleTransporte(e)} value={costoTransporte} required/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="aduana">Fracción aduanal aplicable</label>
                                    <input className="form-control" type="number" id="aduana" placeholder="0000" onChange={(e) => handleAduana(e)} value={fraccionAduanal} required/>
                                </div>

                                <div className='col-6'>
                                    <label className="form-label" htmlFor="costoTotal">Costo total</label>
                                    <input className="form-control" type="number" id="costoTotal" placeholder="0000" value={costoTotal} disabled/>
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

export default IM_OC_ND;