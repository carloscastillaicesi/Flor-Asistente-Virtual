import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logoflor.svg'
const HomeGuests = () => {

  const [state, setstate] = useState('')

  function handleSubmit(e) {
    alert('An essay was submitted: ');
    e.preventDefault();
  }

  return (

    <div className="homeguest-container">

      <img className="logo" src={logo} alt="" />

      { state === ''
        ?
        <div>

          <div className="option-button" onClick={() => { setstate('user') }}><h4>Soy Parte de la Red</h4></div>

          <Link to="/guests"><div className="option-button" ><h4>Visitante</h4></div></Link>

          <h5 className="underline" onClick={() => { setstate('guest') }}>Registrarse</h5>

        </div>
        :
        <div>


          {state === "user"

            ?
            <div>
              <p className="paragraph">Si ya eres parte de la Red ingresa tu numero para que Flor pueda enviarte un Link de acceso</p>
              <form onSubmit={handleSubmit.bind(this)}>
                <label>
                  <h4 className="paragraph">Número de Celular</h4>
                  <input type="text" name="phone" placeholder="Número" value={() => console.log("Hola")} onChange={() => console.log("Hola")} />
                  <br />
                </label>
              </form>
              <h5 className="underline" onClick={() => { setstate('') }}>Ir Atrás</h5>
            </div>
            :

            <div>
              <p className="paragraph">Si deseas registrate y hacer parte de la Red, comunícate con los administradores al siguiente número</p>
              <br />
              <h1>+57 000 000 0000</h1>
              <br />
              <h5 className="underline" onClick={() => { setstate('') }}>Ir Atrás</h5>


            </div>}



        </div>

      }

    </div >


  );
};

export default HomeGuests;