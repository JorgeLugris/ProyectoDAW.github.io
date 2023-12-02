/*******************************Componente Sobre Nosotros de la Landing Page***********************************************/

//Importamos los vídeos desde la carpeta video.
import video1 from "../../asset/video/video1.mp4";
import video2 from "../../asset/video/video2.mp4";
import video3 from "../../asset/video/video3.mp4";


//Creamos el componente que exportaremos a la landing page
const About = () => {
    //Función de "JavaScript" cuya función es cambiar los vídeos al darle click en los botones
    const cambiarVideo = (props) => {
        let src = document.querySelector(".control-btn" + props).getAttribute("data-src");
        document.querySelector(".video").src = src;
    }
    //Código JSX(JS + HTML = XML) que se retorna para presentarlo en pantalla.
    return (
        <>
            {/* Vídeo de presentación de la página web*/}
            <div className="about" id="about">

                <div className="video-container" data-aos="fade-right" data-aos-delay="300">
                    <video src={video1} muted autoPlay loop className="video"></video>
                    <div className="controls">
                        <span className="control-btn1" onClick={() => cambiarVideo("1")} data-src={video1}></span>
                        <span className="control-btn2" onClick={() => cambiarVideo("2")} data-src={video2}></span>
                        <span className="control-btn3" onClick={() => cambiarVideo("3")} data-src={video3}></span>
                    </div>
                </div>

                <div className="content" data-aos="fade-left" data-aos-delay="600">
                    <span>¿Por qué elegirnos?</span>
                    <h3>La naturaleza te espera</h3>
                    <p>Realizamos eventos llenos de emoción, aventura y rodeados de naturaleza. Podrás visitar lugares magníficos en las diferentes épocas del año. Diferentes destinos en los que podrás compartir aventuras con el resto de aventureros con tus mismas inquietudes.
                    </p>
                </div>
            </div>
        </>
    )
};

//Exportamos About.
export default About;