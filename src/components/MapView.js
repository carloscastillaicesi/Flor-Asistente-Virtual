import React, { useState, useEffect, useRef } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { useLocation, useHistory } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import MarkerPopup from "./MarkerPopup";
import { Icon } from "./Icon";
import image from "../assets/sembrandovida.png";

const MapView = () => {

 const [state, setState] = useState({
  currentLocation: { lat: 52.52437, lng: 13.41053 },
  zoom: 15,
 });

 const location = useLocation();
 const history = useHistory();

 const mapRef = useRef(null);

 const [open, setOpen] = useState(true);

 const [locations] = useState([
  [3.3603201110286225, -76.57668773559288],
  [3.337014026145643, -76.56072322837524],
  [3.405902458606593, -76.58475581988567]
 ]);

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
 }, [location]);


 function centerMapView(e) {
  const { leafletElement } = mapRef.current;
  if (e) {
   leafletElement.setView(e.popup._latlng);
   const point = leafletElement.project(e.target._popup._latlng);
   const currentLocation = {
    lat: e.popup._latlng.lat,
    lng: e.popup._latlng.lng,
   };
   setState({
    ...state,
    currentLocation,
   });
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

 return (
  <div className="mapview-container">

   <div className="top-bar">
    <img src={image} alt="" />
    <h2>Sembrando Vida</h2>
    <div className="button-menu" />
   </div>
   <div className="button-group">
    <div className="button-rise" onClick={centerMapViewMe.bind(this)}><div class="icon-bar-location" /></div>
    <div className="button-rise" onClick={centerMapViewMe.bind(this)}><div class="icon-bar-person" /></div>
    <div className="button-rise" onClick={centerMapViewMe.bind(this)}><div class="icon-bar-huerta" /></div>
   </div>

   <Map ref={mapRef}
    center={state.currentLocation}
    onPopupopen={centerMapView.bind(this)}
    zoom={state.zoom}
    dragging={open}
    zoomControl={false}>


    <TileLayer
     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />

    <Marker
     position={state.currentLocation}
     icon={Icon}>
     <Popup
      autoPan={false}
      closeButton={false}
      onClose={() => { }}> Estas Aquí </Popup>
    </Marker>

    {locations.map((locations, i) => (
     <Marker key={i}
      position={locations}
      icon={Icon} >
      <MarkerPopup position={state.currentLocation}
       open={open}
       setOpen={setOpen} />
     </Marker>
    ))}

   </Map>
  </div >
 );
};

export default MapView;
