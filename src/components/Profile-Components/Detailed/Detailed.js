import React from 'react'
import { Link } from "react-router-dom";
import defaultPic from "../../../assets/defaultphotouser.png";
import huerta from "../../../assets/Huertas.svg";
import conocimiento from "../../../assets/Conocimiento.svg";
import experiencia from "../../../assets/Experiencia.svg";
import expectativa from "../../../assets/Expectativas.svg";
import Information from "./Information";
export default function Detailed({ pic, user }) {

 const { name, Conocimiento, Experiencia, Expectativa } = user
 return (

  <div className="profile-component">

   <div className="user-info">
    <img src={pic.length > 5 ? pic : defaultPic} alt="" className="user-profile-image" />
    <h5>Conoce más sobre</h5>
    <h2>{name}</h2>
   </div>
   <div className="detailed-info-container">

    <Information icon={huerta} imagen={null} info={`Tengo huertas`} titulo={"Huertas"} />
    <Information icon={conocimiento} imagen={null} info={Conocimiento} titulo={"Conocimiento"} />
    <Information icon={experiencia} imagen={null} info={Experiencia} titulo={"Experiencia"} />
    <Information icon={expectativa} imagen={null} info={Expectativa} titulo={"Expectativa"} />

   </div>
  </div>

 )
}
