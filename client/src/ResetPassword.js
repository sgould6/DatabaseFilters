import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import PasswordChecklist from "react-password-checklist";
import { useNavigate } from 'react-router-dom';

function ResetPassword() {

    const [allConditionsMet, setAllConditionsMet] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [usernameError, setUsernameError] = useState('');
    const pathSegments = window.location.pathname.split('/');
    const userId = pathSegments[2];
    const token = pathSegments[3];

    //TODO UPDATE DOMAIN

    const HandlePasswordResetSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://dynamic-canvas-new.vercel.app/${userId}/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: password,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            if (result === true) {
                navigate('/');
                return;
            }
            if (result === false) {
                setUsernameError('Reset session expired, please try resetting password again.')

                return;
            }

            


        } catch (err) {
            setError(err);
            console.log(error);
        }


    }


    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={HandlePasswordResetSubmit}>
                <h1>Reset Password</h1>
                    <Form.Group as={Row} className="mb-3">

                        <Form.Label htmlFor="password">Password:</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Enter Password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">

                        <Form.Label htmlFor="confirmedPassword">Confirm Password:</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Confirm Password"
                            id="confirmedPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <PasswordChecklist
                            rules={[
                                "minLength",
                                "specialChar",
                                "number",
                                "capital",
                                "match",
                            ]}
                            minLength={8}
                            specialChar={true}
                            number={true}
                            capital={true}
                            value={password}
                            match={password === confirmPassword}
                            valueAgain={confirmPassword}
                            onChange={(isValid) => {
                                setAllConditionsMet(isValid);
                            }
                            }
                        />


                            {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
                    </Form.Group>

                    <Button variant="success" type="submit" disabled={!allConditionsMet}>Reset Password</Button>
                </Form>
                </Col>
            </Row>
        </Container>


    );

}

export default ResetPassword;