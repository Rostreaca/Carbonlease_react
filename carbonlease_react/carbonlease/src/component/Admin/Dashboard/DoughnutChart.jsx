import {
    ArcElement,
    Chart as ChartJS,
    Legend,
    Tooltip
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Doughnut } from 'react-chartjs-2';
import {
    ChartCard,
    ChartInner,
    ChartTitle,
    ChartWrap,
    LegendColor,
    LegendItem,
    LegendLabel,
    LegendRow
} from './DoughnutChart.styled';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// 게시판별 더미 데이터
const dummyData = [
    {
    title: 'Board',
    data: {
        labels: ['정상', '숨김', '댓글'],
        datasets: [
                {
                data: [120, 20, 45],
                backgroundColor: ['#9ac6a5ff', '#ff6f61', '#8bb0e8ff'],
                borderWidth: 0
                }
            ]
        }
    },
    {
    title: 'Activity',
    data: {
        labels: ['정상', '숨김', '댓글', '좋아요'],
        datasets: [
                {
                data: [80, 10, 30, 25],
                backgroundColor: ['#9ac6a5ff', '#ff6f61', '#8bb0e8ff', '#f6e393ff'],
                borderWidth: 0
                }
            ]
        }
    },
    {
    title: 'Campaign',
    data: {
        labels: ['정상', '숨김', '좋아요'],
        datasets: [
                {
                data: [45, 5, 18],
                backgroundColor: ['#9ac6a5ff', '#ff6f61', '#f6e393ff'],
                borderWidth: 0
                }
            ]
        }
    },
    {
    title: 'Notice',
    data: {
        labels: ['정상', '숨김'],
        datasets: [
                {
                data: [30, 3],
                backgroundColor: ['#9ac6a5ff', '#ff6f61'],
                borderWidth: 0
                }
            ]
        }
    }
];

const options = {
    responsive: true,
    cutout: '80%',
    plugins: {
        legend: {
            display: false
        },
        datalabels: {
            color: '#fff',
            font: { size: 12, weight: 'bold' },
            formatter: (value) => value
        },
        tooltip: {
            callbacks: {
                label: function(context) {
                    return `${context.label}: ${context.parsed} counts`;
                }
            }
        }
    }
};

const DoughnutChart = () => {
    return (
        <ChartWrap>
            {dummyData.map((cfg, idx) => (
                <ChartCard key={cfg.title}>
                    <ChartTitle>{cfg.title}</ChartTitle>
                    <ChartInner>
                        <Doughnut data={cfg.data} options={options} />
                        <LegendRow>
                            {cfg.data.labels.map((label, i) => (
                                <LegendItem key={label}>
                                    <LegendColor style={{ background: cfg.data.datasets[0].backgroundColor[i] }} />
                                    <LegendLabel>{label}</LegendLabel>
                                </LegendItem>
                            ))}
                        </LegendRow>
                    </ChartInner>
                </ChartCard>
            ))}
        </ChartWrap>
    );
};

export default DoughnutChart;
