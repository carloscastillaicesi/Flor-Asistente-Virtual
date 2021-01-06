import React, { useEffect, useState, useContext } from "react";
import errorI from "../assets/usernotfound.png";
import Modal from "../components/Modal";
import Peek from "../components/Profile-Components/Peek";
import Gallery from '../components/Profile-Components/Gallery';
import Documents from '../components/Profile-Components/Documents';
import Exchange from "../components/Profile-Components/Exchange";
import Plants from "../components/Profile-Components/Plants";
import Detailed from "./Profile-Components/Detailed/Detailed";
import UserInfo from "../components/Profile-Components/UserInfo";
import Badge from "./Profile-Components/Badge";
import TopProfileBar from "./Profile-Components/TopProfileBar";
import { SettingContext } from "../contexts/SettingContext";
import { DocumentContext } from "../contexts/DocumentContext";
import { BarterContext } from "../contexts/BarterContext";
import { UserInfoContext } from "../contexts/UserInfoContext";
import { Route, useHistory, useLocation } from "react-router-dom";
import * as ReactLeaflet from "react-leaflet";
const { Popup } = ReactLeaflet;

export default function MarkerPopup({ open, setOpen, name, pic, setpickedUserMapView, _id, level }) {

  const history = useHistory();
  let location = useLocation();

  const [state, setPage] = useState(false)
  const { modal, toggleModal } = useContext(SettingContext);
  const { documents, documentStatus } = useContext(DocumentContext);
  const { barters, barterStatus } = useContext(BarterContext);
  const { users, userStatus } = useContext(UserInfoContext);
  const [message, setmessage] = useState("Cargando...");

  const [pickedUser, setpickedUser] = useState(false);
  const [pickedUserDocuments, setpickedUserDocuments] = useState(false);
  const [pickedUserBarters, setpickedUserBarters] = useState(false);


  useEffect(() => {
    if (state) {
      history.push("/map");
      setPage(false);
    }
    if (history.action === 'POP') {
      if (location.pathname === '/map') {
        setOpen(true);
        setPage(true);
      }
    }
  }, [state, history, location, setOpen])


  function handleOpen() {
    setpickedUserMapView('');
    setTimeout(() => {
      setOpen(false);
      history.push("/map/aboutme");
      //picks the user out of the database
      if (documentStatus === "success") {
        var userDocuments = documents.filter(d => { return d.uId === _id });
        setpickedUserDocuments(userDocuments);
      }
      if (barterStatus === "success") {
        var userBarters = barters.filter(d => { return d.uId === _id });
        setpickedUserBarters(userBarters);
      }
      if (userStatus === "success") {
        var userInfo = users.filter(i => { return i._id === _id })[0];
        setpickedUser(userInfo);
      }

      if (documentStatus === "error" || barterStatus === "error" || userStatus === "error" || !pickedUser || !pickedUserBarters || !pickedUserDocuments) {
        setmessage(`Hubo un error cargando el perfil de ${name}, contactate con el administrador`);
      }

    }, 200);
  }

  function handleClose() {
    setTimeout(() => {
      setOpen(true);
      setPage(true);
      console.log("Cerró")
    }, 200);
  }

  return (
    <Popup autoPan={false} closeButton={false} onClose={handleClose.bind(this)} onOpen={handleOpen.bind(this)} className={open ? "" : "popup"}>

      { modal ? <Modal /> : ""}

      {pickedUser && pickedUserBarters && pickedUserDocuments ?
        <div>
          <Route strict exact path="/map/aboutme">
            <Peek name={name} pic={pic} setOpen={setOpen} />
          </Route>
          <Route exact path={["/map/aboutme/plants", "/map/aboutme/userinfo", "/map/aboutme/exchange", "/map/aboutme/documents", "/map/aboutme/gallery", "/map/aboutme/detail", "/map/aboutme/badge"]}>
            <TopProfileBar setOpen={setOpen} setPage={setPage} />
          </Route>
          <Route path="/map/aboutme/badge">
            <Badge
              name={name}
              level={level}
              pic={pic} />
          </Route>
          <Route path="/map/aboutme/plants">
            <Plants
              user={pickedUser}
              name={name}
              pic={pic} />
          </Route>
          <Route path="/map/aboutme/exchange">
            <Exchange
              barters={pickedUserBarters}
              name={name}
              pic={pic}
              setModal={toggleModal} />
          </Route>
          <Route path="/map/aboutme/documents">
            <Documents
              setModal={toggleModal}
              documents={pickedUserDocuments}
              name={name}
              pic={pic} />
          </Route>
          <Route path="/map/aboutme/gallery">
            <Gallery
              gallery={pickedUser.gallery}
              name={name} />
          </Route>
          <Route path="/map/aboutme/detail">
            <Detailed user={pickedUser} pic={pic} name={name} />
          </Route>
          <Route path="/map/aboutme/userinfo">
            <UserInfo user={pickedUser} name={name} pic={pic} level={level} />
          </Route>
        </div> :
        <div className={message === "Cargando..." ? "marker-popup-loading" : "marker-popup-error"}><h3>{message === "Cargando..." ? "Cargando..." : <div className={"marker-popup-error-item"}>  <h2>OOPS!</h2><img src={errorI} alt={""} target={"_blank"} /> <h3>{`Hubo un error cargando el perfil de ${name.split(" ")[0]}`}</h3> <h6>Comunícate con el <a href="https://api.whatsapp.com/send?phone=573165058770">administrador</a></h6></div>}</h3>
        </div>}
    </Popup>
  );
}
