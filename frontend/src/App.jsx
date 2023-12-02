import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';

import HomeView from './views/HomeView';
import RegisterView from './views/RegisterView';
import AccountView from './views/AccountView';
import LoginView from './views/LoginView';
import PasswordView from './views/PasswordView';
import AdminView from "./views/AdminView";
import UserView from "./views/UserView";
import HelpView from "./views/HelpView";
import LogoutView from "./views/LogoutView";
import {useState} from "react";
import {session} from "./services/tokenService";


const App = () => {

    useState(async () =>{
        //Cierra sesión si ha pasado 30 min.
        //La configuración está en el backend
        //TODO: backend/utils/handleToken
        if (localStorage.getItem("authToken")) {
            if (session()) {
                localStorage.removeItem("authToken");
                localStorage.removeItem("CurrentoDate");
                window.location.reload();
            }
        }
    });

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/" element={<HomeView/>}/>
                    <Route exact path="/register" element={<RegisterView/>}/>
                    <Route exact path="/account/:id" element={<AccountView/>}/>
                    <Route exact path="/login" element={<LoginView/>}/>
                    <Route exact path="/Password" element={<PasswordView/>}/>
                    <Route exact path="/Admin" element={<AdminView/>}/>
                    <Route exact path="/Help" element={<HelpView/>}/>
                    <Route exact path="/User" element={<UserView/>}/>
                    <Route exact path="/logout" element={<LogoutView/>}/>
                </Routes>
            </Router>
        </div>
    )
}

export default App;