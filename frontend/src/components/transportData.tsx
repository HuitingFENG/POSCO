import React, { useState, useEffect } from 'react';

interface TransportItem {
    id: number;
    name: string;
    value: number;
};


const TransportData = () => {
    const [transportData, setTransportData] = useState<TransportItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("/api/v1/transport?km=100&displayAll=1&transports=1%2C2%2C3%2C4%2C5%2C6%2C7&ignoreRadiativeForcing=0&numberOfPassenger=1&includeConstruction=0")
            .then(response => response.json())
            .then(data => {
                setTransportData(data.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Transport Data</h2>
            <ul>
                {transportData.map((transport) => (
                    <li key={transport.id}>
                        {transport.name}: {transport.value} CO2e/km
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransportData;
