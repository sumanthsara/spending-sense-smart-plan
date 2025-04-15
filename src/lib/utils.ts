
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Category } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function getCategoryColor(category: Category): string {
  const categoryColors: Record<Category, string> = {
    groceries: 'bg-green-500',
    dining: 'bg-orange-500',
    transportation: 'bg-blue-500',
    housing: 'bg-purple-500',
    utilities: 'bg-yellow-500',
    entertainment: 'bg-pink-500',
    shopping: 'bg-indigo-500',
    travel: 'bg-teal-500',
    healthcare: 'bg-red-500',
    personal: 'bg-amber-500',
    income: 'bg-emerald-500',
    education: 'bg-sky-500',
    fitness: 'bg-lime-500',
    subscriptions: 'bg-violet-500',
    other: 'bg-gray-500',
  };

  return categoryColors[category] || 'bg-gray-500';
}

export function getCategoryIcon(category: Category): string {
  const categoryIcons: Record<Category, string> = {
    groceries: '🛒',
    dining: '🍔',
    transportation: '🚗',
    housing: '🏠',
    utilities: '💡',
    entertainment: '🎬',
    shopping: '🛍️',
    travel: '✈️',
    healthcare: '⚕️',
    personal: '👤',
    income: '💰',
    education: '🎓',
    fitness: '💪',
    subscriptions: '📱',
    other: '📝',
  };

  return categoryIcons[category] || '📝';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function calculatePercentChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / Math.abs(previous)) * 100;
}

export function getRelativeDateLabel(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays > 1 && diffDays < 7) return `In ${diffDays} days`;
  if (diffDays === 7) return 'In 1 week';
  if (diffDays > 7) return `In ${Math.floor(diffDays / 7)} weeks`;
  
  if (diffDays === -1) return 'Yesterday';
  if (diffDays < -1 && diffDays > -7) return `${Math.abs(diffDays)} days ago`;
  if (diffDays === -7) return '1 week ago';
  if (diffDays < -7) return `${Math.floor(Math.abs(diffDays) / 7)} weeks ago`;
  
  return formatDate(dateString);
}
