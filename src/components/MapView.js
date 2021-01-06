import React, { useState, useEffect, useRef, useContext } from "react";
import { Map, TileLayer, Marker, Circle } from "react-leaflet";
import { UserContext } from "../contexts/UserContext";
import { SettingContext } from "../contexts/SettingContext";
import { LocationContext } from "../contexts/LocationContext";
import { Popup } from "react-leaflet";
import { useLocation, useHistory, Link, useParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import MarkerPopup from "./MarkerPopup";
import { Icon } from "./Icons/Icon";
import { IconTwo } from "./Icons/IconTwo";
import { IconThree } from "./Icons/IconThree";
import { IconFour } from "./Icons/IconFour";
import { IconUser } from "./Icons/IconUser";
import defaultPic from "../assets/defaultphotouser.png"
import sembrando from "../assets/sembranovidalogo.png";
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


  const { _id, name, geometry, current, pic, level, userData, setCurrentLocation, setCurrentUserLocalStorage } = useContext(UserContext);

  var localStore = JSON.parse(localStorage.getItem('state'));

  _id === '' && userData(localStore);

  const fetchLocations = async () => {
    const res = await fetch(`/map/${_id === '' ? localStore._id : _id}`, {
      crossDomain: true
    })
    return res.json();
  }

  const { isLoading, isError, data } = useQuery('locations', fetchLocations);

  const [pickedUser, setpickedUser] = useState('')
  const [mapUrl, setMapUrl] = useState(true)
  const [open, setOpen] = useState(true);
  const [options, setOptions] = useState("map");
  const [posActual, setposActual] = useState(false);

  const { fullScreenMode, toggleFullscreen, setModal } = useContext(SettingContext);
  const { locations } = useContext(LocationContext);

  const location = useLocation();

  const history = useHistory();

  let { userId } = useParams();

  const mapRef = useRef(null);

  const handle = useFullScreenHandle();

  useEffect(() => {

    setModal(false);

    console.log("params", userId)

    if (userId && userId !== "aboutme") {
      if (locations) {
        var result = [];
        locations.forEach(function (o) { if (o['_id'] === userId) result.push(o); });
        if (result) {
          //geomtry here is a number, and in the other context object is something else 
          setpickedUser([result[0].geometry[0].toString(), result[0].geometry[1].toString()]);
          setTimeout(() => {
            history.push("/map");
          }, 500);
        }
      }
    }


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
  }, [location, history, setModal, pickedUser, userId, isLoading, locations, setCurrentLocation]);


  function centerMapView(e) {
    const { leafletElement } = mapRef.current;
    if (e) {
      leafletElement.setView(e.popup._latlng, 16);
      const point = leafletElement.project(e.target._popup._latlng);
      leafletElement.panTo(leafletElement.unproject(point), { animate: true });
    }
  }

  function centerMapViewUser() {
    const { leafletElement } = mapRef.current;
    if (pickedUser !== '') {
      let latlng = { lat: pickedUser[0], lng: pickedUser[1] }
      leafletElement.setView(latlng, 16);
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
        setCurrentUserLocalStorage();
        leafletElement.setView(currentLocation, 16);
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


  function posActualToggle() {
    setposActual(!posActual);
  }

  function allUsersToggle() {
    if (open) {
      setOpen(false);
      setOptions("users");
    } else if (!open) {
      setOpen(true);
      setOptions("map");
      setpickedUser('');
    }
  }

  return (
    <div>
      {isError ? "Se ha producido un error inesperado. Recarga la página" :
        <div>
          {isLoading ?
            <div className="homeuser-container">
              <img src={spinner} alt="" />
              <h3>Cargando...</h3>
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
                        <h2> {name.split(" ").length >= 4 ? name.split(" ").slice(0, 3).join(" ") : name.split(" ")[0]}</h2>
                        <h5>Conoce a otros Sembradores de vida de tu comunidad</h5>
                      </div>

                      {/*The Sketchiest way to overcome the fact that setting a state inside of an OnClick event just*/}

                      <div className="all-users-group">
                        {data.map((data, i) => (
                          <div onClick={pickedUser === ''
                            ? () => { setpickedUser(data.geometry); }
                            : pickedUser === data.geometry
                              ? () => { centerMapViewUser(); }
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
                              <h5 style={pickedUser === '' ? { opacity: "1" } : pickedUser === geometry ? { opacity: "1" } : { opacity: "0.5" }}>{"Mi huerta"}</h5>
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
                      <div >
                        <img src={pic} alt="" />
                        <h3>Hola, {name.split(" ").length >= 4 ? name.split(" ").slice(0, 3).join(" ") : name.split(" ")[0]}</h3>
                      </div>
                      <Link to="/menu"> <div className="button-menu" /></Link>
                    </div>
                    <div className="button-group">
                      <div className="button-rise-white" onClick={changeMap.bind(this)}><img src={!mapUrl ? terrain : street} alt="" /></div>
                      <div className="button-rise-white" onClick={fullScreenMode === "false" ? () => {
                        toggleFullscreen("true");
                        handle.enter();
                      } : () => {
                        toggleFullscreen("false");
                        handle.exit();
                      }}><img src={fullScreenMode === "true" ? fullscreeni : normalscreen} alt="" /></div>
                      <div className="button-rise" onClick={() => { allUsersToggle(this); setpickedUser(''); }}><img src={allusersicon} alt="" /><div class="icon-bar-person" /></div>
                      <div className="button-rise" onClick={centerMapViewMe.bind(this)}><img src={geolocation} alt="" /></div>
                    </div>

                  </div>
                  :
                  ''}

                <Map ref={mapRef}
                  center={current}
                  onPopupopen={centerMapView.bind(this)}
                  zoom={13}
                  maxZoom={19}
                  minZoom={13}
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
                    opacity={!pickedUser ? 100 : pickedUser === current ? 100 : 0.5}
                  >
                    <Popup autoPan={false} closeButton={false} onClose={() => setOpen(true)} onOpen={() => { setOpen(false); centerMapViewMe(this); setpickedUser(''); }}>
                      <div className={!posActual ? "mihuerta-container" : "mihuerta-container-expanded"}>
                        <div className="mihuerta-container-item" onClick={!posActual ? () => { posActualToggle(); setpickedUser(geometry) } : () => { posActualToggle() }}>
                          <img src={pic} alt="" />
                          <h2>Mi posición actual</h2>
                          <div className={!posActual ? "arrow-gallery down" : "arrow-gallery up"} />
                        </div>

                        <div onClick={posActual ? () => { centerMapViewUser(); posActualToggle() } : ""}><h3>Ir a mi huerta</h3></div>

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
                      opacity={!pickedUser ? 100 : pickedUser === data.geometry ? 100 : 0.5}
                      zIndexOffset={!pickedUser ? "" : pickedUser === data.geometry ? 10000 : ""}>

                      <MarkerPopup
                        name={data.name}
                        level={data.level}
                        open={open}
                        _id={data._id}
                        setOpen={setOpen} setOptions={setOptions} setpickedUserMapView={setpickedUser} pic={data.pic}
                      />
                    </Marker>

                  ))};

                  <Marker
                    position={geometry}
                    icon={level === 1 ? Icon : level === 2 ? IconTwo : level === 3 ? IconThree : level === 4 ? IconFour : Icon}
                    opacity={!pickedUser ? 100 : pickedUser === geometry ? 100 : 0.5}
                    zIndexOffset={!pickedUser ? "" : pickedUser === geometry ? 10000 : ""}>

                    <MarkerPopup
                      name={name}
                      open={open}
                      _id={_id}
                      level={level}
                      setOpen={setOpen} setOptions={setOptions} setpickedUserMapView={setpickedUser} pic={pic}
                    />
                  </Marker>

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
        </div >}
    </div >

  );
};

export default MapView;
