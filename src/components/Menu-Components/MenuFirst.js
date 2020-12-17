import React from 'react'
import exchange from "../../assets/menu-exchange-option.svg";
import library from "../../assets/menu-library-option.svg";
import florc from "../../assets/flor-character-menufirst.png";
import florf from "../../assets/flor-fill-menufirst.png";
import { Link } from "react-router-dom";

function MenuFirst() {
  return (
    <div className="component-menufirst">
      <div className="menufirst-options">
        <Link to="menu/exchange">
          <div className="menufirst-single-option">
            <img src={exchange} alt="" className="option-image" />
            <div className="menufirst-single-option-text">
              <h3>Intercambios</h3>
              <h5>Encuentra los recursos que necesitas para tu huerta</h5>
            </div>
            <div class="arrow-menu right" /></div>
        </Link>
        <Link to="menu/library">
          <div className="menufirst-single-option">
            <img src={library} alt="" className="option-image" />
            <div className="menufirst-single-option-text">
              <h3>Biblioteca Sembrado vida</h3>
              <h5>Encuentra documentos e información sobre lo que necesites</h5>
            </div>
            <div class="arrow-menu right" /></div>
        </Link>

      </div>
      <div className="illustrations-menufirst">
        <img src={florf} alt="" />
        <img src={florc} alt="" />
      </div>
    </div>
  )
}

export default MenuFirst
