import React, { useContext, useState, useEffect } from 'react'
import FlexApi from 'twilio/lib/rest/FlexApi';
import { SettingContext } from "../contexts/SettingContext";

function Modal() {

 const { modal, toggleModal } = useContext(SettingContext);
 const [open, setOpen] = useState({
  display: "none",
 })

 useEffect(() => {
  if (modal) {
   setOpen({
    display: "flex",
   })
  }
 }, [modal])

 const style = {
  display: { open }
 }

 return (
  <div className="modal" style={style}>
   <div className="modal-content">
    <h2>Se enviará este contacto</h2>
    <h4>¿Desear Continuar?</h4>
    <div className="modal-buttons">
     <div className="modal-button-green" onClick={toggleModal}>Sí</div>
     <div className="modal-button-red" onClick={toggleModal}>No</div>
    </div>
   </div>

  </div>

 )
}

export default Modal
