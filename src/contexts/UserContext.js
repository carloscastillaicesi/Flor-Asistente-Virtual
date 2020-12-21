import React, { createContext, Component } from "react";

export const UserContext = createContext();


class UserContextProvider extends Component {
  state = {
    _id: '',
    name: '',
    geometry: { lat: '', lng: '' },
    current: { lat: 3.4194719680257584, lng: -76.52423502012975 },
    pic: '',
    stage: 0,
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
      stage: data.stage,
      auth: true,
    })


  }

  setCurrentLocation = (data) => {
    this.setState({
      ...this.state, current: data
    })


  }
  render() {
    return (
      <UserContext.Provider value={{ ...this.state, toggleAuth: this.toggleAuth, userData: this.userData, setCurrentLocation: this.setCurrentLocation }}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default UserContextProvider
