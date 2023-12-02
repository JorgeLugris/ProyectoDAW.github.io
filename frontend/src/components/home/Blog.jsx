/*******************************Componente Blog de la Landing Page***********************************************/

//Importamos paquetes.
import {useEffect, useState} from "react";

//Importamos componentes
import {getAllBlogs, getBlogs} from "../../services/blogService";
import moment from "moment";

//Creamos el componente que exportaremos a la landing page
const Blog = () => {

    //Utilizamos el hook "useState" para guardar el estado en una variable
    const [blogs, setBlogs] = useState([]);

    //Uso de los efectos
    //Estos efectos se produce al iniciar la página o algún cambio en ella.
    useEffect(async () => {
        //Nos conectamos a la base de datos y regresamos todos los blogs
        const data = await getAllBlogs();
        setBlogs(data.data);
    });

    //Código JSX(JS + HTML = XML) que se retorna para presentarlo en pantalla.
    return (
        <>
            <section className="blogs" id="blogs">

                <div className="heading heading-Special">
                    <span>Blog y Posts</span>
                    <h1>Comparte tus aventuras</h1>
                </div>

                <div className="box-container">

                    {/*Uso de "map" para que recorra el array y muestre todos los blogs*/}
                    {blogs.map(blo => (
                        <div className="box" data-aos="fade-up" data-aos-delay="150">
                            <div className="image">
                                <img src={blo.url} alt=""/>
                            </div>
                            <div className="content">
                                <a href="#" className="link">{blo.title}</a>
                                <p>{blo.description}</p>
                                <div className="icon">
                                    <a href="#"><i
                                        /*Con la librería "moment" podemos visualizar la fecha a nuestro antojo*/
                                        className="fas fa-clock"></i>{moment(blogs.createdAt).format('DD-MM-YYYY')}</a>
                                    <a href="#"><i className="fas fa-user"></i> by {blo.user}</a>
                                </div>
                            </div>
                        </div>
                    ))};
                </div>

            </section>

        </>
    )
};

//Exportamos Blog.
export default Blog;