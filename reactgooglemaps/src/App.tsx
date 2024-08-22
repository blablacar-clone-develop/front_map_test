import "./styles/main.css";

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home.tsx";
import ShowPick from "./pages/ShowPick.tsx";
import ShowPickFromMap from "./pages/ShowPickfromMap.tsx";


function App() {


  return (
      <div className="App">
              <Router>
                  <Routes>
                      <Route path="/" element={<Home/>}/>
                      <Route path="/showpick" element={<ShowPick/>}/>
                      <Route path="/showpickfrommap" element={<ShowPickFromMap/>}/>

                  </Routes>
              </Router>

      </div>
  )
}

export default App
