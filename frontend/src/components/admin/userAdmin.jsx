import {useState} from "react";
import {deleteUser, getUsers, getUser, updateUser} from "../../services/userService";
import {useEffect} from "react";
import moment from 'moment';
import {sweetAlert, sweetAlertConfirmation} from "../../services/authService";


const UserAdmin = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [file, setFile] = useState(null);


    useEffect(async () => {
        const usuarios = await getUsers();
        setUsers(usuarios.data);
    }, []);


    const userBorrar = async (e, id) => {
        e.preventDefault();
        try {
            const confirmacion = await sweetAlertConfirmation("Usuario");
            if (confirmacion === true) {
                await sweetAlert("Usuario eliminado", "El usuario se ha eliminado correctamente", "success");
                await deleteUser(id);
                window.location.reload();
            }
        } catch (e) {
            await sweetAlert("Error al eliminar", "El usuario no se ha podido eliminar", "error");
            console.log("No se ha podido eliminar el usuario");
        }
    }

    const userEditar = async (e, id) => {
        e.preventDefault();
        document.getElementById("wrapper-adminUser").style.display = "block";
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

    const handleChange = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            let formdata = new FormData();
            formdata.append('image', file);
            formdata.append('username', user.username);
            formdata.append('date', moment(user.date).format('YYYY-MM-DD'));
            formdata.append('email', user.email);
            formdata.append('phone', user.phone);
            formdata.append('role', user.role);
            formdata.append('id', user._id);
            //Enviamos los datos a la api del backend para que actualice los datos
            await updateUser(formdata);
            await sweetAlert("Usuario actualizado", "El usuario se ha actualizado correctamente", "success");
            window.location.reload();
        } catch (e) {
            await sweetAlert("Error al actualizar", "El usuario no se ha podido actualizar correctamente", "error");
            console.log(e);
        }
    }

    //Guarda la información del "file" en la variable
    const selectedHandler = (e) => {
        setFile(e.target.files[0]);
    };


    return (
        <>
            <div className="main-container" id="main-container">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Administrador</th>
                    </tr>
                    </thead>

                    {users.map(us => (
                        <tr>
                            <td>{us._id}</td>
                            <td>{us.username}</td>
                            <td>{us.email}</td>
                            <td>{us.role}</td>
                            {us.role === "USER" &&
                                <td><img onClick={(e) => userBorrar(e, us._id)} className="imgBorrar"
                                         src="https://img.icons8.com/clouds/100/000000/delete-forever.png"/>
                                    <img onClick={(e) => userEditar(e, us._id)} className="imgEditar"
                                         src="https://img.icons8.com/cute-clipart/64/000000/edit-calendar.png"/>
                                </td>
                            }
                            {us.role === "ADMIN" &&
                                <td></td>
                            }
                        </tr>
                    ))}
                </table>
            </div>

            <div className="wrapper wrapper-adminUser" id="wrapper-adminUser">
                <h2>Administrar Usuarios</h2>
                <form action="#">
                    <div className="input-box">
                        <input onChange={handleChange} type="text" name="username" placeholder="Nombre del usuario"
                               value={user.username}
                               required/>
                    </div>

                    <div className="input-box">
                        <input onChange={handleChange} type="date" name="date"
                               value={user.date} required/>
                    </div>


                    <div className="input-box">
                        <input onChange={handleChange} type="email" name="email" placeholder="Email del usuario"
                               value={user.email} required/>
                    </div>
                    <div className="input-box">
                        <input onChange={handleChange} type="number" name="phone" placeholder="Teléfono del usuario"
                               value={user.phone} required/>
                    </div>
                    <div className="input-box">
                        <input onChange={handleChange} type="text" name="role" placeholder="Rol del usuario"
                               value={user.role} required/>
                    </div>

                    <div className="input-box custom-input-file register-user"  id="imgUser">
                        <input type="file"  className="input-box input-file"
                               placeholder="Enter your imagen"  onChange={selectedHandler} required/> Subir
                        Imagen...
                    </div>
                    <div className="input-box button button-adminUser">
                        <input type="Submit" onClick={(e) => handleClick(e)} value="Actualizar"/>
                    </div>
                </form>
            </div>

        </>
    )
};

//Exportamos el userAdmin.
export default UserAdmin;
