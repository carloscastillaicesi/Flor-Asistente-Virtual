import React, { useState, useEffect, useCallback, useRef } from 'react'
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
function Gallery({ gallery, name }) {

  const [image, setImage] = useState()

  function imageSetter(url) {
    setImage(url);
  }

  function closeImage() {
    setImage();
  }
  useEffect(() => {

  }, [image])

  const imgRef = useRef();
  const onUpdate = useCallback(({ x, y, scale }) => {
    const { current: img } = imgRef;

    if (img) {
      const value = make3dTransformValue({ x, y, scale });

      img.style.setProperty("transform", value);
    }
  }, []);

  console.log(gallery);
  return (
    <div className={gallery < 2 ? "component-gallery" : "component-gallery-full "}>
      {image ?
        <div className="image-view">
          <div onClick={() => closeImage()} className="close-image-view">x</div>
          <QuickPinchZoom onUpdate={onUpdate} >
            <img src={image} alt="" ref={imgRef} />
          </QuickPinchZoom>
        </div>
        :
        <div className="gallery">
          {gallery ?
            gallery.map((data, i) => <img onError={(e) => { e.target.src = 'https://developers.google.com/maps/documentation/streetview/images/error-image-generic.png'; e.target.onError = null; }} key={i} src={data} alt="gallery" onClick={() => imageSetter(data)} />)
            : <p>{name} no ha subido imágenes aún</p>}
        </div>}
    </div>
  )
}

export default Gallery
