//Importamos paquetes.
import React, { useEffect } from "react";
import {useLocation} from "react-router-dom"
import {useNavigate} from "react-router";

//Importamos componentes.
import Navbar from "../components/layout/NavBar";
import BlogUser from "../components/user/blogUser";
import PerfilUser from "../components/user/perfilUser";
import {sweetAlert} from "../services/authService";
import ReserveUser from "../components/user/reserveUser";


//Contenido del componente (Login) que vamos a exportar.
const UserView = () => {

    //Nos permite saber el "Hash" de la url para saber que página mostrar
    const sampleLocation = useLocation();
    //Uso del método navigate para introducirlo en una variable.
    //@Navigate es un paquete react-router-do que permite navegar entre páginas y redirigirse a la página deseada.
    const navigate = useNavigate();

    //Uso de los efectos
    //Estos efectos se produce al iniciar la página o algún cambio en ella
    useEffect(() => {
        const fetchData = async () => {
            // Comunicación con el DOM para el correcto manejo del "dashboard"
            const toggle = document.querySelector(".toggle");
            const menuDashboard = document.querySelector(".menu-dashboard");
            const iconoMenu = toggle.querySelector("i");
            const enlacesMenu = document.querySelectorAll(".enlace");

        //Condicional que nos obtiene el "hash" de la página y nos muestra la página deseada
        //Ejemplo: TODO:https://google/use#perfil --> #perfil

        //Perfil
        if (sampleLocation.hash === "#perfil") {
            document.getElementById("wrapper-crearBlog").style.display = "none";
            document.getElementById("wrapper-perfilUser").style.display = "block";
            document.getElementById("blogs").style.display = "none";
            document.getElementById("wrapper-Blog").style.display = "none";

            //Blog
        } else if (sampleLocation.hash === "#blog") {
            document.getElementById("wrapper-crearBlog").style.display = "none";
            document.getElementById("wrapper-perfilUser").style.display = "none";
            document.getElementById("blogs").style.display = "block";
            document.getElementById("wrapper-Blog").style.display = "none";
            //Al no tener ningún "hash" de los anteriores
        } else if (sampleLocation.hash === "#reserva") {
            document.getElementById("wrapper-crearBlog").style.display = "none";
            document.getElementById("wrapper-perfilUser").style.display = "none";
            document.getElementById("blogs").style.display = "none";
            document.getElementById("wrapper-Blog").style.display = "none"
            document.getElementById("main-reserve-user").style.display = "block";
        } else {
            document.getElementById("wrapper-crearBlog").style.display = "none";
            document.getElementById("wrapper-perfilUser").style.display = "none";
            document.getElementById("blogs").style.display = "none";
            document.getElementById("wrapper-Blog").style.display = "none";

        }

        //Obtenemos el token de inicio de sesión, sino ha iniciado sesión lo enviamos a la página de inicio
        if (!localStorage.getItem("authToken")) {
            await sweetAlert("Acceso no permitido", "Usted tiene que iniciar sesión para configurar su perfil", "error")
            navigate("/login");
        }

        //Comunicación con el DOM para poder abrir y cerrar el "dashboard"(barra lateral)
        toggle.addEventListener("click", () => {
            menuDashboard.classList.toggle("open")

            if (iconoMenu.classList.contains("bx-menu")) {
                iconoMenu.classList.replace("bx-menu", "bx-x")
            } else {
                iconoMenu.classList.replace("bx-x", "bx-menu")
            }
        })

        enlacesMenu.forEach(enlace => {
            enlace.addEventListener("click", () => {
                menuDashboard.classList.add("open")
                iconoMenu.classList.replace("bx-menu", "bx-x")
            });
        });
    };

    fetchData();
}, []);

    //Función que obtiene el nombre de las "props" para poder mostrar y esconder el "DOM" a nuestro antojo
    const sendClick = (name) => {
        //Blog
        if (name === "Blog") {
            document.getElementById("main-reserve-user").style.display = "none";
            document.getElementById("wrapper-crearBlog").style.display = "none";
            document.getElementById("wrapper-Blog").style.display = "none";
            document.getElementById("wrapper-perfilUser").style.display = "none";
            document.getElementById("blogs").style.display = "block";
            //Perfil
        } else if (name === "Perfil") {
            document.getElementById("main-reserve-user").style.display = "none";
            document.getElementById("wrapper-crearBlog").style.display = "none";
            document.getElementById("wrapper-perfilUser").style.display = "block";
            document.getElementById("blogs").style.display = "none";
            document.getElementById("wrapper-Blog").style.display = "none";
            //Si no es ninguno de los 2 anteriores
        } else if (name === "Reserva") {
            document.getElementById("wrapper-crearBlog").style.display = "none";
            document.getElementById("wrapper-perfilUser").style.display = "none";
            document.getElementById("blogs").style.display = "none";
            document.getElementById("wrapper-Blog").style.display = "none";
            document.getElementById("main-reserve-user").style.display = "block";

        } else {
            document.getElementById("main-reserve-user").style.display = "none";
            document.getElementById("wrapper-crearBlog").style.display = "none";
            document.getElementById("wrapper-perfilUser").style.display = "none";
            document.getElementById("blogs").style.display = "none";
            document.getElementById("wrapper-Blog").style.display = "none";
        }
    }

    //Al darle a salir
    const salir = (e) => {
        e.preventDefault();
        navigate("/logout");
    }

    //Código JSX(JS + HTML = XML) que se retorna para presentarlo en pantalla.
    return (
        <>
            <Navbar name="usuario"/>
            <div className="caja">
                <div className="menu-dashboard">
                    <div className="top-menu">

                        <div className="logo">
                            <span>Jorge</span>
                        </div>
                        <div className="toggle">
                            <i className='bx bx-menu'></i>
                        </div>
                    </div>
                    <div className="menu">
                        {/*Función que envía el "props" al darle click*/}
                        <div onClick={() => {
                            sendClick("Perfil");
                        }} id="perfil" className="enlace">
                            <i className="bx bx-grid-alt"></i>
                            <span>Perfil</span>
                        </div>
                        {/*Función que envía el "props" al darle click*/}
                        <div onClick={() => {
                            sendClick("Blog");
                        }}
                             className="enlace">
                            <i className="bx bx-user"></i>
                            <span>Blogs</span>
                        </div>
                        <div onClick={() => {
                            sendClick("Reserva");
                        }}
                             className="enlace">
                            <i className="bx bx-message-square"></i>
                            <span>Reservas</span>
                        </div>
                        {/*Función que envía el "props" al darle click*/}
                        <div onClick={(e) => salir(e)}
                             className="enlace">
                            <i className="bx bx-exit"></i>
                            <span>Salir</span>
                        </div>

                    </div>
                </div>
                <div className="containerUser">
                    <div className="stars">
                        <div id="stars"></div>
                        <div id="stars2"></div>
                        <div id="stars3"></div>
                    </div>
                    {/*Componentes que ha sido importados*/}
                    <PerfilUser/>
                    <BlogUser/>
                    <ReserveUser/>
                </div>
            </div>
        </>)
};

//Exportamos el UserView.
export default UserView;
