import React, { useEffect, useState, useContext } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { SettingContext } from "../contexts/SettingContext";
import florInicial from "../assets/flor_inicio.svg"
import { useQuery } from "react-query";


const HomeUsers = () => {

  let { userid } = useParams();

  console.log(userid);

  const fetchUser = async () => {
    const res = await fetch(`/user/${userid}`, {
      crossDomain: true
    })
    return res.json();
  }


  const { data, status } = useQuery('user', fetchUser);

  console.log(status)
  console.log(data)

  const history = useHistory();
  const { name, userData, geometry } = useContext(UserContext);

  const { toggleFullscreen } = useContext(SettingContext);

  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
    buttonText: "Activar Geolocalización",
    geo: false,

  });

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



  useEffect(() => {
    toggleFullscreen('');
    if (status === "success") {
      userData(data);
      console.log("Data from server");
      console.log(data);
    }
  }, [history, status, userData, toggleFullscreen, geometry])

  return (
    <div>
      <div className="homeuser-container">
        <h1>Hola, {name}</h1>
        <h2>{userid}</h2>
        <h2>{status}</h2>
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

