import React from 'react'
import { Link } from "react-router-dom";

function MenuExchangeMenuNeed() {

  var localStore = JSON.parse(localStorage.getItem('state'));

  return (
    <div className="component-menuexchange">
      <div className="component-exchange-text">
        <h2>Intercambios</h2>
        <h6>¿Què necesito?</h6>
      </div>
      <div className="menuexchange-options">
        <Link to={`need/user/${localStore._id}`}>
          <div className="menuexchange-single-option">
            <div className="menuexchange-single-option-text">
              <h3>Cosas que necesito </h3>
              <h6>Mira los registros de lo que actualmente necesitas</h6>
            </div>
            <div class="arrow-menuexchange right" />
          </div>
        </Link>

        <Link to="need/categories">
          <div className="menuexchange-single-option">
            <div className="menuexchange-single-option-text">
              <h3>Busca lo que necesitas</h3>
              <h6>Explora lo que están intercambiando
               otros Sembradores de Vida </h6>
            </div>
            <div class="arrow-menuexchange right" />
          </div>
        </Link>

      </div>
    </div>
  )
}

export default MenuExchangeMenuNeed
