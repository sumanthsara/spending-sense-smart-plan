
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockData } from '@/lib/mock-data';
import { getCategoryColor, getCategoryIcon, formatCurrency } from '@/lib/utils';
import { Category, TimeFrame } from '@/types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type CategorySpending = {
  name: string;
  value: number;
  category: Category;
  icon: string;
  color: string;
};

export const SpendingByCategory = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('weekly');
  const [categoryData, setCategoryData] = useState<CategorySpending[]>([]);
  const [totalSpending, setTotalSpending] = useState(0);
  
  useEffect(() => {
    // Get spending by category for the selected time frame
    const categorySpendings = mockData.getSpendingByCategory(timeFrame);
    const total = Object.values(categorySpendings).reduce((sum, amount) => sum + amount, 0);
    
    // Format data for chart
    const formattedData = Object.entries(categorySpendings)
      .filter(([_, value]) => value > 0) // Only include categories with spending
      .map(([category, value]) => ({
        name: category.charAt(0).toUpperCase() + category.slice(1), // Capitalize
        value,
        category: category as Category,
        icon: getCategoryIcon(category as Category),
        color: getCategoryColor(category as Category).replace('bg-', '')
      }))
      .sort((a, b) => b.value - a.value); // Sort by highest spending first
    
    setCategoryData(formattedData);
    setTotalSpending(total);
  }, [timeFrame]);
  
  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-md rounded-md border">
          <p className="font-medium">{`${data.name} ${data.icon}`}</p>
          <p className="text-sm">{formatCurrency(data.value)}</p>
          <p className="text-xs text-muted-foreground">{`${(data.value / totalSpending * 100).toFixed(1)}% of total`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="h-[420px]">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>See where your money is going</CardDescription>
          </div>
          <Tabs defaultValue="weekly" value={timeFrame} onValueChange={(value) => setTimeFrame(value as TimeFrame)}>
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {categoryData.length > 0 ? (
          <div className="h-[310px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`var(--${entry.color})`} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                  formatter={(value, entry, index) => {
                    const item = categoryData[index];
                    return (
                      <span className="text-sm">
                        {item.icon} {value}
                      </span>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[310px] flex items-center justify-center">
            <p className="text-muted-foreground">No spending data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
