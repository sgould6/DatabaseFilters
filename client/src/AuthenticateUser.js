import React, { useEffect, useState, useRef } from 'react';


function AuthenticateUser(props) {

    const [error, setError] = useState(null);
    const [data, setData] = useState('');

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await fetch('https://dynamic-canvas-new.vercel.app/profile', {
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
                if (result) {
                    setData(result.displayName);
                    props.onDataReceived(data);
                } else {
                    props.onDataReceived(false);
                }
                
               


            } catch (err) {
                setError(err);
                console.log(error);
        }

        checkAuthentication();
    }, []);

}
export default AuthenticateUser;