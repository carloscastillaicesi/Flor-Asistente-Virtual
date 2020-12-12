import React from 'react'
import { Link } from "react-router-dom";
import defaultPic from "../assets/defaultphotouser.png";
import huerta from "../assets/Huertas.svg";
import conocimiento from "../assets/Conocimiento.svg";
import experiencia from "../assets/Experiencia.svg";
import expectativa from "../assets/Expectativas.svg";
export default function Detailed({ pic, user }) {

 const { name, gallery, level, NoHuertas, Conocimiento, Experiencia, Expectativa } = user
 return (

  <div className="component-detailed">

   <div className="user-info">

    <img src={pic.length > 5 ? pic : defaultPic} alt="" className="user-profile-image" />
    <h5>Conoce más sobre</h5>
    <h2>{name}</h2>
   </div>

   <div className="single-action">
    <img src={huerta} alt="" />
    <div className="action-info">
     <div className="action-container">
      <div>
       <h3>Huertas</h3>
       <h5>{NoHuertas ? `Tengo ${NoHuertas} huertas` : "Todavía no hay información"}</h5>
      </div>

     </div>
    </div>
   </div>
   <div className="single-action">
    <img src={conocimiento} alt="" />
    <div className="action-info">
     <div className="action-container">
      <div>
       <h3>Conocimiento</h3>
       <h5> {Conocimiento ? Conocimiento : "Todavía no hay información"}</h5>
      </div>

     </div>
    </div>
   </div>
   <div className="single-action">
    <img src={experiencia} alt="" />
    <div className="action-info" >
     <div className="action-container">
      <div>
       <h3>Experiencia</h3>
       <h5> {Experiencia ? Experiencia : "Todavía no hay información"}</h5>
      </div>

     </div>
    </div>
   </div>
   <div className="single-action">
    <img src={expectativa} alt="" />
    <div className="action-info" style={{ borderBottom: "none" }}>
     <div className="action-container">
      <div>
       <h3>Expectativa</h3>
       <h5> {Expectativa ? Expectativa : "Todavía no hay nformación"}</h5>
      </div>

     </div>
    </div>
   </div>
  </div>

 )
}
