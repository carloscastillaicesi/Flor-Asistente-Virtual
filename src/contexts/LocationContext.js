import React, { createContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
export const LocationContext = createContext();


const LocationContextProvider = (props) => {

 const [locations, setlocations] = useState();
 const [locationsStatus, setlocationsStatus] = useState();

 const fetchLocations = async () => {
  const res = await fetch(`/map/users`, {
   crossDomain: true
  })
  return res.json();
 }

 const locationsQuery = useQuery('locationsusers', fetchLocations);

 useEffect(() => {

  if (locationsQuery.status === "success") {
   setlocations(locationsQuery.data);
  }
  setlocationsStatus(locationsQuery.status);
  console.log("locations", locations)
  console.log("locationStatus", locationsStatus)
 }, [locationsQuery, locations, locationsStatus])

 return (
  <LocationContext.Provider value={{ locations, locationsStatus }}>
   {props.children}
  </LocationContext.Provider>
 )

}

export default LocationContextProvider
