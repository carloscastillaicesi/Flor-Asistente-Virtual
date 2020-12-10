import React, { useState, useEffect, useRef, useContext } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import { UserContext } from "../contexts/UserContext";
import { SettingContext } from "../contexts/SettingContext";
import { useLocation, useHistory } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import MarkerPopup from "./MarkerPopup";
import { Icon } from "./Icon";
import { IconUser } from "./IconUser";
import florFinal from "../assets/Flor_geo.svg"
import image from "../assets/sembrandovida.png";

const MapView = () => {


  const [state, setState] = useState({
    currentLocation: { lat: 3.4194719680257584, lng: -76.52423502012975 },
    zoom: 15,

  });
  const { name } = useContext(UserContext);


  const [mapUrl, setMapUrl] = useState(true)

  const location = useLocation();
  const history = useHistory();

  const mapRef = useRef(null);

  const [open, setOpen] = useState(true);

  const [locations] = useState({
    "users":
      [
        {
          name: "Carlos Castilla",
          pic: "https://images.generated.photos/7xzxPeS5XipKhSWDIhMDMMHkfTlQ1Jg4klIe1JUtL8M/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyODcwNTkuanBn.jpg",
          gallery: ["https://picsum.photos/200/300", "https://source.unsplash.com/random", "https://source.unsplash.com/random", "https://source.unsplash.com/random", "https://picsum.photos/200/300?grayscale", "https://source.unsplash.com/random"],
          geometry: [3.3603201110286225, -76.57668773559288]
        }, {
          name: "Daniel Manso",
          pic: "https://images.generated.photos/Ur_ZGtK2Tu9crC8buZfl3B5ZTGXo_LcUq0jZ4C0P_hc/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzMTE3NzcuanBn.jpg",
          gallery: ["https://source.unsplash.com/random", "https://source.unsplash.com/random", "https://source.unsplash.com/random", "https://picsum.photos/200/300/?blur", "https://source.unsplash.com/random", "https://source.unsplash.com/random"],
          geometry: [3.337014026145643, -76.56072322837524]
        }, {
          name: "Pepe Perez",
          pic: "https://images.generated.photos/0sNmVYMBUe6Fih2ocxw0o0M7SI1sgr3XMIDiGaoy3rA/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA1MDI5NTdfMDU3/NDQwNl8wMjEwNTI4/LmpwZw.jpg",
          gallery: ["https://source.unsplash.com/random", "https://source.unsplash.com/random", "https://source.unsplash.com/random", "https://picsum.photos/200/300?random=1", "https://source.unsplash.com/random", "https://source.unsplash.com/random"],
          geometry: [3.405902458606593, -76.55399031982945]
        }, {
          name: "Julien Assange",
          pic: " ",
          geometry: [3.4545836014772595, -76.5556425605519]
        }, {
          name: "Florinde Mesa",
          pic: "https://images.generated.photos/XXlJY4hwb4OD7vKtWn0-xZOyuLpLQbUfA2Pff0YMxUM/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAzNDY4MDJfMDM4/NjI3MV8wNzg5OTI4/LmpwZw.jpg",
          gallery: ["https://source.unsplash.com/random", "https://source.unsplash.com/random", "https://source.unsplash.com/random", "https://source.unsplash.com/random", "https://source.unsplash.com/random", "https://source.unsplash.com/random"],
          geometry: [3.453073583273669, -76.55904360157757]
        }
      ]
  });

  useEffect(() => {

    if (location) {
      console.log(location);
      if (location.state !== undefined) {
        console.log(location.state);
        if (location.state.latitude && location.state.longitude) {
          const currentLocation = {
            lat: location.state.latitude,
            lng: location.state.longitude,
          };
          console.log(location);
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
  }, [location, history, state]);


  function centerMapView(e) {
    const { leafletElement } = mapRef.current;
    if (e) {
      leafletElement.setView(e.popup._latlng, e.zoom);
      const point = leafletElement.project(e.target._popup._latlng);
      leafletElement.panTo(leafletElement.unproject(point), { animate: true });
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
        console.log(currentLocation);
        console.log(state.currentLocation);
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
  const { fullScreenMode, toggleFullscreen } = useContext(SettingContext);
  const handle = useFullScreenHandle();



  return (
    <div>
      <FullScreen handle={handle}>

        {fullScreenMode === '' ?
          <div className="homeuser-container">
            <img src={florFinal} alt="" />
            <p className="paragraph">Explora el mapa </p>


            <div className="option-button"
              onClick={() => {
                toggleFullscreen("true");
                handle.enter();
              }}>
              Activar Pantalla Completa
      </div>

            <div className="option-button"
              onClick={() => {

                toggleFullscreen("false");
                handle.exit();
              }}>
              Desactivar Pantalla Completa
      </div>

            <p> Para descativarlo, presiona atrás o la tecla "esc"</p>

          </div>
          :
          <div className="mapview-container">

            {open ?
              <div>
                <div className="top-bar">
                  <img src={image} alt="" />
                  <h2>Hola, {name}</h2>
                  <div className="button-menu" />
                </div>
                <div className="button-group">
                  <div className="button-rise" onClick={centerMapViewMe.bind(this)}><div class="icon-bar-location" /></div>
                  <div className="button-rise" onClick={centerMapViewMe.bind(this)}><div class="icon-bar-person" /></div>
                  <div className="button-rise" onClick={changeMap.bind(this)}><div class="icon-bar-huerta" /></div>
                </div>

              </div>

              : ''}

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
              </Marker>

              {locations.users.map((locations, i) => (
                <Marker key={i}
                  position={locations.geometry}
                  icon={Icon}
                  opacity={open ? 100 : 0}>

                  <MarkerPopup position={locations.geometry}
                    name={locations.name}
                    open={open}
                    setOpen={setOpen} pic={locations.pic} gallery={locations.gallery} />

                </Marker>
              ))}
            </Map>

          </div >}
      </FullScreen >
    </div >


  );
};

export default MapView;
