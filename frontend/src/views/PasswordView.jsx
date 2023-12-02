//Importamos paquetes.
import {checkEmail, checkPin, newPassword, sweetAlert} from "../services/authService";
import {useState} from "react";
import {useNavigate} from "react-router";

//Importamos componentes.
import Navbar from "../components/layout/NavBar";

//Contenido del componente (Password) que vamos a exportar.
const PasswordView = () => {

    //Uso del método navigate para introducirlo en una variable.
    //@Navigate es un paquete react-router-do que permite navegar entre páginas y redirigirse a la página deseada.
    const navigate = useNavigate();

    //Uso de estados
    //El uso de estados permite cambiar de estado en cualquier momento.
    //Siendo @user la variable y @setUser para cambiarla.
    //Se ha introducido en formato "JSON" para no tener que hacer 3 variables(email, pin, password).
    const [check, setCheck] = useState({email: '', pin: '', password: ''});

    //Cambia el estado de "check" por los valores que ha ingresado el formulario.
    const handleChange = (e) => {
        setCheck({
            ...check, [e.target.name]: e.target.value
        })
    };

    //Función que se inicia al enviar el formulario.
    const handleSubmit = async (e) => {
        //Cancela el evento por defecto.
        e.preventDefault();
        //Utilizamos un try/catch por si tenemos excepciones o errores.
        try {
            //Empieza la magía de desaparecer y aparecer componentes "html".
            //Condicionales que muestran y esconden componentes "html" con el estilo "display" mediante el DOM.
            //He realizado este metodo para no tener que hacer páginas adicionales para el reseteo de la contraseña.
            if (check.pin === "") {
                await checkEmail(check);
                document.querySelector('.password__form-uno').style.display = 'none';
                document.querySelector('.password__form-dos').style.display = 'flex';
            } else if (check.password === "") {
                await checkPin(check);
                document.querySelector('.password__form-dos').style.display = 'none';
                document.querySelector('.password__form-tres').style.display = 'flex';
            } else {
                //Comprobación de que las contraseñas son idénticas.(Password y RepeatPassword).
                if (check.repeatPassword !== check.password) {
                    await sweetAlert("Contraseña invalida", "Las contraseña no son iguales", "error");
                } else {
                    //Se conecta a la base de datos, cambia la contraseña y nos dirige a la página de "login"
                    await newPassword(check);
                    navigate("/login");
                }
            }
        } catch (e) {
            //Creamos la variable que contiene el texto de la alerta.
            let text;
            //Condicional que dependiendo del resultado que nos envía el "backend" muestra un texto u otro.
            if (e.response.data.error === 'EMAIL_NOT_FOUND') {
                text = "Este email no pertenece a ningún usuario";
            } else if (e.response.data.error === 'PIN_INVALID') {
                text = "El PIN introducido no es correcto";
            } else {
                text = "El PIN introducido ha expirado. Por favor inténtelo de nuevo";
            }
            //Importamos la librería de "SweetAlert" desde TODO: "../../services/authService";
            await sweetAlert(`${e.response.data.error}`, `${text}`, "error").then(() => {
                //Si el "PIN" ha expirado se recargará la página para que vuelva a enviar otra vez el "PIN".
                if (e.response.data.error === 'PIN_EXPIRED') window.location.reload();
            });

        }
    }

    //Código JSX(JS + HTML = XML) que se retorna para presentarlo en pantalla.
    return (
        <>
            <Navbar name="login"/>
            <div className="password">
                <div className="password__container">
                    {/*@onsubmit: Función que se activa al enviar formulario*/}
                    <form onSubmit={handleSubmit} className="password__form">
                        <h2 className="password__form-title">Restablecer Contraseña </h2>
                        <div className="password__form-inputs password__form-uno">
                            <i className="fas fa-envelope"/>
                            {/*@onChange: Función que se activa cuando el valor de un elemento ha cambiado
                            IMPORTANTE: @value: Tiene que ser igual que las variables de "useCheck"*/}
                            <input onChange={handleChange}
                                   type="email"
                                   required
                                   id="email"
                                   autoComplete="off"
                                   name="email"
                                   placeholder="Ingrese su email"
                                   value={check.email}
                                   tabIndex={1}/>
                        </div>
                        <div className=" password__form-dos">
                            <i className="fas fa-key"/>
                            {/*@onChange: Función que se activa cuando el valor de un elemento ha cambiado
                            IMPORTANTE: @value: Tiene que ser igual que las variables de "useCheck"*/}
                            <input onChange={handleChange}
                                   type="text"
                                   id="pin"
                                   name="pin"
                                   autoComplete="true"
                                   placeholder="Ingrese el PIN secreto"
                                   value={check.pin}
                                   tabIndex={2}/>
                        </div>
                        <div className="password__form-tres">
                            <div className="password__form-tres__inputs">
                                <i className="fas fa-key fa-key-password"/>
                                {/*@onChange: Función que se activa cuando el valor de un elemento ha cambiado
                            IMPORTANTE: @value: Tiene que ser igual que las variables de "useCheck"*/}
                                <input onChange={handleChange}
                                       type="password"
                                       id="password"
                                       name="password"
                                       autoComplete="true"
                                       placeholder="Ingrese la nueva contraseña"
                                       value={check.password}
                                       tabIndex={2}/>
                            </div>
                            <div className="password__form-tres__inputs">
                                <i className="fas fa-key fa-key-password"/>
                                {/*@onChange: Función que se activa cuando el valor de un elemento ha cambiado
                            IMPORTANTE: @value: Tiene que ser igual que las variables de "useCheck"*/}
                                <input onChange={handleChange}
                                       type="password"
                                       id="repeatPassword"
                                       name="repeatPassword"
                                       autoComplete="true"
                                       placeholder="Repita la nueva contraseña"
                                       tabIndex={2}/>
                            </div>
                        </div>
                        <div className="password__form-btn">
                            <input type="submit" value="Entrar"/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

//Exportamos el Password.
export default PasswordView;