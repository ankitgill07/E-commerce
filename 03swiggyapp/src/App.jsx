import { BrowserRouter ,Routes , Route } from "react-router-dom"
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import FoodDetialys from "./components/foodDetialy/FoodDetialys"
import {useSelector} from "react-redux"
import { useState } from "react"
import { Coordinates } from "./context/ContextApi"
import SearchRes from "./components/search/SearchRes"
import Card from "./components/addCard/Card"

function App() {
  const [coord , setCoord] = useState({lat : 28.5355161 , lng : 77.3910265})

  const visiable = useSelector((state) => state.togglSlice.sreachBarToggle)
  const loginButton = useSelector((state) => state.togglSlice.loginToggle)
  return (
    <Coordinates.Provider value={{ coord, setCoord}}>
    <div className={"" + (visiable || loginButton  ? "max-h-screen overflow-hidden " : "")}>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/search" element={<SearchRes/>}/>
        <Route path="/checkout" element={<Card/>}/>
        <Route path="/city/:id" element={<FoodDetialys/>}/>
      </Routes> 
    </BrowserRouter>
    </div>
    </Coordinates.Provider>
  )
}

export default App
