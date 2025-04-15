
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockData } from '@/lib/mock-data';
import { formatCurrency, getCategoryColor, getCategoryIcon } from '@/lib/utils';
import { Category } from '@/types';
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

type BudgetItem = {
  category: Category;
  budget: number;
  spent: number;
  remaining: number;
  percentUsed: number;
};

const Budgeting = () => {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  
  useEffect(() => {
    // In a real app, this would come from the user's budget settings
    // For demo purposes, we'll create some sample budget items
    const categorySpendings = mockData.getSpendingByCategory('monthly');
    
    // Sample budget allocations (in a real app this would be set by the user)
    const budgetAllocations: Record<Category, number> = {
      groceries: 500,
      dining: 300,
      transportation: 200,
      housing: 1500,
      utilities: 300,
      entertainment: 200,
      shopping: 300,
      travel: 400,
      healthcare: 200,
      personal: 150,
      income: 0, // Not a spending category
      education: 100,
      fitness: 80,
      subscriptions: 50,
      other: 100
    };
    
    // Create budget items
    const items: BudgetItem[] = [];
    let budgetTotal = 0;
    let spentTotal = 0;
    
    Object.entries(categorySpendings).forEach(([category, spent]) => {
      if (category !== 'income') { // Skip income category for budget
        const budget = budgetAllocations[category as Category] || 0;
        const remaining = budget - spent;
        const percentUsed = budget > 0 ? (spent / budget) * 100 : 0;
        
        items.push({
          category: category as Category,
          budget,
          spent,
          remaining,
          percentUsed
        });
        
        budgetTotal += budget;
        spentTotal += spent;
      }
    });
    
    // Sort by highest spent percentage first
    items.sort((a, b) => b.percentUsed - a.percentUsed);
    
    setBudgetItems(items);
    setTotalBudget(budgetTotal);
    setTotalSpent(spentTotal);
  }, []);
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Budget Management</h1>
        
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/50 dark:to-green-950/50">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Total Budget</h3>
                <p className="text-3xl font-bold">{formatCurrency(totalBudget)}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Total Spent</h3>
                <p className="text-3xl font-bold text-red-600">{formatCurrency(totalSpent)}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Remaining</h3>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(totalBudget - totalSpent)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Category Budgets</CardTitle>
            <CardDescription>Track your spending against monthly budget limits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {budgetItems.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getCategoryColor(item.category)}`}>
                        <span>{getCategoryIcon(item.category)}</span>
                      </div>
                      <span className="font-medium capitalize">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">{formatCurrency(item.spent)} / {formatCurrency(item.budget)}</span>
                    </div>
                  </div>
                  <Progress 
                    value={item.percentUsed > 100 ? 100 : item.percentUsed} 
                    className={`h-2 ${item.percentUsed > 90 ? 'bg-red-200' : 'bg-gray-200'}`}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{item.percentUsed.toFixed(0)}% used</span>
                    <span>
                      {item.remaining >= 0 
                        ? `${formatCurrency(item.remaining)} remaining` 
                        : `${formatCurrency(Math.abs(item.remaining))} over budget`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Budgeting;
