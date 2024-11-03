"use client";
import React, { useState, useEffect } from 'react';

function HeaderComponent() {
    return (
        <div className="header-component-container"> 
            <header className="header">
                TF2 Worst Logs Finder
            </header>
        </div>
    );
}

// todo: make it so that it automatically cuts off the https://logs.tf/profile/ and displays the steamID 
function InputComponent() {
    return (
        <div className="input-container"> 
            <input className="input"></input> 
        </div>
    ); 
}

function AverageDPMComponent({ dpmList }) {
    const average = dpmList.length > 0 
        ? (dpmList.reduce((sum, item) => sum + item.dpmRatio, 0) / dpmList.length).toFixed(2)
        : 0;

    return (
        <div className="average-dpm">
            Average DPM: {average}
        </div>
    );
}

function MessageComponent({ dpmList, setDpmList }) {
    useEffect(() => {
        async function fetchLogDetails() {
            const response = await fetch('/api/'); // calls GET(); 
            const reader = response.body.getReader(); 
            
            while(true) {
                const { value, done } = await reader.read(); 
                if (done) break; 

                const chunk = new TextDecoder().decode(value); 
                const lines = chunk.split('\n').filter(line => line); 

                lines.forEach(line => {
                    const data = JSON.parse(line); 
                    setDpmList(prev => [...prev, data]); 
                });
            }
        }
        fetchLogDetails();
    }, []);
    
    return (
        <div className="message">
            {dpmList.map((item, index) => (
                <div key={index}>Log: {item.dpmRatio} DPM</div>
            ))}
        </div>
    );
}

function MyComponent() {
    const [dpmList, setDpmList] = useState([]);

    return (
        <>
            <HeaderComponent/> 
            <InputComponent/>
            <AverageDPMComponent dpmList={dpmList} />
            <MessageComponent dpmList={dpmList} setDpmList={setDpmList} />
        </>
    );
}

export default MyComponent; {/* this is how layout knows what the default component is*/}