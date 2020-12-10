import React, { createContext, Component } from "react";

export const SettingContext = createContext();


class SettingContextProvider extends Component {

 state = {
  fullScreenMode: '',
 }
 toggleFullscreen = (e) => {
  this.setState({ fullScreenMode: e })
 }


 render() {
  return (
   <SettingContext.Provider value={{ ...this.state, toggleFullscreen: this.toggleFullscreen }}>
    {this.props.children}
   </SettingContext.Provider>
  )
 }
}

export default SettingContextProvider
