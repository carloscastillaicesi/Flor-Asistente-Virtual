import React from 'react'
import { Link } from "react-router-dom";
import defaultPic from "../../assets/defaultphotouser.png"

export default function Peek({ name, pic }) {


  return (
    <div className="peek">
      <img src={pic.length > 5 ? pic : defaultPic} alt="" />
      <h2>{name.split(" ").length >= 4 ? name.split(" ").slice(0, 3).join(" ") : name}</h2>
      <br />
      <Link
        to={{ pathname: "/map/aboutme/userinfo" }}> <div className="plus" /></Link>
    </div>
  )
}
