import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap'


export default class LandingSlider extends Component {
    render() {
        return (
            // <Container>
            <Carousel style={{ marginTop: '15px' }}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        style={{ opacity: '25' }}
                        src="https://www.linqia.com/wp-content/uploads/2017/05/INSPIRED-Linqia-Email-Subheading.FOOD_.jpeg"
                        alt="First slide"
                    />
                    
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        style={{ opacity: '25' }}
                        src="https://api.dineoncampus.com/files/images/1b3bc1fc-bc79-48f9-86d0-ad230a902c42.jpg"
                        alt="Second slide"
                    />
                    
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        style={{ opacity: '25' }}
                        src="https://3989ac5bcbe1edfc864a-0a7f10f87519dba22d2dbc6233a731e5.ssl.cf2.rackcdn.com/metroeastnhc/recipe-photos/dinner_header.jpg"
                        alt="Third slide"
                    />
                    
                </Carousel.Item>
            </Carousel>
            // </Container>
        )
    }
}
