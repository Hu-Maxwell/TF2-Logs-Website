import React, { useState, useEffect, useRef } from 'react';

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
export default MessageComponent