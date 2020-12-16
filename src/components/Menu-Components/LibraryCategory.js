import React from 'react'
import { Link, useParams } from "react-router-dom";
import document from "../../assets/ver-documento.svg";
function LibraryCategory({ users }) {

 //Loops through and gets all the documents from all the users 

 let { category } = useParams();
 var documents2 = users.map((users) => users.documentos.map((item) => ({ username: users.name, userpic: users.pic, ...item }))).flat();

 function filterViaCategory(arr, category) {
  return arr.filter(obj => obj.categorias.some(cat => cat.includes(category)));
 }

 var documentsPerCat = filterViaCategory(documents2, category);
 console.log(documentsPerCat)

 return (
  <div className="component-library-category">
   <div className="component-library-text">
    <h2>Biblioteca</h2>
    <h4>{category}</h4>
   </div>

   <div className="component-library-categories-container">
    {documentsPerCat.map((categorias, i) => <div key={i} className="component-library-category-categories">
     <div >
      <h4>{categorias.nombre}</h4>
      <h6>{categorias.username}</h6>
     </div>
     <a href={categorias.url} target={"_blank"}><img src={document} alt="eye" /></a>

    </div>)}
   </div>
  </div>
 )
}

export default LibraryCategory
