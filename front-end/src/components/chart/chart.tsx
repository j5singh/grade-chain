import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const data = {
    labels: ['1° Year','2° Year','3° Year'],
    datasets: [{
        label: 'Mean',
        data: [26, 25, 29],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }],
  };

const options = {
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: false,
      },
    },
  };

// function MyChart({chartData} : {chartData:any}) {
//     return (<Bar options={options} data={chartData} />)
// }

function MyChart() {
    return (<Bar options={options} data={data} />)
}

export default MyChart