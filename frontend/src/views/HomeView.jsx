import Navbar from '../components/layout/NavBar';
import Home from '../components/home/Home';
import About from '../components/home/About';
import Package from '../components/home/Package';
import Service from '../components/home/Service';
import Monitor from '../components/home/Monitor';
import Gallery from '../components/home/Gallery';
import Blog from '../components/home/Blog';
import Button from '../components/home/Button';
import Footer from "../components/layout/Footer";

import AOS from 'aos';
import {useEffect} from "react";
import jwt_decode from "jwt-decode";
import {changeHelp, getHelps} from "../services/helpService";
import {sweetAlertMessage} from "../services/authService";
import {useNavigate} from "react-router";
import {session} from "../services/tokenService";



const HomeView = () => {
    const navigate = useNavigate();



    useEffect(async () => {

        if (localStorage.getItem("authToken")) {
            if (session()) {
                localStorage.removeItem("authToken");
                localStorage.removeItem("CurrentoDate");
                window.location.reload();
            }
        }



        AOS.init({
            duration: 800, offset: 200,
        });
        const ayuda = await getHelps();
        if (localStorage.getItem("authToken")) {
            let token = localStorage.getItem("authToken");
            let decodedToken = jwt_decode(token);
/*

 */

            if (decodedToken.role === "ADMIN") {
                if (ayuda) {
                    ayuda.data.map(async help => {
                        if (help.nuevo === true) {
                            const result = await sweetAlertMessage();
                            await changeHelp();
                            if (result === true) navigate("/Admin#message")

                        }
                    })
                }
            }

        }


    }, );

    document.addEventListener("DOMContentLoaded", function () {
        setTimeout(function () {
            AOS.refresh();
        }, 500);
    });

    return (
        <div>
            <Navbar/>
            <Home/>
            <section>
                <About/>
                <Package/>
                <Service/>
                <Monitor/>
                <Gallery/>
                <Blog/>
                <Button/>
            </section>
            <Footer/>
        </div>
    )
}

export default HomeView

