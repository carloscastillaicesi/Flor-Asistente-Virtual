import React from 'react'
import { Link } from "react-router-dom";
function ExchangeNeedAllCategories({ products }) {

  //Loops through and gets all the products from all the users 
  var prods = products;

  //Loops through and gets just the "categorias" key from "documentos" from all the users 
  var categorias = prods.map((prods) => prods.categorias).flat();

  //Filters unique string in the "categorias" array
  categorias = categorias.filter((x, i, a) => a.indexOf(x) === i);

  //Loops through and gets just the "categorias" key from "documentos" from all the users and join its in a single string
  var categoriasJoin = prods.map((prods) => prods.categorias.join(","));

  //Loops through all the products categories, that are now in a pair and joines by a ",", then seeing if each contains in that string a unique category. Then, it returns an array where each key matches the order that "categoriasJoin" has designated for each unique category. 
  var itemsCategoria = categorias.map((categorias) => categoriasJoin.filter(i => i.includes(categorias)).length)


  // var productsPerCat = products.map((products) =>
  //  categorias.map((categorias) => products.categorias.filter((i) => i.includes(categorias))))

  return (
    <div className="component-library">
      <div className="component-library-text">
        <h2>Intercambios</h2>
        <h6>¿Qué necesito?</h6>
      </div>
      <div className="component-library-categories-container">
        {categorias.map((categorias, i) =>
          <Link to={`categories/${categorias}`}>
            <div key={i} className="component-library-categories">
              <h3>{categorias}</h3>
              <div>
                <h5>{itemsCategoria[i]}</h5>
                <div class="arrow-library right" /></div>
            </div></Link>)}
      </div>
    </div>
  )
}

export default ExchangeNeedAllCategories
