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


const truncate = (str, n) => (str && str.length > n ? str.slice(0, n) + '...' : str);

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
                // 이 부분에서 Y축 레이블을 커스터마이징합니다.
                callback: function (value) {
                    const originalLabel = this.getLabelForValue(value);
                    // Y축 틱에 표시될 때만 truncate를 적용합니다.
                    return truncate(originalLabel, 20); 
                },
                font: { size: 14, weight: 'bold' },
                color: '#333',
                stepSize: 40,
                align: 'left',
                padding: 0
            }
        },
        x: {
            ticks: {
                font: { size: 14, weight: 'bold' },
                color: '#000'
            }
        }
    }
};


const Top5RankingList = ({ onShowToast }) => {
    const { top5List, loading } = useTop5RankingList(onShowToast);

    if (loading) return <Loading />;

    
    const chartData = {
        labels: top5List.map(item => {
            //  원본 전체 텍스트를 그대로 labels에 넣습니다.
            return `[${item.boardType}] ${item.title}`; 
        }),
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
