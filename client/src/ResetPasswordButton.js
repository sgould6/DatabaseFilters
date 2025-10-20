import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function ResetPasswordButton(props) {

    //TODO UPDATE DOMAINS
    const [error, setError] = useState(null);
    const [usernameError, setUsernameError] = useState('');
    const [usernameSuccess, setUsernameSuccess] = useState('');
    const handleClick = async () => {
        try {

            const response = await fetch('https://database-filters.vercel.app/sendResetEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: props.username,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);

            }
            const result = await response.json();
            if (result === true) {
                setUsernameSuccess("Password reset email successfully sent.");
                setUsernameError('');
                
                return;
            }
            if (result === false) {
                setUsernameError("Email doesn't exist.");
                setUsernameSuccess('');
                return;
            }

            


        } catch (err) {
            setError(err);
            console.log(error);

        }

    };

    return (
        <>

            {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
            {usernameSuccess && <p style={{ color: 'green' }}>{usernameSuccess}</p>}
                <Button variant="outline-danger" onClick={handleClick}>Reset Password</Button>
            
        </>
    );
}

export default ResetPasswordButton;