interface PeriodCountBoxProps {
  count: number;
  title: string;
}

function PeriodCountBox({ count, title }: PeriodCountBoxProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex h-[85px] w-[85px] items-center justify-center rounded-xl bg-[#F5F5F5] text-3xl font-bold">
        <span>{count}</span>
      </div>
      <p className="mt-2 text-sm font-light text-[#151515]">{title}</p>
    </div>
  );
}

export default PeriodCountBox;
