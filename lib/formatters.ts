export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }
  
  return formatDate(date);
}

export function getVelocityColor(velocity: string): string {
  switch (velocity) {
    case 'Accelerating': return 'text-green-600 bg-green-50 border-green-200';
    case 'Rising': return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'Steady': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'Stable': return 'text-gray-600 bg-gray-50 border-gray-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
}

export function getSentimentColor(sentiment: string): string {
  switch (sentiment) {
    case 'positive': return 'text-green-600 bg-green-50';
    case 'neutral': return 'text-yellow-600 bg-yellow-50';
    case 'negative': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export function getCompetitionColor(competition: string): string {
  switch (competition) {
    case 'Low': return 'text-green-600 bg-green-50';
    case 'Medium': return 'text-yellow-600 bg-yellow-50';
    case 'High': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}