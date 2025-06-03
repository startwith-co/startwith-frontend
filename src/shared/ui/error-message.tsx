function ErrorMessage({ message }: { message: string | undefined }) {
  return <p className="inset-2 mt-1 text-xs text-red-500">{message}</p>;
}

export default ErrorMessage;
