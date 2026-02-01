"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-bs-theme",
            theme // "light" | "dark"
        );
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null; //prevents hydration mismatch

    return (
        <Button variant="primary" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "Light" : "Dark"}</Button>
       
    );
}
