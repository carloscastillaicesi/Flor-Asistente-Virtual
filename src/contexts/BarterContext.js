import React, { createContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
export const BarterContext = createContext();


const BarterContextProvider = (props) => {

 const [barters, setstate] = useState();
 const [barterStatus, setBarterStatus] = useState();

 const fetchBarters = async () => {
  const res = await fetch("/map/Barters", {
   crossDomain: true
  })

  return res.json();
 }
 const bartersQuery = useQuery('Barters', fetchBarters);

 useEffect(() => {
  if (bartersQuery.status === "success") {
   setstate(bartersQuery.data);
  }
  setBarterStatus(bartersQuery.status);
  console.log("Barters", barters)
  console.log("BarterStatus", barterStatus)
 }, [bartersQuery, barters, barterStatus])

 return (
  <BarterContext.Provider value={{ barters, barterStatus }}>
   {props.children}
  </BarterContext.Provider>
 )

}

export default BarterContextProvider
