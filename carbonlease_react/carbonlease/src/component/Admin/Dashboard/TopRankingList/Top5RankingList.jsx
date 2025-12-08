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
import { ChartContainer } from '../DashBoard.styled';
import useTop5RankingList from '../TopRankingList/useTop5RankingList';
import Loading from '../../../Common/Loading/Loading';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const options = {
    indexAxis: 'y',
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
            max: 400,
            ticks: {
                font: { size: 14 },
                stepSize: 40
            }
        },
        x: {
            ticks: { font: { size: 14 } }
        }
    }
};


const Top5RankingList = ({ onShowToast }) => {
    const { top5List, loading, error } = useTop5RankingList(onShowToast);

    if (loading) return <Loading />;
    if (error) return null; // 에러는 토스트로만 처리
    if (!top5List || top5List.length === 0) return <div>인기글 데이터가 없습니다.</div>;

    const truncate = (str, n) => (str && str.length > n ? str.slice(0, n) + '...' : str);
    const chartData = {
        labels: top5List.map(item => truncate(item.title, 20)),
        datasets: [
            {
                label: 'Views',
                data: top5List.map(item => item.views),
                backgroundColor: '#00a34a',
                barPercentage: 0.6,
                categoryPercentage: 0.7
            }
        ]
    };

    return (
        <ChartContainer>
            <Bar data={chartData} options={options} plugins={[ChartDataLabels]} height={310} />
        </ChartContainer>
    );
};

export default Top5RankingList;
