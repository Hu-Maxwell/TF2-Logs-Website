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
                fill: false, // No fill under the line
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(75,192,192,0.4)',
                tension: 0.3, // Curve for the line
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
    };      

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
};
export default LogsChart;

