export default function Button({ label }: { label: string }) {
  return (
    <button type="submit" className="bg-green-300">
      {label}
    </button>
  );
}
