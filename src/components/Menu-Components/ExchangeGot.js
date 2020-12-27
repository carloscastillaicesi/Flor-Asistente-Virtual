import React, { useState, useEffect, useContext } from 'react'
import document from "../../assets/ver-documento.svg";
import Hdocument from "../../assets/ocultar-documento.svg";
import deleteI from "../../assets/delete.svg";
import { BarterContext } from "../../contexts/BarterContext";

function ExchangeGot() {
  var localStore = JSON.parse(localStorage.getItem('state'));
  const { barters } = useContext(BarterContext);
  const [userHaves] = useState(barters.filter(b1 => b1.tipo === 0 && b1.uId === localStore._id));
  const [pickedProduct, setpickedProduct] = useState();
  const [pickedProdID, setpickedProdID] = useState([]);
  const [deletionpickedProdID, setdeletionpickedProdID] = useState();
  const [deletedpickedProdID, setdeletepickedProdID] = useState([]);


  function prodSetter(id) {
    if (pickedProdID.includes(id)) {
      let filteredArray = pickedProdID.filter(item => item !== id)
      setpickedProdID(filteredArray);
    } else {
      setpickedProdID([...pickedProdID, id]);
    }
  }

  function prodDelete(id) {
    setdeletepickedProdID([...deletedpickedProdID, id]);
  }

  function deletionProcess(id) {
    if (id !== deletionpickedProdID) {
      setdeletionpickedProdID(id);
    } else {
      setdeletionpickedProdID();
    }

  }

  function pickedProductToggle(fotos, descripcion, cambio, nombre, categorias, id) {

    if (fotos) {
      const picked = {
        nombre: nombre,
        categorias: categorias,
        fotos: fotos,
        descripcion: descripcion,
        cambio: cambio,
        id: id
      }
      setpickedProduct(picked);

    } else {
      setpickedProduct();
    }

  }


  useEffect(() => {
    console.log(localStore._id)
    console.log("Hide Product: ", pickedProdID);
    console.log("Deletion Process of Product: ", deletionpickedProdID);
    console.log("Deleted Products: ", deletedpickedProdID);
  }, [pickedProdID, deletedpickedProdID, deletionpickedProdID, pickedProduct, userHaves])




  return (

    <div className="component-menuexchange">
      <div className="component-exchange-text">
        <h2>Intercambios</h2>
        <h6>Lo que tengo</h6>
      </div>

      {pickedProduct ?
        <div className="menu-picked-modal-background-container">
          <div className="picked">
            <div className="picked-top">
              <div>
                {!pickedProdID.includes(pickedProduct.id)
                  ?
                  <div className="element-options">
                    <img src={document} alt="eye" /></div>
                  :
                  <div className="element-options"><img src={Hdocument} alt="eye" /></div>
                }
                <h6>{pickedProdID.includes(pickedProduct.id) ? "Este producto se encuentra oculto" : "Este producto se encuentra visible"}</h6>
              </div>
              <div onClick={() => pickedProductToggle()} className="close-picked">x</div>
            </div>
            <h2>{"Tengo"}</h2>
            <h1>{pickedProduct.nombre}</h1>
            <h5><strong>Categorías: </strong>{pickedProduct.categorias.join(", ")}</h5>

            <div class="picked-gallery-wrapper">
              {pickedProduct.fotos ?
                <div>{
                  pickedProduct.fotos.map((data, i) =>
                    <img key={i} src={data} alt="gallery" onError={(e) => { e.target.src = 'https://developers.google.com/maps/documentation/streetview/images/error-image-generic.png'; e.target.onError = null; }} />)
                }</div> : <p> {pickedProduct.userName.split(" ")[0]} no ha subido imágenes</p>}
            </div>

            <hr />
            <div className="product-description-box">
              <h4><strong>Descripción</strong></h4>
              <h5>{pickedProduct.descripcion}</h5>
            </div>
            <hr />
            <div className="product-description-box">
              <h4><strong>Cambio</strong></h4>
              <h5>{pickedProduct.cambio}</h5>
            </div>
            <hr />
            <div className="picked-owner">
              <img src={localStore.pic} alt="" />
              <h5>{"tienes este producto para intercambiar"}</h5>
            </div>
          </div>
        </div>
        : ""}
      <div >


        {userHaves ?
          userHaves.map((data, i) =>
            <div key={i} className={deletedpickedProdID.includes(data._id) ? "element-list-item-container-deleted" : "element-list-item-container"}>

              {deletionpickedProdID === data._id ?

                <div className={deletionpickedProdID.includes(data._id) ? "element-list-item-deletion" : "element-list-item"}>

                  <img src={deleteI} alt="" />
                  <h5>¿Deseas eliminar este Item?</h5>
                  <div className="element-options" onClick={() => prodDelete(data._id)}>Sí</div>
                  <div className="element-options" onClick={() => deletionProcess(data._id)}>No</div>
                </div>

                :

                <div src={data} className={pickedProdID.includes(data._id) ? "element-list-item-hidden" : "element-list-item"} >

                  <div className="element-description" onClick={() => pickedProductToggle(data.fotos, data.descripcion, data.cambio, data.nombre, data.categorias, data.id)}  >
                    <h4>{data.nombre}</h4>
                    <h5>{data.categorias.join(", ")}</h5>
                  </div>

                  {pickedProdID.includes(data._id)
                    ?
                    ""
                    :
                    <div className="element-options" onClick={() => deletionProcess(data._id)}><img src={deleteI} alt="" /></div>
                  }

                  {!pickedProdID.includes(data._id)
                    ?
                    <div className="element-options" onClick={() => prodSetter(data._id)}>
                      <img src={document} alt="eye" /></div>
                    :
                    <div className="element-options" onClick={() => prodSetter(data._id)}><img src={Hdocument} alt="eye" /></div>
                  }
                </div>
              }
            </div>)
          :
          "No has registrado productos o servicios para intercambiar u ofertar"}
      </div>
    </div>

  )
}

export default ExchangeGot
