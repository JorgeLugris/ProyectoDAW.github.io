import aventuras from '../../asset/images/aventuras.jpg';
import administrador from '../../asset/images/administrador4.jpg';
import {useEffect, useState} from "react";
import moment from "moment";
import {createPackage, deletePackage, getPackages, getPackage, updatePackage} from "../../services/packageService";
import {sweetAlert, sweetAlertConfirmation} from "../../services/authService";


const PackageAdmin = () => {
    const [file, setFile] = useState(null);
    const [titulo, setTitulo] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [packages, setPackages] = useState([]);
    const [pack, setPack] = useState([]);

    useEffect(async () => {
        const paquetes = await getPackages();
        setPackages(paquetes.data);

    }, []);

    const crearPackages = (e) => {
        e.preventDefault();
        document.getElementById("boxPackage1").style.display = "none";
        document.getElementById("boxPackage2").style.display = "none";
        document.getElementById("wrapper-Package").style.display = "block";

    }

    const adminPackages = (e) => {
        e.preventDefault();
        document.getElementById("boxPackage1").style.display = "none";
        document.getElementById("boxPackage2").style.display = "none";
        document.getElementById("adminPackages").style.display = "block";

    }

    const selectedHandler = (e) => {
        setFile(e.target.files[0]);
    };


    const sendHandler = async (e) => {
        //Cancela el evento por defecto.
        e.preventDefault();
        try {
            if(!file || !titulo || !type || !description){
                await sweetAlert("Rellene los campos", "Por favor, rellene todos los campos", "error");
            } else{
                let formdata = new FormData();
                formdata.append('image', file);
                formdata.append('title', titulo);
                formdata.append('type', type);
                formdata.append('description', description);
                await createPackage(formdata);
                await sweetAlert("Paquete creado", "Se ha creado el paquete correctamente", "success");
                window.location.reload();
            }


        } catch (e) {
            await sweetAlert("Error al crear paquete", "No se ha podido crear el paquete", "error");
            console.log("Hay un error en la aplicación");
        }
    }


    const packageBorrar = async (e, id) => {
        e.preventDefault();
        try {
            const confirmacion = await sweetAlertConfirmation("paquete");
            if (confirmacion === true) {
                await sweetAlert("Paquete eliminado", "El paquete se ha eliminado correctamente", "success");
                await deletePackage(id);
                window.location.reload();
            }
        } catch (e) {
            await sweetAlert("Error al eliminar", "El paquete no se ha podido eliminar", "error");
            console.log("No se ha podido eliminar el usuario");
        }

    }

    const packageAdmin = async (e, id) => {
        document.getElementById("adminPackages").style.display = "none";
        document.getElementById("wrapper-PackageAdmin").style.display = "block";
        const paquete = await getPackage(id);
        setPack(paquete.data);
    }
    const handleChange = (e) => {
        setPack({
            ...pack, [e.target.name]: e.target.value
        })
    }

    const sendHandler2 = async (e) => {
        //Cancela el evento por defecto.
        e.preventDefault();
        try {
            let formdata = new FormData();
            console.log(file);
            formdata.append('image', file);
            formdata.append('title', pack.title);
            formdata.append('type', pack.type);
            formdata.append('description', pack.description);
            formdata.append('id', pack._id)
            await updatePackage(formdata);
            await sweetAlert("Paquete actualizado", "El paquete se ha actualizado correctamente", "success");
            window.location.reload();

        } catch (e) {
            await sweetAlert("Error al actualizar", "El paquete no se ha podido actualizar correctamente", "error");
            console.log("Hay un error en la aplicación");
        }
    }


    return (
        <>
            <div className="containerBox" id="containerBoxPackages">
                <div className="box" id="boxPackage1">
                    <div className="content">
                        <img src={aventuras} alt=""/>
                        <h2>A Ñ A D I R<br/><span>Paquetes</span></h2>
                        <a href="#" onClick={(e) => crearPackages(e)}>Pulse Aquí</a>
                    </div>
                </div>
                <div className="box" id="boxPackage2">
                    <div className="content">
                        <img src={administrador} alt=""/>
                        <h2>A D M I N I S T R A R<br/><span>Paquetes</span></h2>
                        <a href="#" onClick={(e) => adminPackages(e)}>Pulse Aquí</a>
                    </div>
                </div>

                <div className="wrapper wrapperPackage" id="wrapper-Package">
                    <h2>Registro de Paquetes</h2>
                    <form action="#">
                        <div className="input-box">
                            <input type="text" placeholder="titulo" onChange={(e) => setTitulo(e.target.value)}
                                   required/>
                        </div>
                        <div className="input-box">
                            <select onChange={(e) => setType(e.target.value)}>
                                <option>Tipo de Paquete</option>
                                <option value="invierno">Invierno</option>
                                <option value="verano">Verano</option>
                                <option value="entretiempo">Entretiempo</option>
                            </select>
                        </div>

                        <div className="input-box texttarea">
                            <textarea className="input-box input-file"
                                      id="fichero-tarifas" placeholder="Descripción"
                                      onChange={(e) => setDescription(e.target.value)} required/>
                        </div>
                        <div className="input-box custom-input-file package-file">
                            <input type="file" className="input-box input-file" id="imgPackage"
                                   placeholder="Enter your email" onChange={selectedHandler} required/> Subir Imagen...
                        </div>
                        <div className="input-box button button-Mensaje">
                            <input type="Submit" onClick={sendHandler} value="Subir a la BBDD"/>
                        </div>
                    </form>
                </div>

                <div className="main-container" id="adminPackages">
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Titulo</th>
                            <th>Descripción</th>
                            <th>Tipo</th>
                            <th>Creación</th>
                            <th>Administrador</th>
                        </tr>
                        </thead>
                        {packages.map(pack => (
                            <tr>
                                <td>{pack._id}</td>
                                <td>{pack.title}</td>
                                <th>{pack.description}</th>
                                <td>{pack.type}</td>
                                <td>{moment(pack.createdAt).format('DD-MM-YYYY')}</td>
                                <td><img onClick={(e) => packageBorrar(e, pack._id)} className="imgBorrar"
                                         src="https://img.icons8.com/clouds/100/000000/delete-forever.png"/>
                                    <img onClick={(e) => packageAdmin(e, pack._id)} className="imgEditar"
                                         src="https://img.icons8.com/cute-clipart/64/000000/edit-calendar.png"/>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>

                <div className="wrapper wrapperPackage" id="wrapper-PackageAdmin">
                    <h2>Actualizar Paquetes</h2>
                    <form action="#">
                        <div className="input-box">
                            <input onChange={handleChange} name="title" value={pack.title} type="text"
                                   placeholder="titulo"
                                   required/>
                        </div>

                        <div className="input-box">
                            <select onChange={handleChange} name="type" value={pack.type}>
                                <option>Tipo de Paquete</option>
                                <option value="invierno">Invierno</option>
                                <option value="verano">Verano</option>
                                <option value="entretiempo">Entretiempo</option>
                            </select>
                        </div>

                        <div className="input-box texttarea">
                            <textarea onChange={handleChange} name="description" value={pack.description}
                                      className="input-box input-file"
                                      id="fichero-tarifas" placeholder="Descripción" required/>

                        </div>
                        <div className="input-box custom-input-file package-file">
                            <input onChange={selectedHandler} type="file" className="input-box input-file"
                                   id="fichero-tarifas"
                                   placeholder="Enter your email" required/> Subir Imagen...
                        </div>
                        <div className="input-box button button-Mensaje">
                            <input type="Submit" onClick={sendHandler2} value="Actualizar"/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

//Exportamos el Login.
export default PackageAdmin;
