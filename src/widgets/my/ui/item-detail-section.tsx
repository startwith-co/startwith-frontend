'use client';

import DetailItem from '@/entities/my/ui/detail-item';
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
    { label: '구매 확정', value: 'DONE' },
    { label: '정산 완료', value: 'SETTLED' },
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
      <div className="mb-4">
        <Dropdown
          buttonText={selectedLabel}
          divClassName=" bg-[#F9F9F9] p-3 rounded-xl w-[130px]"
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
          vendorUniqueType={item.vendorUniqueType}
          vendorSeq={item.vendorSeq}
          category={item.category}
        />
      ))}

      {/* <PaginationControl /> */}
    </section>
  );
}

export default ItemDetailSection;
