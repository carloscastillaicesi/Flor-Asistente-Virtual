import React, { useState, useContext, useEffect } from 'react'
import { useHistory, Route } from "react-router-dom";
import florLogo from "../../assets/flor-logo-topbar-menu.png";
import Modal from "../Modal";
import Exchange from "./MenuExchange";
import Library from "./MenuLibrary";
import MenuFirst from "./MenuFirst";
import LibraryCategory from "./LibraryCategory";
import ExchangeGot from "./ExchangeGot";
import ExchangeNeed from "./ExchangeNeed";
import ExchangeMenuNeed from "./ExchangeMenuNeed";
import ExchangeNeedAllCategories from "./ExchangeNeedAllCategories";
import ExchangeNeedCategory from "./ExchangeNeedCategory";
import florc from "../../assets/flor-character-menufirst.png";
import florf from "../../assets/flor-fill-menufirst.png";
import { SettingContext } from "../../contexts/SettingContext";
import { DocumentContext } from "../../contexts/DocumentContext";
import { BarterContext } from "../../contexts/BarterContext";
import { LocationContext } from "../../contexts/LocationContext";

import spinner from "../../assets/spinner.svg"
import ExchangeMenuGot from './ExchangeMenuGot';
function MenuComponent() {

  const history = useHistory();

  const [loading, setloading] = useState(true)

  const { modal, toggleModal } = useContext(SettingContext);
  const { documents, documentStatus } = useContext(DocumentContext);
  const { barters, barterStatus } = useContext(BarterContext);
  const { locations, locationsStatus } = useContext(LocationContext);


  useEffect(() => {
    if (barterStatus === "success" && documentStatus === "success" && locationsStatus === "success") {
      if (documents !== undefined && barters !== undefined && locations !== undefined) {
        setloading(false);
        console.log(documents)
      }
    }
  }, [documents, barters, locations, modal])

  function goBack() {
    history.goBack();
  }

  return (
    <div>
      {loading ?
        <div className="homeuser-container">
          <img src={spinner} alt="" />
          <h3>Cargando...</h3>
        </div>
        :

        <div className="component-menu">
          <div className="top-bar-menu-component">
            <div onClick={goBack.bind()} class="arrow-icon">
              <div class="arrow" />
            </div>
            <h3>Sembrando Vida</h3>
            <img src={florLogo} alt="logoFlor" />
          </div>
          <div className="component-menu-content">
            {modal ? <Modal /> : ""}
            <Route path="/menu/exchange/got/:userID">
              <ExchangeGot />
            </Route>
            <Route path="/menu/exchange/need/user/:userID">
              <ExchangeNeed />
            </Route>
            <Route path="/menu/exchange/need/categories/:category">
              <ExchangeNeedCategory products={barters.filter(b1 => b1.tipo === 0)} userInfo={locations} />
            </Route>
            <Route exact strict path="/menu/exchange/need/categories">
              <ExchangeNeedAllCategories products={barters.filter(b1 => b1.tipo === 0)} />
            </Route>
            <Route exact strict path="/menu/exchange/got">
              <ExchangeMenuGot />
            </Route>
            <Route exact strict path="/menu/exchange/need">
              <ExchangeMenuNeed />
            </Route>
            <Route strict exact path="/menu/exchange">
              <Exchange />
            </Route>
            <Route path="/menu/library/:category">
              <LibraryCategory documents={documents} userInfo={locations} />
            </Route>
            <Route strict exact path="/menu/library">
              <Library documents={documents} userInfo={locations} />
            </Route>
            <Route strict exact path="/menu">
              <MenuFirst />
            </Route>
            <div className="illustrations-menufirst">
              <img src={florf} alt="" />
              <img src={florc} alt="" />
            </div>
          </div>
        </div>
      }

    </div>
  )
}

export default MenuComponent 