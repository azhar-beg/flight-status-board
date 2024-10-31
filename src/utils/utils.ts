export const formatTime = (departureTime: string): string => {
  const date = new Date(departureTime);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC'
  };

  return date.toLocaleString('en-India', options);
};
