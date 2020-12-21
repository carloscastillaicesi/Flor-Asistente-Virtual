import React, { useEffect, useState, useContext } from "react";
import Modal from "../components/Modal";
import Peek from "../components/Profile-Components/Peek";
import Gallery from '../components/Profile-Components/Gallery';
import Documents from '../components/Profile-Components/Documents';
import Exchange from "../components/Profile-Components/Exchange";
import Plants from "../components/Profile-Components/Plants";
import Detailed from "./Profile-Components/Detailed/Detailed";
import UserInfo from "../components/Profile-Components/UserInfo";
import Badge from "./Profile-Components/Badge";
import TopProfileBar from "./Profile-Components/TopProfileBar";
import { SettingContext } from "../contexts/SettingContext";
import { Route, useHistory, useLocation } from "react-router-dom";
import * as ReactLeaflet from "react-leaflet";
const { Popup } = ReactLeaflet;

export default function MarkerPopup({ open, setOpen, name, pic, setpickedUserMapView, id }) {

  const history = useHistory();
  let location = useLocation();

  const [state, setPage] = useState(false)
  const { modal, toggleModal } = useContext(SettingContext);

  const [message, setmessage] = useState("Cargando...")
  const [pickedUser, setpickedUser] = useState(false)

  useEffect(() => {
    if (state) {
      history.push("/map");
      setPage(false);
    }
    if (history.action === 'POP') {
      if (location.pathname === '/map') {
        setOpen(true);
        setPage(true);
      }
    }
  }, [state, history, location])

  const [userInfo] = useState({
    "users":
      [
        {
          name: "Orbay Beltrán",
          _id: "5fde9fa8221310a83a32b6bb",
          level: 4,
          gallery: ["https://www.generatormix.com/%2Fimages%2Fplant%2Fhosta-frances-williams.jpg", "https://www.generatormix.com/%2Fimages%2Fplant%2Fenglish-ivy.jpg", "https://www.generatormix.com/%2Fimages%2Fplant%2Fsweetspire%2C-virginia.jpg", "https://www.generatormix.com/%2Fimages%2Fplant%2Fviburnum%2C-snowball.jpg", "generatormix.com/%2Fimages%2Fplant%2Fmoonshadow-euonymus.jpg", "https://www.generatormix.com/%2Fimages%2Fplant%2Fmount-airy-fothergilla.jpg"],
          NoHuertas: 2,
          Conocimiento: "Ecopsicología: Un nuevo campo de estudio y de aplicación-Ecologia profunda(1960- 1970)",
          Experiencia: "Psicología y Gestión Comunitaria",
          Expectativa: "Poder crear mi propio alimento, una alimentacion mas saludable ya que esta libre de quimicos, La idea es ahorrar al no tener que comprar los alimentos y poder vender para obtener ganancias",
          documentos: [{
            nombre: "Sistema de Uso de la tierra en Trópico",
            url: "http://www.fao.org/3/a-x4590s.pdf",
            categorias: ["Abonos", "Trópico"]
          }, {
            nombre: "Manual de Agricultura Tropical",
            url: "https://repository.eafit.edu.co/xmlui/bitstream/handle/10784/804/0709_1896.pdf;jsessionid=0A154852439875F95711BEEC01633F46?sequence=2",
            categorias: ["Cultivo", "Clima Tropical"]
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
          _id: "5fdfdcf82a749924113b7724",
          level: 2,
          gallery: ["https://www.generatormix.com/%2Fimages%2Fplant%2Fsweetspire%2C-virginia.jpg", "https://www.generatormix.com/%2Fimages%2Fplant%2Fviburnum%2C-snowball.jpg", "https://www.generatormix.com/%2Fimages%2Fplant%2Fpurple-fountain-grass.jpg", "https://www.generatormix.com/%2Fimages%2Fplant%2Fmount-airy-fothergilla.jpg"],
          NoHuertas: 3,
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
          name: "Daniel Manso",
          _id: "5fe0048d2a749924113b7725",
          level: 3,
          gallery: ["https://www.generatormix.com/%2Fimages%2Fplant%2Fmoneywort.jpg", "https://www.generatormix.com/%2Fimages%2Fplant%2Fmimosa-tree.jpg", "https://www.generatormix.com/%2Fimages%2Fplant%2Fmoneywort.jpg", "https://www.generatormix.com/%2Fimages%2Fplant%2Fsweetspire%2C-virginia.jpg", "https://www.generatormix.com/%2Fimages%2Fplant%2Fviburnum%2C-snowball.jpg", "https://www.generatormix.com/%2Fimages%2Fplant%2Fpurple-fountain-grass.jpg", "https://www.generatormix.com/%2Fimages%2Fplant%2Fmount-airy-fothergilla.jpg"],
          Expectativa: "Poder crear mi propio alimento, una alimentacion mas saludable ya q esta libre de quimicos, La idea es ahorrar al no tener que comprar los alimentos y poder vender para obtener ganancias",
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
          _id: "5fe0052d2a749924113b7726",
          level: 4,
          gallery: ["https://www.generatormix.com/%2Fimages%2Fplant%2Fvolcano-ruby-garden-phlox.jpg", "https://www.generatormix.com/%2Fimages%2Fplant%2Fpoplar-trees-%28false%29%2C-tulip.jpg"],
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
        // }, {
        //   name: "Carlos Castilla",
        //   level: 3,
        //   gallery: ["https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/houseplants-asplenium-nidus-peperomia-and-fittonia-royalty-free-image-946085220-1557179507.jpg", "https://www.generatormix.com/%2Fimages%2Fplant%2Fmimosa-tree.jpg", "https://www.generatormix.com/%2Fimages%2Fplant%2Fmoneywort.jpg", "https://www.generatormix.com/%2Fimages%2Fplant%2Fvolcano-ruby-garden-phlox.jpg", "https://www.generatormix.com/%2Fimages%2Fplant%2Fpoplar-trees-%28false%29%2C-tulip.jpg"], documentos: [{
        //     nombre: "Sistema de Uso de la tierra en Trópico",
        //     url: "http://www.fao.org/3/a-x4590s.pdf",
        //     categorias: ["Abonos", "Trópico"]
        //   }, {
        //     nombre: "Manual de Agricultura Tropical",
        //     url: "https://repository.eafit.edu.co/xmlui/bitstream/handle/10784/804/0709_1896.pdf;jsessionid=0A154852439875F95711BEEC01633F46?sequence=2",
        //     categorias: ["Cultivo", "Clima Tropical"]
        //   }]
        // }
      ]
  });


  function handleOpen() {
    let userInformation;
    setpickedUserMapView('');
    setTimeout(() => {
      setOpen(false);
      history.push("map/aboutme");
      //picks the user out of the database
      userInformation = userInfo.users.filter((users) => { return users.id === id })[0];
      setpickedUser(userInformation);
      if (!userInformation) {
        setmessage("Hubo un error");
      }
    }, 200);
  }

  function handleClose() {
    setTimeout(() => {
      setOpen(true);
      setPage(true);
      console.log("Cerró")
    }, 200);
  }

  return (
    <Popup autoPan={false} closeButton={false} onClose={handleClose.bind(this)} onOpen={handleOpen.bind(this)} className={open ? "" : "popup"}>

      { modal ? <Modal /> : ""}

      {pickedUser ? "" : <div className="loading-screen-modal"><h1>{message}</h1>
      </div>
      }

      <Route exact path={["/map/aboutme/plants", "/map/aboutme/userinfo", "/map/aboutme/exchange", "/map/aboutme/documents", "/map/aboutme/gallery", "/map/aboutme/detail", "/map/aboutme/badge"]}>
        <TopProfileBar setOpen={setOpen} setPage={setPage} />
      </Route>
      <Route strict exact path="/map/aboutme">
        <Peek name={name} pic={pic} setOpen={setOpen} />
      </Route>

      <Route path="/map/aboutme/badge">
        <Badge
          user={pickedUser}
          name={pickedUser.name}
          pic={pic} />
      </Route>
      <Route path="/map/aboutme/plants">
        <Plants
          user={pickedUser}
          name={pickedUser.name}
          pic={pic} />
      </Route>
      <Route path="/map/aboutme/exchange">
        <Exchange
          user={pickedUser}
          name={pickedUser.name}
          pic={pic}
          setModal={toggleModal} />
      </Route>
      <Route path="/map/aboutme/documents">
        <Documents
          user={pickedUser}
          name={pickedUser.name}
          pic={pic} />
      </Route>
      <Route path="/map/aboutme/gallery">
        <Gallery
          gallery={pickedUser.gallery}
          name={pickedUser.name} />
      </Route>
      <Route path="/map/aboutme/detail">
        <Detailed user={pickedUser} pic={pic} />
      </Route>
      <Route path="/map/aboutme/userinfo">
        <UserInfo user={pickedUser} pic={pic} />
      </Route>
    </Popup>
  );
}
