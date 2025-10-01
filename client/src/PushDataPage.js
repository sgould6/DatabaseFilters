import React, { useState, useRef } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import AuthenticateUser from './AuthenticateUser';
import LocationSearchInput from './LocationSearchInput';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

//google maps api key
const PushDataPage = () => {
    AuthenticateUser();

    return (
        <Container>
            <Row>
                <Col><h1>This is the push data page</h1></Col>
                <Col><div className="d-flex justify-content-end">
                    <LogoutButton />
                </div>
            </Col>
            
            </Row>
            <Row>
                
                <div style={{ height: '400px', width: '100%' }}>                
                    <LocationSearchInput />
                </div>  
            </Row>
            
        </Container>
    )

}
export default PushDataPage;