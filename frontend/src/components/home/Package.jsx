/*******************************Package Monitor de la Landing Page***********************************************/

//Importamos paquetes.
import {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";

//Importamos componentes
import {getPackages} from "../../services/packageService";
import {createReserve} from "../../services/reserveService";
import {sweetAlert} from "../../services/authService";
import {session} from "../../services/tokenService";

var count = 0;

//Creamos el componente que exportaremos a la landing page
const Package = () => {
    //Utilizamos el hook "useState" para guardar el estado en una variable
    const [packages, setPackages] = useState([]);
    const [user, setUser] = useState("");
    const [entrar, setEntrar] = useState(false);

    //Uso de los efectos
    //Estos efectos se produce al iniciar la página o algún cambio en ella.
    useEffect(async () => {
        //Obtiene el token de la sesión que contiene los datos del usuario
        if (localStorage.getItem("authToken")) {
            let token = localStorage.getItem("authToken");
            let decodedToken = jwt_decode(token);

            if (session()) {
                localStorage.removeItem("authToken");
                localStorage.removeItem("CurrentoDate");
                window.location.reload();
            }
            //Introduce el id del usuario para introducirlo en la reserva
            setUser(decodedToken._id);
            //Introduce en una variable entrar para saber si el usuario ha iniciado sesión
            setEntrar(true);
        }
        //Obtenemos todos los paquetes de la base de datos
        const data = await getPackages();
        //Lo metemos en el estado de "Packages"
        setPackages(data.data);

    });

    //Función que se conecta a la base de datos y permite que el usuario pueda reservar dicho paquete
    const reserve = async (e, type) => {
        e.preventDefault();
        if (entrar) {
            await createReserve(type, user);
            //Mensaje que indica al usuario que lo ha reservado satisfactoriamente
            await sweetAlert("Reserva", `Ha reservado correctamente el paquete de ${type}`, "success");
        } else {
            //Mensaje que indica al usuario que debe de iniciar sesión para hacer una reserva
            await sweetAlert("Error en la Reserva", `Debe de iniciar sesión para reservar`, "error");
        }
    }


    //Código JSX(JS + HTML = XML) que se retorna para presentarlo en pantalla.
    return (
        <>
            <div className="package" id="paquetes">
                <div className="heading">
                    <span>Nuestros Paquetes</span>
                    <h1>Elige tu propio paquete</h1>
                </div>

                <div className="box-container">
                    {/*Uso de "map" para que recorra el array y muestre todos los paquetes*/}
                    {packages.map(paq => (
                        <div className="card" data-aos="fade-up" data-aos-delay="150">
                            <div className="circle"></div>
                            <div className="content1">
                                <h2>{paq.title}</h2>
                                <p> {paq.description}</p>
                                <a href="#" onClick={(e) => reserve(e, paq.type)}>Reservar</a>
                            </div>
                            <img src={paq.url}/>

                        </div>
                    ))}
                </div>
            </div>
        </>
    )
};
//Exportamos Package.
export default Package;