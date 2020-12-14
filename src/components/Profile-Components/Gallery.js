import React from 'react'

function Gallery({ gallery, name }) {

  console.log(gallery);
  return (
    <div className="component-gallery">
      {gallery ?
        gallery.map((data, i) => <img onError={(e) => { e.target.src = 'https://developers.google.com/maps/documentation/streetview/images/error-image-generic.png'; e.target.onError = null; }} key={i} src={data} alt="gallery" />)
        : <p>{name} no ha subido imágenes aún</p>}
    </div>
  )
}

export default Gallery
