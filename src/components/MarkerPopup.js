import React, { useEffect, useState } from "react";
import * as ReactLeaflet from "react-leaflet";
import Peek from "./Peek";
import AboutMe from "./AboutMe";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
const { Popup } = ReactLeaflet;
export default function MarkerPopup({ open, setOpen, position, name, pic, gallery }) {



 const [state, setPage] = useState(false)
 const history = useHistory();


 useEffect(() => {
  if (state) {
   history.push("/map");
   setPage(false);
  }
 }, [state, history])


 function handleOpen() {
  setTimeout(() => {
   setOpen(false);
   console.log("Cerró")
  }, 100);

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
     <Route strict exact path="/map">
      <Peek position={position} name={name} pic={pic} />
     </Route>
     <Route path="/map/aboutme">
      <AboutMe name={name} pic={pic} gallery={gallery} />
     </Route>
     <Route path="/map/aboutme">
      <AboutMe />
     </Route>
    </Switch>
   </Router>
  </Popup>
 );
}
