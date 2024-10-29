export const formatTime = (departureTime: string): string => {
  const date = new Date(departureTime);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long', // Use 'short' for abbreviated month name
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // Set to false for 24-hour format
  });
};