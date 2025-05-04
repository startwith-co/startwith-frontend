'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

// TODO: 실제 데이터로 변경
const labels = Array.from({ length: 30 }, (_, i) => `${i + 1}`);
const dataValues = Array.from({ length: 30 }, () =>
  Math.floor(Math.random() * 1000),
);

export const data = {
  labels,
  datasets: [
    {
      label: '일별 사용자 수',
      data: dataValues,
      borderColor: '#8499FF',
      backgroundColor: 'white',
      borderWidth: 1,
      tension: 0.1,
    },
  ],
};

export default function LineChart() {
  return (
    <Line
      data={data}
      options={{
        responsive: false,
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              display: true,
            },
            border: {
              color: 'black',
            },
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              display: true,
              stepSize: 250,
            },
            border: {
              color: 'black',
            },
          },
        },
      }}
      width={930}
      height={250}
    />
  );
}
