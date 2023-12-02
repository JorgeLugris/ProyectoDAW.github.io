import galeria1 from "../../asset/images/gallery-img-1.jpg";
import galeria2 from "../../asset/images/gallery-img-2.jpg";
import galeria4 from "../../asset/images/gallery-img-4.jpg";
import galeria5 from "../../asset/images/gallery-img-5.jpg";
import galeria7 from "../../asset/images/gallery-img-7.jpg";
import galeria8 from "../../asset/images/gallery-img-8.jpg";




const Gallery = () => {
    return (
        <>
            <section className="gallery" id="gallery">

                <div className="heading">
                    <span>Galería</span>
                    <h1>Nuestros Destinos </h1>
                </div>

                <div className="box-container">

                    <div className="box" data-aos="zoom-in-up" data-aos-delay="150">
                        <img src={galeria1} alt=""/>
                            <span>Lugar del viaje</span>
                            <h3>Islas Canarias</h3>
                    </div>

                    <div className="box" data-aos="zoom-in-up" data-aos-delay="300">
                        <img src={galeria2} alt=""/>
                            <span>Lugar del viaje</span>
                            <h3>Portugal</h3>
                    </div>



                    <div className="box" data-aos="zoom-in-up" data-aos-delay="150">
                        <img src={galeria4} alt=""/>
                            <span>Lugar del viaje</span>
                            <h3>Andorra</h3>
                    </div>

                    <div className="box" data-aos="zoom-in-up" data-aos-delay="300">
                        <img src={galeria5} alt=""/>
                            <span>Lugar del viaje</span>
                            <h3>España</h3>
                    </div>


                    <div className="box" data-aos="zoom-in-up" data-aos-delay="150">
                        <img src={galeria7} alt=""/>
                            <span>Lugar del viaje</span>
                            <h3>Islandia</h3>
                    </div>

                    <div className="box" data-aos="zoom-in-up" data-aos-delay="300">
                        <img src={galeria8} alt=""/>
                            <span>Lugar del viaje</span>
                            <h3>Finlandia</h3>
                    </div>


                </div>

            </section>

        </>
)
};

export default Gallery;


