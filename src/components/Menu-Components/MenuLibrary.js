import React from 'react'
import { Link, useParams } from "react-router-dom";
function MenuLibrary({ users }) {

   //Loops through and gets all the documents from all the users 
   var documents = users.map((users) => users.documentos).flat();

   //Loops through and gets just the "categorias" key from "documentos" from all the users 
   var categorias = documents.map((documents) => documents.categorias).flat();

   //Filters unique string in the "categorias" array
   categorias = categorias.filter((x, i, a) => a.indexOf(x) == i);

   //Loops through and gets just the "categorias" key from "documentos" from all the users and join its in a single string
   var categoriasJoin = documents.map((documents) => documents.categorias.join(","));

   //Loops through all the documents categories, that are now in a pair and joines by a ",", then seeing if each contains in that string a unique category. Then, it returns an array where each key matches the order that "categoriasJoin" has designated for each unique category. 
   var itemsCategoria = categorias.map((categorias) => categoriasJoin.filter(i => i.includes(categorias)).length)


   // var documentsPerCat = documents.map((documents) =>
   //  categorias.map((categorias) => documents.categorias.filter((i) => i.includes(categorias))))

   return (
      <div className="component-library">
         <div className="component-library-text">
            <h2>Biblioteca</h2>
            <h6>Encuentra información especifica que otros Sembradores de vida nos han compartido </h6>
         </div>
         <div className="component-library-categories-container">
            {categorias.map((categorias, i) => <div key={i} className="component-library-categories">
               <h3>{categorias}</h3>
               <div>
                  <h5>{itemsCategoria[i]}</h5>
                  <Link to={`library/${categorias}`}>
                     <div class="arrow-library right" /></Link></div>
            </div>)}
         </div>
      </div>
   )
}

export default MenuLibrary
