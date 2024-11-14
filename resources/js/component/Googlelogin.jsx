    import React from 'react';
    import ReactDOM from 'react-dom';
    import { Container, Row, Col, Button } from 'react-bootstrap';
    import '../../css/app.css';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faGoogle } from '@fortawesome/free-brands-svg-icons';

   const Googlelogin = () => {

        function GoogleLoginAPI() {
            fetch('/api/google-login')
                .then((response) => response.json())
                .then((data) => {
                    if (data.url) {
                        localStorage.setItem('isLoggedIn', 'true');
                        window.location.href = data.url;
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Error');
                });
        }

        return (
            <Container
                fluid
                className="main-section"
            >
                <Row>
                    <Col md={12} >
                        <h2 style={{textAlign:"center"}}>Google Login</h2>
                        <Button
                            variant="danger"
                            size="lg"
                            className="signButton"
                            onClick={GoogleLoginAPI}>
                            <FontAwesomeIcon icon={faGoogle} style={{ marginRight: '10px' }} /> Sign in with Google
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }

    export default Googlelogin;

