//Importamos paquetes.
import {useNavigate} from "react-router";
import {useEffect} from "react";
import {useParams} from "react-router";

//Importamos componentes.
import {accountAcepted, sweetAlert} from "../services/authService";


//Contenido del componente (checkAccount) que vamos a exportar.
const AccountView = () => {
    //Uso del método navigate para introducirlo en una variable.
    //@Navigate es un paquete react-router-do que permite navegar entre páginas y redirigirse a la página deseada.
    const navigate = useNavigate();
    //@useParams es un  paquete react-router-dom que le permiten acceder a los parámetros de la ruta actual.
    const params = useParams();

    //Uso de los efectos
    //Estos efectos se produce al iniciar la página o algún cambio en ella.
    useEffect(async () => {

        //Utilizamos un try/catch por si tenemos excepciones o errores.

        try {
            //Nos conectamos a la api mediante "Axios" en la ruta TODO: services/../../services/authService.
            await accountAcepted(params.id);

            //Al confirmar la cuenta por primera vez. Aparece la alerta y a continuación le envía al login.
            //Obtenemos el componente "SweetAlert" en la ruta TODO: services/../../services/authService.
            await sweetAlert("VERIFIED_ACCOUNT", "La cuenta se ha verificado correctamente", "success").then(() => navigate("/login"));
        } catch (e) {
            //Variable que indica el "texto" de la alerta
            const text = (e.response.data.error === 'USER_NOT_EXIST') ? "Esta cuenta no se ha podido verificar porque ya fué verificada" : "La cuenta no se ha podido verificar";
            //Variable que indica la redirección de la página
            const redirect = ((e.response.data.error === 'USER_NOT_EXIST')) ? "/login" : "/register";

            //Si la cuenta ya ha sido confirmada anteriormente le envía directamente al login si no al registro.
            //Obtenemos el componente "SweetAlert" en la ruta TODO: services/../../services/authService.
            await sweetAlert("VERIFIED_NOT_ACCOUNT", `${text}`, "error").then(() => navigate(`${redirect}`));

        }

    }, [])

    //Código JSX(JS + HTML = XML) que se retorna para presentarlo en pantalla.
    return (
        <div className="Account__container">
        </div>
    )


}

//Exportamos el componente que incluye la cuenta verificada.
export default AccountView;