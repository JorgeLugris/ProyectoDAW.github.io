/*******************************Componente Service de la Landing Page***********************************************/

//Creamos el componente que exportaremos a la landing page
const Service = () => {

    //Código JSX(JS + HTML = XML) que se retorna para presentarlo en pantalla.
    return (
        <>
            <div className="services" id="services">

                <div className="heading">
                    <span>Nuestros Servicios</span>
                    <h1>Innumerables experiencias</h1>
                </div>

                <div className="box-container">

                    <div className="box" data-aos="zoom-in-up" data-aos-delay="150">
                        <i className="fas fa-globe"></i>
                        <h3>Vuelta al mundo</h3>
                        <p>Destinos nacionales e internacionales, para disfrutar de los mejores paisajes.</p>
                    </div>

                    <div className="box" data-aos="zoom-in-up" data-aos-delay="300">
                        <i className="fas fa-hiking"></i>
                        <h3>Aventuras</h3>
                        <p>Diferentes rutas, eventos, deportes y aventuras para que escojas el que más se adapta a ti.</p>
                    </div>

                    <div className="box" data-aos="zoom-in-up" data-aos-delay="450">
                        <i className="fas fa-utensils"></i>
                        <h3>Comida y bebida</h3>
                        <p>Disponibilidad de una amplia gama de menús o catering dependiendo del evento.</p>
                    </div>

                    <div className="box" data-aos="zoom-in-up" data-aos-delay="600">
                        <i className="fas fa-hotel"></i>
                        <h3>Hoteles Confortables</h3>
                        <p>Ofertas y descuentos en los mejores hoteles cerca del lugar de destino.</p>
                    </div>

                    <div className="box" data-aos="zoom-in-up" data-aos-delay="750">
                        <i className="fas fa-wallet"></i>
                        <h3>Precios Competitivos</h3>
                        <p>Los mejores precios para que puedas disfrutar de una gran experiencia.</p>
                    </div>

                    <div className="box" data-aos="zoom-in-up" data-aos-delay="900">
                        <i className="fas fa-headset"></i>
                        <h3>24/7 Atención al cliente</h3>
                        <p>Siempre a tu disposición para resolver cualquier tipo de duda y cubrir tus necesidades.</p>
                    </div>

                </div>
            </div>

        </>
    )
};

//Exportamos Service.
export default Service;