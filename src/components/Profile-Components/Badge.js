import React, { useState } from 'react'
import defaultPic from "../../assets/defaultphotouser.png";
import stageOne from "../../assets/seed_marker.svg";
import stageTwo from "../../assets/seed_marker_two.svg";
import stageThree from "../../assets/seed_marker_three.svg";
import stageFour from "../../assets/seed_marker_four.svg";

function Badge({ user, pic }) {
 const { name, level } = user;
 const progress = [(level * 20) - 20, "%"].join('');

 const [selectedBadge, setselectedBadge] = useState(level)
 const [selectedBadgeText, setselectedBadgeText] = useState("Badge 1")

 function setSelectedBadgeF(params) {
  setselectedBadge(params);
  switch (params) {
   case 1:
    setselectedBadgeText("Badge 1");
    break;
   case 2:
    setselectedBadgeText("Badge 2");
    break;
   case 3:
    setselectedBadgeText("Badge 3");
    break;
   case 4:
    setselectedBadgeText("Badge 4");
    break;
   default:
    break;
  }
 }


 return (
  <div className="profile-component">
   <div className="badges-component">
    <div className="user-image-badge">
     <div className="user-profile-badge">
      <img src={level === 1 ? stageOne : level === 2 ? stageTwo : level === 3 ? stageThree : level === 4 ? stageFour : stageOne} alt="Seed-One" /></div>
     <img src={pic.length > 5 ? pic : defaultPic} alt="" className="user-profile-image-badge" />
     <h2>{name}</h2>
     <h4>Se encuentra en la </h4>
     <h5><strong>Etapa {level}</strong> </h5>
    </div>

    <h3>Conoce de qué se tratan las etapas</h3>
    <h5>Toca para conocer más</h5>
    <br />
    <div className="progress">
     <div className="progress-badges" style={selectedBadge === 1 ? { zoom: "1.4" } : { opacity: "0.7" }} onClick={() => setSelectedBadgeF(1)}>
      <img src={stageOne} alt="Seed-One" /></div>
     <div className="progress-badges" style={selectedBadge === 2 ? { zoom: "1.4" } : { opacity: "0.7" }} onClick={() => setSelectedBadgeF(2)}>
      <img src={stageTwo} alt="Seed-Two" /></div>
     <div className="progress-badges" style={selectedBadge === 3 ? { zoom: "1.4" } : { opacity: "0.7" }} onClick={() => setSelectedBadgeF(3)}>
      <img src={stageThree} alt="Seed-Three" /></div>
     <div className="progress-badges" style={selectedBadge === 4 ? { zoom: "1.4" } : { opacity: "0.7" }} >
      <img src={stageFour} alt="Seed-Four" onClick={() => setSelectedBadgeF(4)} /></div>
    </div>
    <br />
    <h2>{`Etapa # ${selectedBadge}`}</h2>
    <h4>{selectedBadgeText}</h4>
   </div>

  </div>
 )
}

export default Badge
