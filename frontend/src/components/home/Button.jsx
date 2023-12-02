/*******************************Componente del botón que sube***********************************************/

//Importamos paquetes.
import {useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faComments} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from "react-router";

//Creamos el componente que exportaremos a la landing page
const Button = () => {
    const navigate = useNavigate();

    //Uso de los efectos
    //Estos efectos se produce al iniciar la página o algún cambio en ella.
    useEffect(async () => {

        //Función que hace cambiar el estilo "scale" cuándo el scroll esta un poco por debajo de la página
        let buttonUp = document.getElementById("button-up");

        window.onscroll = function () {

            let scroll = document.documentElement.scrollTop;

            if (scroll > 500) {
                buttonUp.style.transform = "scale(1)";
            } else if (scroll < 500) {
                buttonUp.style.transform = "scale(0)";
            }

        }

    });

    //Animación del scroll y la distancia donde sube la página
    const scrollUp = (e) => {

        e.preventDefault();
        let currentScroll = document.documentElement.scrollTop;

        if (currentScroll > 0) {
            window.requestAnimationFrame(scrollUp);
            window.scrollTo(0, currentScroll - (currentScroll));
        }
    }

    const help = (e) =>{
        e.preventDefault();
        window.location.href ="/Help";
    }

//Código JSX(JS + HTML = XML) que se retorna para presentarlo en pantalla.
    return (
        <>
            <div id="button-help" onClick={(e) => help(e)}>
                <FontAwesomeIcon icon={faComments}  size={'lg'} />
            </div>
            {/*Función que hace posible la "función" del botón*/}
            <div onClick={(e) => scrollUp(e)} id="button-up">
                <i className="bote fas fa-chevron-up"></i>
            </div>

        </>
    )
};

//Exportamos Button.
export default Button