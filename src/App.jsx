import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import cardback from "./asserts/yugioh/cardback.png"
import deusaarqueria from "./asserts/yugioh/deusaarqueira.jpg"
import magonegro from "./asserts/yugioh/magonegro.jpg"
import dragãobranco from "./asserts/yugioh/dragãobranco.webp"
import espadadaluz from "./asserts/yugioh/espadadaluz.jpg"
import feiticeira from "./asserts/yugioh/feiticeira.jpg"
import gandora from "./asserts/yugioh/gandora.webp"
import maganegra from "./asserts/yugioh/maganegra.jpg"
import yugioh from "./asserts/yugioh/yugioh.jpg"
import math from "./asserts/yugioh/math.webp"






export default function App() {


  const allcards = [

    { front: deusaarqueria, back: cardback, id: 2 },
    { front: magonegro, back: cardback, id: 4 },
    { front: espadadaluz, back: cardback, id: 10 },
    { front: magonegro, back: cardback, id: 5 },
    { front: dragãobranco, back: cardback, id: 7 },
    { front: espadadaluz, back: cardback, id: 11 },
    { front: dragãobranco, back: cardback, id: 8 },
    { front: feiticeira, back: cardback, id: 13 },
    { front: deusaarqueria, back: cardback, id: 1 },
    { front: math, back: cardback, id: 23 },
    { front: feiticeira, back: cardback, id: 14 },
    { front: gandora, back: cardback, id: 16 },
    { front: maganegra, back: cardback, id: 19 },
    { front: maganegra, back: cardback, id: 20 },
    { front: gandora, back: cardback, id: 17 },
    { front: math, back: cardback, id: 22 },
  ]

  const [deck, setdeck] = useState(allcards)
  const [idsaved, setidsaved] = useState([])
  const [cheking, setcheking] = useState(false)
  const [alert, setalert] = useState(false)


  function Player(id) {

    if (idsaved.includes(id) || cheking) return

    const newids = [...idsaved, id]
    setidsaved(newids)

    setdeck((prev) => prev.map((item) => item.id == id ? { ...item, back: item.front, front: item.front } : item))

    if (newids.length % 2 == 0 && newids.length > 0) {
      const [fist, second] = [newids[newids.length - 2], newids[newids.length - 1]]
      setcheking(true)

      if (Math.abs(fist - second) == 1) {
        setcheking(false)
        console.log("é par")
      }

      else {
        setTimeout(() => {
          setcheking(false)
          setdeck((prev) => prev.map((item) => item.id === fist || item.id === second ? { ...item, back: cardback, front: item.front } : item))
        }, 1000);

        setidsaved((prev) => prev.filter((id) => id !== fist && id !== second))
        console.log("não é")
        setTimeout(() => {

        }, 1300)

      }
    }
  }


  if (idsaved.length % 16 == 0 && idsaved.length > 0) {
    setdeck((prev) => prev.map((items) => idsaved.length % 14 == 0 && idsaved.length > 0 ? { ...items, back: cardback, front: items.front } : items))
    setidsaved((prev) => prev.slice(0, 0))
    setalert(true)
    let arrayrandom = [...deck]

    for (let i = arrayrandom.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * (i + 1));
      [arrayrandom[i], arrayrandom[random]] = [arrayrandom[random], arrayrandom[i]]

    }
    setdeck(arrayrandom)
    return setdeck((prev) => prev.map((item) => item ? { ...item, back: cardback, from: item.front } : undefined))
  }

  if (alert) {

    return (
      <div style={{ backgroundImage: `url(${yugioh})`, minHeight: "100vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>

        <Alert className="text-center d-flex flex-column " style={{ backgroundColor: "#792DBC", width: "80%", height: "140px" }} >
          <Alert.Heading className="text-white"> Parabéns, você venceu essa partida.</Alert.Heading>

          <div className="d-flex  justify-content-center align-items-center">  <p className="p-0 mt-3 text-white">
            Está preparado para Jogar outra vez?
          </p>  <button onClick={() => setalert(false)} style={{ fontSize: "12px" }} className=" btn btn-primary ms-2">Jogar</button>  <button style={{ fontSize: "12px" }} className=" ms-2 btn btn-danger">Desistir</button></div>

        </Alert>
      </div>
    )

  }



  return (
    <div style={{ backgroundImage: `url(${yugioh})`, backgroundSize: "cover" }} id="container">


      {deck.map((item) => {
        return (
          <div className="card">
            <img onClick={() => Player(item.id)} src={item.back} alt="card game" />

          </div>)
      })}

    </div>
  )
}