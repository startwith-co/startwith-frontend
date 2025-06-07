export function formatTime(value?: string) {
  if (!value) return '';
  const [hour, minute] = value.split(':');
  return `${hour}:${minute}`;
}

export function deformatTime(value?: string) {
  if (!value) return '';
  return `${value}:00`;
}
