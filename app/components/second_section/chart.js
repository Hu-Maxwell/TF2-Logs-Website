import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';  

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


function LogsChart({ dpmList }) {

    const labels = dpmList.map(item => item.id);
    const dataValues = dpmList.map(item => item.dpmRatio);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'DPM Ratio',
                data: dataValues,
                fill: false, 
                backgroundColor: 'rgba(255, 255, 255, 1)',
                borderColor: 'rgba(0,0,0,1)',
                tension: 0.3, // curve for the line
            },
        ],
    };
      
    const options = {
        responsive: true,

        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Logs Over Time',
            },
        },

        scales: {
            x: {
                display: false
            },
            y: {
                beginAtZero: true,
            },
        },
        pointBackgroundColor: '#36A2EB', // change this later
        pointHoverBackgroundColor: '#9BD0F5', // change this later
        backgroundColor: 'f5e7de',
        showLine: false 

        // TODO
        // change opacity of dots
        // change color of dots
        // change color of text
        // change font of text
        // change y axis scale 
        // 
    };      

    return (
        <>
            <Line className="chart" data={data} options={options} />
        </>
    );
};
export default LogsChart;

