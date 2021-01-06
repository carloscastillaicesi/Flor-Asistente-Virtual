import React, { useContext } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { SettingContext } from "../../contexts/SettingContext";


function TopProfileBar({ setOpen, setPage }) {
  const history = useHistory();
  let location = useLocation();
  const { toggleModal } = useContext(SettingContext);

  function goBack() {

    if (location.pathname === '/map/aboutme/userinfo') {
      setOpen(true);
      setPage(true);
      history.push("/map");
      console.log("Cerró")
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
