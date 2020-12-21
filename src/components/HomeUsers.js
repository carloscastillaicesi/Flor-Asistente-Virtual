import React, { useEffect, useState, useContext } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { SettingContext } from "../contexts/SettingContext";
import florInicial from "../assets/flor_inicio.svg"
import { useQuery } from "react-query";
import spinner from "../assets/spinner.svg"

const HomeUsers = () => {

  let { userid } = useParams();

  console.log(userid);

  const fetchUser = async () => {
    const res = await fetch(`/user/${userid}`, {
      crossDomain: true
    })
    return res.json();
  }

  const { isLoading, isError, data, status } = useQuery('currentUser', fetchUser);



  const history = useHistory();
  const { name, userData, geometry, setCurrentLocation, current } = useContext(UserContext);

  const { toggleFullscreen } = useContext(SettingContext);


  function getGeo() {

    navigator.geolocation.getCurrentPosition(
      function (position) {
        setCurrentLocation({
          lng: position.coords.longitude,
          lat: position.coords.latitude
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
    if (status === "success" && data !== null) {
      userData(data);
    }
    if (data === null) {
      history.push("/usernotfound");
    }
  }, [history, status, userData, toggleFullscreen, geometry])

  return (
    <div>
      {isLoading ?
        <div className="homeuser-container">
          <img src={spinner} alt="" />
          <h2>{status}</h2>
        </div>
        : <div className="homeuser-container">
          <h1>Hola, {name}</h1>
          <br />
          <img src={florInicial} alt="" />
          <br />
          <p className="paragraph">Para poder ingresar al mapa, necesito me permitas permitas conocer tu ubicación</p>
          <div onClick={getGeo.bind()} className="option-button">Activar Geolocalización</div>
        </div >}

    </div >
  );
}

export default HomeUsers;

