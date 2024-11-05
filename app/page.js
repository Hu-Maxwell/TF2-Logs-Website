"use client";
import React, { useState, useEffect, useRef } from 'react';

function HeaderComponent() {
    return (
        <div className="header-component-container"> 
            <header className="header">
                TF2 Worst Logs Finder
            </header>
        </div>
    );
}

function InputComponent({ onSearch, setLoading}) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        let value = e.target.value.trim();

        const urlPrefix = "https://logs.tf/profile/";
        if (value.startsWith(urlPrefix)) {
            value = value.slice(urlPrefix.length); 
        }

        setInputValue(value);
    };

    const handleSearchClick = () => {
        if (inputValue.trim()) {
            onSearch(inputValue); 
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearchClick();
            setLoading("LOADING");
        }
    };

    return (
        <form> 
        <input 
                className="input"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter SteamID64"    
            /> 
            <img className="input-logo" src="logo.png" alt="Logo" />
        </form>
    ); 
}
// <button onClick={handleSearchClick}>Search</button>


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

function MessageComponent({ id64, dpmList, setDpmList, setLoading }) {
    useEffect(() => {
        if (!id64) return;

        const fetchLogDetails = async () => {
            setDpmList([]);

            try {
                const response = await fetch(`/api?id64=${id64}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.statusText}`);
                }

                if (response.body?.getReader) {
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder();

                    while (true) {
                        const { value, done } = await reader.read();
                        if (done) break;

                        const chunk = decoder.decode(value);
                        const lines = chunk.split('\n').filter(Boolean);

                        lines.forEach(line => {
                            try {
                                const data = JSON.parse(line);
                                setDpmList(prev => {
                                    if (!prev.some(p => p.id === data.id)) {
                                        return [...prev, data];
                                    } else {
                                        return prev;
                                    }
                                });
                            } catch (parseError) {
                                console.error("Error parsing JSON:", parseError);
                                setLoading("ERROR");
                            }
                        });
                    }
                } else {
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        setDpmList(data);
                    } else {
                        console.error("Unexpected data format");
                        setLoading("ERROR");
                    }
                }

                setLoading("SUCCESS");
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading("ERROR");
            }
        };

        fetchLogDetails();
    }, [id64, setDpmList, setLoading]);

    return (
        <div className="message">
            {dpmList.map((item) => (
                <div key={item.id}> 
                    https://logs.tf/{item.id}: {item.dpmRatio} DPM
                </div>
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
            {worstLogs.map((log) => (
                <div key={log.id}> 
                    https://logs.tf/{log.id}: {log.dpmRatio} DPM
                </div>
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
            {bestLogs.map((log) => (
                <div key={log.id}> 
                    https://logs.tf/{log.id}: {log.dpmRatio} DPM
                </div>
            ))}
        </div>
    );
}

function MyComponent() {
    const [dpmList, setDpmList] = useState([]);
    const [loading, setLoading] = useState("IDLE"); // "IDLE" "LOADING" "SUCCESS" "ERROR"
    const [id64, setId64] = useState('');

    const handleSearch = (inputId64) => {
        setId64(inputId64); 
    };

    const secondSectionRef = useRef(null); 
    useEffect(() => {
        if (loading === "LOADING" && secondSectionRef.current) {
            secondSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [loading]);

    return (
        <>
            <div className="top-section"> 
                <HeaderComponent/> 

                <InputComponent onSearch={handleSearch} setLoading={setLoading}/>
            </div> 

            <div className="second-section" ref={secondSectionRef}> 
                {loading === "LOADING" && <div className="loading-indicator">Loading...</div>}

                {(loading === "LOADING" || loading === "SUCCESS") &&
                <>
                    <AverageDPMComponent dpmList={dpmList} />

                    <div className="scrollable-container">
                        <MessageComponent
                            id64={id64}
                            dpmList={dpmList}
                            setDpmList={setDpmList}
                            setLoading={setLoading}
                        />
                    </div>
                </>
                }

                {loading === "ERROR" && <div className="error-message">Please enter a valid SteamID64</div>}

            </div>

            <div className="third-section"> 
            {loading === "SUCCESS" && ( 
                <>
                    <TopFiveWorstLogsComponent dpmList={dpmList} />
                    <TopFiveBestLogsComponent dpmList={dpmList} />
                </>
            )}
            </div>
        </>
    );
}

export default MyComponent; 