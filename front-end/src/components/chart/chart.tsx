import React from 'react'
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
import { Line } from 'react-chartjs-2';
import { useColorModeValue } from '@chakra-ui/react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

function MyChart() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Dataset 1',
                lineTension: 0.5,
                pointBackgroundColor: "pink",
                pointBorderColor: "pink",
                pointHoverBackgroundColor: "pink",
                pointHoverBorderColor: "pink",
                borderColor: "pink",
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                data: [500, 300, 400, 500, 800, 650, 700, 690, 1000, 1200, 1050, 1300],
            }
        ],
    }
    
    const options = {
        maintainAspectRatio: true,
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    borderDash: [3, 3],
                },
                // beginAtZero: true, // this works
            },
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }

    return (<Line options={options} data={data} />)
}


export default MyChart