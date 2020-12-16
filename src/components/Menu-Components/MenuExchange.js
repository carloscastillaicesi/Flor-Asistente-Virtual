import React from 'react'
import { Link } from "react-router-dom";
function MenuExchange() {
 return (
  <div className="component-menuexchange">
   <div className="component-exchange-text">
    <h2>Intercambios</h2>
    <h6>Truequea lo que necesites con otros sembradores de vida </h6>
   </div>
   <div className="menuexchange-options">
    <Link to="exchange/need">
     <div className="menuexchange-single-option">

      <div className="menuexchange-single-option-text">
       <h3>¿Qué necesito?</h3>
       <h6>Encuentra o registra lo que necesitas, para que
intercambies con otros sembradores de vida </h6>
      </div>
      <div class="arrow-menuexchange right" /></div>
    </Link>
    <Link to="exchange/got">
     <div className="menuexchange-single-option">
      <div className="menuexchange-single-option-text">
       <h3>¿Qué tengo? </h3>
       <h6>Manipula/Gestiona las cosas que tinenes para intercambiar</h6>
      </div>
      <div class="arrow-menuexchange right" /></div>
    </Link>

   </div>
  </div>
 )
}

export default MenuExchange
