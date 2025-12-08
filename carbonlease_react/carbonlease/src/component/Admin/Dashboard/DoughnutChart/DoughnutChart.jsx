
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

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
import useDoughnutChart from './useDoughnutChart';
import Loading from '../../../Common/Loading/Loading';

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

const DoughnutChart = ({ onShowToast }) => {
    const { chartData, loading } = useDoughnutChart(onShowToast);

    // 로딩 상태
    if (loading) {
        return <Loading />;
    }

    return (
        <ChartWrap>
            {chartData.map(cfg => (
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
