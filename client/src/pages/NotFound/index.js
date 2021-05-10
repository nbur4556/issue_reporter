import React from 'react';
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <main>
            <h1>Error: 404 Not Found</h1>
            <Link to="/">Home</Link>
        </main>
    );
}

export default NotFound;