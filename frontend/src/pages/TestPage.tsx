import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get('http://localhost:3000/test',{withCredentials: true})
            .then(response => {
                console.log(response);
                
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Test Page</h1>
            
        </div>
    );
};

export default TestPage;