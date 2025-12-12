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
import { ChartContainer } from '../DashBoard.styled';
import useRegionLineChart from './useRegionLineChart';
import Loading from '../../../Common/Loading/Loading';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);



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
                    font: { size: 16 },
                    stepSize: 10
                },
                max: 40
        },
        x: {
            ticks: { font: { size: 16 } }
        }
    }
};


const RegionLineChart = ({ onShowToast }) => {
    const { chartData, loading } = useRegionLineChart(onShowToast);

    // 로딩 상태
    if (loading) {
        return <Loading />;
    }

    return (
        <ChartContainer>
            <Line data={chartData} options={options} height={245} style={{ width: '100%', height: '100%' }}/>
        </ChartContainer>
    );
};

export default RegionLineChart;

