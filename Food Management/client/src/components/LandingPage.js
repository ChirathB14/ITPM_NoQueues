import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import LandingSlider from './Sliders/LandingSlider'

export default class LandingPage extends Component {
    render() {
        return (
            <div className="container-fluid text-center d-flex " style={{marginTop:'50px'}}>
                <Row>
                    <Col sm={7}>
                        <LandingSlider />
                    </Col>
                    <Col sm={5}>
                        <div className="container text-center">
                            <Row>
                                <button className="btn btn-success" style={{ marginTop: '50px', padding: '10px', height: '10vh' }}>
                                    <a href="/register" style={{ textDecoration: 'none', color: 'white', fontSize: '24px' }}>
                                        Add New Food Item &nbsp;&nbsp;
                                        <i className="fa fa-user-plus fa-lg" aria-hidden="true"></i>
                                    </a>
                                </button>
                            </Row>
                          { /* <Row>
                                <button className="btn btn-primary" style={{ marginTop: '50px', padding: '10px', height: '10vh' }}>
                                    <a href="#customerlogin" style={{ textDecoration: 'none', color: 'white', fontSize: '24px' }}>
                                        Customer Login&nbsp;&nbsp;
                                        <i className="fa fa-sign-in fa-lg" aria-hidden="true"></i>
                                    </a>
                                </button>
                            </Row>  */ }
                            <hr style={{
                                margin:"50px",
                                height: "1vh"}}/>
                            <Row>
                                <button className="btn btn-secondary" style={{ height: '10vh', padding: '10px' }}>
                                    <a href="/order" style={{ textDecoration: 'none', color: 'white', fontSize: '24px' }}>
                                        Set Order state&nbsp;&nbsp;
                                        <i className="fa fa-sign-in fa-lg" aria-hidden="true"></i>
                                    </a>
                                </button>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
