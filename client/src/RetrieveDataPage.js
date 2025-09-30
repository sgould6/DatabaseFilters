import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import AuthenticateUser from './AuthenticateUser';


function RetrieveDataPage() {
    AuthenticateUser();
    return (
        <Container>
            <Row>
                <h1>This is the receive data page</h1>
            </Row>
            <Row>
                <Col>
                    <div className="d-flex justify-content-end">
                        <LogoutButton />
                    </div>
                </Col>
            </Row>
        </Container>
    )

}
export default RetrieveDataPage;