import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


function AuthenticateUser() {

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await fetch('/profile', {
                    method: 'GET',
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
                    return true;
                } else {
                    navigate('/');
                    return false;
                }

            } catch (err) {
                setError(err);
                console.log(error);
            }
        }
        checkAuthentication();
    }, []);
       

}
export default AuthenticateUser;