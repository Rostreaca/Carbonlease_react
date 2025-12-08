import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartContainer } from './dashboard.styled';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// 예시 지역별 데이터
const regionLabels = [
    'Seoul', 'Busan', 'Daegu', 'Incheon', 'Gwangju', 'Daejeon', 'Ulsan', 'Sejong', 'Gyeonggi', 'Gangwon', 'Chungbuk', 'Chungnam', 'Jeonbuk', 'Jeonnam', 'Gyeongbuk', 'Gyeongnam', 'Jeju'
];

// 전체 활동량(합계)
const regionData = [120, 80, 60, 40, 30, 20, 10, 15, 110, 25, 18, 22, 19, 17, 21, 23, 13];
// Board(일반 게시판) 더미 데이터
const boardData = [20, 50, 30, 20, 15, 10, 5, 7, 60, 12, 9, 11, 10, 8, 10, 12, 6];
// Activity(인증 게시판) 더미 데이터
const activityData = [100, 30, 30, 20, 15, 10, 5, 8, 50, 13, 9, 11, 9, 9, 11, 11, 7];

const dummyData = {
    labels: regionLabels,
    datasets: [
        {
            label: 'Total',
            data: regionData,
            fill: false,
            borderColor: '#00a34a',
            backgroundColor: '#00a34a',
            pointBorderColor: '#00a34a',
            pointBackgroundColor: 'rgba(13, 253, 145, 0.3)',
            pointRadius: 10,
            pointHoverRadius: 14,
            pointStyle: 'circle',
            tension: 0.3
        },
        {
            label: 'Board',
            data: boardData,
            fill: false,
            borderColor: '#1976d2',
            backgroundColor: '#1976d2',
            pointBorderColor: '#1976d2',
            pointBackgroundColor: 'rgba(25, 118, 210, 0.2)',
            pointRadius: 10,
            pointHoverRadius: 14,
            pointStyle: 'rect',
            tension: 0.3
        },
        {
            label: 'Activity',
            data: activityData,
            fill: false,
            borderColor: '#ff9800',
            backgroundColor: '#ff9800',
            pointBorderColor: '#ff9800',
            pointBackgroundColor: 'rgba(255, 152, 0, 0.2)',
            pointRadius: 10,
            pointHoverRadius: 14,
            pointStyle: 'triangle',
            tension: 0.3
        }
    ]
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'top',
            labels: {
                font: { size: 14 }
            }
        },
        title: {
            display: true,
            text: 'Regional Activity Line Chart',
            font: { size: 16 }
        }
    },
    scales: {
        y: {
            beginAtZero: true,
                ticks: {
                    font: { size: 14 },
                    stepSize: 20
                },
                max: 300
        },
        x: {
            ticks: { font: { size: 14 } }
        }
    }
};

const RegionLineChart = () => (
    <ChartContainer>
        <Line data={dummyData} options={options} height={255} />
    </ChartContainer>
);

export default RegionLineChart;

