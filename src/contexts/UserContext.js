import React, { createContext, Component } from "react";

export const UserContext = createContext();


class UserContextProvider extends Component {
  state = {
    user: '123456',
    name: '',
    geometry: { lat: '', lng: '' },
    pic: '',
    stage: 0,
    auth: false,
  }
  toggleAuth = (user) => {
    return user === this.state.user ? true : false
  }

  userData = (data) => {
    this.setState({
      name: data.name,
      geometry: data.geometry,
      pic: '',
      stage: data.stage,
      auth: true,
    })

  }
  render() {
    return (
      <UserContext.Provider value={{ ...this.state, toggleAuth: this.toggleAuth, userData: this.userData }}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

export default UserContextProvider
