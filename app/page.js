"use client";
import React, { useState } from 'react';
    
import FirstSectionComponent from './components/first_section/first_section.js';
import SecondSectionComponent from './components/second_section/second_section.js';
import ThirdSectionComponent from './components/third_section/third_section.js';

function MyComponent() {
    const [dpmList, setDpmList] = useState([]);
    const [loading, setLoading] = useState("IDLE"); // "IDLE" "LOADING" "SUCCESS" "ERROR"
    const [id64, setId64] = useState('');

    return (
        <>
            <FirstSectionComponent setId64={setId64} setLoading={setLoading}/>
            <SecondSectionComponent id64={id64} dpmList={dpmList} setDpmList={setDpmList} setLoading={setLoading} loading={loading}/>
            <ThirdSectionComponent dpmList={dpmList} loading={loading}/>
        </>
    );
}

export default MyComponent; 