import { useState } from "react";
import Inicio from "./components/Inicio/Inicio";
import {BrowserRouter,HashRouter,Routes,Route,NavLink,Router} from "react-router-dom";
import Registrarse from "./components/Registrarse/Registrarse";
import Login from "./components/Login/Login";
import InicioLogin from "./components/InicioLogin/InicioLogin";
import "./App.css"
function App() {
  const usuario = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {};
  const [user,setUser] = useState(usuario);
  return (
    <div>
      <HashRouter >
        <Routes >
          <Route exact path="/" element={<Inicio user={user}/>}/>
          <Route exact path="/inicio" element={<Inicio user={user}/>}/>
          <Route exact path="/registrarTutor" element={<Registrarse user={user} tipoRegistro="Tutor"/>}/>
          <Route exact path="/registrarEstudiante" element={<Registrarse user={user} tipoRegistro="Estudiante"/>}/>
          <Route exact path="/login" element={<Login setUser={setUser} user={user}/>}/>
          <Route exact path="/logininicio/*" element={<InicioLogin setUser={setUser} user={user}/>}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
