import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import toast, { Toaster } from 'react-hot-toast';
import Sidebar from '../../../components/sidebar/Sidebar'
import Title from '../../../components/title/Title'
import '../../../css/pages-styles/ComprasNacionales/NotaDeRecepcion/CN_NR_ND.css'

function IM_NR_ND() {
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

    const [inputList, setinputList]= useState([{id_material:'', cant_recibida:'', precio_unitario: ''}]);
    
    const [nroNotaRecepcion, setNroNotaRecepcion] = useState("");
    const [nroOrdenCompra, setNroOrdenCompra] = useState("");
    const [fechaRecepcion, setFechaRecepcion] = useState("");
    const [fechaElaboracion, setFechaElaboracion] = useState("");
    const [nombreProveedor, setNombreProveedor] = useState("");
    const [condicionesPago, setCondicionesPago] = useState("Contado");
    const [descripcion, setDescripcion] = useState("");
    const [importeTotalMercanciaRecibida, setImporteTotalMercanciaRecibida] = useState("");
    const [nombreReceptor, setNombreReceptor] = useState("");

    const registrar = (e) => {
        Axios({
            method: 'POST',
            data: {
                nro_nota_recepcion: nroNotaRecepcion,
                nro_orden_compra: nroOrdenCompra,
                fecha_recepcion: fechaRecepcion,
                fecha_elaboracion: fechaElaboracion,
                nombre_proveedor: nombreProveedor,
                condiciones_pago: condicionesPago,
                productos: inputList,
                descripcion: descripcion,
                importe_total_mercancia_recibida: importeTotalMercanciaRecibida,
                nombre_receptor: nombreReceptor,
                estado: 'Pendiente'
            },
            withCredentials: true,
            url: "http://localhost:9000/importaciones/nota-recepcion/nuevo-documento"
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
        });
        e.preventDefault();
        resetAll();
    };

    const handleinputchange=(e, index)=>{
        const {name, value}= e.target;
        const list=[...inputList];
        list[index][name]= value;
        setinputList(list);

        totalPriceCalculator();
    }

    const handleremove= index=>{
        const list=[...inputList];
        list.splice(index,1);
        setinputList(list);
    }

    const handleaddclick=()=>{ 
        setinputList([...inputList, {id_material:'', cant_recibida:'', precio_unitario: ''}]);
        console.log(inputList);
    };

    const totalPriceCalculator = () => {
        let sum = 0;

        inputList.forEach(item => {
            sum += item.cant_recibida * item.precio_unitario;
        });

        setImporteTotalMercanciaRecibida(sum);
    };

    useEffect(() => {
        totalPriceCalculator()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputList]);

    const [nOrdenesCompra, setNOrdenesCompra] = useState([]);
    useEffect( () => {    
        const getNOrdenesCompra = async () => {
            const arr = (await Axios({
                method: 'GET',
                withCredentials: true,
                url: "http://localhost:9000/importaciones/orden-compra/get-ids"
            })).data;
            setNOrdenesCompra(arr);
        };
        getNOrdenesCompra();
    }, []);

    const resetAll = () => {
        setinputList([{id_material:'', cant_recibida:'', precio_unitario: ''}]);
        setNroNotaRecepcion("");
        setNroOrdenCompra("");
        setFechaRecepcion("");
        setFechaElaboracion("");
        setNombreProveedor("");
        setCondicionesPago("Contado");
        setDescripcion("");
        setImporteTotalMercanciaRecibida("");
        setNombreReceptor("");
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    };

    return (
        <div className='d-flex'>
            <div><Toaster/></div>
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
                    <form onSubmit={registrar}>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12'>
                                    <h2>Registro de nota de recepción</h2>   
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="IDNotaRec">Número de nota de recepción</label>
                                    <input className="form-control" type="number" id="IDNotaRec" placeholder="0000-0000-0000-0000" onChange={(e) => setNroNotaRecepcion(e.target.value)} value={nroNotaRecepcion} required/>
                                </div>

                                <div className='col-6'>
                                    <label className="form-label" htmlFor="IDOrCompra">Número de orden de compra</label>

                                    <select className="form-select" aria-label="Default" onChange={(e) => setNroOrdenCompra(e.target.value)}  value={nroOrdenCompra} required >
                                    <option value="">Elige una opción</option>
                                        {
                                            nOrdenesCompra.map ( (numberSol, numberSolIndex) => {
                                                return(
                                                    <option value={numberSol.nro_orden_compra} key={numberSolIndex}>{numberSol.nro_orden_compra}</option>
                                                )
                                            })
                                        }
                                    </select>

                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="fechaRecepcion">Fecha de recepción</label>
                                    <input className="form-control" type="date" id="fechaRecepcion" onChange={(e) => setFechaRecepcion(e.target.value)} value={fechaRecepcion} required/>
                                </div>
                                
                                <div className='col-6'>
                                    <label className="form-label" htmlFor="fechaElaboracion">Fecha de elaboración</label>
                                    <input className="form-control" type="date" id="fechaElaboracion" onChange={(e) => setFechaElaboracion(e.target.value)} value={fechaElaboracion} required/>
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
                                            <label className="form-label" htmlFor="id_material"> Identificador del material </label>
                                            <input className="form-control" type="text" name="id_material" placeholder="XXXX-XXXX-XXXX-XXXX" onChange={ e=>handleinputchange(e,i)} value={x.id_material} required />
                                        </div>
                                        <div className='col-2'>
                                            <label className="form-label" htmlFor="cant_recibida"> Cantidad Recibida </label>
                                            <input className="form-control" type="number" name="cant_recibida" placeholder="000" onChange={ e=>handleinputchange(e,i)} value={x.cant_recibida} required />
                                        </div>
                                        <div className='col-2'>
                                            <label className="form-label" htmlFor="precio_unitario"> Precio por Unidad </label>
                                            <input className="form-control" type="number" name="precio_unitario" placeholder="000" onChange={ e=>handleinputchange(e,i)} value={x.precio_unitario} required />
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
                                    <input className="form-control" type="text" id="descripcion" placeholder='Descripcion ...' onChange={(e) => setDescripcion(e.target.value)} value={descripcion} required/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-12'>
                                    <label className="form-label" htmlFor="importeTotal">Importe total de la mercancia recibida</label>
                                    <input className="form-control" type="number" id="importeTotal" placeholder='000' onChange={(e) => setImporteTotalMercanciaRecibida(e.target.value)} value={importeTotalMercanciaRecibida} disabled/>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className='col-12'>
                                    <label className="form-label" htmlFor="receptor">Nombre del receptor</label>
                                    <input className="form-control" type="text" id="receptor" placeholder='DrimTim' onChange={(e) => setNombreReceptor(e.target.value)} value={nombreReceptor} required/>
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

export default  IM_NR_ND;