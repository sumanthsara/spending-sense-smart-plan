
export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: Category;
  account: string;
  isRecurring: boolean;
}

export type Category = 
  | 'groceries'
  | 'dining'
  | 'transportation'
  | 'housing'
  | 'utilities'
  | 'entertainment'
  | 'shopping'
  | 'travel'
  | 'healthcare'
  | 'personal'
  | 'income'
  | 'education'
  | 'fitness'
  | 'subscriptions'
  | 'other';

export type TimeFrame = 'daily' | 'weekly' | 'monthly';
export type ChartType = 'bar' | 'pie' | 'line';

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  isAutoPay: boolean;
  isPaid: boolean;
  category: Category;
}

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  balance: number;
  institution: string;
}
