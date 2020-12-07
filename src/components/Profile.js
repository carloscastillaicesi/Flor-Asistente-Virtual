import React from 'react'
import { Link } from "react-router-dom";
export default function Profile({ setPage, position }) {

 return (
  <div>
   <h1>{position.lat},{position.lng} </h1>
   <button > <Link
    to={{ pathname: "/map/aboutme" }}>Acerca de Mí</Link> </button>
   <button > Intercambiar </button>
  </div>
 )
}
