import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
function RowAddressHandler(foundAddress) {

    const [selectedAddress, setSelectedAddress] = useState('');
    
    useEffect(() => {
        if (foundAddress.address !== null && foundAddress.address !== undefined) {
            setSelectedAddress(foundAddress.address);
        }
        return;
    }, [foundAddress]);

    if (selectedAddress === '') {

        return (
            <>
            </>
        )
    }

    return (
        <Container>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Address</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {selectedAddress.map((entry) => (
                    <tr key={entry._id}>
                        <td>{entry.address}</td>
                        <td>{entry.status}</td>
                    </tr>
                ) )}
                
            </tbody>
            </Table>
        </Container>
    )
}

export default RowAddressHandler;