import img from '../asset/images/contact-img.svg';
import NavBar from "../components/layout/NavBar";
import {useEffect, useState} from "react";
import AOS from "aos";
import {sweetAlert} from "../services/authService";
import {useNavigate} from "react-router";
import {createHelp} from "../services/helpService";



const HelpView = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState([]);

    useEffect(() => {

        AOS.init({
            duration: 800, offset: 200,
        });

    },[]);
        document.addEventListener("DOMContentLoaded", function () {
            setTimeout(function () {
                AOS.refresh();
            }, 500);
            let accordion = document.querySelectorAll('.faq .accordion-container .accordion');
            document.getElementById("accrodion-content").style.display = "none";

            accordion.forEach(acco => {
                acco.onclick = () => {
                    accordion.forEach(remove => {
                        remove.classList.remove('active')
                    })
                    acco.classList.add('active');
                }
            });
        });




    const handleChange = (e) => {
        setMessage({
            ...message, [e.target.name]: e.target.value
        })
    }

    const enviar = async (e) => {
        e.preventDefault();
        if(!message.username || !message.email || !message.message){
            await sweetAlert("No se ha podido enviar mensaje", "Faltan campos por completar", "error");
        } else{
            await createHelp(message)
            await sweetAlert("Mensaje enviado", "Le contestaremos en la mayor brevedad posible.", "success");
            navigate("/");
        }


    }

    return (
        <>
            <NavBar name="help"/>

            <section className="faq" id="faq">

                <div className="heading heading-Ayuda">
                    <span>F.A.Q.S</span>
                    <h1>Preguntas frecuentes</h1>
                </div>

                <div className="accordion-container">

                    <div className="accordion active" id="accrodion-content">
                    </div>

                    <div data-aos="zoom-in-up" data-aos-delay="150" className="accordion">
                        <div className="accordion-heading">
                            <span>¿Puedo reservar para varias personas? </span>
                            <i className="fas fa-angle-down"></i>
                        </div>
                        <p className="accrodion-content" id="accrodion-content">
                            Por supuesto, una vez selecciones el paquete puedes elegir el número de personas con las que asistirás al evento. Solo tendrás que rellenar el formulario con sus datos.
                        </p>
                    </div>
                    <div data-aos="zoom-in-up" data-aos-delay="300" className="accordion">
                        <div className="accordion-heading">
                            <span>¿Cómo puedo realizar el pago?</span>
                            <i className="fas fa-angle-down"></i>
                        </div>
                        <p className="accrodion-content" id="accrodion-content">
                            Disponemos de diferentes métodos de pago para facilitar su reserva, PayPal, Tarjeta, Visa...
                        </p>
                    </div>
                    <div data-aos="zoom-in-up" data-aos-delay="450" className="accordion">
                        <div className="accordion-heading">
                            <span>¿Puedo asistir al evento con mi mascota?</span>
                            <i className="fas fa-angle-down"></i>
                        </div>
                        <p className="accrodion-content" id="accrodion-content">
                            Sólo será posible en los eventos que así lo indiquen para que todos puedan disfrutar.
                        </p>
                    </div>
                    <div data-aos="zoom-in-up" data-aos-delay="600" className="accordion">
                        <div className="accordion-heading">
                            <span>¿Puedo asistir si soy menor?</span>
                            <i className="fas fa-angle-down"></i>
                        </div>
                        <p className="accrodion-content" id="accrodion-content">
                            Los menores deberán ir acompañados por un adulto, sin embargo no todos los eventos serán aptos para menores.
                        </p>
                    </div>

                    <div data-aos="zoom-in-up" data-aos-delay="750" className="accordion">
                        <div className="accordion-heading">
                            <span>¿Incluye desplazamiento hasta el lugar?</span>
                            <i className="fas fa-angle-down"></i>
                        </div>
                        <p className="accrodion-content" id="accrodion-content">
                            En algunos paquetes estará incluido y en otros os recomendamos las mejores opciones y ofertas.
                        </p>
                    </div>

                    <div data-aos="zoom-in-up" data-aos-delay="900" className="accordion">
                        <div className="accordion-heading">
                            <span>¿Contamos con un seguro de accidente?</span>
                            <i className="fas fa-angle-down"></i>
                        </div>
                        <p className="accrodion-content" id="accrodion-content">
                            Sí, va incluido en todos nuestros paquetes para el bienestar y seguridad de nuestros clientes.
                        </p>
                    </div>


                    <div data-aos="zoom-in-up" data-aos-delay="1050" className="accordion">
                        <div className="accordion-heading">
                            <span>¿Puedo cancelar mi reserva?</span>
                            <i className="fas fa-angle-down"></i>
                        </div>
                        <p className="accrodion-content" id="accrodion-content">
                            Sí, puedes cancelar su reserva en cualquier momento. Excepto una semana antes que el empiece dicho evento.
                        </p>
                    </div>
                    <div data-aos="zoom-in-up" data-aos-delay="1200" className="accordion">
                        <div className="accordion-heading">
                            <span>¿Tenemos que llevarnos los equipos?</span>
                            <i className="fas fa-angle-down"></i>
                        </div>
                        <p className="accrodion-content" id="accrodion-content">
                            En este caso es lo que prefiera el cliente. El cliente puede alquilarnos dicha equipación o puede utilizarse la suya propia.
                        </p>
                    </div>

                </div>

            </section>
            <section data-aos="zoom-in-up" data-aos-delay="150" className="contact" id="contact">
                <div className="heading heading-Ayuda">
                    <span>Te ayudamos</span>
                    <h1>¿Necesitas ayuda?</h1>
                </div>
                <div data-aos="zoom-in-up" data-aos-delay="300" className="row">
                    <div className="image">
                        <img src={img} alt=""/>
                    </div>

                    <form action="#">
                        <span data-aos="fade-up" data-aos-delay="200">Nombre</span>
                        <input onChange={handleChange} data-aos="fade-up" data-aos-delay="200" type="text" required
                               placeholder="ingrese tu nombre" maxLength="50" name="username"
                               className="box"/>
                        <span data-aos="fade-up" data-aos-delay="350">Email</span>
                        <input onChange={handleChange} data-aos="fade-up" data-aos-delay="300" type="email" required
                               placeholder="ingrese su email" maxLength="50"
                               name="email"
                               className="box"/>

                        <span data-aos="fade-up" data-aos-delay="450">Mensaje</span>
                        <textarea onChange={handleChange} data-aos="fade-up" data-aos-delay="600" name="message"
                                  required placeholder="ingrese su mensaje"
                                  className="box"/>

                        <input type="submit" onClick={(e) => enviar(e)} value="Enviar mensaje" className="btn"
                               name="send"/>
                    </form>

                </div>

            </section>
        </>
    )
}

export default HelpView;
