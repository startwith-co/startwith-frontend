export function formatTime(value?: string) {
  if (!value) return '';
  const newValue = value.slice(0, 5);
  const [hour, minute] = newValue.split(':');
  return `${hour}:${minute}`;
}

export function deformatTime(value?: string) {
  if (!value) return '00:00:00';
  return `${value}:00`;
}
