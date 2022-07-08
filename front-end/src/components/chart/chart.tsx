import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
    },
  },
      scales: {
        y: {
          suggestedMin: 16, // minimum value
          beginAtZero: false   // minimum value will be 0.
          }
      }
};

function BarChart({chartData} : {chartData:any}) {
  const data = {
    labels: chartData.labels,
    datasets: chartData.dataset
  };
  
  return (<Bar options={options} data={data} />)
}

export default BarChart