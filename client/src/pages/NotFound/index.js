import React from 'react';
import { Link } from 'react-router-dom'

import './style.css';

const NotFound = () => {
    return (
        <main className="not-found-page">
            <h1>Error: 404 Not Found</h1>
            <Link to="/">Home</Link>
        </main>
    );
}

export default NotFound;