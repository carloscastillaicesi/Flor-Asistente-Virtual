import React from 'react'
import defaultPic from "../../assets/defaultphotouser.png";
import stageOne from "../../assets/seed_marker.svg";
import stageTwo from "../../assets/seed_marker_two.svg";
import stageThree from "../../assets/seed_marker_three.svg";
import stageFour from "../../assets/seed_marker_four.svg";

function Badge({ user, pic }) {
 const { name, gallery, level } = user;
 const progress = [(level * 20) - 20, "%"].join('');

 return (
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
 )
}

export default Badge
