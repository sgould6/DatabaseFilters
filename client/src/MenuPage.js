import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import AuthenticateUser from './AuthenticateUser';
import LogoutButton from './LogoutButton';

function MenuPage() {
    AuthenticateUser();
    const navigate = useNavigate();
    const handleClickEnter = async () => {
        navigate('/PushDataPage')
    }

    const handleClickRetrieve = async () => {
        navigate('/RetrieveDataPage')
    }

    const handleClickNotes = async () => {
        navigate('/NotesPage')
    }

    return (
        
        <Container>
            <Row>
                <h1>MAIN MENU</h1>
            </Row>
            <Row>
            <Col>
                <Button variant="primary" onClick={handleClickEnter}>Enter Data</Button>
                </Col>

                <Col>
                    <Button variant="primary" onClick={handleClickNotes}>Create Notes</Button>
                </Col>
            
            <Col>
                <Button variant="success" onClick={handleClickRetrieve}>Retrieve Data</Button>
            </Col>
            <Col>
                 <div className="d-flex justify-content-end">
                    <LogoutButton />
                 </div>
            </Col>
            </Row>
        </Container>
        
    )

}
export default MenuPage;