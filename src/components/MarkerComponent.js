import React from 'react'
import { Marker } from "react-leaflet";
import { Icon } from "./Icon";
import { MarkerPopup } from "./MarkerPopup";

const MarkerComponent = (props) => {
 const { locations } = props;
 const { onClick } = props;
 const locationMarkers = locations.map((locations, i) => (
  <Marker key={i} position={locations} icon={Icon} onClick={onClick}> </Marker>

 ))
 return (
  locationMarkers
 )
}

export default MarkerComponent
