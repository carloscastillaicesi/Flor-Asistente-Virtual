import React, { useContext } from 'react'
import { UserContext } from "../../contexts/UserContext";
function ExchangeNeed() {

 const { name, pic } = useContext(UserContext);


 return (
  <div className="component-menuexchange">

   <div className="component-exchange-text">
    <h2>Intercambios</h2>
    <h6>{`${name.split(" ")[0]}, actualmente haz registrado:`}</h6>
   </div>
   <div className="menuexchange-single-option">

    <div className="menuexchange-single-option-text">
     <h3>Lo que tengo</h3>
     <h6>Mira lo que actualmente tienes para intercambiar con otros Sembradores de Vida</h6>
    </div>
    <div class="arrow-menuexchange right" /></div>

  </div>
 )
}

export default ExchangeNeed
