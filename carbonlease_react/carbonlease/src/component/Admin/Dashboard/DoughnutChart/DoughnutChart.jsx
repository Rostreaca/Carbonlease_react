
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

import { Doughnut } from 'react-chartjs-2';
import Loading from '../../../Common/Loading/Loading';
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
            {chartData.map((cfg, i) => (
                // Region
                <ChartCard key={cfg.title + '-' + i}>
                    <ChartTitle>{cfg.title}</ChartTitle>
                    <ChartInner>
                        <Doughnut data={cfg.data} options={options} />
                        <LegendRow>
                            {cfg.data.labels.map((label, j) => (
                                <LegendItem key={cfg.title + '-' + label + '-' + j}>
                                    <LegendColor style={{ background: cfg.data.datasets[0].backgroundColor[j] }} />
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
