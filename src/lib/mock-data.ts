
import { Account, Bill, Category, Transaction } from '@/types';
import { addDays, format, subDays } from 'date-fns';

// Helper to generate random transactions
const generateTransactions = (count: number): Transaction[] => {
  const categories: Category[] = [
    'groceries', 'dining', 'transportation', 'housing', 'utilities', 
    'entertainment', 'shopping', 'travel', 'healthcare', 'personal',
    'income', 'education', 'fitness', 'subscriptions', 'other'
  ];

  const descriptions = {
    groceries: ['Whole Foods', 'Trader Joe\'s', 'Kroger', 'Publix', 'Safeway'],
    dining: ['Starbucks', 'Chipotle', 'Uber Eats', 'Cheesecake Factory', 'Local Café'],
    transportation: ['Uber', 'Lyft', 'Gas Station', 'Subway', 'Bus Fare'],
    housing: ['Rent Payment', 'Mortgage', 'Home Insurance', 'HOA Fees', 'Property Tax'],
    utilities: ['Electric Bill', 'Water Bill', 'Internet', 'Gas Bill', 'Phone Bill'],
    entertainment: ['Netflix', 'Movie Theater', 'Concert Tickets', 'Spotify', 'Game Pass'],
    shopping: ['Amazon', 'Target', 'Walmart', 'Best Buy', 'Nike'],
    travel: ['Airbnb', 'Flight Tickets', 'Hotel Stay', 'Car Rental', 'Travel Insurance'],
    healthcare: ['Doctor Visit', 'Pharmacy', 'Health Insurance', 'Dental Care', 'Vision Care'],
    personal: ['Haircut', 'Gym Membership', 'Cosmetics', 'Clothing', 'Gifts'],
    income: ['Salary', 'Freelance', 'Dividends', 'Interest', 'Side Hustle'],
    education: ['Tuition', 'Books', 'Online Course', 'Student Loan', 'Educational Supplies'],
    fitness: ['Gym Membership', 'Fitness App', 'Sports Equipment', 'Protein Supplements', 'Sports Club'],
    subscriptions: ['Amazon Prime', 'Streaming Service', 'Cloud Storage', 'Magazine', 'Software'],
    other: ['Misc Payment', 'Donation', 'Fee', 'Refund', 'Cash Withdrawal']
  };

  const accounts = ['Chase Checking', 'Bank of America Credit', 'Wells Fargo Savings', 'Amex Gold'];

  const transactions: Transaction[] = [];
  
  // Today and past 30 days
  const today = new Date();
  const thirtyDaysAgo = subDays(today, 30);

  // Generate the specified number of transactions
  for (let i = 0; i < count; i++) {
    const randomDaysAgo = Math.floor(Math.random() * 30);
    const date = subDays(today, randomDaysAgo);
    const dateStr = format(date, 'yyyy-MM-dd');
    
    const category = categories[Math.floor(Math.random() * categories.length)];
    const descriptionList = descriptions[category];
    const description = descriptionList[Math.floor(Math.random() * descriptionList.length)];
    
    const isIncome = category === 'income';
    const amount = isIncome 
      ? Math.round(Math.random() * 2000 + 1000) // Income amounts (positive)
      : -Math.round(Math.random() * 150 + 5);   // Expense amounts (negative)
    
    const isRecurring = Math.random() > 0.7; // 30% chance of being a recurring transaction
    
    transactions.push({
      id: `tx-${i}`,
      date: dateStr,
      description,
      amount,
      category,
      account: accounts[Math.floor(Math.random() * accounts.length)],
      isRecurring,
    });
  }

  // Add some clear recurring transactions
  const recurringItems = [
    { desc: 'Netflix', category: 'subscriptions' as Category, amount: -13.99 },
    { desc: 'Spotify', category: 'subscriptions' as Category, amount: -9.99 },
    { desc: 'Rent', category: 'housing' as Category, amount: -1800 },
    { desc: 'Internet', category: 'utilities' as Category, amount: -79.99 },
    { desc: 'Phone Bill', category: 'utilities' as Category, amount: -85 },
    { desc: 'Gym Membership', category: 'fitness' as Category, amount: -50 },
    { desc: 'Salary', category: 'income' as Category, amount: 3500 },
  ];
  
  recurringItems.forEach((item, index) => {
    for (let i = 0; i < 3; i++) {
      // Add them across multiple months
      const date = subDays(today, i * 30 + Math.floor(Math.random() * 5));
      transactions.push({
        id: `tx-rec-${index}-${i}`,
        date: format(date, 'yyyy-MM-dd'),
        description: item.desc,
        amount: item.amount,
        category: item.category,
        account: accounts[Math.floor(Math.random() * accounts.length)],
        isRecurring: true,
      });
    }
  });

  // Sort transactions by date, newest first
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Generate upcoming bills
const generateBills = (): Bill[] => {
  const today = new Date();
  const billTemplates = [
    { name: 'Rent', amount: 1800, category: 'housing' as Category, isAutoPay: false },
    { name: 'Electricity', amount: 120, category: 'utilities' as Category, isAutoPay: true },
    { name: 'Internet', amount: 79.99, category: 'utilities' as Category, isAutoPay: true },
    { name: 'Phone Bill', amount: 85, category: 'utilities' as Category, isAutoPay: true },
    { name: 'Netflix', amount: 13.99, category: 'subscriptions' as Category, isAutoPay: true },
    { name: 'Spotify', amount: 9.99, category: 'subscriptions' as Category, isAutoPay: true },
    { name: 'Credit Card Payment', amount: 450, category: 'other' as Category, isAutoPay: false },
    { name: 'Gym Membership', amount: 50, category: 'fitness' as Category, isAutoPay: true },
    { name: 'Car Insurance', amount: 120, category: 'transportation' as Category, isAutoPay: false },
    { name: 'Student Loan', amount: 320, category: 'education' as Category, isAutoPay: true },
  ];

  // Generate upcoming bills for the next 30 days
  return billTemplates.map((template, index) => {
    // Distribute due dates across the next 30 days
    const daysAhead = Math.floor(Math.random() * 30) + 1;
    const dueDate = addDays(today, daysAhead);
    
    // Bills due in the past 5 days are marked as paid
    const isPaid = daysAhead <= 5;
    
    return {
      id: `bill-${index}`,
      name: template.name,
      amount: template.amount,
      dueDate: format(dueDate, 'yyyy-MM-dd'),
      isAutoPay: template.isAutoPay,
      isPaid,
      category: template.category,
    };
  });
};

// Generate account data
const generateAccounts = (): Account[] => {
  return [
    {
      id: 'acct-1',
      name: 'Chase Checking',
      type: 'checking',
      balance: 4250.65,
      institution: 'Chase Bank',
    },
    {
      id: 'acct-2',
      name: 'Wells Fargo Savings',
      type: 'savings',
      balance: 12750.42,
      institution: 'Wells Fargo',
    },
    {
      id: 'acct-3',
      name: 'Bank of America Credit',
      type: 'credit',
      balance: -1850.30,
      institution: 'Bank of America',
    },
    {
      id: 'acct-4',
      name: 'Amex Gold',
      type: 'credit',
      balance: -750.80,
      institution: 'American Express',
    },
  ];
};

// Mock Data API
export const mockData = {
  transactions: generateTransactions(100),
  bills: generateBills(),
  accounts: generateAccounts(),
  
  // Helper methods to filter transactions
  getTransactionsByTimeFrame(timeFrame: string, startDate?: Date): Transaction[] {
    const transactions = this.transactions;
    const today = new Date();
    
    if (timeFrame === 'daily') {
      // Default to today if no date provided
      const targetDate = startDate ? format(startDate, 'yyyy-MM-dd') : format(today, 'yyyy-MM-dd');
      return transactions.filter(tx => tx.date === targetDate);
    }
    
    if (timeFrame === 'weekly') {
      // Get transactions from the last 7 days
      const sevenDaysAgo = subDays(today, 7);
      return transactions.filter(tx => new Date(tx.date) >= sevenDaysAgo);
    }
    
    if (timeFrame === 'monthly') {
      // Get transactions from the last 30 days
      const thirtyDaysAgo = subDays(today, 30);
      return transactions.filter(tx => new Date(tx.date) >= thirtyDaysAgo);
    }
    
    return transactions;
  },
  
  getUpcomingBills(): Bill[] {
    // Sort bills by due date 
    return this.bills
      .filter(bill => !bill.isPaid) // Only unpaid bills
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()); // Sort by due date
  },
  
  getRecurringTransactions(): Transaction[] {
    return this.transactions.filter(tx => tx.isRecurring);
  },
  
  getTransactionsByCategory(category: Category): Transaction[] {
    return this.transactions.filter(tx => tx.category === category);
  },
  
  getSpendingByCategory(timeFrame: string): Record<Category, number> {
    const relevantTransactions = this.getTransactionsByTimeFrame(timeFrame);
    const expenseTransactions = relevantTransactions.filter(tx => tx.amount < 0);
    
    // Initialize all categories with 0
    const categories: Category[] = [
      'groceries', 'dining', 'transportation', 'housing', 'utilities', 
      'entertainment', 'shopping', 'travel', 'healthcare', 'personal',
      'education', 'fitness', 'subscriptions', 'other'
    ];
    
    const initialSpending: Record<Category, number> = {} as Record<Category, number>;
    categories.forEach(category => {
      initialSpending[category] = 0;
    });
    
    // Sum up spending by category (abs value of negative amounts)
    return expenseTransactions.reduce((acc, tx) => {
      // Skip income
      if (tx.category === 'income' || tx.amount >= 0) return acc;
      
      // Sum up the absolute value of spending
      acc[tx.category] = (acc[tx.category] || 0) + Math.abs(tx.amount);
      return acc;
    }, initialSpending);
  },
  
  getTotalSpending(timeFrame: string): number {
    const relevantTransactions = this.getTransactionsByTimeFrame(timeFrame);
    // Sum up only negative amounts (expenses)
    return relevantTransactions
      .filter(tx => tx.amount < 0)
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  },
  
  getTotalIncome(timeFrame: string): number {
    const relevantTransactions = this.getTransactionsByTimeFrame(timeFrame);
    // Sum up only positive amounts (income)
    return relevantTransactions
      .filter(tx => tx.amount > 0)
      .reduce((sum, tx) => sum + tx.amount, 0);
  },
  
  getNetCashFlow(timeFrame: string): number {
    const relevantTransactions = this.getTransactionsByTimeFrame(timeFrame);
    // Sum up all amounts to get net cash flow
    return relevantTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  }
};
