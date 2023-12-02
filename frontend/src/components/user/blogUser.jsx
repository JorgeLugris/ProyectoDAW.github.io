/*******************************Componente blog del perfil de usuario ***********************************************/

//Importamos paquetes.
import {useEffect, useState} from "react";
import moment from "moment";
import {useNavigate} from "react-router";
import jwt_decode from "jwt-decode";

//Importamos componentes
import {getBlog, getBlogs, updateBlog, deleteBlog, createBlog} from "../../services/blogService";
import {sweetAlert, sweetAlertConfirmation} from "../../services/authService";

//Importamos la imagen desde la carpeta images.
import foto from '../../asset/images/fotoBlog.png'


//Creamos el componente que exportaremos al perfil de usuario
const BlogUser = () => {

        //@navigate cuya función de dirigirnos de una página a otra
        const navigate = useNavigate();

        //Utilizamos el hook "useState" para guardar el estado en una variable
        const [blogs, setBlogs] = useState([]);
        const [blog, setBlog] = useState([]);
        const [file, setFile] = useState(null);
        const [user, setUser] = useState("");

        //Uso de los efectos
        //Estos efectos se produce al iniciar la página o algún cambio en ella.
        useEffect(async () => {
            //Obtenemos el token para saber quien ha iniciado sesión
            let token = localStorage.getItem("authToken")
            let decodedToken = jwt_decode(token);

            //Introducimos el nombre del usuario en la variable "USER"
            setUser(decodedToken.username)

            //Obtenemos todos los blogs de la base de datos para posteriormente presentarlos en la landing page
            const blogTodos = await getBlogs(decodedToken.username);

            //Introducimos todos los blogs en la variable blogs
            setBlogs(blogTodos.data);
        }, []);

        //Función que muestra el DOM a nuestro antojo
        // Además obtiene el blog de la persona que ha iniciado sesión
        const adminBlog = async (e, id) => {
            e.preventDefault();
            //Se conecta a la base de datos para obtener el blog que ha introducido la persona
            const blogUnico = await getBlog(id);
            //Introduce el blog en la variable blog único
            setBlog(blogUnico.data);
            console.log(blogUnico.data);
            document.getElementById("blogs").style.display = "none";
            document.getElementById("wrapper-crearBlog").style.display = "none";
            document.getElementById("wrapper-Blog").style.display = "block";

        }

        //Muestro los datos del usuario para poder actualizar sus datos
        const handleChange = (e) => {
            setBlog({
                ...blog, [e.target.name]: e.target.value
            });
        }


        //Guarda la información del "file" en la variable
        const selectedHandler = (e) => {
            setFile(e.target.files[0]);
        };


        //Función que actualiza el Blog
        const update = async (e, id) => {
            e.preventDefault();
            try {
                //Introducimos los datos en "formdata"
                let formdata = new FormData();
                formdata.append('image', file);
                formdata.append('title', blog.title);
                formdata.append('description', blog.description);
                formdata.append('id', id);
                //Enviamos los datos a la api del backend para que actualice los datos
                await updateBlog(formdata);
                //Si es correcto muestra una alerta
                await sweetAlert("Blog actualizado", "Usted ha actualizado su blog correctamente", "success");
                //Lo envía a la página principal
                window.location.reload();

            } catch (e) {
                //Muestra una alerta sino se ha actualizado correctamente
                await sweetAlert("actualización incorrecta", "No se ha podido actualizar su blog", "error");
                console.log("Hay un error en la aplicación");
            }
        }

        //Función que borrar el blog
        const borrar = async (e, id) => {
            e.preventDefault();
            //Le preguntamos al usuario "si esta seguro de borrar el blog"
            const confirmacion = await sweetAlertConfirmation("blog")

            if (confirmacion === true) {
                try {
                    //Envía el id a la base de datos para que pueda borrar el blog
                    await deleteBlog(id);

                } catch (e) {
                    //Muestra un mensaje de error al eliminar
                    await sweetAlert("Error al eliminar ", "No se ha podido eliminar su blog", "error");
                    console.log("Hay un error en la aplicación");
                }
            }
        }

        //Función que muestra el DOM a nuestro antojo
        const crearBlog = (e) => {
            e.preventDefault();
            document.getElementById("blogs").style.display = "none";
            document.getElementById("wrapper-Blog").style.display = "none";
            document.getElementById("wrapper-crearBlog").style.display = "block";

        }

        //Función que crea el blog
        const crear = async (e) => {
            e.preventDefault();

            try {
                if(!file || !blog.title || !blog.description || !user){
                    await sweetAlert("Rellene los campos", "Por favor, rellene todos los campos", "error");
                }else {
                    //Introducimos los datos en "formdata"
                    let formdata = new FormData();
                    formdata.append('image', file);
                    formdata.append('title', blog.title);
                    formdata.append('description', blog.description);
                    formdata.append('user', user);

                    //formdata.append('user', decodedToken.username);
                    //Enviamos los datos para que se pueda crear el blog en la api del backend
                    await createBlog(formdata)
                    //Mostramos un mensaje al usuario de que el blog se ha creado correctamente
                    await sweetAlert("Blog creado", "Usted ha creado un blog correctamente", "success");
                    //Nos dirigimos a la landing page
                    window.location.reload();
                }
            } catch (e) {
                //Nos muestra un mensaje de alerta: "No se ha podido crear el blog"
                await sweetAlert("Error al crear blog", "No se ha podido crear un blog correctamente", "error")
                console.log(e);
            }
        }

        //Código JSX(JS + HTML = XML) que se retorna para presentarlo en pantalla.
        return (
            <>
                {/*Página principal del blog*/}
                <section className="blogs blogUser" id="blogs">
                    <div className="box-container" id="box-container">
                        {/*@map recorre el array de los datos de la base de datos para poder mostrarlos*/}
                        {blogs.map(blogs => (
                            <div className="box" id="box" onClick={(e) => adminBlog(e, blogs._id)}>
                                <div className="image">
                                    <img src={blogs.url} alt=""/>
                                </div>
                                <div className="content">
                                    <a href="#" className="link">{blogs.title}</a>
                                    <p>{blogs.description}</p>
                                    <div className="icon">
                                        <a href="#"><i
                                            className="fas fa-clock"></i> {moment(blogs.createdAt).format('DD-MM-YYYY')}</a>
                                        <a href="#"><i className="fas fa-user"></i> {user}</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/*Se puede añadir más blogs*/}
                        <div className="box" id="box-special" onClick={(e) => crearBlog(e, blogs._id)}>
                            <div className="image" id="image-special">
                                <img src={foto} alt=""/>
                            </div>
                        </div>
                    </div>
                </section>
                {/*Página para administrar blogs*/}
                <div className="wrapper wrapperBlog" id="wrapper-Blog">
                    <h2>Administrar blog</h2>
                    <form action="#">
                        <div className="input-box">
                            <input onChange={handleChange} type="text" placeholder="Escribe el titulo" name="title"
                                   value={blog.title}
                                   required/>
                        </div>

                        <div className="input-box texttarea">
                            <textarea onChange={handleChange} className="input-box input-file"
                                      id="fichero-tarifas" name="description" placeholder="Descripción"
                                      value={blog.description}
                                      required/>
                        </div>
                        <div className="input-box custom-input-file package-file">
                            <input type="file" className="input-box input-file" id="fichero-tarifas"
                                   placeholder="Enter your imagen" onChange={selectedHandler} required/> Subir Imagen...
                        </div>
                        <div className="input-box button button-Mensaje">
                            <input onClick={(e) => update(e, blog._id)} type="Submit" value="Actualizar"/>
                        </div>
                        <div className="input-box button button-incorrecto">
                            <input onClick={(e) => borrar(e, blog._id)} type="Submit" value="Eliminar"/>
                        </div>
                    </form>
                </div>
                {/*Página para crear blogs*/}
                <div className="wrapper wrapperBlog" id="wrapper-crearBlog">
                    <h2>Crear blog</h2>
                    <form action="#">
                        <div className="input-box">
                            <input onChange={handleChange} type="text" placeholder="Escribe el titulo" name="title"

                                   required/>
                        </div>

                        <div className="input-box texttarea">
                            <textarea onChange={handleChange} className="input-box input-file"
                                      id="fichero-tarifas" name="description" placeholder="Descripción"

                                      required/>
                        </div>
                        <div className="input-box custom-input-file package-file">
                            <input type="file" className="input-box input-file" id="fichero-tarifas"
                                   placeholder="Enter your imagen" onChange={selectedHandler} required/> Subir Imagen...
                        </div>
                        <div className="input-box button button-Mensaje button-crearBlog">
                            <input className="button-crearBlog" id="button-crearBlog" onClick={(e) => crear(e)} type="Submit" value="Crear Blog"/>
                        </div>
                    </form>
                </div>


            </>
        )
    }
;

//Exportamos el BlogUser.
export default BlogUser;
