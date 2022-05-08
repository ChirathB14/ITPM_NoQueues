import React from 'react';
import park1 from "../../assets/images/slider1.jpg";
import park2 from "../../assets/images/carbackimage2.jpg";
import park3 from "../../assets/images/backimage1.jpg";
import park4 from "../../assets/images/navigation.jpg";
import park5 from "../../assets/images/ticket.jpg";



function slider(){

return(
  <div>
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
    </div>
    <div class="carousel-inner">
        <div class="carousel-item active">
        <img src={park1} class="d-block" width="100%" height="500" alt="..."></img>
       
        </div>
        <div class="carousel-item">
        <img src={park2} class="d-block" width="100%" height="500" alt="..."></img>
       
        </div>
        <div class="carousel-item">
        <img src={park3} class="d-block" width="100%" height="500" alt="..."></img>
       
        </div>
        <div class="carousel-item">
        <img src={park4} class="d-block" width="100%" height="500" alt="..."></img>
       
        </div>
        <div class="carousel-item">
        <img src={park5} class="d-block" width="100%" height="500" alt="..."></img>
       
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
    </div>

    </div>
)
}


export default slider;
