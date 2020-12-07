import React from 'react';
import { Link } from "react-router-dom";
function AboutMe() {
 return (
  <div>
   <h1>About Me</h1>
   <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum dolorem cum animi. Aperiam rem praesentium quasi magni! Vitae aut, at sit aliquam, corporis nesciunt ab qui vero beatae deserunt corrupti!</p>
   <Link
    to={{ pathname: "/map" }}>Cerrar</Link>
  </div>

 )
}

export default AboutMe
