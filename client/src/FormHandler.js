import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

//google maps api key
function FormHandler(places) {
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [error, setError] = useState(null);
    const [AddressSuccess, setAddressSuccess] = useState('');
    const [AddressError, setAddressError] = useState('');

    useEffect(() => {
        if (places.place !== null && places.place !== undefined) {
            setSelectedAddress(places.place.formatted_address);
        }
        return;
    }, [places]);


    
        
    const HandleAddressRegisterSubmit = async (event) => {
        event.preventDefault(); try {
            const response = await fetch('https://database-filters.vercel.app/registerAddress', {
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
            if (result === true) {
                //clear form fields
                setSelectedAddress('');
                setSelectedStatus('');
                setAddressSuccess('Update Successfully saved to DB');

                return;
            }
            //clear form fields
            setSelectedAddress('');
            setSelectedStatus('');
            setAddressError('Failed to save to DB');
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
            <Form onSubmit={HandleAddressRegisterSubmit}>
            <Row>
            <Form.Group as={Row} className="mb-3">

                <Form.Label htmlFor="selectedAddress">Enter Address</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Enter Address"
                    id="selectedAddress"
                    value={selectedAddress}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                />

                    </Form.Group>
                </Row>
                <Row>
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
                </Row>
               
                {AddressError && <p style={{ color: 'red' }}>{AddressError}</p>}
                {AddressSuccess && <p style={{ color: 'green' }}>{AddressSuccess}</p>}
                <Button variant="outline-success" type="submit">Register Update</Button>
               
            </Form>

        </Container>
    )

}
export default FormHandler;