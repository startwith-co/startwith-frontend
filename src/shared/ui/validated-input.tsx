import StatusMessage from './status-message';

interface CustomInputProps {
  input: React.ReactNode;
  isError?: boolean;
  errorMessage?: string;
  message?: string;
  button?: React.ReactNode;
}

function ValidatedInput({
  input,
  isError,
  errorMessage,
  button,
  message,
}: CustomInputProps) {
  const error = isError || errorMessage;
  if (button) {
    return (
      <div className="grid h-[65px] grid-cols-[3fr_1fr] gap-x-2">
        {input}
        {button}
        {message && !error && (
          <StatusMessage message={message} status="success" />
        )}
        {error && <StatusMessage message={errorMessage} status="error" />}
      </div>
    );
  }

  return (
    <div className="h-[65px]">
      {input}
      {error && <StatusMessage message={errorMessage} status="error" />}
    </div>
  );
}

export default ValidatedInput;
