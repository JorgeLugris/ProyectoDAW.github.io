//Importamos paquetes.
import {useState} from "react";

//Importamos componentes.
import {sendNewsletter} from "../../services/newsletterService";
import {expresiones, sweetAlert} from "../../services/authService";

//Contenido del componente (Footer) que vamos a exportar.
const Footer = () => {
    //Uso de estados
    //El uso de estados permite cambiar de estado en cualquier momento.
    //Siendo @email la variable y @setEmail para cambiarla.
    const [email, setEmail] = useState("");

    //Cambia el estado de "email" por los valores que ha ingresado en la newsletter.
    const handleChange = (e) => {
        setEmail({
            ...email, [e.target.name]: e.target.value
        })
    };

    //Función que permite conectarnos a la base de datos para enviar dicho email.
    const newsletter = async (e) => {
        e.preventDefault();
        const validacion = expresiones.email.test(email.email);
        if (validacion) {
            // Try/Catch por si hay errores que no se pare la aplicación

            try {
                //Conexión con la base de datos para permitir enviar el email
                await sendNewsletter(email);
                //Una vez que el email es enviado le mostramos al usuario que reviso su cuenta.
                await sweetAlert("Se ha registrado a nuestro newsletter", `Por favor revise el correo: ${email.email}`, "success");
            } catch (e) {
                //Información por la consola por si hay cualquier error
                console.log("No se ha podido enviar correctamente")
            }
        } else {
            await sweetAlert("Newsletter cancelada", "Ha ingresado un email incorrecto o inexistente", "question")
        }

    }

//Código JSX(JS + HTML = XML) que se retorna para presentarlo en pantalla.
    return (
        <>
            <section className="footer">
                <div className="box-container">
                    <div className="box" data-aos="fade-up" data-aos-delay="150">
                        <a href="#" className="logo"> <i className="fas fa-paper-plane"></i>WildTravel </a>
                        <p>No te olvides de seguirnos en nuestras principales redes sociales para obtener toda la
                            información! <br/></p>
                        <div className="share">
                            <a href="https://facebook.com/" className="fab fa-facebook-f"></a>
                            <a href="https://twitter.com/" className="fab fa-twitter"></a>
                            <a href="https://instagram.com/" className="fab fa-instagram"></a>
                            <a href="https://linkedin.com/" className="fab fa-linkedin"></a>
                        </div>
                    </div>

                    <div className="box" data-aos="fade-up" data-aos-delay="300">
                        <h3>Links Rápidos</h3>
                        <a href="#home" className="links"> <i className="fas fa-arrow-right"></i> Home </a>
                        <a href="#about" className="links"> <i className="fas fa-arrow-right"></i> Sobre nosotros</a>
                        <a href="##paquetes" className="links"> <i className="fas fa-arrow-right"></i> Paquetes
                        </a>
                        <a href="#services" className="links"> <i className="fas fa-arrow-right"></i> Servicios </a>
                        <a href="#gallery" className="links"> <i className="fas fa-arrow-right"></i> Galerías </a>
                        <a href="#blogs" className="links"> <i className="fas fa-arrow-right"></i> Blogs </a>
                    </div>

                    <div className="box" data-aos="fade-up" data-aos-delay="450">
                        <h3>Información contacto</h3>
                        <p><i className="fas fa-map"></i> A Coruña, España </p>
                        <p><i className="fas fa-phone"></i> +34 666 65 65 65 </p>
                        <p><i className="fas fa-envelope"></i> WildTravel@gmail.com </p>
                        <p><i className="fas fa-clock"></i> 7:00am - 10:00pm </p>
                    </div>

                    <div className="box" data-aos="fade-up" data-aos-delay="600">
                        <h3>Newsletter</h3>
                        <p>Suscríbete para las últimas noticias</p>
                        <form action="">
                            {/*@handleChange es la función que permite obtener el valor que ha escrito el usuario*/}
                            <input type="email" onChange={handleChange} name="email" placeholder="Ingrese su email"
                                   className="email" id="email"/>
                            {/*@newsletter es la función que al darle "click comienza la conexión con la base de datos"*/}
                            <input type="submit" onClick={(e) => newsletter(e)} value="Suscribirse" className="btn"/>
                        </form>
                    </div>

                </div>

            </section>

        </>
    )
};

//Exportamos el Footer.
export default Footer;
