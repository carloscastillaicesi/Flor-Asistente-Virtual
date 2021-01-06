import React, { useState } from 'react'
import defaultPic from "../../assets/defaultphotouser.png";
import stageOne from "../../assets/seed_marker.svg";
import stageTwo from "../../assets/seed_marker_two.svg";
import stageThree from "../../assets/seed_marker_three.svg";
import stageFour from "../../assets/seed_marker_four.svg";

function Badge({ name, pic, level }) {


  const [selectedBadge, setselectedBadge] = useState()
  const [selectedBadgeText, setselectedBadgeText] = useState("No has seleccionando ninguna etapa")

  function setSelectedBadgeF(params) {

    setselectedBadge(params);
    switch (params) {
      case 1:
        setselectedBadgeText("Al completar la primer etapa podrás ver la semilla de tu huerta en el mapa de sembrado vida con tu nombre y foto de perfil, así otros sembradores de vida pueden encontrarte con tu información básica");
        break;
      case 2:
        setselectedBadgeText("Al completar la segunda etapa podrás ver que tu semilla ha germinado, en tuperfl puedes encontrar toda tu información básica También podrás ver información básica de otros usuarios registrados en el mapa.");
        break;
      case 3:
        setselectedBadgeText("En esta tercera etapa podrás ver que tu semilla ha crecido fuerte gracias a la información que has registrado. Podrás ver las peticiones de otros usuarios registrados, ingresar a la biblioteca virtual y visualizar las cosas que otras personas tienen para intercambiar.");
        break;
      case 4:
        setselectedBadgeText(": En esta última etapa tu planta ha florecido gracias a toda la información que has registrado. Ahora solo te queda disfrutar de las funcionalidades que flor tiene para ti Has peticiones de cosas que necesites, realiza intercambio con otros sembradores de vida, sube documentos a la biblioteca virtual y consulta documentos que te ayuden a mejorar tu experiencia como un huertero sembrador de vida.");
        break;
      default:
        break;
    }
  }

  return (
    <div className="component-badge">
      <div className="badges-container">
        <div className="user-image-badge">
          <div className="user-profile-badge">
            <img src={level === 1 ? stageOne : level === 2 ? stageTwo : level === 3 ? stageThree : level === 4 ? stageFour : stageOne} alt="Seed-One" /></div>
          <img src={pic.length > 5 ? pic : defaultPic} alt="" className="user-profile-image-badge" />
          <h2>{name}</h2>
          <h3>Se encuentra en la</h3>
          <h5><strong>Etapa {level}</strong> </h5>
        </div>
        <h5>Toca para conocer más</h5>
        <div className="progress">
          <div className="progress-badges" style={selectedBadge === 1 ? { zoom: "1.4" } : { opacity: "0.7" }} onClick={() => setSelectedBadgeF(1)}>
            <img src={stageOne} alt="Seed-One" /></div>
          <div className="progress-badges" style={selectedBadge === 2 ? { zoom: "1.4" } : { opacity: "0.7" }} onClick={() => setSelectedBadgeF(2)}>
            <img src={stageTwo} alt="Seed-Two" /></div>
          <div className="progress-badges" style={selectedBadge === 3 ? { zoom: "1.4" } : { opacity: "0.7" }} onClick={() => setSelectedBadgeF(3)}>
            <img src={stageThree} alt="Seed-Three" /></div>
          <div className="progress-badges" style={selectedBadge === 4 ? { zoom: "1.4" } : { opacity: "0.7" }} >
            <img src={stageFour} alt="Seed-Four" onClick={() => setSelectedBadgeF(4)} /></div>
        </div>
        <br />
        <h3>{selectedBadge ? `Conoce de qué se trata la` : ""}</h3>
        <h2>{selectedBadge ? `Etapa # ${selectedBadge}` : ""}</h2>
        <h4>{selectedBadgeText}</h4>
      </div>
    </div>

  )
}

export default Badge
