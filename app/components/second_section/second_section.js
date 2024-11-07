import React, { useState, useEffect, useRef } from 'react';
import "./second_section.css";

import LoadingComponent from './loading.js';
import AverageDPMComponent from './average.js';
import MessageComponent from './logs_list.js';

import LogsChart from './chart.js';

function SecondSectionComponent({ id64, dpmList, setDpmList, setLoading, loading}) {
    const secondSectionRef = useRef(null); 
    useEffect(() => {
        if (loading === "LOADING" && secondSectionRef.current) {
            secondSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [loading]);

    return (
        <div className="second-section" ref={secondSectionRef}> 
            {(loading === "LOADING" || loading === "SUCCESS") &&
            <>
                {loading === "LOADING" && <LoadingComponent setLoading={setLoading}/>}

                <div className="left-half">
                    <AverageDPMComponent className="average-dpm-component" dpmList={dpmList} />
                </div>

                <div className="right-half">
                    <div className="chart-container"> 
                        <LogsChart />
                    </div>

                    <div className="scrollable-container">
                        <MessageComponent
                            id64={id64}
                            dpmList={dpmList}
                            setDpmList={setDpmList}
                            setLoading={setLoading}
                        />
                    </div>
                </div>
            </>
            }

            {loading === "ERROR" && <div className="error-message">Please enter a valid SteamID64</div>}

        </div>
    );
}
export default SecondSectionComponent