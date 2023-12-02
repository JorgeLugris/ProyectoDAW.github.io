import {useEffect, useState} from "react";
import {deleteHelp, getHelps, messageHelp, respuestaHelp} from "../../services/helpService";
import moment from "moment";
import {sweetAlert, sweetAlertConfirmation} from "../../services/authService";



const HelpAdmin = () => {
    const [ayudas, setAyudas] = useState([]);
    const [username, setUsername] = useState([]);
    const [email, setEmail] = useState([]);
    const [mensaje, setMensaje] = useState([]);
    const [id, setId] = useState([]);

    useEffect(async () => {
        const ayuda = await getHelps();
        setAyudas(ayuda.data)
    }, []);

    const helpEditar = (e, user, email, id) => {
        e.preventDefault();
        document.getElementById("wrapper-help").style.display = "block";
        document.getElementById("container-help").style.display = "none";
        setUsername(user);
        setEmail(email);
        setId(id);
    }

    const handleChange = (e) => {
        setMensaje({
            ...mensaje, [e.target.name]: e.target.value
        })
    }
    const enviarMensaje = async (e) => {
        e.preventDefault();
        try {

            await messageHelp(mensaje, email);
            await respuestaHelp(id);
            await sweetAlert("Mensaje enviado", `Se ha enviado el mensaje al usuario ${username}`, "success");
            window.location.reload();

        } catch (e) {
            await sweetAlert("Mensaje no enviado", `No se ha podido enviar el mensaje al usuario ${username}`, "success");
        }
    }

    const deleteAyuda = async(e, identificador) =>{

        e.preventDefault();
        try {
            const confirmacion = await sweetAlertConfirmation("mensaje");
            if (confirmacion === true) {
                await sweetAlert("Mensaje eliminado", "El mensaje se ha eliminado correctamente", "success");
                await deleteHelp(identificador);
                window.location.reload();
            }
        } catch (e) {
            await sweetAlert("Error al eliminar", "El mensaje no se ha podido eliminar", "error");
            console.log("No se ha podido eliminar el usuario");
        }
    }

    return (
        <>
            <div className="container-help" id="container-help">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Mensaje</th>
                        <th>Respondido</th>
                        <th>Creado</th>
                        <th>Administrar</th>
                    </tr>
                    </thead>
                    {ayudas.map(ayu => (
                        <tr>
                            <td>{ayu._id}</td>
                            <td>{ayu.username}</td>
                            <td>{ayu.message}</td>
                            <td>{ayu.respuesta}</td>
                            <td>{moment(ayu.createdAt).format('DD-MM-YYYY')}</td>
                            <td><img onClick={(e) => deleteAyuda(e, ayu._id)} className="imgBorrar"
                                     src="https://img.icons8.com/clouds/100/000000/delete-forever.png"/>
                                <img onClick={(e) => helpEditar(e, ayu.username, ayu.email, ayu._id)}
                                     className="imgEditar"
                                     src="https://img.icons8.com/cute-clipart/64/000000/edit-calendar.png"/>
                            </td>

                        </tr>
                    ))}
                </table>
            </div>

            <div className="wrapper wrapperPackage" id="wrapper-help">
                <h2>Enviar mensaje</h2>
                <form action="#">
                    <div className="input-box">
                        <input onChange={handleChange} name="title" type="text"
                               placeholder="titulo"
                               required/>
                    </div>


                    <div onChange={handleChange} className="input-box texttarea">
                            <textarea name="message"
                                      className="input-box input-file"
                                      id="fichero-tarifas" placeholder="Mensaje" required/>
                    </div>
                    <div className="input-box button button-Mensaje">
                        <input onClick={(e) => enviarMensaje(e)} type="Submit" value="Enviar"/>
                    </div>
                </form>
            </div>

        </>
    )
};

//Exportamos el userAdmin.
export default HelpAdmin;
