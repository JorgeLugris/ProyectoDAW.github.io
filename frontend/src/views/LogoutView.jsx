//Importamos paquetes.
import {useEffect} from "react";
import {sweetAlert} from "../services/authService";
import {useNavigate} from "react-router";


//Contenido del componente (Logout) que vamos a exportar.
const LogoutView = () => {
    //Paquete navigate para que nos dirija de una página a otra.
    const navigate = useNavigate();

    //Uso de los efectos
    //Estos efectos se produce al iniciar la página o algún cambio en ella.
    useEffect(async () => {
        //Muesta el mensaje al usuario que ha cerrado sesión satisfactoriamente
        await sweetAlert("Cierre de sesión", "Usted ha salido de la sesión satisfactoriamente", "success");
        //Cerramos sesión con el usuario eliminando los token
        localStorage.removeItem("authToken");
        localStorage.removeItem("CurrentoDate");
        //Nos dirije a la página principal pero sin la sesión iniciada
        navigate("/");

    })

    //No retornamos nada porque no hace falta
    return (
        <>
            <div className="logoutBackground">
            </div>
        </>
    )
}

//Exportamos "Logout"
export default LogoutView;