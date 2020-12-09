import React, { useEffect, useState, useContext } from "react";
import { NrowserRouter as Router, useHistory, Link, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import MapView from "./MapView";
import florInicial from "../assets/flor_inicio.svg"
import florFinal from "../assets/Flor_geo.svg"

const HomeUsers = () => {
  let { userid } = useParams();
  const history = useHistory();
  const { name, user, stage, toggleAuth, userData, geometry } = useContext(UserContext);

  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
    buttonText: "Activar Geolocalización",
    geo: false
  });




  const [currentUser, setcurrentUser] = useState({
    user: '123456',
    name: 'Orbay Beltrán',
    geometry: { lat: state.latitude, lng: state.longitude },
    stage: 1,
    auth: false,
  })

  useEffect(() => {
    var authUser = toggleAuth(userid)
    if (authUser) {
      userData(currentUser);
    } else {
      history.push("/usernotfound");
    }
  }, [toggleAuth, state, history])

  function getGeo() {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // console.log(position);
        setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          buttonText: "Entrar al Mapa",
          geo: true
        });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
  };


  return (
    <div>
      <div className="homeuser-container">
        <h1>Hola, {name}</h1>
        <br />
        <img src={!state.geo ? florInicial : florFinal} alt="" />
        <br />
        <p className="paragraph">Para poder ingresar al mapa, necesito me permitas permitas conocer tu ubicación</p>
        {!state.geo ?
          <div className="option-button" onClick={getGeo.bind(this)}>{state.buttonText}</div>
          :
          <Link to={{ pathname: `/map`, state }}><div className="option-button"> Ingresar al Mapa</div></Link>}
      </div >
    </div >
  );
}

export default HomeUsers;