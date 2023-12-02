/*******************************Componente Monitor de la Landing Page***********************************************/

//Importamos paquetes.
import {useEffect, useState} from "react";

//Importamos componentes
import {getMonitors} from "../../services/monitorService";

//Creamos el componente que exportaremos a la landing page
const Monitor = () => {

    //Utilizamos el hook "useState" para guardar el estado en una variable
    const [monitors, setMonitors] = useState([]);

    //Uso de los efectos
    //Estos efectos se produce al iniciar la página o algún cambio en ella.
    useEffect(async () => {

        //Nos conectamos a la base de datos y regresamos todos los monitores
        const res = await getMonitors()
        setMonitors(res.data);

    }, []);

//Código JSX(JS + HTML = XML) que se retorna para presentarlo en pantalla.
    return (
        <>
            <div className="monitor" id="monitor">
                <div className="heading">
                    <span>Nuestros Monitores</span>
                    <h1>Haz que sean tus monitores</h1>
                </div>

                <div className="box-container">
                    {/*Uso de "map" para que recorra el array y muestre todos los monitores*/}
                    {monitors.map(mon => (
                        <article data-aos="fade-up">
                            <div className="specialist__image">
                                <img className="imgMonitores" src={mon.url} alt=""/>
                            </div>
                            <div className="specialist__details">
                                <h4>{mon.name}</h4>
                                <p>Monitor {mon.specialty}</p>
                            </div>
                            <div className="specialist__socials">
                                <a href="https://linkedin.com" target="_blank"><i
                                    className="bx bxl-linkedin"></i></a>
                                <a href="https://twitter.com" target="_blank"><i className="bx bxl-twitter"></i></a>
                                <a href="https://facebook.com" target="_blank"><i
                                    className="bx bxl-facebook"></i></a>
                                <a href="https://linstagram.com" target="_blank"><i
                                    className="bx bxl-instagram"></i></a>
                            </div>
                            <a href="https://api.whatsapp.com/send?phone=662114756"
                               className="specialist__whatsapp"
                               target="_blank"><i
                                className="bx bxl-whatsapp"/></a>
                        </article>
                    ))}

                </div>
            </div>
        </>
    )
};
//Exportamos Monitor.
export default Monitor;