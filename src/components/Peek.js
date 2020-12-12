import React from 'react'
import { Link } from "react-router-dom";
import defaultPic from "../assets/defaultphotouser.png"

export default function Peek({ name, pic }) {

  return (
    <div className="peek">
      <img src={pic.length > 5 ? pic : defaultPic} alt="" />
      <h2>{name}</h2>
      <br />
      <Link
        to={{ pathname: "/map/aboutme" }}> <div className="plus" /></Link>
    </div>
  )
}
