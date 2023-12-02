
import {useEffect} from "react";
import Navbar from "../components/layout/NavBar";
import UserAdmin from "../components/admin/userAdmin";
import MonitorAdmin from "../components/admin/monitorAdmin";
import PackageAdmin from "../components/admin/packageAdmin";
import ReserveAdmin from "../components/admin/reserveAdmin";
import HelpAdmin from "../components/admin/helpAdmin";
import {sweetAlert} from "../services/authService";
import {useNavigate} from "react-router";
import jwt_decode from "jwt-decode";
import {useLocation} from "react-router-dom";


const AdminView = () => {
    const navigate = useNavigate();
    const sampleLocation = useLocation();

    useEffect(async () => {

        if (!localStorage.getItem("authToken")) {
            await sweetAlert("Acceso no permitido", "Usted tiene que iniciar sesión para configurar su perfil", "error")
            navigate("/");
        } else if (localStorage.getItem("authToken")) {
            let token = localStorage.getItem("authToken");
            let decodedToken = jwt_decode(token);
            if (decodedToken.role !== "ADMIN") {
                await sweetAlert("Acceso no permitido", "Este sitio es solo para administradores", "error")
                navigate("/")
            }
        }

        const toggle = document.querySelector(".toggle");
        const menuDashboard = document.querySelector(".menu-dashboard")
        const iconoMenu = toggle.querySelector("i")
        const enlacesMenu = document.querySelectorAll(".enlace")


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
            })
        })

        if (sampleLocation.hash === "#message") {
            document.getElementById("wrapper-help").style.display = "none";
            document.getElementById("wrapper-reserve").style.display = "none";
            document.getElementById("containerBoxMonitores").style.display = "none";
            document.getElementById("adminPackages").style.display = "none";
            document.getElementById("wrapper-PackageAdmin").style.display = "none";
            document.getElementById("containerBoxPackages").style.display = "none";
            document.getElementById("boxPackage1").style.display = "none";
            document.getElementById("boxPackage2").style.display = "none";
            document.getElementById("main-container").style.display = "none";
            document.getElementById("wrapper-Package").style.display = "none";
            document.getElementById("containerBoxMonitoresReserves").style.display = "none";
            document.getElementById("adminReserve").style.display = "none";
            document.getElementById("containerBoxMonitoresReserves").style.display = "none";
            document.getElementById("adminReserve").style.display = "none";
            document.getElementById("container-help").style.display = "block";
        }


    }, []);

    //Al darle a salir
    const salir = (e) => {
        e.preventDefault();
        navigate("/logout");
    }



        const sendClick = (name) => {
        if (name === "Monitor") {
            document.getElementById("wrapper-help").style.display = "none";
            document.getElementById("container-help").style.display = "none";
            document.getElementById("wrapper-reserve").style.display = "none";
            document.getElementById("containerBoxMonitoresReserves").style.display = "none";
            document.getElementById("adminReserve").style.display = "none";
            document.getElementById("containerBoxPackages").style.display = "none";
            document.getElementById("wrapper-Monitor").style.display = "none";
            document.getElementById("wrapper-adminMonitor").style.display = "none";
            document.getElementById("adminMonitor").style.display = "none";
            document.getElementById("containerBoxMonitores").style.display = "flex";
            document.getElementById("box1").style.display = "block";
            document.getElementById("box2").style.display = "block";
            document.getElementById("main-container").style.display = "none";
            document.getElementById("wrapper-adminUser").style.display = "none";
            document.getElementById("wrapper-Mensaje").style.display = "none";
            document.getElementById("formEdit").style.display = "none";
            document.getElementById("containerBoxPaquetes").style.display = "none";
            document.getElementById("wrapper-Monitor").style.display = "none";




        } else if (name === "Mensaje") {
            document.getElementById("wrapper-help").style.display = "none";
            document.getElementById("container-help").style.display = "none";
            document.getElementById("wrapper-reserve").style.display = "none";
            document.getElementById("wrapper-Monitor").style.display = "none";
            document.getElementById("containerBoxMonitoresReserves").style.display = "none";
            document.getElementById("adminReserve").style.display = "none";
            document.getElementById("containerBoxPaquetes").style.display = "flex";
            document.getElementById("main-container").style.display = "none";
            document.getElementById("containerBoxMonitores").style.display = "none";
            document.getElementById("formEdit").style.display = "none";
            document.getElementById("wrapper-Monitor").style.display = "none";


        } else if (name === "Usuario") {
            document.getElementById("wrapper-help").style.display = "none";
            document.getElementById("container-help").style.display = "none";
            document.getElementById("wrapper-reserve").style.display = "none";
            document.getElementById("containerBoxPackages").style.display = "none";
            document.getElementById("containerBoxMonitoresReserves").style.display = "none";
            document.getElementById("adminReserve").style.display = "none";
            document.getElementById("containerBoxMonitores").style.display = "none";
            document.getElementById("main-container").style.display = "block";
            document.getElementById("wrapper-adminUser").style.display = "none";
            document.getElementById("formEdit").style.display = "none";
            document.getElementById("wrapper-Monitor").style.display = "none";
            document.getElementById("wrapper-Mensaje").style.display = "none";
            document.getElementById("containerBoxPaquetes").style.display = "none";
            document.getElementById("wrapper-Monitor").style.display = "none";
            document.getElementById("wrapper-adminMonitor").style.display = "none";

        } else if (name === "Paquetes") {
            document.getElementById("wrapper-help").style.display = "none";
            document.getElementById("container-help").style.display = "none";
            document.getElementById("wrapper-reserve").style.display = "none";
            document.getElementById("containerBoxMonitores").style.display = "none";
            document.getElementById("wrapper-adminUser").style.display = "none";
            document.getElementById("adminPackages").style.display = "none";
            document.getElementById("wrapper-PackageAdmin").style.display = "none";
            document.getElementById("containerBoxPackages").style.display = "flex";
            document.getElementById("boxPackage1").style.display = "block";
            document.getElementById("boxPackage2").style.display = "block";
            document.getElementById("main-container").style.display = "none";
            document.getElementById("wrapper-Package").style.display = "none";
            document.getElementById("containerBoxMonitoresReserves").style.display = "none";
            document.getElementById("adminReserve").style.display = "none";


        } else if (name === "Reservas") {
            document.getElementById("wrapper-help").style.display = "none";
            document.getElementById("container-help").style.display = "none";
            document.getElementById("wrapper-reserve").style.display = "none";
            document.getElementById("containerBoxMonitores").style.display = "none";
            document.getElementById("adminPackages").style.display = "none";
            document.getElementById("wrapper-PackageAdmin").style.display = "none";
            document.getElementById("containerBoxPackages").style.display = "none";
            document.getElementById("boxPackage1").style.display = "none";
            document.getElementById("boxPackage2").style.display = "none";
            document.getElementById("main-container").style.display = "none";
            document.getElementById("wrapper-Package").style.display = "none";
            document.getElementById("containerBoxMonitoresReserves").style.display = "none";
            document.getElementById("adminReserve").style.display = "none";
            document.getElementById("containerBoxMonitoresReserves").style.display = "flex";
            document.getElementById("adminReserve").style.display = "block";



        }  else if (name === "Mensajes") {
            document.getElementById("wrapper-help").style.display = "none";
            document.getElementById("wrapper-reserve").style.display = "none";
            document.getElementById("containerBoxMonitores").style.display = "none";
            document.getElementById("adminPackages").style.display = "none";
            document.getElementById("wrapper-PackageAdmin").style.display = "none";
            document.getElementById("containerBoxPackages").style.display = "none";
            document.getElementById("boxPackage1").style.display = "none";
            document.getElementById("boxPackage2").style.display = "none";
            document.getElementById("main-container").style.display = "none";
            document.getElementById("wrapper-Package").style.display = "none";
            document.getElementById("containerBoxMonitoresReserves").style.display = "none";
            document.getElementById("adminReserve").style.display = "none";
            document.getElementById("containerBoxMonitoresReserves").style.display = "none";
            document.getElementById("adminReserve").style.display = "none";
            document.getElementById("container-help").style.display = "block";




    } else {
            document.getElementById("wrapper-help").style.display = "none";
            document.getElementById("container-help").style.display = "none";
            document.getElementById("wrapper-reserve").style.display = "none";
            document.getElementById("containerBoxMonitores").style.display = "none";
            document.getElementById("adminPackages").style.display = "none";
            document.getElementById("wrapper-PackageAdmin").style.display = "none";
            document.getElementById("containerBoxPackages").style.display = "none";
            document.getElementById("boxPackage1").style.display = "none";
            document.getElementById("boxPackage2").style.display = "none";
            document.getElementById("main-container").style.display = "none";
            document.getElementById("wrapper-Package").style.display = "none";
            document.getElementById("containerBoxMonitoresReserves").style.display = "none";
            document.getElementById("adminReserve").style.display = "none";
            document.getElementById("containerBoxMonitoresReserves").style.display = "none";
            document.getElementById("adminReserve").style.display = "none";

        }
    }



    return (
        <>
            <Navbar name="administrador"/>
            <div className="cajas">
                <div className="menu-dashboard">
                    <div className="top-menu">
                        <div className="logo">
                            <span>ADMINISTRADOR </span>
                        </div>
                        <div className="toggle">
                            <i className='bx bx-menu'></i>
                        </div>
                    </div>
                    <div className="menu">
                        <div className="enlace" onClick={() => {
                            sendClick("Usuario");
                        }}>
                            <i className="bx bx-grid-alt"></i>
                            <span>Usuarios</span>
                        </div>

                        <div onClick={() => {
                            sendClick("Monitor");
                        }}
                             className="enlace">
                            <i className="bx bx-user"></i>
                            <span>Monitores</span>
                        </div>


                        <div onClick={() => {
                            sendClick("Paquetes");
                        }} className="enlace">
                            <i className="bx bx-message-square"></i>
                            <span>Paquetes</span>
                        </div>

                        <div onClick={() => {
                            sendClick("Reservas");
                        }} className="enlace">
                            <i className="bx bx-file-blank"></i>
                            <span>Reservas</span>
                        </div>
                        <div onClick={() => {
                            sendClick("Mensajes");
                        }} className="enlace">
                            <i className="bx bx-message-square"></i>
                            <span>Mensajes</span>
                        </div>
                        <div onClick={(e) => salir(e)}
                             className="enlace">
                            <i className="bx bx-exit"></i>
                            <span>Salir</span>
                        </div>

                    </div>
                </div>
                <div className="todo">
                    <div className="stars">
                        <div id="stars"></div>
                        <div id="stars2"></div>
                        <div id="stars3"></div>
                    </div>
                    <UserAdmin/>
                    <MonitorAdmin/>
                    <PackageAdmin/>
                    <ReserveAdmin/>
                    <HelpAdmin/>
                </div>
            </div>
        </>

    )
};

//Exportamos el Login.
export default AdminView;
