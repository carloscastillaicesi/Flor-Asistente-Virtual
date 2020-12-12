import React from 'react';
import { Link } from "react-router-dom";
import defaultPic from "../assets/defaultphotouser.png";
import stageOne from "../assets/seed_marker.svg";
import stageTwo from "../assets/seed_marker_two.svg";
import stageThree from "../assets/seed_marker_three.svg";
import stageFour from "../assets/seed_marker_four.svg";
import intercambiar from "../assets/intercambiar.svg";
import plantas from "../assets/misplantas.svg";
import biblioteca from "../assets/biblioteca.svg";

function UserInfo({ user, pic }) {

  // 0% (1) - 20% (2) - 40% (3) - 60% (4)
  const { name, gallery, level } = user
  const progress = [(level * 20) - 20, "%"].join('');

  return (
    <div className="component-userinfo">
      <div className="user-info">
        <img src={pic.length > 5 ? pic : defaultPic} alt="" className="user-profile-image" />
        <h2>{name}</h2>
        <div className="progress">
          <div style={{ width: progress }} className="progress-bar">
          </div>
          <img src={stageOne} alt="Seed-One" className="progress-badges" style={level >= 0 ? { filter: "none" } : { filter: "grayscale(100%)" }} />
          <img src={stageTwo} alt="Seed-Two" className="progress-badges" style={level >= 2 ? { filter: "none" } : { filter: "grayscale(100%)" }} />
          <img src={stageThree} alt="Seed-Three" className="progress-badges" style={level >= 3 ? { filter: "none" } : { filter: "grayscale(100%)" }} />
          <img src={stageFour} alt="Seed-Four" className="progress-badges" style={level >= 4 ? { filter: "none" } : { filter: "grayscale(100%)" }} />
        </div>
      </div>
      <Link to="/map/aboutme/detail">
        <div className="about-me">
          <div className="gallery-info"><h4>Acerca de Mí</h4></div>
          <div class="text-preview">Conoce más sobre mi</div>
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
                  ? gallery.slice(0, 5).map((data, i) => <img key={i} src={data} alt="gallery" />)
                  : gallery.map((data, i) => <img key={i} src={data} alt="gallery" />)
              }</div> : <p>{name} no ha subido imágenes</p>}
          </div>
        </div>
      </Link>

      <div className="action-list">
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
        <Link to="/map/aboutme/documents">
          <div className="single-action">
            <img src={biblioteca} alt="" />
            <div className="action-info">
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
      </div>
    </div>
  )
}

export default UserInfo
