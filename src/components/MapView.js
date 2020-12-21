import React, { useState, useEffect, useRef, useContext } from "react";
import { Map, TileLayer, Marker, Circle } from "react-leaflet";
import { UserContext } from "../contexts/UserContext";
import { SettingContext } from "../contexts/SettingContext";
import { Popup } from "react-leaflet";
import { useLocation, useHistory, Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import MarkerPopup from "./MarkerPopup";
import { Icon } from "./Icons/Icon";
import { IconTwo } from "./Icons/IconTwo";
import { IconThree } from "./Icons/IconThree";
import { IconFour } from "./Icons/IconFour";
import { IconUser } from "./Icons/IconUser";
import defaultPic from "../assets/defaultphotouser.png"
import florFinal from "../assets/Flor_geo.svg"
import image from "../assets/sembrandovida.png";
import sembrando from "../assets/sembranovidalogo.png";
import mihuerta from "../assets/mihuerta.svg";
import geolocation from "../assets/geolocation2.svg";
import allusersicon from "../assets/allusersicon.svg";
import terrain from "../assets/terrain.svg";
import street from "../assets/street.svg";
import fullscreeni from "../assets/fullscreen.svg";
import normalscreen from "../assets/normalscreen.svg";
import { pulse } from "../components/Icons/pulse";
import { useQuery } from "react-query";
import spinner from "../assets/spinner.svg"




const MapView = () => {

  const fetchLocations = async () => {
    const res = await fetch(`/map`, {
      crossDomain: true
    })
    return res.json();
  }

  const { isLoading, isError, data, status } = useQuery('locations', fetchLocations);




  const [pickedUser, setpickedUser] = useState('')
  const [mapUrl, setMapUrl] = useState(true)
  const [open, setOpen] = useState(true);
  const [options, setOptions] = useState("map");

  const { _id, name, geometry, current, pic, stage, auth, setCurrentLocation } = useContext(UserContext);
  const { fullScreenMode, toggleFullscreen, setModal } = useContext(SettingContext);

  const location = useLocation();

  const history = useHistory();

  const mapRef = useRef(null);

  const handle = useFullScreenHandle();

  useEffect(() => {
    setModal(false);
    if (location) {
      if (location.state !== undefined) {
        if (location.state.latitude && location.state.longitude) {
          const currentLocation = {
            lat: location.state.latitude,
            lng: location.state.longitude,
          };
          setCurrentLocation(currentLocation);
          history.replace({
            pathname: "/map",
            state: {},
          });
        }
      }
    }
  }, [location, history, setModal, geometry, current]);


  function centerMapView(e) {
    const { leafletElement } = mapRef.current;
    if (e) {
      leafletElement.setView(e.popup._latlng, e.zoom);
      const point = leafletElement.project(e.target._popup._latlng);
      leafletElement.panTo(leafletElement.unproject(point), { animate: true });
    }
  }

  function centerMapViewUser() {
    const { leafletElement } = mapRef.current;
    if (pickedUser !== '') {
      let latlng = { lat: pickedUser[0], lng: pickedUser[1] }
      leafletElement.setView(latlng, 19);
      const point = leafletElement.project(latlng);
      leafletElement.panTo(leafletElement.unproject(point), { animate: true });

      setOpen(true);
      setOptions("map");
    }
  }

  function centerMapViewMe() {
    const { leafletElement } = mapRef.current;
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        const currentLocation = { lat: latitude, lng: longitude };
        setCurrentLocation(currentLocation);
        leafletElement.setView(currentLocation);
        const point = leafletElement.project(currentLocation);
        leafletElement.panTo(leafletElement.unproject(point), { animate: true });
      },

      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }

  function changeMap() {
    setMapUrl(!mapUrl);
  }

  function allUsersToggle() {
    if (open) {
      setOpen(false);
      setOptions("users");
    } else if (!open) {
      setOpen(true);
      setOptions("map");
    }
  }

  return (
    <div>

      {isLoading ?
        <div className="homeuser-container">
          <img src={spinner} alt="" />
          <h2>{status}</h2>
        </div>
        :
        <FullScreen handle={handle}>
          <div className="mapview-container">
            {options === "map"
              ? ""
              : <div className="all-users" >
                <div className="all-users-map-scape-area"
                  onClick={() => { setOpen(true); setOptions("map") }}>
                </div>
                <div className="all-users-content">
                  <div className="top-bar-component">
                    <div onClick={allUsersToggle.bind()} class="arrow-icon">
                      <div class="arrow"></div>
                    </div>
                    <h4>Sembradores de Vida</h4>
                  </div>
                  <div className="user-info">
                    <img src={sembrando} alt="" className="user-profile-image" />
                    <h2>{name}</h2>
                    <h5>Conoce a otros Sembradores de vida de tu comunidad</h5>
                  </div>

                  {/*The Sketchiest way to overcome the fact that setting a state inside of an OnClick event just*/}

                  <div className="all-users-group">
                    {data.slice(0, data.length - 1).map((data, i) => (
                      <div onClick={pickedUser === ''
                        ? () => { setpickedUser(data.geometry); }
                        : pickedUser === data.geometry
                          ? () => { centerMapViewUser() }
                          : () => { setpickedUser('') }}
                        className="all-users-single" key={i}>
                        <img
                          src={data.pic.length > 5 ? data.pic : defaultPic}
                          alt=""
                          style={pickedUser === '' ? { filter: "none" } : pickedUser === data.geometry ? { filter: "none" } : { filter: "grayscale(100%)" }} />
                        <div className="all-users-info">
                          <div className="all-users-info-container">
                            <h5 style={pickedUser === '' ? { opacity: "1" } : pickedUser === data.geometry ? { opacity: "1" } : { opacity: "0.5" }}>{data.name}</h5>
                            <div className="modal-button-green" style={pickedUser === '' ? { display: "none" } : pickedUser === data.geometry ? { display: "initial" } : { display: "none" }}>Conocer Más</div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div onClick={pickedUser === ''
                      ? () => { setpickedUser(geometry); }
                      : pickedUser === geometry
                        ? () => { centerMapViewUser() }
                        : () => { setpickedUser('') }}
                      className="all-users-single" >
                      <img
                        src={pic ? pic : defaultPic}
                        alt=""
                        style={pickedUser === '' ? { filter: "none" } : pickedUser === geometry ? { filter: "none" } : { filter: "grayscale(100%)" }} />
                      <div className="all-users-info" style={{ borderBottom: "none" }}>
                        <div className="all-users-info-container">
                          <h5 style={pickedUser === '' ? { opacity: "1" } : pickedUser === geometry ? { opacity: "1" } : { opacity: "0.5" }}>{name}</h5>
                          <div className="modal-button-green" style={pickedUser === '' ? { display: "none" } : pickedUser === geometry ? { display: "initial" } : { display: "none" }}>Conocer Más</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}

            {open
              ?
              <div>
                <div className="top-bar">
                  <img src={image} alt="" />
                  <h2>Hola, {name}</h2>
                  <Link to="/menu"> <div className="button-menu" /></Link>
                </div>
                <div className="button-group">

                  <div className="button-rise" onClick={allUsersToggle.bind(this)}><img src={allusersicon} alt="" /><div class="icon-bar-person" /></div>
                  <div className="button-rise" onClick={centerMapViewMe.bind(this)}><img src={geolocation} alt="" /></div>

                </div>
                <div className="button-group-left">
                  <div className="button-rise-left" onClick={changeMap.bind(this)}><img src={!mapUrl ? terrain : street} alt="" /></div>
                  <div className="button-rise-left" onClick={fullScreenMode === "false" ? () => {
                    toggleFullscreen("true");
                    handle.enter();
                  } : () => {
                    toggleFullscreen("false");
                    handle.exit();
                  }}><img src={fullScreenMode === "true" ? fullscreeni : normalscreen} alt="" /></div>
                </div>
              </div>
              :
              ''}

            <Map ref={mapRef}
              center={current}
              onPopupopen={centerMapView.bind(this)}
              zoom={19}
              dragging={open}
              zoomControl={false}
              touchZoom={open}
              doubleClickZoom={open}
              scrollWheelZoom={open}>

              <TileLayer
                url={mapUrl ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />
              {/* {attribution = {`&copy; <a href="http://osm.org/copyright">${mapUrl ? 'ArGis' : 'OpenStreetMap'}</a> contributors`}} */}


              <Marker
                position={current}
                icon={IconUser}
                opacity={open ? 100 : 0}>
                <Popup autoPan={false} closeButton={false} onClose={() => setOpen(true)} onOpen={() => { setOpen(false); centerMapViewMe(this); }}>
                  <div className="mihuerta-container">
                    <img src={pic} alt="" />
                    <h2>Mi posición actual</h2>
                    <br />
                    {/* <div className="mihuerta" onClick={
                      () => { setpickedUser([3.3786396334561846, -76.53985514664332]); centerMapViewUser() }}><img src={mihuerta} alt="" /></div> */}
                  </div>
                </Popup>

                <Circle
                  center={current}
                  fillColor="white"
                  weight={0}
                  radius={40} />
              </Marker>


              {data.map((data, i) => (
                <Marker key={i}
                  position={data.geometry}
                  icon={data.level === 1 ? Icon : data.level === 2 ? IconTwo : data.level === 3 ? IconThree : data.level === 4 ? IconFour : Icon}
                  opacity={open ? 100 : 0}>

                  <MarkerPopup
                    name={data.name}
                    open={open}
                    _id={data._id}
                    setOpen={setOpen} setOptions={setOptions} setpickedUserMapView={setpickedUser} pic={data.pic}
                  />
                </Marker>

              ))};

    {pickedUser !== '' ?
                <Marker
                  position={pickedUser}
                  icon={pulse}
                  opacity={open ? 100 : 0}>
                </Marker> : ""}
            </Map>
          </div >
        </FullScreen >
      }
    </div >
  );
};

export default MapView;
