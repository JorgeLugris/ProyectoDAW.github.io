//Importamos paquetes.
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useFormik} from "formik";
import * as Yup from "yup";
import $ from "jquery";


//Importamos componentes.
import Navbar from "../components/layout/NavBar"
import {registerUser} from "../services/authService";
import {sweetAlert} from "../services/authService";
import {expresiones} from "../services/authService";


//Contenido del componente (registro) que vamos a exportar.
const RegisterView = () => {
    const [file, setFile] = useState(null);

    //Uso del método navigate para introducirlo en una variable.
    //@Navigate es un paquete react-router-do que permite navegar entre páginas y redirigirse a la página deseada.
    const navigate = useNavigate();

    //Uso de estados
    //El uso de estados permite cambiar de estado en cualquier momento.
    //Siendo @error la variable y @setError para cambiarla.
    const [error, setError] = useState({
        username: false,
        email: false
    });

    //Uso de los efectos
    //Estos efectos se produce al iniciar la página o algún cambio en ella.
    useEffect(() => {
        $('*').css({'overflow-y': 'hidden'});
        if (localStorage.getItem("authToken")) {
            navigate("/");
        }
    }, []);

    //Uso de Formik.
    //Formik es una librería que se utiliza para la validación de formularios y obtención de los errores.
    const formik = useFormik({
        //Iniciamos cada valor que queremos introducir en la base de datos y que el cliente ha rellenado en el formulario.
        initialValues: {
            username: "",
            date: "",
            email: "",
            phone: "",
            password: "",
            repeatPassword: ""
        },
        //Con la librería Yup podemos hacer validaciones más exactas.
        //Además hemos importado expresiones regulares(Escrito en JS y por nosotros) para ser todavía más exactos. TODO "../../services/authService".
        validationSchema: Yup.object({
            username: Yup.string().min(3, "Demasiado corto").max(15, "Demasiado largo").matches(expresiones.usuario, "Usuario no válido").required("Campo obligatorio"),
            date: Yup.date().required("Campo obligatorio"),
            email: Yup.string().matches(expresiones.email, "Email no válido").email("Introduzca un email válido").required("Campo obligatorio"),
            phone: Yup.string().matches(expresiones.telefono, "Teléfono no valido").required("Campo obligatorio"),
            password: Yup.string().min(5, "Demasiado corto").max(15, "Demasiado largo").matches(expresiones.password, "Contraseña no válida").required("Campo obligatorio"),
            repeatPassword: Yup.string().min(5, "Demasiado corto").max(15, "Demasiado largo").matches(expresiones.password, "Contraseña no válida").required("Campo obligatorio").oneOf([Yup.ref("password")], "La contraseña no coincide"),
        }),
        //Se realiza el envío de formulario.
        // //Utilizamos un try/catch por si tenemos excepciones o errores para se presenten en pantalla por medio de "Sweet Alert".
        onSubmit: async (user) => {

            // Si "file" es null, significa que el usuario no ha introducido imagen de perfil y lo bordea de color rojo
            if (file === null) {
                document.getElementById("register-user").style.border = "2px solid red";
                await sweetAlert("Imagen de perfil", "Usted debe de subir una foto de perfil", "error");
            } else {
                //Try/catch: manejo de errors
                try {
                    //Introducimos todos los datos de usuario en una sola variable
                    let formdata = new FormData();
                    //imagen
                    formdata.append('image', file);
                    //fecha
                    formdata.append('date', user.date);
                    //email
                    formdata.append('email', user.email);
                    //password
                    formdata.append('password', user.password);
                    //teléfono
                    formdata.append('phone', user.phone);
                    //nombre de usuario
                    formdata.append('username', user.username);

                    //Pasamos "user" (que son los valores del formulario) y al registrarse el usuario aparecerá una alerta.
                    await registerUser(formdata);
                    //Le informamos al usuario que debe de confirmar su cuenta
                    await sweetAlert(`EMAIL DE CONFIRMACIÓN`, "Revise su email para verificar su cuenta", "question").then(() => navigate("/login"));
                } catch (e) {
                    //Se produce si ha habido un error en el registro de datos. Apareciendo una alerta con dicho error.
                    //@subtext: Es solo para saber si es usuario o email.
                    //@text: Escribimos el texto que queremos que contenga la alerta y con @subtext sabemos si es un "email" o "usuario" el que está registrado.
                    const subtext = (e.response.data.error === "USER_EXIST") ? "Usuario" : "Email";
                    const text = (e.response.data.error === "USER_EXIST" || e.response.data.error === "EMAIL_EXIST") ? `${subtext} ya registrado` : 'Ha introducido incorrectamente los datos';
                    await sweetAlert(`${e.response.data.error}`, `${text}`, "error").then(() => setError((subtext === "Usuario") ? {username: true} : {email: true}));
                }
            }
        }
    });


    //Función que obtiene la imagen subida por el usuario y lo guarda en la variable "file"
    const selectedHandler = (e) => {
        setFile(e.target.files[0]);
    };

    //Código JSX(JS + HTML = XML) que se retorna para presentarlo en pantalla.
    return (
        <>
            <Navbar name="register"/>
            <div className="register__container">
                <div className="register__container-cloud"></div>
                <div className="register__container-content">
                    <div className="register__content-title">Registrarse</div>
                    {/*@onsubmit: Se activa al enviar formulario.(si se ha completado correctamente, es decir, si "Yup" y "Formik" validan correctamente)*/}
                    <form onSubmit={formik.handleSubmit} action="#">
                        <div className="register__form">
                            <div className="register__form-inputs">
                                <label htmlFor="username" className="register__inputs-details">Usuario</label>
                                {/*Condicional (&& = if en react) que convierte el input en rojo
                                    @formik.touched: Se activa cuando al obtener un error de la validación. Al ser "touched" se activa solo ese campo. */}
                                <input
                                    className={`error__${((formik.touched.username && formik.errors.username) || error.username) && 'is-invalid'}`}
                                    type="text"
                                    id="username"
                                    autoComplete="off"
                                    name="username"
                                    placeholder="Introduzca su usuario"
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                    tabIndex={0}/>
                                {/* Es un condicional(&& = if en react) donde aparece el aviso de error */}
                                {formik.touched.date &&
                                    <div className="register__form-errors"> {formik.errors.username}</div>}
                            </div>
                            <div className="register__form-inputs">
                                <label htmlFor="date" className="register__inputs-details">Fecha</label>
                                {/*Condicional (&& = if en react) que convierte el input en rojo
                                    @formik.touched: Se activa cuando al obtener un error de la validación. Al ser "touched" se activa solo ese campo. */}
                                <input
                                    className={`error__${formik.touched.date && formik.errors.date && 'is-invalid'}`}
                                    onChange={formik.handleChange} type="date"
                                    id="date"
                                    autoComplete="off"
                                    name="date"
                                    placeholder="Enter your date"
                                    tabIndex={1}/>
                                {/* Es un condicional(&& = if en react) donde aparece el aviso de error */}
                                {formik.touched.date &&
                                    <div className="register__form-errors"> {formik.errors.date}</div>}
                            </div>
                            <div className="register__form-inputs">
                                <label htmlFor="email" className="register__inputs-details">Email</label>
                                {/*Condicional (&& = if en react) que convierte el input en rojo
                                    @formik.touched: Se activa cuando al obtener un error de la validación. Al ser "touched" se activa solo ese campo. */}
                                <input
                                    className={`error__${((formik.touched.email && formik.errors.email) || error.email) && 'is-invalid'}`}
                                    onChange={formik.handleChange} type="email"

                                    id="email"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="Dirección de email"
                                    tabIndex={2}/>
                                {/* Es un condicional(&& = if en react) donde aparece el aviso de error */}
                                {formik.touched.email &&
                                    <div className="register__form-errors"> {formik.errors.email}</div>}
                            </div>
                            <div className="register__form-inputs">
                                <label htmlFor="phone" className="register__inputs-details">Teléfono</label>
                                {/*Condicional (&& = if en react) que convierte el input en rojo
                                    @formik.touched: Se activa cuando al obtener un error de la validación. Al ser "touched" se activa solo ese campo. */}
                                <input
                                    className={`error__${formik.touched.phone && formik.errors.phone && 'is-invalid'}`}
                                    onChange={formik.handleChange} type="number"
                                    id="phone"
                                    name="phone"
                                    autoComplete="true"
                                    placeholder="Introduzca su teléfono"
                                    tabIndex={3}/>
                                {/* Es un condicional(&& = if en react) donde aparece el aviso de error */}
                                {formik.touched.phone &&
                                    <div className="register__form-errors"> {formik.errors.phone}</div>}
                            </div>
                            <div className="register__form-inputs">
                                <label htmlFor="password" className="register__inputs-details">Contraseña</label>
                                {/*Condicional (&& = if en react) que convierte el input en rojo
                                    @formik.touched: Se activa cuando al obtener un error de la validación. Al ser "touched" se activa solo ese campo. */}
                                <input
                                    className={`error__${formik.touched.password && formik.errors.password && 'is-invalid'}`}
                                    onChange={formik.handleChange} type="password"
                                    id="password"
                                    name="password"
                                    autoComplete="true"
                                    placeholder="Ingrese una contraseña"
                                    tabIndex={4}/>
                                {/* Es un condicional(&& = if en react) donde aparece el aviso de error */}
                                {formik.touched.password &&
                                    <div className="register__form-errors"> {formik.errors.password}</div>}
                            </div>
                            <div className="register__form-inputs">
                                <label htmlFor="repeatPassword" className="register__inputs-details">Confirmar
                                    contraseña</label>
                                {/*Condicional (&& = if en react) que convierte el input en rojo
                                    @formik.touched: Se activa cuando al obtener un error de la validación. Al ser "touched" se activa solo ese campo. */}
                                <input
                                    className={`error__${formik.touched.repeatPassword && formik.errors.repeatPassword && 'is-invalid'}`}
                                    onChange={formik.handleChange} type="password"
                                    placeholder="Confirme su contraseña"
                                    id="repeatPassword"
                                    name="repeatPassword"
                                    tabIndex={5}/>
                                {/* Es un condicional(&& = if en react) donde aparece el aviso de error */}
                                {formik.touched.repeatPassword &&
                                    <div className="register__form-errors"> {formik.errors.repeatPassword}</div>}
                            </div>
                        </div>

                        <div className="register__form-button">
                            <input type="submit" value="Enviar"/>
                        </div>
                    </form>

                    <div className="input-box custom-input-file register-user" id="register-user">
                        <input type="file" className="input-box input-file" id="image"
                               placeholder="Enter your imagen" name="image" onChange={selectedHandler} required/> Subir
                        Imagen...
                    </div>

                </div>
            </div>
        </>
    )
};

//Exportamos el registro.
export default RegisterView;
