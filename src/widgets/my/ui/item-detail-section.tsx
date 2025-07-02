'use client';

import DetailItem from '@/entities/my/ui/detail-item';
import PaginationControl from '@/features/my/ui/pagination-control';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Dropdown from '@/shared/ui/dropdown';
import { ApiResponse } from '@/shared/model/apiType';
import api from '@/shared/api/index-api';
import { PaymentInfoProps } from '../model/type';

function ItemDetailSection() {
  const { data: session } = useSession();
  const [dashboard, setDashboard] = useState<PaymentInfoProps[]>([]);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState('전체 상태');

  const statusOptions = [
    { label: '전체 상태', value: null },
    { label: '결제 확정', value: 'SETTLED' },
    { label: '결제 완료', value: 'DONE' },
  ];

  useEffect(() => {
    if (!session?.consumerSeq) return;
    const fetchData = async () => {
      const dashboardData = await api
        .get(
          `api/b2b-service/dashboard/consumer?consumerSeq=${session.consumerSeq}&${
            paymentStatus ? `paymentStatus=${paymentStatus}` : ''
          }&start=0&end=4`,
        )
        .json<ApiResponse<PaymentInfoProps[]>>();
      setDashboard(dashboardData.data);
    };
    fetchData();
  }, [session, paymentStatus]);

  return (
    <section className="mb-10 flex min-w-[895px] flex-col space-y-5 rounded-2xl bg-white p-7 shadow-md">
      <div className="mb-4 self-end">
        <Dropdown
          buttonText={selectedLabel}
          items={statusOptions.map((item) => ({
            label: item.label,
            onClick: () => {
              setPaymentStatus(item.value);
              setSelectedLabel(item.label);
            },
          }))}
        />
      </div>

      {dashboard.map((item) => (
        <DetailItem
          key={item.solutionSeq}
          titleDate={item.paymentCompletedAt}
          status={item.paymentStatus}
          statusDate={item.paymentCompletedAt}
          company={item.vendorName}
          solution={item.solutionName}
          price={item.amount.toString()}
          solutionSeq={item.solutionSeq}
          solutionImageUrl={item.representImageUrl}
        />
      ))}

      {/* <PaginationControl /> */}
    </section>
  );
}

export default ItemDetailSection;
