import {useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';


function AuthenticateUser() {

    const navigate = useNavigate();

    const runAPI = useRef(false);

    useEffect(() => {
        if (runAPI.current) return;
        runAPI.current = true;

        const checkAuthentication = async () => {
            try {
                const response = await fetch('https://database-filters.vercel.app/profile', {
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
            }
        }
        checkAuthentication();
    }, [navigate]);
       

}
export default AuthenticateUser;