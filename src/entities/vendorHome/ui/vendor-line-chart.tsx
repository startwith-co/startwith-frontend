'use client';

import { useState } from 'react';
import { Line } from 'react-chartjs-2';
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
import cn from '@/shared/lib/utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

// 더미 데이터 생성 함수
const generateData = (labelCount: number) =>
  Array.from({ length: labelCount }, () => Math.floor(Math.random() * 1000));

const datasetsByType = {
  day: {
    labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
    data: generateData(30),
  },
  week: {
    labels: Array.from({ length: 12 }, (_, i) => `${i + 1}`),
    data: generateData(12),
  },
  month: {
    labels: Array.from({ length: 5 }, (_, i) => `${2020 + i}`),
    data: generateData(5),
  },
};

export default function VendorLineChart({ title }: { title: string }) {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('day');

  const chartData = {
    labels: datasetsByType[period].labels,
    datasets: [
      {
        label: '사용자 수',
        data: datasetsByType[period].data,
        borderWidth: 0.8,
        tension: 0.1,
      },
    ],
  };

  return (
    <div
      className={cn(
        'h-[260px]',
        'w-full',
        'rounded-md',
        'bg-vendor-gray',
        'p-2.5',
      )}
    >
      <div className="relative mb-2 flex w-full items-center">
        <h3 className="mx-auto text-sm">{title}</h3>
        <div className="absolute right-1 flex gap-0">
          {(['day', 'week', 'month'] as const).map((type, index) => (
            <button
              key={type}
              onClick={() => setPeriod(type)}
              className={cn(
                'border border-[#7A7A7A] px-2 py-1 text-[10px]',
                period === type
                  ? 'bg-[#7A7A7A] text-white'
                  : 'bg-vendor-gray text-vendor-secondary',
                index === 0 && 'rounded-l-md',
                index === 2 && 'rounded-r-md',
              )}
            >
              {
                // eslint-disable-next-line
                type === 'day' ? '일' : type === 'month' ? '월' : '주'
              }
            </button>
          ))}
        </div>
      </div>

      {/* 차트 */}
      <div>
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              title: {
                display: false,
              },
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: {
                  font: { size: 8 },
                },
              },
              y: {
                grid: { display: false },
                ticks: {
                  font: { size: 8 },
                  stepSize: 250,
                },
              },
            },
          }}
          height={210}
        />
      </div>
    </div>
  );
}
