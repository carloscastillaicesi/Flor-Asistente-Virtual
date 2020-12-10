import React from 'react';
import { Link } from "react-router-dom";
import defaultPic from "../assets/defaultphotouser.png"
import stageOne from "../assets/seed_marker.svg";
function AboutMe({ name, pic, gallery, setPage }) {

  // 0% (1) - 20% (2) - 40% (3) - 60% (4)

  const progress = "20%";



  return (
    <div className="modal-component">
      <div className="top-bar-component">
        <Link to={{ pathname: "/map" }}><div class="arrow-icon">
          <div class="arrow"></div>
        </div> </Link>
        <h3>Sembrando Vida</h3>
        <div className="button-menu"></div>
      </div>
      <div className="user-info-component">
        <img src="" alt="" className="user-profile-component" />
        <img src={pic.length > 5 ? pic : defaultPic} alt="" className="user-profile-image" />
        <h2>{name}</h2>
        <div className="progress">
          <div style={{ width: progress }} className="progress-bar">
          </div>
          <img src={stageOne} alt="Seed-One" className="progress-badges" />
          <img src={stageOne} alt="Seed-Two" className="progress-badges" />
          <img src={stageOne} alt="Seed-Three" className="progress-badges" />
          <img src={stageOne} alt="Seed-Four" className="progress-badges" />
        </div>

      </div>
      <div className="about-me">

        <div className="gallery-info">
          <h4>Acerca de Mí</h4>
          <div>

          </div>

        </div>
        <div class="text-preview">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>
      </div>


      <div className="gallery-user" >

        <div className="gallery-info">
          <h4>Imágenes</h4>
          <div>
            <h4>{gallery ? gallery.length : 0}</h4>
            <div className="arrow-gallery right"></div>
          </div>

        </div>
        <div class="wrapper">
          {gallery ?
            <div>{
              gallery.length > 5
                ? gallery.slice(0, 5).map((data, i) => <img key={i} src={data} alt="gallery" />)
                : gallery.map((data, i) => <img key={i} src={data} alt="gallery" />)
            }</div> : <p>{name} no ha subido imágenes</p>}
        </div>
      </div>
    </div>

  )
}

export default AboutMe
