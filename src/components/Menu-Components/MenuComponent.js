import React, { useState, useContext } from 'react'
import { useHistory, Route } from "react-router-dom";
import florLogo from "../../assets/flor-logo-topbar-menu.png";
import Modal from "../Modal";
import Exchange from "./MenuExchange";
import Library from "./MenuLibrary";
import MenuFirst from "./MenuFirst";
import LibraryCategory from "./LibraryCategory";
import { SettingContext } from "../../contexts/SettingContext";
function MenuComponent() {
  const history = useHistory();
  const [userInfo] = useState({
    "users":
      [{
        name: "Orbay Beltrán",
        pic: "https://i.ibb.co/8g5YNwy/orbay.png",
        documentos: [{
          nombre: "Sistema de Uso de la tierra en Trópico",
          url: "http://www.fao.org/3/a-x4590s.pdf",
          categorias: ["Abonos", "Siembra"]
        }, {
          nombre: "Manual de Agricultura Tropical",

          url: "https://repository.eafit.edu.co/xmlui/bitstream/handle/10784/804/0709_1896.pdf;jsessionid=0A154852439875F95711BEEC01633F46?sequence=2",
          categorias: ["Plagas/Enfermedades", "Terreno"]
        }], tengo: [{
          nombre: "Abono Orgánico",
          descripcion: "Tengo 4 kg de este abono si alguien lo quiere tomar contacteme",
          fotos: ["https://www.jardineriaon.com/wp-content/uploads/2011/11/abono-1-1024x768.jpg"],
          categorias: ["Abonos Orgánicos", "Humus"]
        }, {
          nombre: "Semillas de Tomate",
          descripcion: "Intercambio estas semillas de tomate",
          opciones: "Quiero intercambiarlo por una llanta",
          fotos: ["https://i2.wp.com/infoagro.com.ar/wp-content/uploads/2019/09/Semillas-de-tomate-criollos-5.png?fit=998%2C636&ssl=1", "https://i2.wp.com/infoagro.com.ar/wp-content/uploads/2019/09/Semillas-de-tomate-criollos-5.png?fit=998%2C636&ssl=1", "https://i2.wp.com/infoagro.com.ar/wp-content/uploads/2019/09/Semillas-de-tomate-criollos-5.png?fit=998%2C636&ssl=1", "https://i2.wp.com/infoagro.com.ar/wp-content/uploads/2019/09/Semillas-de-tomate-criollos-5.png?fit=998%2C636&ssl=1", "https://i2.wp.com/infoagro.com.ar/wp-content/uploads/2019/09/Semillas-de-tomate-criollos-5.png?fit=998%2C636&ssl=1"],
          categorias: ["Abonos Orgánicos", "Clima Tropical"]
        }], necesito: [{
          nombre: "Semilla de Aguacate",
          descripcion: "Ando Buscando semillas de aguacate",
          fotos: ["https://www.jardineriaon.com/wp-content/uploads/2011/11/abono-1-1024x768.jpg"],
          categorias: ["Abonos Orgánicos", "Humus"]
        }, {
          nombre: "Polisombra",
          descripcion: "Intercambio estas semillas de tomate",
          fotos: ["https://i2.wp.com/infoagro.com.ar/wp-content/uploads/2019/09/Semillas-de-tomate-criollos-5.png?fit=998%2C636&ssl=1"],
          categorias: ["Abonos Orgánicos", "Clima Tropical"]
        }]
        , plantas: [{
          nombre: "Tomate",
          descripcion: "Esta es mi planta de tomate. Me gusta mucho",
          fotos: ["https://www.harrodhorticultural.com/uploads/images/products/GWT-427_Tomato_Plant_Halos_1.jpg"],
          categorias: ["Fruta", "Verdura"]
        }, {
          nombre: "Tomat1",
          descripcion: "Esta es mi planta de tomate. Me gusta mucho",
          fotos: ["https://www.harrodhorticultural.com/uploads/images/products/GWT-427_Tomato_Plant_Halos_1.jpg"],
          categorias: ["Fruta", "Verdura"]
        }]
      }, {
        name: "Maria del Mar",
        pic: "https://i.ibb.co/3k2zwdp/mariadelmar.png",
        documentos: [{
          nombre: "Sistema de Uso de la tierra en Trópico",
          url: "http://www.fao.org/3/a-x4590s.pdf",
          categorias: ["Abonos", "Trópico"]
        }, {
          nombre: "Manual de Agricultura Tropical",
          url: "https://repository.eafit.edu.co/xmlui/bitstream/handle/10784/804/0709_1896.pdf;jsessionid=0A154852439875F95711BEEC01633F46?sequence=2",
          categorias: ["Abonos", "Clima Tropical"]
        }]
      }, {
        name: "Daniel Manso",
        pic: "https://i.ibb.co/bRzNkCK/daniel.png",
        documentos: [{
          nombre: "Sistema de Uso de la tierra en Trópico",
          url: "http://www.fao.org/3/a-x4590s.pdf",
          categorias: ["Abonos", "Trópico"]
        }, {
          nombre: "Manual de Agricultura Tropical",
          url: "https://repository.eafit.edu.co/xmlui/bitstream/handle/10784/804/0709_1896.pdf;jsessionid=0A154852439875F95711BEEC01633F46?sequence=2",
          categorias: ["Cultivo", "Clima Tropical"]
        }]
      }, {
        name: "Alexander Gómez",
        pic: "https://i.ibb.co/vDk43hb/alexander.png",
        documentos: [{
          nombre: "Sistema de Uso de la tierra en Trópico",
          url: "http://www.fao.org/3/a-x4590s.pdf",
          categorias: ["Abonos", "Trópico"]
        }, {
          nombre: "Manual de Agricultura Tropical",
          url: "https://repository.eafit.edu.co/xmlui/bitstream/handle/10784/804/0709_1896.pdf;jsessionid=0A154852439875F95711BEEC01633F46?sequence=2",
          categorias: ["Cultivo", "Clima Tropical"]
        }]
      }, {
        name: "Carlos Castilla",
        documentos: [{
          nombre: "Sistema de Uso de la tierra en Trópico",
          url: "http://www.fao.org/3/a-x4590s.pdf",
          categorias: ["Abonos", "Trópico"]
        }, {
          nombre: "Manual de Agricultura Tropical",
          url: "https://repository.eafit.edu.co/xmlui/bitstream/handle/10784/804/0709_1896.pdf;jsessionid=0A154852439875F95711BEEC01633F46?sequence=2",
          categorias: ["Cultivo", "Clima Tropical"]
        }]
      }
      ]
  });
  const { modal, toggleModal } = useContext(SettingContext);
  function goBack() {
    history.goBack();
  }

  return (
    <div className="component-menu">

      <div className="top-bar-menu-component">
        <div onClick={goBack.bind()} class="arrow-icon">
          <div class="arrow" />
        </div>
        <h3>Sembrando Vida</h3>
        <img src={florLogo} alt="logoFlor" />
      </div>
      <div className="component-menu-content">
        {modal ? <Modal /> : ""}

        <Route path="/menu/exchange">
          <Exchange />
        </Route>
        <Route path="/menu/library/:category">
          <LibraryCategory users={userInfo.users} />
        </Route>
        <Route strict exact path="/menu/library">
          <Library users={userInfo.users} />
        </Route>
        <Route strict exact path="/menu">
          <MenuFirst />
        </Route>


      </div>
    </div>
  )
}

export default MenuComponent 