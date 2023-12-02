import {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import {deleteReserve, getReserves} from "../../services/reserveService";
import {sweetAlert, sweetAlertConfirmation} from "../../services/authService";

const ReserveUser = () => {
    const [user, setUser] = useState("");
    const [reserves, setReserves] = useState([]);

    useEffect(async () => {
        let token = localStorage.getItem("authToken");
        let decodedToken = jwt_decode(token);
        setUser(decodedToken.username)
        const todo = await getReserves();
        setReserves(todo.data);

    });

    const reserveBorrar = async (e, id) => {
        e.preventDefault();
        try {
            const confirmacion = await sweetAlertConfirmation("reserva");
            if (confirmacion === true) {
                await sweetAlert("Reserva eliminada", "La reserva se ha eliminado correctamente", "success");
                await deleteReserve(id);
                window.location.reload();
            }
        } catch (e) {
            await sweetAlert("Error al eliminar", "El monitor no se ha podido eliminar", "error");
            console.log("No se ha podido eliminar el usuario");
        }
    }

    return (
        <>
            <div className="main-container" id="main-reserve-user">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>reserva</th>
                        <th>monitor</th>
                        <th>Administrador</th>
                    </tr>
                    </thead>

                    {reserves.map(res =>(
                        res.user == user ?
                        <tr>
                            <td>{res._id}</td>
                            <td>{res.user}</td>
                            <td>{res.monitor[0].specialty}</td>
                            <td>{res.monitor[0].name}</td>
                            <td><img onClick={(e) => reserveBorrar(e, res._id)} className="imgBorrar"
                                     src="https://img.icons8.com/clouds/100/000000/delete-forever.png"/></td>

                        </tr>
                            : null
                    ))}


                </table>
            </div>
        </>
    )
};


export default ReserveUser;
