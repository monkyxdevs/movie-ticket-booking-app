import {BrowserRouter as Router,Routes,Route } from "react-router-dom"
import { Signin } from "./Signin"
import { Signup } from "./Signup"
import { HomePage } from "./HomePage"

function App() {

  return (
  <Router>
    <Routes>
      <Route path="/home" element={<HomePage/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
  </Router>
  
  )
}

export default App
