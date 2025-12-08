import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import { ChartContainer } from './dashboard.styled';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const dummyData = {
    labels: ['Post A', 'Post B', 'Post C', 'Post D', 'Post E'],
    datasets: [
        {
        label: 'Views',
        data: [120, 95, 80, 60, 45],
        backgroundColor: '#00a34a',
        // borderRadius: 6,
        barPercentage: 0.6,
        categoryPercentage: 0.7
        }
    ]
};

const options = {
    indexAxis: 'x',
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
            labels: { font: { size: 12 } }
        },
        title: {
            display: true,
            text: 'Top 5 Popular Posts Chart',
            font: { size: 16 }
        },
        datalabels: {
            color: '#222', // 원하는 색상
            font: { weight: 'bold', size: 14 },
            anchor: 'end',
            align: 'top',
            formatter: Math.round
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            max: 300,
            ticks: {
                font: { size: 14 },
                stepSize: 20
            }
        },
        x: {
            ticks: { font: { size: 14 } }
        }
    }
};

const Top5RankingList = ({ data }) => {
    return (
        <ChartContainer>
            <Bar data={dummyData} options={options} plugins={[ChartDataLabels]} height={310} />
        </ChartContainer>
    );
};

export default Top5RankingList;
