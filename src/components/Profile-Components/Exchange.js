import React, { useState } from 'react'
import document from "../../assets/ver-documento.svg";
function Exchange({ user, name, pic }) {

 const { tengo, necesito } = user;
 const [pickedProduct, setpickedProduct] = useState()
 const [switched, setSwitched] = useState(tengo)
 const [switchedState, setswitchedState] = useState("Tengo")

 function pickedProductToggle(nombre, categorias, fotos, descripcion) {

  console.log(nombre, categorias, fotos, descripcion);

  if (nombre) {
   const picked = {
    nombre: nombre,
    categorias: categorias,
    fotos: fotos,
    descripcion: descripcion
   }
   setpickedProduct(picked);
  } else {
   setpickedProduct();
  }

 }

 function setArray(type) {
  if (type === "Tengo") {
   setSwitched(tengo);
   setswitchedState("Tengo");
  } else if (type === "Necesito") {
   setSwitched(necesito);
   setswitchedState("Necesito");
  }
 }

 return (<div className="component-exchange">
  {pickedProduct ?
   <div className="product-picked-container">
    <button onClick={() => pickedProductToggle()}>Cerrar</button>
    <h2>{switchedState}</h2>
    <div className="product-picked">
     <h4>{pickedProduct.nombre}</h4>
     <h5><strong>Categorías: </strong>{pickedProduct.categorias.join(", ")}</h5>

     <h5>{pickedProduct.fotos > 3 ? pickedProduct.fotos.length : ""}</h5>
     <div class="product-picked-gallery-wrapper">
      {pickedProduct.fotos ?
       <div>{
        pickedProduct.fotos.map((data, i) =>
         <img key={i} src={data} alt="gallery" onError={(e) => { e.target.src = 'https://developers.google.com/maps/documentation/streetview/images/error-image-generic.png'; e.target.onError = null; }} />)
       }</div> : <p>{name} no ha subido imágenes</p>}
     </div>
     <h5><strong>Descripción: </strong>{pickedProduct.descripcion}</h5>
    </div>
   </div>
   :
   <div>

    <div className="user-info">
     <img src={pic} alt="" className="user-profile-image" />
     <h5>Mira lo que tiene y desea intercambiar</h5>
     <h2>{name}</h2>
    </div>

    <div className="exchange-switch">
     <div style={{ borderBottom: switchedState === "Tengo" ? "3px solid #00cf88 " : "none", color: switchedState === "Tengo" ? "#00cf88 " : "#263238" }} className="have" onClick={() => setArray("Tengo")}><h5>TENGO</h5></div>
     <div style={{ borderBottom: switchedState === "Necesito" ? "3px solid #00cf88 " : "none", color: switchedState === "Necesito" ? "#00cf88 " : "#263238" }} className="havenots" onClick={() => setArray("Necesito")}><h5>NECESITO</h5></div>
    </div>

    <div className="products-list-container">
     {switched ?
      switched.map((data, i, p) =>
       <div key={i} className="products-list-element">
        <div className="product-description" onClick={() => pickedProductToggle(data.nombre, data.categorias, data.fotos, data.descripcion)}>
         <h4>{data.nombre}</h4>
         <h5>{data.categorias.join(", ")}</h5>
        </div>
        <a href={data.url} target={"_blank"}><img src={document} alt="eye" /></a>
        <div className="plus" />
       </div>)
      :
      <p>{name} no ha subido productos o servicios para intercambiar</p>}
    </div>

   </div>
  }

 </div>
 )
}

export default Exchange
