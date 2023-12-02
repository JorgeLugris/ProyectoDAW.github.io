import {useEffect, useState} from "react";
import moment from "moment";
import {deleteReserve, getReserves, updateReserve} from "../../services/reserveService";
import {sweetAlert, sweetAlertConfirmation} from "../../services/authService";
import {getUsers} from "../../services/userService";


const PackageAdmin = () => {
    const [reserves, setReserves] = useState([]);
    const [reserve, setReserve] = useState([]);
    const [users, setUsers] = useState([]);
    const [aux, setAux] = useState([]);

    useEffect(async () => {
        const todo = await getReserves();
        setReserves(todo.data);
    }, []);

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

    const reserveEditar = async (e, id, user, monitor, tipo, fecha) => {
        e.preventDefault();
        document.getElementById("adminReserve").style.display = "none";
        document.getElementById("wrapper-reserve").style.display = "block";
        setAux({id, user, monitor, tipo, fecha});
        setReserve({id, user, monitor, tipo, fecha});


        try {
            const usuarios = await getUsers();
            setUsers(usuarios.data);
        } catch (e) {
            console.log(e);
        }
    }

    const handleChange = (e) => {
        setReserve({
            ...reserve, [e.target.name]: e.target.value
        })
    }

    const reserveUpdate = async (e) => {
        e.preventDefault();
        setReserve({...reserve, date: moment(reserve.date).format("YYYY-MM-DD")})
        await updateReserve(reserve, aux.id);
        window.location.reload();
    }

    return (
        <>
            <div className="containerBox" id="containerBoxMonitoresReserves">
                <div className="main-container" id="adminReserve">
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Paquete</th>
                            <th>Monitor</th>
                            <th>Compra</th>
                            <th>Administrador</th>
                        </tr>
                        </thead>
                        {reserves.map(res => (
                            <tr>
                                <td>{res._id}</td>
                                <td>{res.user}</td>
                                <td>{res.monitor[0].specialty}</td>
                                <td>{res.monitor[0].name}</td>
                                <td>{moment(res.compra).format('DD-MM-YYYY')}</td>
                                <td><img onClick={(e) => reserveBorrar(e, res._id)} className="imgBorrar"
                                         src="https://img.icons8.com/clouds/100/000000/delete-forever.png"/>
                                    <img
                                        onClick={(e) => reserveEditar(e, res._id, res.user, res.monitor[0].name, res.monitor[0].specialty, res.compra)}
                                        className="imgEditar"
                                        src="https://img.icons8.com/cute-clipart/64/000000/edit-calendar.png"/>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>

            <div className="wrapper wrapper-reserve " id="wrapper-reserve">
                <h2>Actualizar reservas</h2>
                <form action="#">
                    <div className="input-box">
                        <select>
                            <option>{reserve.user}</option>
                            {users.map(us => (
                                <option value={us.username}>{us.username}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-box">
                        <select onChange={handleChange} name="type">
                            <option>{reserve.tipo}</option>
                            {aux.tipo !== "invierno" &&
                                <option value="invierno">invierno</option>
                            }
                            {aux.tipo !== "verano" &&
                                <option value="verano">verano</option>
                            }
                            {aux.tipo !== "entretiempo" &&
                                <option value="entretiempo">entretiempo</option>
                            }

                        </select>
                    </div>
                    <div className="input-box">
                        <input onChange={handleChange} type="date" name="date"
                               value={moment(reserve.fecha).format('YYYY-MM-DD')}/>

                    </div>

                    <div className="input-box button">
                        <input onClick={(e) => reserveUpdate(e)} className="button-reserve" type="Submit"
                               value="Actualizar"/>
                    </div>


                </form>
            </div>

        </>
    )
};

//Exportamos el Login.
export default PackageAdmin;
