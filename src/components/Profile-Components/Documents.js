import React from 'react'
import document from "../../assets/ver-documento.svg";
function Documents({ user, name, pic }) {

  const { documentos } = user

  return (
    <div>
      <div className="profile-component">
        <div className="user-info">
          <img src={pic} alt="" className="user-profile-image" />
          <h5>Conoce los documentos que ha compartido</h5>
          <h2>{name}</h2>
        </div>
        <div className="document-list-container">
          {documentos ?
            documentos.map((data, i) => <div key={i} src={data} alt="documents" className="document-list-element">
              <div className="document">
                <h4>{data.nombre}</h4>
                <h5>{data.categorias.join(", ")}</h5>
              </div>
              <a href={data.url} target={"_blank"}><img src={document} alt="eye" /></a>
            </div>)
            :
            <p>{name} no ha subido documentos aún</p>}
        </div>
      </div>
    </div>
  )
}

export default Documents
