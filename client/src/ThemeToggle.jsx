// ThemeToggle.js
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

const ThemeToggle = () => {
    // Check local storage for saved theme, default to system preference if none found
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light')
    );

    useEffect(() => {
        // Apply the theme to the document element
        document.documentElement.setAttribute('data-theme', theme);
        // Save the preference to local storage
        localStorage.setItem('theme', theme);
    }, [theme]); // Rerun when theme changes

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (

        <Button variant="primary" onClick={toggleTheme}>Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode </Button>
        
    );
};

export default ThemeToggle;
