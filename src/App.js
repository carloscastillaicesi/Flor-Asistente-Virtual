import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeGuest from './components/HomeGuest';
import HomeUsers from './components/HomeUsers';
import UserContext from "./contexts/UserContext";
import SettingContext from "./contexts/SettingContext";
import MapView from './components/MapView';
import MenuComponent from "./components/Menu-Components/MenuComponent";
import { QueryClient, QueryClientProvider } from 'react-query'




function App() {
    //reference to element being toggled into and out of fullscreen
    const queryClient = new QueryClient()

    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <SettingContext>
                    <UserContext>
                        <BrowserRouter>
                            <Switch>
                                <Route path="/user/:userid">
                                    <HomeUsers />
                                </Route>
                                <Route path="/menu">
                                    <MenuComponent />
                                </Route>
                                <Route path="/map">
                                    <MapView />
                                </Route>
                                <Route path="/map/guest">
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
                </SettingContext>
            </QueryClientProvider>
        </div >
    );
}

export default App;