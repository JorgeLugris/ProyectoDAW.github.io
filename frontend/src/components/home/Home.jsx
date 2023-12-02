/*******************************Componente Home de la Landing Page***********************************************/

//Importamos la imagen desde la carpeta images.
import imagen from "../../asset/images/home-bg.png"

//Creamos el componente que exportaremos a la landing page
const Home = () => {
    //Función para poner la imagen de fondo de dicho "div"
    const divStyle = {
        backgroundImage: 'url(' + imagen + ')',
    };

    //Código JSX(JS + HTML = XML) que se retorna para presentarlo en pantalla.
    return (
        <>
            { /* Imagen Principal de la pagina web*/}
            <div className="home" id="home">
                <div className="box" style={divStyle}>
                    <div className="content">
                        <span data-aos="fade-up" data-aos-delay="150">Nunca parar de...</span>
                        <h3 data-aos="fade-up" data-aos-delay="300">explorar</h3>
                        <p data-aos="fade-up" data-aos-delay="450">Atrévete a descubrir lo que te depara el destino. No esperes más para empezar tu viaje y disfrutar como nunca antes lo habías hecho con el deporte extremo... ¡WILDTRAVEL!</p>
                    </div>
                </div>
            </div>
        </>
    )
};

//Exportamos Home.
export default Home;