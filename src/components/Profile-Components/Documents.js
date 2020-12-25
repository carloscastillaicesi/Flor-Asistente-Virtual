import React, { useState, useEffect } from 'react'
import document from "../../assets/ver-documento.svg";
import Hdocument from "../../assets/ocultar-documento.svg";
import deleteI from "../../assets/delete.svg";
function Documents({ documents, name, pic, setModal }) {

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

  function pickedDocumentToggle(nombre, categorias, url, id) {
    if (nombre) {
      const picked = {
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
  }, [pickedDocID, deletedpickedDocID, deletionpickedDocID])

  return (
    <div className="component-document">

      {pickedDocument ?
        <div className="picked-modal-background-container">
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
              <img src={pic} alt="" />
              <h5> <strong>{name.split(" ")[0]} </strong>subió este documento</h5>
            </div>
            <a href={pickedDocument.url} target={"_blank"}>  <div className="picked-actions">Ver Documento</div> </a>
            <div className="picked-actions" onClick={setModal.bind()}>Contactar a {name.split(" ")[0]}</div>
          </div>
        </div>
        : ""}

      <div >
        <div className="user-info">
          <img src={pic} alt="" className="user-profile-image" />
          <h5>Conoce los documentos que ha compartido</h5>
          <h2>{name}</h2>
        </div>
        <div className="element-list-container">
          {documents.length > 0 ?
            documents.map((data, i) =>

              <div className={deletedpickedDocID.includes(data._id) ? "element-list-item-container-deleted" : "element-list-item-container"} key={i} >

                {deletionpickedDocID === data._id ?

                  <div className={deletionpickedDocID.includes(data._id) ? "element-list-item-deletion" : "element-list-item"}>

                    <img src={deleteI} alt="" />
                    <h5>¿Deseas eliminar este documento?</h5>
                    <div className="element-options" onClick={() => docDelete(data._id)}>Sí</div>
                    <div className="element-options" onClick={() => deletionProcess(data._id)}>No</div>
                  </div>

                  :

                  <div src={data} className={pickedDocID.includes(data._id) ? "element-list-item-hidden" : "element-list-item"} >
                    <div className="element-description" onClick={() => pickedDocumentToggle(data.nombre, data.categorias, data.url, data._id)}>

                      <h4 className="text-preview">{data.nombre}</h4>
                      <h5>{data.categorias.join(", ")}</h5>
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
            :
            <p>{name} no ha subido documentos aún</p>}
        </div>
      </div>
    </div>

  )
}

export default Documents
