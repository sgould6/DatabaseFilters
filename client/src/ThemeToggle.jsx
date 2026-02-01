"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null; //prevents hydration mismatch

    return (
        <Button variant="primary" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "Light" : "Dark"}</Button>
       
    );
}
