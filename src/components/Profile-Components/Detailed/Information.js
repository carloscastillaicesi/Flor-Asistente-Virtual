import React from 'react'

function Information({ icon, imagen, info, titulo }) {
 return (
  <div className="information-component">
   <div className="single-action">
    <img src={icon} alt="" />
    <div className="action-info">
     <div className="action-container">
      <div>
       <h3>{titulo}</h3>
       {imagen ? <div>{info ? <img src={imagen} alt="" /> : "Todavía no hay información"}</div> : ""}
       {info ? <h5>{info}</h5> : "Todavía no hay información"}
      </div>
     </div>
    </div>
   </div>
  </div>
 )
}

export default Information
