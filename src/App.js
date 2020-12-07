import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeGuest from './components/HomeGuest';
import HomeUsers from './components/HomeUsers';
import UserContext from "./contexts/UserContext";
import MapView from './components/MapView';


function App() {
    return (
        <UserContext>
            <BrowserRouter>
                <Switch>
                    <Route path="/user/:userid">
                        <HomeUsers />
                    </Route>
                    <Route path="/map">
                        <MapView />
                    </Route>
                    <Route path="/guests">
                        <h1>Guest Map</h1>
                    </Route>
                    <Route path="/usernotfound">
                        <h1>User Not Found</h1>
                    </Route>
                    <Route exact path="/">
                        <HomeGuest />
                    </Route>
                </Switch>
            </BrowserRouter>
        </UserContext>
    );
}

export default App;