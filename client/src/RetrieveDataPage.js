import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import LogoutButton from './LogoutButton';
import AuthenticateUser from './AuthenticateUser';
import RowAddressHandler from './RowAddressHandler';
import MainMenuButton from './MainMenuButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function RetrieveDataPage() {
    AuthenticateUser();

const [selectedAddress, setSelectedAddress] = useState('');
const [selectedStatus, setSelectedStatus] = useState('');
const [error, setError] = useState(null);
const [AddressSuccess, setAddressSuccess] = useState('');
const [AddressError, setAddressError] = useState('');


const HandleAddressLookupSubmit = async (event) => {
    event.preventDefault(); try {
        const response = await fetch('https://database-filters.vercel.app/lookupAddress', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                address: selectedAddress,
                status: selectedStatus,
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.length === 0) {
            //clear form fields
            setSelectedAddress('');
            setSelectedStatus('');
            setAddressSuccess('');
            setAddressError('no address exists');
            
            return;

            
        }
        //clear form fields
        setSelectedAddress('');
        setSelectedStatus('');
        setAddressError('');
        setAddressSuccess(result);        
        return;


    } catch (err) {
        setError(err);
        console.log(error);
    }
}

const handleChangeStatus = (event) => {
    setSelectedStatus(event.target.value);
};

    return (
        <Container>
            <Row>
                <Col><h1>Lookup address status</h1></Col>
                <Col>
                    <div style={{ paddingTop: '20px' }} className="d-flex justify-content-end">
                        <ButtonGroup>
                            <MainMenuButton />
                            <LogoutButton />
                        </ButtonGroup>

                    </div>
                </Col>

            </Row>
        
            <Form onSubmit={HandleAddressLookupSubmit}>
                
                    <Form.Group as={Row} className="mb-3">

                        <Form.Label htmlFor="selectedAddress">Enter Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Address"
                            id="selectedAddress"
                            value={selectedAddress}
                            onChange={(e) => setSelectedAddress(e.target.value)}
                        />

                    </Form.Group>
                
               
                    <Form.Group as={Row} className="mb-3" controlId="mySelect">
                        <Form.Label>Select Status</Form.Label>
                        <Form.Select value={selectedStatus} onChange={handleChangeStatus}>
                            <option value="">Select...</option>
                            <option value="OK">OK</option>
                            <option value="IN REVIEW">IN REVIEW</option>
                            <option value="KNOWN DANGER">KNOWN DANGER</option>
                            <option value="IMPACTED">IMPACTED</option>
                            <option value="COMPLETED">COMPLETED</option>
                        </Form.Select>
                    </Form.Group>
                
                {AddressError && <p style={{ color: 'red' }}>{AddressError}</p>}
                <Button variant="outline-success" type="submit">Check Address</Button>
            </Form>
            
            <Row>
            <div style={{paddingTop: '20px'}}>
            <RowAddressHandler address={AddressSuccess} />
                </div>
            </Row>
            </Container>
        
        

    )

}
export default RetrieveDataPage;