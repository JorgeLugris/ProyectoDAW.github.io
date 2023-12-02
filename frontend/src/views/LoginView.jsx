//Importamos paquetes.
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router';

import 'jquery.ripples'
import $ from 'jquery';


//Importamos componentes.
import Navbar from "../components/layout/NavBar";
import {loginUser} from "../services/authService";
import {sweetAlert} from "../services/authService";

//Contenido del componente (Login) que vamos a exportar.
const LoginView = () => {

    //Uso del método navigate para introducirlo en una variable.
    //@Navigate es un paquete react-router-do que permite navegar entre páginas y redirigirse a la página deseada.
    const navigate = useNavigate();

    //Uso de estados
    //El uso de estados permite cambiar de estado en cualquier momento.
    //Siendo @user la variable y @setUser para cambiarla.
    //Se ha introducido en formato "JSON" para no tener que hacer 3 variables(user, email, password).
    const [user, setUser] = useState({email: '', password: ''});

    //Uso de los efectos
    //Estos efectos se produce al iniciar la página o algún cambio en ella.
    useEffect(() => {
        //Cambia el "css" ,al iniciar esta página.
        $('*').css({'transition': 'none'});

        //@Ripples: Librería de JQuery que permite el efecto agua.
        $('.login').ripples({
            resolution: 512,
            dropRadius: 20,
            perturbance: 0.01,
        });

        //Condicional para control de sesiones.
        //Al recargar la página obtiene el "token" del "localstorage".

        if (localStorage.getItem("authToken")) {
                navigate("/");
        }
    }, [navigate]);


    //Cambia el estado de "user" por los valores que ha ingresado el formulario.
    const handleChange = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    };

    //Función que se inicia al enviar el formulario.
    const handleSubmit = async (e) => {
        //Cancela el evento por defecto.
        e.preventDefault();
        //Utilizamos un try/catch por si tenemos excepciones o errores.
        try {
            //Obtenemos los datos del usuario. Mediante la api(anteriormente creada con Node) a través de AXIOS.
            //@loginUser: Lo hemos importado desde TODO: "../../services/authService";
            const {data} = await loginUser(user);
            //Volvemos a poner los valores por defecto(Por si recarga la página o hay algún error que el usuario ingrese otra vez los datos).
            setUser({
                email: '',
                password: '',
            });

            //Obtenemos la fecha actual en formato de cadena de texto
            const currentDate = new Date().toString();
            //Introducimos en el localStorage el token (similar a las sesiones) para saber que un usuario ha iniciado sesión.
            localStorage.setItem('authToken', data.token);
            //Introducimos en el localStorage el token de la fecha y hora para saber cuánto tiempo lleva la sesión iniciada.
            localStorage.setItem("CurrentDate", currentDate);
            //Lo redirigimos a la página de inicio (ya con la sesión iniciada).
            navigate("/");

            //En el caso que haya algún error. Se presenta por "SweetAlert".
        } catch (e) {
            //Creamos la variable que contiene el mensaje de la alerta.
            const msg = (e.response.data.error === "ACCOUNT_NOT_CONFIRM") ? `CUENTA NO VERIFICADA` : `EMAIL Y/O CONTRASEÑA INCORRECTO`;
            //Creamos la variable que contiene el icono de la alerta.
            const icon = (e.response.data.error === "ACCOUNT_NOT_CONFIRM") ? `question` : `error`;
            //Importamos la librería de "SweetAlert" desde TODO: "../../services/authService";
            await sweetAlert(`${e.response.data.error}`, msg, icon);
        }
    }
    //Código JSX(JS + HTML = XML) que se retorna para presentarlo en pantalla.
    return (
        <>
            <Navbar name="login"/>
            <div className="login">
                <div className="login__container">
                    {/*@onsubmit: Función que se activa al enviar formulario*/}
                    <form onSubmit={handleSubmit} className="login__form">
                        <h2 className="login__form-title">Iniciar Sesión </h2>
                        <div className="login__form-inputs">
                            <i className="fas fa-user"/>
                            {/*@onChange: Función que se activa cuando el valor de un elemento ha cambiado
                            IMPORTANTE: @value: Tiene que ser igual que las variables de "useState"*/}
                            <input onChange={handleChange}
                                   type="email"
                                   required
                                   id="email"
                                   autoComplete="off"
                                   name="email"
                                   placeholder="Ingrese su email"
                                   value={user.email}
                                   tabIndex={1}/>
                        </div>
                        <div className="login__form-inputs">
                            <i className="fas fa-key"/>
                            {/*@onChange: Función que se activa cuando el valor de un elemento ha cambiado
                            IMPORTANTE: @value: Tiene que ser igual que las variables de "useState"*/}
                            <input onChange={handleChange}
                                   type="password" required
                                   id="password"
                                   name="password"
                                   autoComplete="true"
                                   placeholder="Ingrese su contraseña"
                                   value={user.password}
                                   tabIndex={2}/>
                        </div>
                        <div className="login__form-btn">
                            <input type="submit" value="Entrar"/>
                        </div>
                        <div className="login__form-resetPassword">
                            <p><a className="login__form-resetPassword__link resetPassword__link" href="/Password">¿Olvidaste
                                la contraseña?</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

//Exportamos el Login.
export default LoginView
