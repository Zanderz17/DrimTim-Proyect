import React from 'react';
import '../css/pages-styles/CodeVerification.css';

function CodeVerification() {
    return (
        <div className='principal-code-verification'>
            <div className="code-verification">
                <img src={require('../img/logo.jpg')} alt='logoimg'/>
                <h1 className="text-center">Recuerde pedir el código de registro en RR.HH</h1>   
                <form className="needs-validation">
                    <div className="form-group">
                        <label className="form-label" htmlFor="code-verification">Ingresar código de registro</label>
                        <input className="form-control" type="number" id="code-verification" placeholder="XXXX-XXXX-XXXX-XXXX" required />
                        {/* 
                            <div className="invalid-feedback">
                                El código ingresado no es correcto
                            </div>
                        */}
                    </div> 

                    <input className="btn btn-success w-100" type="submit" value="Continuar" />
                    
                    <div className="form-group form-check text-center">
                        <label className="form-check-label">¿Ya tienes cuenta? <a href='#'>Conéctate</a></label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CodeVerification; 