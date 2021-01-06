
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom";
import document from "../../assets/ver-documento.svg";
import Hdocument from "../../assets/ocultar-documento.svg";
import deleteI from "../../assets/delete.svg";
function ExchangeNeedCategory({ products, userInfo }) {

  //Loops through and gets all the documents from all the users 

  let { category } = useParams();

  var products2 = products.map(d => d = { user: userInfo.filter(u => u._id === d.uId), ...d }).flat();

  function filterViaCategory(arr, category) {
    return arr.filter(obj => obj.categorias.some(cat => cat.includes(category)));
  }

  var history = useHistory();
  var productsPerCat = filterViaCategory(products2, category);
  console.log("productsPerCat", productsPerCat)

  const [pickedProdID, setpickedProdID] = useState([]);
  const [deletionpickedProdID, setdeletionpickedProdID] = useState();
  const [deletedpickedProdID, setdeletepickedProdID] = useState([]);
  const [pickedProduct, setpickedProduct] = useState()

  function docSetter(id) {
    if (pickedProdID.includes(id)) {
      let filteredArray = pickedProdID.filter(item => item !== id)
      setpickedProdID(filteredArray);
    } else {
      setpickedProdID([...pickedProdID, id]);
    }
  }

  function docDelete(id) {
    setdeletepickedProdID([...deletedpickedProdID, id]);
  }

  function deletionProcess(id) {
    if (id !== deletionpickedProdID) {
      setdeletionpickedProdID(id);
    } else {
      setdeletionpickedProdID();
    }
  }

  function pickedProductToggle(userName, userPic, userId, fotos, descripcion, cambio, nombre, categorias, id) {
    if (userName) {
      const picked = {
        userName: userName,
        userPic: userPic,
        userId: userId,
        nombre: nombre,
        categorias: categorias,
        fotos: fotos,
        descripcion: descripcion,
        cambio: cambio,
        id: id
      }
      setpickedProduct(picked);
      console.log("pickedProduct", pickedProduct);
      console.log("picked", picked);
    } else {
      setpickedProduct();
    }
  }


  useEffect(() => {
    console.log("Hide Document: ", pickedProdID);
    console.log("Deletion Process of Document: ", deletionpickedProdID);
    console.log("Deleted products: ", deletedpickedProdID);
  }, [pickedProdID, deletedpickedProdID, deletionpickedProdID, pickedProduct])


  return (
    <div className="component-library-category">
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
              <img src={pickedProduct.userPic} alt="" />
              <h5> <strong>{pickedProduct.userName.split(" ")[0]} </strong> tiene este producto para intercambiar </h5>
            </div>
            <div className="picked-actions" onClick={() => history.push(`/map/${pickedProduct.userId}`)}>Ir al perfil de {pickedProduct.userName.split(" ")[0]}</div>
          </div>
        </div>
        : ""}


      <div className="component-library-text">
        <h2>Intercambios</h2>
        <h4>{category}</h4>
      </div>

      <div className="component-library-categories-container">

        {productsPerCat.length > 0 ?
          productsPerCat.map((data, i) =>

            <div div className={deletedpickedProdID.includes(data._id) ? "element-list-item-container-deleted" : "element-list-item-container"} key={i}>

              {deletionpickedProdID === data._id ?

                <div className={deletionpickedProdID.includes(data._id) ? "element-list-item-deletion" : "element-list-item"}>

                  <img src={deleteI} alt="" />
                  <h5>¿Deseas eliminar este documento?</h5>
                  <div className="element-options" onClick={() => docDelete(data._id)}>Sí</div>
                  <div className="element-options" onClick={() => deletionProcess(data._id)}>No</div>
                </div>

                :

                <div src={data} className={pickedProdID.includes(data._id) ? "element-list-item-hidden" : "element-list-item"} >

                  <div className="element-description" onClick={() => pickedProductToggle(data.user[0].name, data.user[0].pic, data.user[0]._id, data.fotos, data.descripcion, data.cambio, data.nombre, data.categorias, data.id)}>

                    <h5 className="text-preview">{data.nombre}</h5>
                    <h6>{data.user[0].name}</h6>
                    <h6>{data.categorias.join(", ")}</h6>
                  </div>

                  {pickedProdID.includes(data._id)
                    ?
                    ""
                    :
                    <div className="element-options" onClick={() => deletionProcess(data._id)}><img src={deleteI} alt="" /></div>
                  }

                  {!pickedProdID.includes(data._id)
                    ?
                    <div className="element-options" onClick={() => docSetter(data._id)}>
                      <img src={document} alt="eye" /></div>
                    :
                    <div className="element-options" onClick={() => docSetter(data._id)}><img src={Hdocument} alt="eye" /></div>
                  }

                </div>
              }
            </div>)
          : <p>{`La categoria ${category} no tiene documentos aún o no existe`}</p>}
      </div>
    </div>
  )
}

export default ExchangeNeedCategory
