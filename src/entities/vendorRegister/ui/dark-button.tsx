import DarkBox from '@/shared/ui/dark-box';

export default function DarkButton({ title }: { title: string }) {
  return (
    <button>
      <DarkBox className="px-3.5 py-2.5 text-xs hover:bg-black">
        {title}
      </DarkBox>
    </button>
  );
}
