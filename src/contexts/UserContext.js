import React, { createContext, Component } from "react";

export const UserContext = createContext();


class UserContextProvider extends Component {
  state = {
    _id: '',
    name: '',
    geometry: { lat: '', lng: '' },
    current: { lat: 3.4194719680257584, lng: -76.52423502012975 },
    pic: '',
    level: 0,
    auth: false,
  }

  toggleAuth = (user) => {
    return user === this.state.user ? true : false
  }

  userData = (data) => {
    this.setState({
      _id: data._id,
      name: data.name,
      geometry: data.geometry,
      pic: data.pic,
      level: data.level,
      current: data.current ? data.current : this.state.current,
      auth: true,
    })
  }

  setCurrentLocation = (data) => {
    this.setState({
      ...this.state, current: data
    })
  }

  setCurrentUserLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(this.state))
  }



  render() {
    return (
      <UserContext.Provider value={{ ...this.state, toggleAuth: this.toggleAuth, userData: this.userData, setCurrentLocation: this.setCurrentLocation, setCurrentUserLocalStorage: this.setCurrentUserLocalStorage }}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default UserContextProvider
