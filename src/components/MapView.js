import React, { useState, useEffect, useRef, useContext } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import { UserContext } from "../contexts/UserContext";
import { SettingContext } from "../contexts/SettingContext";
import { useLocation, useHistory } from "react-router-dom";
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
import sembrando from "../assets/all-users.svg";

const MapView = () => {

  const [state, setState] = useState({
    currentLocation: { lat: 3.4194719680257584, lng: -76.52423502012975 },
    zoom: 15,
  });

  const [locations, setLocation] = useState({
    "users":
      [{
        name: "Orbay Beltrán",
        level: 1,
        pic: "https://i.ibb.co/8g5YNwy/orbay.png",
        geometry: [3.4545836014772595, -76.5556425605519]
      }, {
        name: "Maria del Mar",
        level: 2,
        pic: "https://i.ibb.co/3k2zwdp/mariadelmar.png",
        geometry: [3.453073583273669, -76.55904360157757]
      }, {
        name: "Daniel Manso",
        level: 3,
        pic: "https://i.ibb.co/bRzNkCK/daniel.png",
        geometry: [3.405902458606593, -76.55399031982945]
      }, {
        name: "Alexander Gómez",
        level: 4,
        pic: "https://i.ibb.co/vDk43hb/alexander.png",
        geometry: [3.337014026145643, -76.56072322837524]
      }]
  });

  const [pickedUser, setpickedUser] = useState('')
  const [mapUrl, setMapUrl] = useState(true)
  const [open, setOpen] = useState(true);
  const [options, setOptions] = useState("map");

  const { name, pic } = useContext(UserContext);
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
          const currentUser = {
            name: "Yo",
            level: 4,
            pic: "https://images.generated.photos/XXlJY4hwb4OD7vKtWn0-xZOyuLpLQbUfA2Pff0YMxUM/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzNDY4MDJfMDM4/NjI3MV8wNzg5OTI4/LmpwZw.jpg",
            geometry: [currentLocation.lat, currentLocation.lng]
          }
          setState({
            ...state,
            currentLocation,
          });
          history.replace({
            pathname: "/map",
            state: {},
          });

        }
      }
    }
  }, [location, history, state, setModal]);


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
      setpickedUser('');
      setOpen(true);
      setOptions("map");
    }
  }

  function centerMapViewMe() {
    const { leafletElement } = mapRef.current;
    var latitude;
    var longitude;

    navigator.geolocation.getCurrentPosition(
      function (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        const currentLocation = { lat: latitude, lng: longitude };
        leafletElement.setView(currentLocation);
        const point = leafletElement.project(currentLocation);
        leafletElement.panTo(leafletElement.unproject(point), { animate: true });
        setState({
          ...state,
          currentLocation,
        });
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
      <FullScreen handle={handle}>
        {fullScreenMode === '' ?

          <div className="homeuser-container">
            <img src={florFinal} alt="Flor" />
            <p className="paragraph">Explora el mapa</p>
            <div className="option-button"
              onClick={() => {
                toggleFullscreen("true");
                handle.enter();
              }}>Activar Pantalla Completa</div>
            <div className="option-button"
              onClick={() => {
                toggleFullscreen("false");
                handle.exit();
              }}>Desactivar Pantalla Completa</div>
            <p> Para desactivarlo, presiona atrás o la tecla "esc"</p>
          </div>

          :

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
                    <h3>Sembradores de Vida</h3>
                  </div>
                  <div className="user-info">
                    <img src={sembrando} alt="" className="user-profile-image" />
                    <h2>{name}</h2>
                    <h5>Conoce a otros Sembradores de vida de tu comunidad</h5>
                  </div>
                  {/*The Sketchiest way to overcome the fact that setting a state inside of an OnClick event just*/}

                  <div className="all-users-group">
                    {locations.users.map((locations, i) => (
                      <div onClick={pickedUser === ''
                        ? () => { setpickedUser(locations.geometry); }
                        : pickedUser === locations.geometry
                          ? () => { centerMapViewUser() }
                          : () => { setpickedUser('') }}
                        className="all-users-single" key={i}>
                        <img
                          src={locations.pic.length > 5 ? locations.pic : defaultPic}
                          alt=""
                          style={pickedUser === '' ? { filter: "none" } : pickedUser === locations.geometry ? { filter: "none" } : { filter: "grayscale(100%)" }} />
                        <div className="all-users-info">
                          <div className="all-users-info-container">
                            <h4 style={pickedUser === '' ? { opacity: "1" } : pickedUser === locations.geometry ? { opacity: "1" } : { opacity: "0.5" }}>{locations.name}</h4>
                            <div className="modal-button-green" style={pickedUser === '' ? { display: "none" } : pickedUser === locations.geometry ? { display: "initial" } : { display: "none" }}>Conocer Más</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>}

            {open
              ?
              <div>
                <div className="top-bar">
                  <img src={image} alt="" />
                  <h2>Hola, {name}</h2>
                  <div className="button-menu" />
                </div>
                <div className="button-group">
                  <div className="button-rise" onClick={centerMapViewMe.bind(this)}><div class="icon-bar-location" /></div>
                  <div className="button-rise" onClick={allUsersToggle.bind(this)}><div class="icon-bar-person" /></div>
                  <div className="button-rise" onClick={changeMap.bind(this)}><div class="icon-bar-huerta" /></div>
                </div>
              </div>
              :
              ''}

            <Map ref={mapRef}
              center={state.currentLocation}
              onPopupopen={centerMapView.bind(this)}
              zoom={state.zoom}
              dragging={open}
              zoomControl={false}
              touchZoom={open}
              doubleClickZoom={open}
              scrollWheelZoom={open}>

              <TileLayer
                url={mapUrl ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                attribution={`&copy; <a href="http://osm.org/copyright">${mapUrl ? 'ArGis' : 'OpenStreetMap'}</a> contributors`} />

              <Marker
                position={state.currentLocation}
                icon={IconUser}
                opacity={open ? 100 : 0}>

                <MarkerPopup position={state.currentLocation}
                  name={name}
                  open={open}
                  setOpen={setOpen} setOptions={setOptions} pic={"https://i.ibb.co/z5Y5wdS/carlos.png"}
                />

              </Marker>

              {locations.users.map((locations, i) => (
                <Marker key={i}
                  position={locations.geometry}
                  icon={locations.level === 1 ? Icon : locations.level === 2 ? IconTwo : locations.level === 3 ? IconThree : locations.level === 4 ? IconFour : Icon}
                  opacity={open ? 100 : 0}>

                  <MarkerPopup position={locations.geometry}
                    name={locations.name}
                    open={open}
                    setOpen={setOpen} setOptions={setOptions} pic={locations.pic}
                  />
                </Marker>
              ))};
            </Map>
          </div >}
      </FullScreen >
    </div >
  );
};

export default MapView;
