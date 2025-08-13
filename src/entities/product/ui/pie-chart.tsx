'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { StatsProps } from '@/views/vendorMy/model/type';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function PieChart({ stats }: { stats: StatsProps[] }) {
  const isAllZero = stats.every((stat) => stat.percentage === 0);

  const defaultData = {
    labels: ['데이터 없음'],
    datasets: [
      {
        label: '%',
        data: [100],
        backgroundColor: ['#E5E5E5'],
        borderColor: ['white'],
        borderWidth: 1.5,
      },
    ],
  };

  const chartData = isAllZero
    ? defaultData
    : {
        labels: stats.map((stat) => stat.label),
        datasets: [
          {
            label: '%',
            data: stats.map((stat) => stat.percentage),
            backgroundColor: ['#717171'],
            borderColor: ['white'],
            borderWidth: 1.5,
          },
        ],
      };

  return (
    <div className="relative -translate-y-20">
      <Pie
        data={chartData}
        options={{
          cutout: '55%',
          layout: {
            padding: { left: 100, right: 100 },
          },
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              display: (context) => {
                const value = context.dataset.data[context.dataIndex];
                return value !== 0;
              },
              formatter: (value, context) => {
                const label =
                  context.chart.data.labels?.[context.dataIndex] || '';
                return isAllZero ? '데이터 없음' : `${label}\n${value}%`;
              },
              color: 'white',
              backgroundColor: '#23224C',
              textAlign: 'center',
              padding: { left: 10, right: 10, top: 4.5, bottom: 4.5 },
              borderRadius: 5,
              anchor: 'end',
              align: 'center',
              clip: false,
              font: { size: 12, weight: 'bold', lineHeight: 1.5 },
            },
          },
        }}
        width={450}
        height={250}
      />
      <p className="absolute left-1/2 -translate-x-1/2 -translate-y-18 text-center text-[16px]">
        {stats[0].statType === 'SALES_SIZE'
          ? '매출 규모별 기업 고객 개요'
          : '고용 인원 규모별 기업 고객 개요'}
      </p>
    </div>
  );
}
