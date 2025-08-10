interface SpinnerProps {
  message?: string;
}

function Spinner({ message }: SpinnerProps) {
  return (
    <>
      <p className="text-xl font-semibold">{message}</p>
      <div className="mt-4 h-10 w-10 animate-spin rounded-full border-t-2 border-b-2 border-blue-500" />
    </>
  );
}

export default Spinner;
