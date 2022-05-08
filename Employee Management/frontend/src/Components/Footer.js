import React, { Component } from 'react'
import { Navbar, Container } from 'react-bootstrap'

class Footer extends Component {
    render() {
        return (
            <div style={{position:'relative',paddingTop:'7em'}}>
                <Navbar
                    bg="dark"
                    variant="dark"
                    expand="md"
                    style={{ padding: '5px 0px', align:'center' }}
                    >
                    <Container>
                        <Navbar.Text className="m-auto">
                            <span>
                                <a href="/" style={{textDecoration:'none'}}>NoQueues</a>
                                &nbsp;<i className="fa-regular fa-copyright fa-sm"></i>&nbsp;
                                {new Date().getFullYear()}{/* Outputs 2020 */}
                            </span>
                        </Navbar.Text>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default Footer;

