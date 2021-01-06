import React from 'react'
import defaultPic from "../../../assets/defaultphotouser.png";
import huerta from "../../../assets/Huertas.svg";
import conocimientoI from "../../../assets/Conocimiento.svg";
import experienciaI from "../../../assets/Experiencia.svg";
import expectativaI from "../../../assets/Expectativas.svg";
import Information from "./Information";
export default function Detailed({ pic, user, name }) {

 const { ubicacionHuerta, tiempoDedicadoHuerta, encargadosHuerta, gallery
  , conocimiento, tiempoExperiencia, expectativaHuerta, beneficiosSalud
 } = user
 return (
  <div className="component-detailed">
   <div className="profile-component">

    <div className="user-info">
     <img src={pic.length > 5 ? pic : defaultPic} alt="" className="user-profile-image" />
     <h5>Conoce más sobre</h5>
     <h2>{name}</h2>
    </div>
    <div className="detailed-info-container">

     <Information icon={huerta} imagen={gallery[0]} info={ubicacionHuerta} titulo={"Ubicación Huerta"} />
     <Information icon={huerta} imagen={null} info={encargadosHuerta
     } titulo={"¿Quién Cuida de la Huerta?"} />
     <Information icon={huerta} imagen={null} info={tiempoDedicadoHuerta
     } titulo={"¿Cuánto tiempo le dedicas a tu huerta?"} />
     <Information icon={conocimientoI} imagen={null} info={conocimiento} titulo={"Conocimiento"} />
     <Information icon={experienciaI} imagen={null} info={tiempoExperiencia} titulo={"Experiencia"} />
     <Information icon={expectativaI} imagen={null} info={expectativaHuerta
     } titulo={"¿Qué beneficios buscas para tu salud?"} />
     <Information icon={expectativaI} imagen={null} info={beneficiosSalud
     } titulo={"Expectativa"} />

    </div>
   </div>
  </div>
 )
}
