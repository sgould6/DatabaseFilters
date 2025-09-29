import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import PasswordChecklist from "react-password-checklist";
import validator from "validator";
import ResetPasswordButton from './ResetPasswordButton';


function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameLogin, setUsernameLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [usernameSuccess, setUsernameSuccess] = useState('');
    const [passwordUserError, setPasswordUserError] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [allConditionsMet, setAllConditionsMet] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [resetPassword, setResetPassword] = useState(false);
    
    const validateEmail = (e) => {
        const email = e.target.value;
        setUsername(email);
        if (validator.isEmail(email)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
        
    };

 
    //TODO update domains

    //API for registering
    const HandleRegisterSubmit = async (event) => {
        event.preventDefault();
     
        try {

            const response = await fetch('https://dynamic-canvas-new.vercel.app/registerUser', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    displayName: displayName,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
                
            }
            const result = await response.json();
            if (result === true) {
                setUsernameSuccess('Successfully Registered');
                setUsernameError('');
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                setDisplayName('');
                return;
            }  
            setUsernameError('Username already exists!');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setDisplayName('');
            return;
          

        } catch (err) {
            setError(err);
            console.log(error);

        }
        
    }
         
    
        
        //API for login
    const HandleLoginSubmit = async (event) => {
        event.preventDefault(); try {
            const response = await fetch('https://dynamic-canvas-new.vercel.app/loginUser', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: usernameLogin,
                    password: passwordLogin,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            if (result === true) {
                navigate('/MenuPage');
                //clear form fields
                setUsernameLogin('');
                setPasswordLogin('');
                setResetPassword(false);
                return;
            }
            //clear form fields
            setPasswordUserError('Either username or password is incorrect!');
            setPasswordLogin('');
            setResetPassword(true);
            return;

            
        } catch (err) {
            setError(err);
            console.log(error);
        } 

 
    }

    return (
        <Container>
            <Row>
                <Col>
                <h1>Login</h1>
                    <Form onSubmit={HandleLoginSubmit}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label htmlFor="usernameLogin">Username:</Form.Label>
                            <Form.Control
                                required   
                                type="email"
                                placeholder="Enter Username"
                                id="usernameLogin"
                                value={usernameLogin}
                                onChange={(e) => setUsernameLogin(e.target.value)}
                            />
                            
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">

                            <Form.Label htmlFor="passwordLogin">Password:</Form.Label>
                            <Form.Control
                                required   
                                type="password"
                                placeholder="Enter Password"
                                id="passwordLogin"
                                value={passwordLogin}
                                onChange={(e) => setPasswordLogin(e.target.value)}
                            />

                            {passwordUserError && <p style={{ color: 'red' }}>{passwordUserError}</p>}
                        </Form.Group>

                        <Button variant="primary" type="submit">Login</Button> {resetPassword && <ResetPasswordButton username={usernameLogin} />}
                    </Form>

                    

                </Col>
                <Col md="auto"></Col>
                <Col>
        <h1>Register</h1>
        <Form onSubmit={HandleRegisterSubmit}>
            <Form.Group as={Row} className ="mb-3">
                    <Form.Label htmlFor="username">Username:</Form.Label>
                    <Form.Control
                                required
                                type="email"
                                placeholder="Enter Username"
                                id="username"
                                value={username}
                                onChange={(e) => { validateEmail(e) }}
                />
                            {!isValid && <p style={{ color: 'red' }}>Please enter a valid email address.</p>}
            </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  
                        <Form.Label htmlFor="displayName">Display Name:</Form.Label>
                            <Form.Control
                                required   
                    type="text"
                    placeholder="Enter Display Name"
                            id="displayName"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                  
            </Form.Group>
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
                            {usernameSuccess && <p style={{ color: 'green' }}>{usernameSuccess}</p>}
                        </Form.Group>
                        
                        <Button variant="success" type="submit" disabled={!allConditionsMet }>Register</Button>
                    </Form>
                </Col>
                
               
            </Row>
        </Container>
            );
        
}

export default RegisterPage;
