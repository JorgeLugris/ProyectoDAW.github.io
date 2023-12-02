//Importamos componentes
import jwt_decode from "jwt-decode";
import {useEffect, useState} from "react";
import {getUser} from "../../services/userService";


//Al disminuir la página se quita las letras y se pone en modo responsive
const menu = () => {
    document.querySelector('.header .navbar').classList.toggle('active');
    document.querySelector('.navbar').style.display = 'block';
}

//Al disminuir la página se quita las letras y se pone en modo responsive
const menuToggle = () => {
    const toggleMenu = document.querySelector('.menu');
    toggleMenu.classList.toggle('active');
}

//Se pasa como parámetro una "props" para que el navbar vaya cambiando dependiendo de las páginas
const NavBarEleccion = (props) => {

    const [user, setUser] = useState([]);
    const [role, setRole] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem("authToken")) {
                const token = localStorage.getItem("authToken");
                const decodedToken = jwt_decode(token);
                const data = await getUser(decodedToken._id);
                setUser(data.data);
                setRole(decodedToken.role);
            }
        };

        fetchData();
    }, []);

    // Login
    if (props.name === "login") {
        function MouseOver(e) {
            e.target.style.color = "black";
        }

        function MouseOut(e) {
            e.target.style.color = "#29d9d5";
        }

        return (
            <>
                <a href="./" className="btn" onMouseOver={MouseOver} onMouseOut={MouseOut}>Home</a>
                <a href="./register" className="btn" onMouseOver={MouseOver} onMouseOut={MouseOut}>Registrarse</a>
            </>
        )

        //Registro
    } else if (props.name === "register") {
        const letra2 = {
            color: "#63b5d6",
            border: "0.2rem solid #63b5d6"
        }

        function MouseOver(e) {
            e.target.style.background = "#63b5d6";
            e.target.style.color = "black";
        }

        function MouseOut(e) {
            e.target.style.background = "";
            e.target.style.color = "#63b5d6";
        }


        return (
            <>
                <a href="./" className="btn" style={letra2} onMouseOver={MouseOver} onMouseOut={MouseOut}>Home</a>
                <a href="./login" className="btn" style={letra2} onMouseOver={MouseOver} onMouseOut={MouseOut}>Iniciar
                    Sesión</a>
            </>
        )

        //Admin
    } else if (props.name === "administrador") {
        return (
            <>
                <div className="action">
                    <div onClick={menuToggle} className="profile">
                        <img src={user.url} alt=""/>
                    </div>
                    <div className="menu">

                        <h3>{user.username} <br/></h3>
                        <ul>

                            <li><img src="https://img.icons8.com/officel/16/undefined/user.png" alt=""/><a
                                href="./user#perfil">Perfil</a></li>
                            <li><img src="https://img.icons8.com/offices/30/undefined/blog.png" alt=""/><a
                                href="./user#blog">Blogs</a></li>
                            <li><img src="https://img.icons8.com/color/96/000000/booking.png" alt=""/><a
                                href="./user#reserva">Reservas</a></li>

                            <li><img
                                src="https://img.icons8.com/external-others-sbts2018/58/undefined/external-logout-social-media-others-sbts2018.png"
                                alt=""/><a href="./logout">Salir</a></li>

                        </ul>
                    </div>
                </div>
                <a className="perfil-invisible"
                   href="./user#perfil">Perfil</a>
            </>

        )

        //Reseteo de contraseña
    } else if (props.name === "usuario") {



            return (
                <>
                    <div className="action">
                        <div onClick={menuToggle} className="profile">
                            <img src={user.url} alt=""/>
                        </div>
                        <div className="menu">

                            <h3>{user.username} <br/></h3>
                            <ul>
                                {role === "ADMIN" &&
                                    <li><img
                                        src="https://img.icons8.com/officel/16/undefined/administrative-tools.png"
                                        alt=""/>
                                        <a href="./Admin">Administrar</a></li>
                                }
                                <li><img
                                    src="https://img.icons8.com/external-others-sbts2018/58/undefined/external-logout-social-media-others-sbts2018.png"
                                    alt=""/><a href="./logout">Salir</a></li>

                            </ul>
                        </div>
                    </div>
                    <a className="perfil-invisible"
                       href="./user#perfil">Perfil</a>

                </>

            )


        } else if (props.name === "help") {
            //Si el usuario ha iniciado sesión o mantiene la sesión iniciada
            if (localStorage.getItem("authToken")) {
                const token = localStorage.getItem("authToken");
                const decodedToken = jwt_decode(token);
                return (
                    <>

                        <a data-aos="zoom-in-left" data-aos-delay="300" href="./">Home</a>
                        <a data-aos="zoom-in-left" data-aos-delay="450" href="#faq">FAQS</a>
                        <a data-aos="zoom-in-left" data-aos-delay="600" href="#contact">Contacto</a>
                        <div data-aos="zoom-in-left" data-aos-delay="1300" className="action">
                            <div onClick={menuToggle} className="profile">
                                <img src={user.url} alt=""/>
                            </div>
                            <div className="menu">

                                <h3>{user.username} <br/></h3>
                                <ul>

                                    <li><img src="https://img.icons8.com/officel/16/undefined/user.png" alt=""/><a
                                        href="./user#perfil">Perfil</a></li>
                                    <li><img src="https://img.icons8.com/offices/30/undefined/blog.png" alt=""/><a
                                        href="./user#blog">Blogs</a></li>
                                    <li><img src="https://img.icons8.com/color/96/000000/booking.png" alt=""/><a
                                        href="./user#reserva">Reservas</a></li>
                                    {decodedToken.role === "ADMIN" &&
                                        <li><img
                                            src="https://img.icons8.com/officel/16/undefined/administrative-tools.png"
                                            alt=""/>
                                            <a href="./Admin">Administrar</a></li>
                                    }
                                    <li><img
                                        src="https://img.icons8.com/external-others-sbts2018/58/undefined/external-logout-social-media-others-sbts2018.png"
                                        alt=""/><a href="./logout">Salir</a></li>

                                </ul>
                            </div>
                        </div>
                        <a className="perfil-invisible" data-aos="zoom-in-left" data-aos-delay="1150"
                           href="./user#perfil">Perfil</a>
                    </>
                )
            } else {
//Si el usuario ha entrada como invitado, es decir, no ha inicido sesión

                //Función para cambiar el color de las letras al estar el ratón encima
                const MouseOver = (e) => {
                    e.target.style.color = "black";
                }

                //Función para cambiar el color de la letra cuándo el cursor se ha quitado
                const MouseOut = (e) => {
                    e.target.style.color = "#29d9d5";
                }

                return (
                    <>

                        <a data-aos="zoom-in-left" data-aos-delay="300" href="./">Home</a>
                        <a data-aos="zoom-in-left" data-aos-delay="450" href="#faq">FAQS</a>
                        <a data-aos="zoom-in-left" data-aos-delay="600" href="#contact">Mensaje</a>
                        <a data-aos="zoom-in-left" data-aos-delay="1300" href="./login" id="btn"
                           onMouseOver={(e) => MouseOver(e)} onMouseOut={(e) => MouseOut(e)} className="btn">Acceder</a>
                    </>
                )
            }
        } else if (props.name === "passwordReset") {
            return (
                <>
                    <a href="../Home_Layout/Header">Home</a>
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </>
            )

        } else {

            //Si el usuario ha iniciado sesión o mantiene la sesión iniciada
            if (localStorage.getItem("authToken")) {
                const token = localStorage.getItem("authToken");
                const decodedToken = jwt_decode(token);
                return (
                    <>

                        <a data-aos="zoom-in-left" data-aos-delay="300" href="./">Home</a>
                        <a data-aos="zoom-in-left" data-aos-delay="450" href="#about">Sobre nosotros</a>
                        <a data-aos="zoom-in-left" data-aos-delay="600" href="#paquetes">Paquetes</a>
                        <a data-aos="zoom-in-left" data-aos-delay="750" href="#services">Servicios</a>
                        <a data-aos="zoom-in-left" data-aos-delay="900" href="#monitor">Monitores</a>
                        <a data-aos="zoom-in-left" data-aos-delay="1150" href="#gallery">Galería</a>
                        <a data-aos="zoom-in-left" data-aos-delay="1150" href="#blogs">Blogs</a>
                        <div data-aos="zoom-in-left" data-aos-delay="1300" className="action">
                            <div onClick={menuToggle} className="profile">
                                <img src={user.url} alt=""/>
                            </div>
                            <div className="menu">

                                <h3>{user.username} <br/></h3>
                                <ul>

                                    <li><img src="https://img.icons8.com/officel/16/undefined/user.png" alt=""/><a
                                        href="./user#perfil">Perfil</a></li>
                                    <li><img src="https://img.icons8.com/offices/30/undefined/blog.png" alt=""/><a
                                        href="./user#blog">Blogs</a></li>
                                    <li><img src="https://img.icons8.com/color/96/000000/booking.png" alt=""/><a
                                        href="./user#reserva">Reservas</a></li>
                                    {decodedToken.role === "ADMIN" &&
                                        <li><img
                                            src="https://img.icons8.com/officel/16/undefined/administrative-tools.png" alt=""/><a
                                                href="./Admin">Administrar</a></li>
                                    }
                                    <li><img
                                        src="https://img.icons8.com/external-others-sbts2018/58/undefined/external-logout-social-media-others-sbts2018.png"
                                        alt=""/><a href="./logout">Salir</a></li>

                                </ul>
                            </div>
                        </div>
                        <a className="perfil-invisible" data-aos="zoom-in-left" data-aos-delay="1150"
                           href="./user#perfil">Perfil</a>
                    </>
                )
            } else {
//Si el usuario ha entrada como invitado, es decir, no ha iniciado sesión

                //Función para cambiar el color de las letras al estar el ratón encima
                const MouseOver = (e) => {
                    e.target.style.color = "black";
                }

                //Función para cambiar el color de la letra cuándo el cursor se ha quitado
                const MouseOut = (e) => {
                    e.target.style.color = "#29d9d5";
                }

                return (
                    <>

                        <a data-aos="zoom-in-left" data-aos-delay="300" href="./">Home</a>
                        <a data-aos="zoom-in-left" data-aos-delay="450" href="#about">Sobre nosotros</a>
                        <a data-aos="zoom-in-left" data-aos-delay="600" href="#paquetes">Paquetes</a>
                        <a data-aos="zoom-in-left" data-aos-delay="750" href="#services">Servicios</a>
                        <a data-aos="zoom-in-left" data-aos-delay="900" href="#monitor">Monitores</a>
                        <a data-aos="zoom-in-left" data-aos-delay="1150" href="#gallery">Galería</a>
                        <a data-aos="zoom-in-left" data-aos-delay="1150" href="#blogs">Blogs</a>
                        <a data-aos="zoom-in-left" data-aos-delay="1300" href="./login" id="btn"
                           onMouseOver={(e) => MouseOver(e)} onMouseOut={(e) => MouseOut(e)} className="btn">Acceder</a>
                    </>
                )
            }
        }
    }

//Código JSX(JS + HTML = XML) que se retorna para presentarlo en pantalla.
    const NavBar = (props) => {


        return (
            <>
                <header className="header">
                    <div id="menu-btn" className="fas fa-bars" onClick={menu}/>
                    <a href="./" className="logo"> <i className="fas fa-paper-plane"/> W i l d T r a v e l</a>
                    <nav className="navbar">
                        {/*Elección de las props dependiendo de la página */}
                        <NavBarEleccion name={props.name}/>
                    </nav>
                </header>
            </>
        )
    };

//Exportamos el Navbar.
    export default NavBar;