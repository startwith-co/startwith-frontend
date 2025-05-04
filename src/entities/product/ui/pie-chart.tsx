'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// TODO: 실제 데이터로 변경
export const data = {
  labels: [
    '5억원 이하',
    '5억원 이상 10억원 미만',
    '10억원 이상 20억원 미만',
    '20억원 이상',
  ],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5],
      backgroundColor: ['#717171'],
      borderColor: ['white'],
      borderWidth: 1.5,
    },
  ],
};

export default function PieChart() {
  return (
    <div className="relative -translate-y-20">
      <Pie
        data={data}
        options={{
          cutout: '55%',
          layout: {
            padding: {
              left: 100,
              right: 100,
            },
          },
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              formatter: (value, context) => {
                const label =
                  context.chart.data.labels?.[context.dataIndex] || '';
                return `${label}\n${value}%`;
              },
              color: 'white',
              backgroundColor: '#23224C',
              textAlign: 'center',
              padding: {
                left: 10,
                right: 10,
                top: 4.5,
                bottom: 4.5,
              },
              borderRadius: 5,
              anchor: 'end',
              align: 'center',
              clip: false,
              font: {
                size: 12,
                weight: 'bold',
                lineHeight: 1.5,
              },
            },
          },
        }}
        width={450}
        height={250}
      />
      <p className="absolute left-1/2 -translate-x-1/2 -translate-y-18 text-center text-[16px]">
        매출 규모별 이용자 개요
      </p>
    </div>
  );
}
