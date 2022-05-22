import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap'


export default class CommonSlider extends Component {
    render() {
        return (
            // <Container>
            <Carousel style={{ marginTop: '15px' }}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        style={{ opacity: '0.7' }}
                        src="https://www.novotelphuketkamala.com/wp-content/uploads/sites/54/2022/01/TASTE_OF_THAILAND_1920x1005px--1500x400.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption style={{ backgroundColor: '#000000', opacity: '0.8' }}>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        style={{ opacity: '0.7' }}
                        src="https://www.novotelphuketkamala.com/wp-content/uploads/sites/54/2022/01/TASTE_OF_THAILAND_1920x1005px--1500x400.jpg"
                        alt="Second slide"
                    />
                    <Carousel.Caption style={{ backgroundColor: '#000000', opacity: '0.8' }}>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        style={{ opacity: '0.7' }}
                        src="https://www.novotelphuketkamala.com/wp-content/uploads/sites/54/2022/01/TASTE_OF_THAILAND_1920x1005px--1500x400.jpg"
                        alt="Third slide"
                    />
                    <Carousel.Caption style={{ backgroundColor: '#000000', opacity: '0.8' }}>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            // </Container>
        )
    }
}
