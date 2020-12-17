import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { SettingContext } from "../../contexts/SettingContext";


function TopProfileBar({ setOpen }) {
  const history = useHistory();
  let location = useLocation();
  const { modal, toggleModal } = useContext(SettingContext);

  function goBack() {

    if (location.pathname === '/map/aboutme/userinfo') {
      history.push("/map");
      setOpen(true);
    } else {
      history.goBack();
    }

  }

  return (
    <div className="top-bar-component">
      <div onClick={goBack.bind()} class="arrow-icon">
        <div class="arrow" />
      </div>
      <h3>Sembrando Vida</h3>
      <div className="button-menu" onClick={toggleModal.bind()} />
    </div>
  )
};

export default TopProfileBar
