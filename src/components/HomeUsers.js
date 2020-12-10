import React, { useEffect, useState, useContext } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { SettingContext } from "../contexts/SettingContext";
import florInicial from "../assets/flor_inicio.svg"



const HomeUsers = () => {

  let { userid } = useParams();
  const history = useHistory();
  const { name, toggleAuth, userData } = useContext(UserContext);

  const { toggleFullscreen } = useContext(SettingContext);

  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
    buttonText: "Activar Geolocalización",
    geo: false,

  });

  /** if it was data from the server */
  const [currentUser] = useState({
    user: '123456',
    name: 'Orbay Beltrán',
    geometry: { lat: state.latitude, lng: state.longitude },
    stage: 1,
    auth: false,
  })

  var authUser = toggleAuth(userid)
  useEffect(() => {
    toggleFullscreen('');

    if (authUser) {
      userData(currentUser);
    } else {
      history.push("/usernotfound");
    }
  }, [authUser, currentUser, history, userData, toggleFullscreen])

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
        setTimeout(() => {


          history.push({
            pathname: "/map",
            state: {
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
              buttonText: "Entrar al Mapa",
              geo: true
            }
          });
        }, 1000);
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
        <img src={florInicial} alt="" />
        <br />
        <p className="paragraph">Para poder ingresar al mapa, necesito me permitas permitas conocer tu ubicación</p>

        <div onClick={getGeo.bind()} className="option-button"> Activar Geolocalización</div>
      </div >
    </div >
  );
}

export default HomeUsers;

