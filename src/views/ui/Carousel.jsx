




export const Carousel = () => {

    const imagen = 'https://dummyjson.com/image/400x200/008080/ffffff?text=Hello+Peter';

  return (
    
    <>
    
        <div id="carouselExampleIndicators" className="carousel slide">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>

            <div className="carousel-inner">
                <div className="carousel-item active">
                <img src={imagen} className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                <img src={imagen} className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                <img src='https://dummyjson.com/image/400x200/282828' className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                <img src={imagen}className="d-block w-100" alt="..."/>
                </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" inert></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" inert></span>
                <span className="visually-hidden">Next</span>
            </button>

        </div>
    </>

  )
}
