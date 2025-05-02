export default function PaymentOptionButton({ name }: { name: string }) {
  return (
    <button className="hover:text-primary flex w-[166px] items-center justify-center rounded-md bg-[rgba(245,245,245,1)] py-5 hover:bg-white hover:font-bold hover:shadow-md">
      {name}
    </button>
  );
}
