import React from 'react'

function Gallery({ gallery, name }) {


 return (
  <div className="component-gallery">
   {gallery ?
    gallery.map((data, i) => <img key={i} src={data} alt="gallery" />)
    : <p>{name} no ha subido imágenes aún</p>}
  </div>
 )
}

export default Gallery
