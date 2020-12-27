import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import document from "../../assets/ver-documento.svg";
import Hdocument from "../../assets/ocultar-documento.svg";
import deleteI from "../../assets/delete.svg";
function LibraryCategory({ documents, userInfo }) {

  //Loops through and gets all the documents from all the users 

  let { category } = useParams();

  var documents2 = documents.map(d => d = { user: userInfo.filter(u => u._id === d.uId), ...d }).flat();


  function filterViaCategory(arr, category) {
    return arr.filter(obj => obj.categorias.some(cat => cat.includes(category)));
  }

  var documentsPerCat = filterViaCategory(documents2, category);

  const [pickedDocID, setpickedDocID] = useState([]);
  const [deletionpickedDocID, setdeletionpickedDocID] = useState();
  const [deletedpickedDocID, setdeletepickedDocID] = useState([]);
  const [pickedDocument, setpickedDocument] = useState()

  function docSetter(id) {
    if (pickedDocID.includes(id)) {
      let filteredArray = pickedDocID.filter(item => item !== id)
      setpickedDocID(filteredArray);
    } else {
      setpickedDocID([...pickedDocID, id]);
    }
  }

  function docDelete(id) {
    setdeletepickedDocID([...deletedpickedDocID, id]);
  }

  function deletionProcess(id) {
    if (id !== deletionpickedDocID) {
      setdeletionpickedDocID(id);
    } else {
      setdeletionpickedDocID();
    }
  }

  function pickedDocumentToggle(userName, userPic, userId, nombre, categorias, url, id) {
    if (userName) {
      const picked = {
        userName: userName,
        userPic: userPic,
        userId: userId,
        nombre: nombre,
        categorias: categorias,
        url: url,
        id: id
      }
      setpickedDocument(picked);
    } else {
      setpickedDocument();
    }

  }
  useEffect(() => {
    console.log("Hide Document: ", pickedDocID);
    console.log("Deletion Process of Document: ", deletionpickedDocID);
    console.log("Deleted Documents: ", deletedpickedDocID);
  }, [pickedDocID, deletedpickedDocID, deletionpickedDocID, pickedDocument])


  return (
    <div className="component-library-category">

      {pickedDocument ?
        <div className="menu-picked-modal-background-container">
          <div onClick={() => pickedDocumentToggle()} className="picked-modal-background-container-scape-area"> </div>
          <div className="picked">
            <div className="picked-top">
              <div>
                {!pickedDocID.includes(pickedDocument.id)
                  ?
                  <div className="element-options">
                    <img src={document} alt="eye" /></div>
                  :
                  <div className="element-options"><img src={Hdocument} alt="eye" /></div>
                }
                <h6>{pickedDocID.includes(pickedDocument.id) ? "Este documento se encuentra oculto" : "Este documento se encuentra visible"}</h6>
              </div>
              <div onClick={() => pickedDocumentToggle()} className="close-picked">x</div>
            </div>
            <h1>{pickedDocument.nombre}</h1>
            <hr />
            <h3><strong>Temas</strong></h3>
            <h5>{pickedDocument.categorias.join(", ")}</h5>
            <hr />
            <div className="picked-owner">
              <img src={pickedDocument.userPic} alt="" />
              <h5> <strong>{pickedDocument.userName.split(" ")[0]} </strong>subió este documento</h5>
            </div>
            <a href={pickedDocument.url} target={"_blank"}>  <div className="picked-actions"><h6>Ver Documento</h6></div> </a>
            <div className="picked-actions"> <h6>Contactar a {pickedDocument.userName.split(" ")[0]}</h6></div>
          </div>
        </div>
        : ""}


      <div className="component-library-text">
        <h2>Biblioteca</h2>
        <h4>{category}</h4>
      </div>

      <div className="component-library-categories-container">

        {documentsPerCat.length > 0 ?
          documentsPerCat.map((data, i) =>

            <div div className={deletedpickedDocID.includes(data._id) ? "element-list-item-container-deleted" : "element-list-item-container"} key={i}>

              {deletionpickedDocID === data._id ?

                <div className={deletionpickedDocID.includes(data._id) ? "element-list-item-deletion" : "element-list-item"}>

                  <img src={deleteI} alt="" />
                  <h5>¿Deseas eliminar este documento?</h5>
                  <div className="element-options" onClick={() => docDelete(data._id)}>Sí</div>
                  <div className="element-options" onClick={() => deletionProcess(data._id)}>No</div>
                </div>

                :

                <div src={data} className={pickedDocID.includes(data._id) ? "element-list-item-hidden" : "element-list-item"} >

                  <div className="element-description" onClick={() => pickedDocumentToggle(data.user[0].name, data.user[0].pic, data.user[0]._id, data.nombre, data.categorias, data.url, data._id)}>

                    <h5 className="text-preview">{data.nombre}</h5>
                    <h6>{data.user[0].name}</h6>
                    <h6>{data.categorias.join(", ")}</h6>
                  </div>

                  {pickedDocID.includes(data._id)
                    ?
                    ""
                    :
                    <div className="element-options" onClick={() => deletionProcess(data._id)}><img src={deleteI} alt="" /></div>
                  }

                  {!pickedDocID.includes(data._id)
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

export default LibraryCategory
