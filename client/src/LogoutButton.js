import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const handleClick = async () => {
        try {

            const response = await fetch('https://database-filters.vercel.app/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);

            }
            const result = await response.json();
            if (result === true) {
                navigate('/');
               
                return;
            }
            
            return;


        } catch (err) {
            setError(err);
            console.log(error);

        }

    };

    return (
        <>
           
                <Button variant="outline-danger" onClick={handleClick}>LOGOUT</Button>
        </>
    );
}

export default LogoutButton;