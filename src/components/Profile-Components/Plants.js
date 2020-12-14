import React from 'react'
import defaultPic from "../../assets/defaultphotouser.png";
function Plants({ user, name, pic }) {

 const { plantas } = user
 console.log(plantas);

 return (
  <div>
   <div className="component-plants">
    <div className="user-info">
     <img src={pic.length > 5 ? pic : defaultPic} alt="" className="user-profile-image" />
     <h5>Conoce más sobre</h5>
     <h2>{name}</h2>
    </div>
    <div className="detailed-info-container">
     {plantas ? <div className="plant-info">
      <h5>Plantas en la huerta</h5>
      <h5><strong>{plantas.length}</strong></h5>
     </div> : <div className="plant-info">
       <h5>No hay Plantas en la huerta</h5>
      </div>}
     {plantas ?
      <div className="plant-list-container">
       {//
        plantas.slice(0, plantas.length - 1).map((plants, i) => <div key={i} className="single-action">
         <img src={plants.fotos[0]} alt="" />
         <div className="action-info">
          <div className="action-container">
           <div>
            <h3>{plants.nombre}</h3>
            <h5>{plants.categorias.join(", ")}</h5>
           </div>
          </div>
         </div>
        </div>
        )}
       <div className="single-action">
        <img src={plantas[plantas.length - 1].fotos[0]} alt="" />
        <div className="action-info" style={{ borderBottom: "none" }}>
         <div className="action-container">
          <div>
           <h3>{plantas[plantas.length - 1].nombre}</h3>
           <h5>{plantas[plantas.length - 1].categorias.join(", ")}</h5>
          </div>
         </div>
        </div>
       </div> </div> : ""}

    </div>
   </div>

  </div>
 )
}

export default Plants
