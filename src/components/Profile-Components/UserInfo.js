import React from 'react';
import { Link } from "react-router-dom";
import defaultPic from "../../assets/defaultphotouser.png";
import stageOne from "../../assets/seed_marker.svg";
import stageTwo from "../../assets/seed_marker_two.svg";
import stageThree from "../../assets/seed_marker_three.svg";
import stageFour from "../../assets/seed_marker_four.svg";
import intercambiar from "../../assets/intercambiar.svg";
import biblioteca from "../../assets/biblioteca.svg";

function UserInfo({ user, pic, name, level }) {

  // 0% (1) - 20% (2) - 40% (3) - 60% (4)
  const { gallery } = user
  const progress = [(level * 20) - 20, "%"].join('');


  return (
    <div className="component-userinfo">
      <div className="user-info">
        <img src={pic.length > 5 ? pic : defaultPic} alt="" className="user-profile-image" />
        <h2>{name}</h2>
        <Link to="/map/aboutme/badge">
          <div className="progress">
            <div style={{ width: progress }} className="progress-bar">
            </div>
            <div className="progress-badges">
              <img src={stageOne} alt="Seed-One" style={level >= 0 ? { filter: "none" } : { filter: "grayscale(100%)" }} /></div>
            <div className="progress-badges">
              <img src={stageTwo} alt="Seed-Two" style={level >= 2 ? { filter: "none" } : { filter: "grayscale(100%)" }} /></div>
            <div className="progress-badges">
              <img src={stageThree} alt="Seed-Three" style={level >= 3 ? { filter: "none" } : { filter: "grayscale(100%)" }} /></div>
            <div className="progress-badges">
              <img src={stageFour} alt="Seed-Four" style={level >= 4 ? { filter: "none" } : { filter: "grayscale(100%)" }} /></div>
          </div>
        </Link >
      </div>

      <Link to="/map/aboutme/detail">
        <div className="about-me">
          <div ><h4>Acerca de Mí</h4></div>
          <div >Conoce más sobre  {name.split(" ")[0]}</div>
        </div>
      </Link>
      <Link to="/map/aboutme/gallery">
        <div className="gallery-user" >
          <div className="gallery-info">
            <h5>Imágenes</h5>
            <div>
              <h5>{gallery ? gallery.length : 0}</h5>
              <div className="arrow-gallery right" />
            </div>
          </div>

          <div class="gallery-wrapper">

            {gallery ?
              <div>{
                gallery.length > 5
                  ? gallery.slice(0, 5).map((data, i) => <img key={i} src={data} alt="gallery" onError={(e) => { e.target.src = 'https://i.ibb.co/C1CcBXb/Imagen-Da-ada.png'; e.target.onError = null; }} />)
                  : gallery.map((data, i) => <img key={i} src={data} alt="gallery" onError={(e) => { e.target.src = 'https://i.ibb.co/C1CcBXb/Imagen-Da-ada.png'; e.target.onError = null; }} />)
              }</div> : <p>{name} no ha subido imágenes</p>}
          </div>
        </div>
      </Link>

      <div className="action-list">
        <Link to="/map/aboutme/exchange">
          <div className="single-action">
            <img src={intercambiar} alt="" />
            <div className="action-info">
              <div className="action-container">
                <div>
                  <h3>Para intercambiar</h3>
                  <h5>Mira que podemos intercambiar</h5>
                </div>
                <div className="arrow-gallery right" />
              </div>
            </div>
          </div>
        </Link>
        <Link to="/map/aboutme/documents">
          <div className="single-action">
            <img src={biblioteca} alt="" />
            <div className="action-info" style={{ borderBottom: "none" }}>
              <div className="action-container">
                <div>
                  <h3>Aportes</h3>
                  <h5>Documentos que he compartido</h5>
                </div>
                <div className="arrow-gallery right" />
              </div>
            </div>
          </div>
        </Link >
        {/* <Link to="/map/aboutme/plants">
          <div className="single-action">
            <img src={plantas} alt="" />
            <div className="action-info" style={{ borderBottom: "none" }}>
              <div className="action-container">
                <div>
                  <h3>Mis plantas</h3>
                  <h5>Conoce lo que tengo en mi huerta</h5>
                </div>
                <div className="arrow-gallery right" />
              </div>
            </div>
          </div>
        </Link > */}
      </div>
    </div>
  )
}

export default UserInfo
