import React, { createContext, Component } from "react";

export const SettingContext = createContext();


class SettingContextProvider extends Component {

 state = {
  fullScreenMode: '',
  modal: false
 }
 toggleFullscreen = (e) => {
  this.setState({ fullScreenMode: e })
 }
 toggleModal = () => {
  this.setState({ modal: !this.state.modal })
 }
 setModal = (b) => {
  this.setState({ modal: b })
 }

 render() {
  return (
   <SettingContext.Provider value={{ ...this.state, toggleFullscreen: this.toggleFullscreen, toggleModal: this.toggleModal, setModal: this.setModal }}>
    {this.props.children}
   </SettingContext.Provider>
  )
 }
}

export default SettingContextProvider
