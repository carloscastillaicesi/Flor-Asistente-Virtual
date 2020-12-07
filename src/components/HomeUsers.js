import React, { useEffect, useState, useContext } from "react";
import { NrowserRouter as Router, useHistory, Link, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import MapView from "./MapView";

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
    name: 'Carlos Castilla',
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
    <div className="HomeUser-Container">
      <h1>Geolocation</h1>
      <p>Latitude: {state.latitude}</p>
      <p>longitude: {state.longitude}</p>
      <p>Latitude: {geometry.lat}</p>
      <p>longitude: {stage}</p>
      <p>longitude: {name}</p><p>longitude: {user}</p>
      {!state.geo ?
        <button onClick={getGeo.bind(this)}>{state.buttonText}</button>
        : <Link to={{ pathname: `/map`, state }}>See marker</Link>}
    </div>

  );
}

export default HomeUsers;