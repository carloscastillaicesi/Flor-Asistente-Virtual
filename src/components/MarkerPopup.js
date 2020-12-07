import React, { useEffect, useRef, useState } from "react";
import * as ReactLeaflet from "react-leaflet";
import Profile from "./Profile";
import AboutMe from "./AboutMe";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
const { Popup } = ReactLeaflet;
export default function MarkerPopup({ open, setOpen, position }) {

 const [state, setPage] = useState(false)
 const history = useHistory();

 useEffect(() => {
  if (state) {
   history.push("/map");
   setPage(false);
  }
 }, [state])


 function handleOpen() {
  setTimeout(() => {
   setOpen(false);
   console.log("Cerró")
  }, 200);

 }
 function handleClose() {

  setTimeout(() => {
   setOpen(true);
   setPage(true);
   console.log("Abrio")
  }, 200);

 }

 return (
  <Popup autoPan={false} closeButton={false} onClose={handleClose.bind(this)} onOpen={handleOpen.bind(this)}>
   <Router>
    <Switch>
     <Route exact path="/map">
      <Profile position={position} />
     </Route>
     <Route path="/map/aboutme">
      <AboutMe />
     </Route>
    </Switch>
   </Router>
  </Popup>
 );
}
