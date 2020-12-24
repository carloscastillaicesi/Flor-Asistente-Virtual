import React, { useEffect, useState, useContext } from "react";
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
import { Route, useHistory, useLocation } from "react-router-dom";
import * as ReactLeaflet from "react-leaflet";
import { useQuery } from "react-query";
const { Popup } = ReactLeaflet;

export default function MarkerPopup({ open, setOpen, name, pic, setpickedUserMapView, _id, level }) {

  const history = useHistory();
  let location = useLocation();

  const [state, setPage] = useState(false)
  const { modal, toggleModal } = useContext(SettingContext);

  const [message, setmessage] = useState("Cargando...");
  const [pickedUser, setpickedUser] = useState(false);
  const [pickedUserDocuments, setpickedUserDocuments] = useState(false);

  const fetchDetails = async () => {
    const res = await fetch("/map/aboutme", {
      crossDomain: true
    })
    return res.json();
  }
  const detailsQuery = useQuery('details', fetchDetails);

  const fetchDocuments = async () => {
    const res = await fetch("/map/documents", {
      crossDomain: true
    })
    return res.json();
  }
  const documentsQuery = useQuery('documents', fetchDocuments);

  useEffect(() => {
    console.log(documentsQuery)
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
  }, [state, history, location])


  function handleOpen() {
    setpickedUserMapView('');

    setTimeout(() => {
      setOpen(false);
      history.push("map/aboutme");
      //picks the user out of the database
      var userInfo = detailsQuery.data.filter(obj2 => { return obj2._id === _id })[0];
      var userDocuments = documentsQuery.data.filter(obj2 => { return obj2.uId === _id });
      setpickedUser(userInfo);
      setpickedUserDocuments(userDocuments);
      console.log("userDocuments", userDocuments)
      if (detailsQuery.isError || !userInfo) {
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

      {!pickedUser ? <div className="all-users-group"><h3>{message}</h3>
      </div> :

        <div>

          <Route exact path={["/map/aboutme/plants", "/map/aboutme/userinfo", "/map/aboutme/exchange", "/map/aboutme/documents", "/map/aboutme/gallery", "/map/aboutme/detail", "/map/aboutme/badge"]}>
            <TopProfileBar setOpen={setOpen} setPage={setPage} />
          </Route>
          <Route strict exact path="/map/aboutme">
            <Peek name={name} pic={pic} setOpen={setOpen} />
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
              user={pickedUser}
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
        </div>}
    </Popup>
  );
}
