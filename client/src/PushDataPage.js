import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import LogoutButton from './LogoutButton';
import AuthenticateUser from './AuthenticateUser';
import LocationSearchInput from './LocationSearchInput';
import MainMenuButton from './MainMenuButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


//google maps api key
const PushDataPage = () => {
    AuthenticateUser();

    return (
        <Container>
            <Row>
                <Col><h1>Add new address status</h1></Col>
                <Col>
                    <div style={{ paddingTop: '20px' }} className="d-flex justify-content-end">
                        <ButtonGroup>
                            <MainMenuButton />
                            <LogoutButton />
                        </ButtonGroup>

                    </div>
            </Col>
            
            </Row>
            <Row>
                
                <div style={{ paddingTop: '20px', height: '400px', width: '100%' }}>                
                    <LocationSearchInput />
                </div>  
            </Row>
            
        </Container>
    )

}
export default PushDataPage;