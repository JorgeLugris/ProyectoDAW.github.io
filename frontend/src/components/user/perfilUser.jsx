/*******************************Componente blog del perfil de usuario ***********************************************/

//Importamos paquetes.
import {useState} from "react";
import {useEffect} from "react";
import moment from 'moment';
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router";

//Importamos componentes
import {deleteUser, getUser, updateUser} from "../../services/userService";
import {sweetAlert, sweetAlertConfirmation} from "../../services/authService";

//Creamos el componente que exportaremos al perfil de usuario
const PerfilUser = () => {

    //Utilizamos el hook "useState" para guardar el estado en una variable
    const [user, setUser] = useState([]);
    const [file, setFile] = useState(null);

    //@navigate cuya función de dirigirnos de una página a otra
    const navigate = useNavigate();

    //Uso de los efectos
    //Estos efectos se produce al iniciar la página o algún cambio en ella.
    useEffect(async () => {
        //Obtenemos el token para saber quien ha iniciado sesión
        let token = localStorage.getItem("authToken");
        let decodedToken = jwt_decode(token);
        const usuario = await getUser(decodedToken._id);
        setUser(usuario.data);
    }, []);


    //Función para borrar usuario
    const userBorrar = async (e) => {
        e.preventDefault();
        //Les mostramos un mensaje al usuario preguntándole: "Si esta seguro de borrar el perfil"
        const confirmacion = await sweetAlertConfirmation("perfil")
        if (confirmacion === true) {
            try {
                //Mostramos mensaje
                await sweetAlert("Perfil eliminado", "Se ha eliminado su perfil correctamente", "success");
                //Eliminamos usuario en la base de datos sabiendo el "id"
                await deleteUser(user._id);
                //Eliminamos los token
                localStorage.removeItem("authToken");
                localStorage.removeItem("CurrentoDate");
                //Lo enviamos a la landing page
                navigate("/");
            } catch (e) {
                //Muestra un mensaje de error
                console.log("No se ha podido eliminar el usuario");
            }
        }
    }

    const userEditar = async (e, id) => {
        e.preventDefault();
        document.getElementById("wrapper-claro").style.display = "block";
        document.getElementById("main-container").style.display = "none";
        try {
            const usuario = await getUser(id);
            const dateFormat = moment(user.date).format('YYYY-MM-DD');
            const userData = {...usuario.data, date: dateFormat};
            setUser(userData);

        } catch (e) {
            console.log("Nos se ha podido editar el usuario");
        }
    }
    //Muestro los datos del usuario para poder actualizar sus datos
    const handleChange = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    }

    //Actualiza el perfil del usuario
    const handleClick = async (e) => {
        //Cancela el evento por defecto.
        e.preventDefault();
        try {
            //Introducimos los datos en "formdata"
            let formdata = new FormData();
            formdata.append('image', file);
            formdata.append('username', user.username);
            formdata.append('date', moment(user.date).format('YYYY-MM-DD'));
            formdata.append('email', user.email);
            formdata.append('phone', user.phone);
            formdata.append('id', user._id);
            //Enviamos los datos a la api del backend para que actualice los datos
            await updateUser(formdata);
            //Si es correcto muestra una alerta
            await sweetAlert("Perfil actualizado", "Se ha actualizado su perfil correctamente", "success");
            //Actualizamos la página
            window.location.reload();

        } catch (e) {
            await sweetAlert("Ha ocurrido un error", "Su perfil no se ha actualizado correctamente", "error");
            console.log("Hay un error en la aplicación");
        }
    }

    //Guarda la información del "file" en la variable
    const selectedHandler = (e) => {
        setFile(e.target.files[0]);
    };

//Código JSX(JS + HTML = XML) que se retorna para presentarlo en pantalla.
    return (
        <>
            <div className="wrapper wrapper-perfilUser" id="wrapper-perfilUser">
                <h2>Administrar mi perfil</h2>
                <form action="#" encType="multipart/form-data">
                    <div className="input-box">
                        <input onChange={handleChange} type="text" name="username" placeholder="Nombre del usuario"
                               value={user.username}
                               required/>
                    </div>

                    <div className="input-box">
                        <input onChange={handleChange} type="date" name="date"
                               value={moment(user.date).format('YYYY-MM-DD')} required/>
                    </div>


                    <div className="input-box">
                        <input onChange={handleChange} type="email" name="email" placeholder="Email del usuario"
                               value={user.email} required/>
                    </div>
                    <div className="input-box">
                        <input onChange={handleChange} type="number" name="phone" placeholder="Teléfono del usuario"
                               value={user.phone} required/>
                    </div>

                    <div className="input-box custom-input-file register-user"  id="imgUser">
                        <input type="file"  className="input-box input-file"
                               placeholder="Enter your imagen"  onChange={selectedHandler} required/> Subir
                        Imagen...
                    </div>

                    <div className="input-box button button-adminUser">
                        <input type="Submit" className="buttonAdminUser" onClick={(e) => handleClick(e)} value="Actualizar"/>
                    </div>
                    <div className="input-box button button-incorrectoPerfilUser">
                        <input type="Submit" onClick={(e) => userBorrar(e)} value="Eliminar"/>
                    </div>
                </form>


            </div>
        </>
    )
};

//Exportamos el perfilUser.
export default PerfilUser;
