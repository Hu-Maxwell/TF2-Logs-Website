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
function InputComponent({ onSearch }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearchClick = () => {
        if (inputValue.trim()) {
            onSearch(inputValue); // Pass the input value to the parent component
        }
    };

    return (
        <div className="input-container"> 
            <input 
                className="input"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter SteamID64"    
            /> 
            <button onClick={handleSearchClick}>Search</button>
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

function MessageComponent({id64, dpmList, setDpmList, setLoading }) {
    useEffect(() => {
        if(!id64) return; 

        async function fetchLogDetails() {
            setLoading(true);
            setDpmList([]);

            try {
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
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchLogDetails();
    }, [id64]); // rerun if input changes

    return (
        <div className="message">
            {dpmList.map((item, index) => (
                <div key={index}>https://logs.tf/{item.id}: {item.dpmRatio} DPM</div>
            ))}
        </div>
    );
}

function TopFiveWorstLogsComponent({ dpmList }) {
    // Sort the list in ascending order and pick the top 5 worst logs
    const worstLogs = [...dpmList].sort((a, b) => a.dpmRatio - b.dpmRatio).slice(0, 5);

    return (
        <div className="top-five-worst-logs">
            <h3>Top 5 Worst Logs</h3>
            {worstLogs.map((log, index) => (
                <div key={index}>https://logs.tf/{log.id}: {log.dpmRatio} DPM</div>
            ))}
        </div>
    );
}

function TopFiveBestLogsComponent({ dpmList }) {
    // Sort the list in descending order and pick the top 5 best logs
    const bestLogs = [...dpmList].sort((a, b) => b.dpmRatio - a.dpmRatio).slice(0, 5);

    return (
        <div className="top-five-best-logs">
            <h3>Top 5 Best Logs</h3>
            {bestLogs.map((log, index) => (
                <div key={index}>https://logs.tf/{log.id}: {log.dpmRatio} DPM</div>
            ))}
        </div>
    );
}

function MyComponent() {
    const [dpmList, setDpmList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [id64, setId64] = useState('');

    const handleSearch = (inputId64) => {
        setId64(inputId64); // update id64
    };

    return (
        <>
            <HeaderComponent/> 

            <InputComponent onSearch={handleSearch}/>

            <div className="scrollable-container">
                <MessageComponent
                    id64={id64}
                    dpmList={dpmList}
                    setDpmList={setDpmList}
                    setLoading={setLoading}
                />
            </div>

            {loading && <div className="loading-indicator">Loading...</div>} 
            <AverageDPMComponent dpmList={dpmList} />

            {!loading && ( 
                <>
                    <TopFiveWorstLogsComponent dpmList={dpmList} />
                    <TopFiveBestLogsComponent dpmList={dpmList} />
                </>
            )}
        </>
    );
}

export default MyComponent; {/* this is how layout knows what the default component is*/}