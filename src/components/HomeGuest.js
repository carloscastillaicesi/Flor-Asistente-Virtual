import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import logo from '../assets/logoflor.svg'
const HomeGuests = () => {

  const [state, setstate] = useState('')

  return (

    <div className="homeguest-container">
      The state is <b>{state === 'user' ? state : state}</b>
      { state === ''
        ?
        <div>
          <img className="logo" src={logo} alt="" />
          <div className="option-button" onClick={() => { setstate('user') }}><h4>Soy Parte de Una</h4></div>

          <Link to="/guests"><div className="option-button" ><h4>Soy un Visitante</h4></div></Link>


          <h5 className="underline" onClick={() => { setstate('guest') }}>Registrarse</h5>


        </div>
        :
        <div>


          {state === "user"

            ?

            <div>  <div className="option-button" onClick={() => { setstate('user') }}>Soy Parte de una Red </div>
            </div>

            :

            <div>
              <div className="option-button" onClick={() => { setstate('guest') }}>Acceder como Visitante</div>
      The state is <b>{state === 'user' ? state : state}</b>

            </div>}



        </div>

      }

    </div >


  );
};

export default HomeGuests;