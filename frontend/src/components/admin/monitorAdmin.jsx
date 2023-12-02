import nuevo1 from '../../asset/images/nuevo1.jpg';
import nuevo2 from '../../asset/images/nuevo2.jpg';
import {useEffect, useState} from "react";
import {deleteMonitor, getMonitors, getMonitor, updateMonitor, createMonitor} from "../../services/monitorService";
import moment from "moment";
import {sweetAlert, sweetAlertConfirmation} from "../../services/authService";



const MonitorAdmin = () => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [id, setId] = useState("");
    const [monitors, setMonitors] = useState([]);
    const [monitor, setMonitor] = useState([]);

    useEffect(async () => {
        const monitores = await getMonitors();
        setMonitors(monitores.data);
    }, []);

    const crearMonitores = (e) => {
        e.preventDefault();
        document.getElementById("box1").style.display = "none";
        document.getElementById("box2").style.display = "none";
        document.getElementById("wrapper-Monitor").style.display = "block";

    }

    const adminMonitores = (e) => {
        e.preventDefault();
        document.getElementById("box1").style.display = "none";
        document.getElementById("box2").style.display = "none";
        document.getElementById("wrapper-adminMonitor").style.display = "none";
        document.getElementById("adminMonitor").style.display = "block";


    }

    const selectedHandler = (e) => {
        setFile(e.target.files[0]);
    };


    const sendHandler = async (e) => {
        //Cancela el evento por defecto.
        e.preventDefault();

        try {
            if(!file || !name || !specialty ){
                await sweetAlert("Rellene los campos", "Por favor, rellene todos los campos", "error");
            } else {
                let formdata = new FormData();
                formdata.append('image', file);
                formdata.append('name', name);
                formdata.append('specialty', specialty);
                await createMonitor(formdata);
                await sweetAlert("Monitor creado", "Se ha creado el monitor correctamente", "success");
                window.location.reload();
            }

        } catch (e) {
            await sweetAlert("Error al crear Monitor","No se ha podido crear el monitor", "error");
            console.log("Hay un error en la aplicación");
        }
    }



    const sendHandler2 = async (e) => {
        //Cancela el evento por defecto.
        e.preventDefault();
        try {
            let formdata = new FormData();
            formdata.append('image', file);
            formdata.append('name', monitor.name);
            formdata.append('specialty', monitor.specialty);
            formdata.append('id', id)
            await updateMonitor(formdata);
            await sweetAlert("Monitor actualizado", "El monitor se ha actualizado correctamente", "success");
            window.location.reload();

        } catch (e) {
            await sweetAlert("Error al actualizar", "El monitor no se ha podido actualizar correctamente", "error");
            console.log("Hay un error en la aplicación");
        }
    }

    const monitorBorrar = async (e, id) => {
        e.preventDefault();
        try {
            const confirmacion = await sweetAlertConfirmation("monitor");
            if (confirmacion === true) {
                await sweetAlert("Monitor eliminado", "El monitor se ha eliminado correctamente", "success");
                await deleteMonitor(id);
                window.location.reload();
            }
        } catch (e) {
            await sweetAlert("Error al eliminar", "El monitor no se ha podido eliminar", "error");
            console.log("No se ha podido eliminar el usuario");
        }
    }

    const monitorAdmin = async (e, id) => {
        e.preventDefault();
        document.getElementById("box1").style.display = "none";
        document.getElementById("box2").style.display = "none";
        document.getElementById("adminMonitor").style.display = "none";
        document.getElementById("wrapper-adminMonitor").style.display = "block";

        const monito = await getMonitor(id);
        setId(id);
        setMonitor(monito.data);
        console.log(monitor);
    }

    const handleChange = (e) =>{
            setMonitor({
                ...monitor, [e.target.name]: e.target.value
            })
    }

    return (
        <>
            <div className="containerBox" id="containerBoxMonitores">
                <div className="box" id="box1">
                    <div className="content">
                        <img src={nuevo2} alt=""/>
                        <h2>A Ñ A D I R<br/><span>Monitores</span></h2>
                        <a href="#" onClick={(e) => crearMonitores(e)}>Pulse Aquí</a>
                    </div>
                </div>
                <div className="box" id="box2">
                    <div className="content">
                        <img src={nuevo1} alt=""/>
                        <h2>A D M I N I S T R A R<br/><span>Monitores</span></h2>
                        <a href="#" onClick={(e) => adminMonitores(e)}>Pulse Aquí</a>
                    </div>
                </div>

                <div className="wrapper wrapper-Monitor " id="wrapper-Monitor">
                    <h2>Registro de Monitores</h2>
                    <form action="#">
                        <div className="input-box">
                            <input type="text" placeholder="Nombre del monitor"
                                   onChange={(e) => setName(e.target.value)} required/>
                        </div>
                        <div className="input-box">
                            <select  onChange={(e) => setSpecialty(e.target.value)}  >
                                <option>Tipo de Paquete</option>
                                <option value="invierno">Invierno</option>
                                <option value="verano">Verano</option>
                                <option value="entretiempo">Entretiempo</option>
                            </select>
                        </div>
                        <div className="input-box custom-input-file">
                            <input type="file" className="input-box input-file" id="fichero-tarifas"
                                   placeholder="Enter your email" onChange={selectedHandler} required/> Subir Imagen...
                        </div>
                        <div className="input-box button">
                            <input className="button-Monitor" onClick={sendHandler} type="Submit" value="Subir a la BBDD"/>
                        </div>
                    </form>
                </div>

                <div className="main-container" id="adminMonitor">
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Especialidad</th>
                            <th>Creación</th>
                            <th>Administrador</th>
                        </tr>
                        </thead>
                        {monitors.map(mon => (
                            <tr>
                                <td>{mon._id}</td>
                                <td>{mon.name}</td>
                                <td>Monitor {mon.specialty}</td>
                                <td>{moment(mon.createdAt).format('DD-MM-YYYY')}</td>
                                <td><img onClick={(e) => monitorBorrar(e, mon._id)} className="imgBorrar"
                                         src="https://img.icons8.com/clouds/100/000000/delete-forever.png"/>
                                    <img onClick={(e) => monitorAdmin(e, mon._id)} className="imgEditar"
                                         src="https://img.icons8.com/cute-clipart/64/000000/edit-calendar.png"/>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>

                <div className="wrapper wrapper-Monitor " id="wrapper-adminMonitor">
                    <h2>Actualizar Monitores</h2>
                    <form action="#">
                        <div className="input-box">
                            <input onChange={handleChange} type="text" name="name" placeholder="Nombre del monitor"
                                   value={monitor.name} required/>
                        </div>
                        <div className="input-box">
                            <select onChange={handleChange} name="specialty" value = {monitor.specialty}  >
                                <option>Tipo de Paquete</option>
                                <option value="invierno">Invierno</option>
                                <option value="verano">Verano</option>
                                <option value="entretiempo">Entretiempo</option>
                            </select>
                        </div>
                        <div className="input-box custom-input-file">
                            <input  type="file" className="input-box input-file" id="fichero-tarifas"
                                   placeholder="Enter your email" onChange={selectedHandler}  required/> Subir Imagen...
                        </div>
                        <div className="input-box button">
                            <input className="button-Monitor" onClick={sendHandler2} type="Submit" value="Actualizar"/>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
};

//Exportamos el Login.
export default MonitorAdmin;
