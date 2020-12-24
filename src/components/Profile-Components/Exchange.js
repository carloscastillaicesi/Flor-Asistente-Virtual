import React, { useState, useEffect } from 'react'
import document from "../../assets/ver-documento.svg";
import Hdocument from "../../assets/ocultar-documento.svg";
import deleteI from "../../assets/delete.svg";

function Exchange({ barters, name, pic, setModal }) {

  const [pickedProduct, setpickedProduct] = useState()
  const [switched, setSwitched] = useState(barters.filter(b => b.tipo === 0))
  const [switchedState, setswitchedState] = useState(0)

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
    if (type === 0) {
      setSwitched(barters.filter(b => b.tipo === 0));
      setswitchedState(0);
    } else if (type === 1) {
      setSwitched(barters.filter(b => b.tipo === 1));
      setswitchedState(1);
    }
  }

  useEffect(() => {
    console.log("Hide Product: ", pickedProdID);
    console.log("Deletion Process of Product: ", deletionpickedProdID);
    console.log("Deleted Products: ", deletedpickedProdID);
  }, [pickedProdID, deletedpickedProdID, deletionpickedProdID])



  return (<div >

    {pickedProduct ?
      <div className="picked-modal-background-container">
        <div className="picked">
          <div onClick={() => pickedProductToggle()} className="close-picked">x</div>
          <h2>{switchedState === 0 ? "Tengo" : "Necesito"}</h2>
          <h1>{pickedProduct.nombre}</h1>
          <h5><strong>Categorías: </strong>{pickedProduct.categorias.join(", ")}</h5>
          {switchedState === 0 ?
            <div class="picked-gallery-wrapper">
              {pickedProduct.fotos ?
                <div>{
                  pickedProduct.fotos.map((data, i) =>
                    <img key={i} src={data} alt="gallery" onError={(e) => { e.target.src = 'https://developers.google.com/maps/documentation/streetview/images/error-image-generic.png'; e.target.onError = null; }} />)
                }</div> : <p>{name} no ha subido imágenes</p>}
            </div>

            : ""}
          <hr />
          <div className="product-description-box">
            <h4><strong>Descripción</strong></h4>
            <h5>{pickedProduct.descripcion}</h5>
          </div>
          <hr />
          <div className="picked-owner">
            <img src={pic} alt="" />
            <h4>{name}</h4>
          </div>

          <div className="picked-actions" onClick={setModal.bind()}>Contactar a {name.split(" ")[0]}</div>

        </div>
      </div>
      : ""}
    <div className="profile-component">
      <div className="user-info">
        <img src={pic} alt="" className="user-profile-image" />
        <h5>Mira lo que tiene y desea intercambiar</h5>
        <h2>{name}</h2>
      </div>
      <div className="exchange-switch">
        <div style={{ borderBottom: switchedState === 0 ? "3px solid #00cf88 " : "none", color: switchedState === 0 ? "#00cf88 " : "#263238" }} className="have" onClick={() => setArray(0)}><h5>TENGO</h5></div>
        <div style={{ borderBottom: switchedState === 1 ? "3px solid #00cf88 " : "none", color: switchedState === 1 ? "#00cf88 " : "#263238" }} className="havenots" onClick={() => setArray(1)}><h5>NECESITO</h5></div>
      </div>

      <div className="element-list-container">
        {switched ?
          switched.map((data, i) =>
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

                  <div className="element-description" onClick={() => pickedProductToggle(data.nombre, data.categorias, data.fotos, data.descripcion)}  >
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
          <p>{name} no ha registrado productos o servicios para intercambiar u ofertar</p>}
      </div>
    </div>

  </div>)
}

export default Exchange
