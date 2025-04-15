
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockData } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { ChartType, TimeFrame } from '@/types';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell 
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Analytics = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('monthly');
  const [chartType, setChartType] = useState<ChartType>('bar');
  
  // Get spending data based on timeframe
  const spendingData = mockData.getSpendingOverTime(timeFrame);
  
  // Get category data for pie chart
  const categoryData = Object.entries(mockData.getSpendingByCategory(timeFrame))
    .filter(([category, amount]) => category !== 'income' && amount > 0)
    .map(([category, amount]) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value: amount
    }))
    .sort((a, b) => b.value - a.value);
  
  // Colors for pie chart
  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8',
    '#82CA9D', '#FFC658', '#8DD1E1', '#A4DE6C', '#D0ED57'
  ];
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-blue-600">{`Spending: ${formatCurrency(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Spending Analytics</h1>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Tabs defaultValue={timeFrame} onValueChange={(value) => setTimeFrame(value as TimeFrame)}>
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Select value={chartType} onValueChange={(value) => setChartType(value as ChartType)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bar">Bar Chart</SelectItem>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="pie">Pie Chart</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Spending Analysis</CardTitle>
            <CardDescription>
              {chartType === 'pie' 
                ? 'Spending breakdown by category'
                : `${timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} spending over time`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              {chartType === 'bar' && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={spendingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="spending" fill="#3B82F6" name="Spending" />
                  </BarChart>
                </ResponsiveContainer>
              )}
              
              {chartType === 'line' && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={spendingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="spending" stroke="#3B82F6" name="Spending" />
                  </LineChart>
                </ResponsiveContainer>
              )}
              
              {chartType === 'pie' && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Spending Insights</CardTitle>
            <CardDescription>Key metrics about your spending habits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Top Spending Category</h3>
                <p className="text-2xl font-bold">{categoryData[0]?.name || 'N/A'}</p>
                <p className="text-sm text-muted-foreground">
                  {categoryData[0] ? formatCurrency(categoryData[0].value) : '$0'}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Average Daily Spending</h3>
                <p className="text-2xl font-bold">
                  {formatCurrency(mockData.getAverageDailySpending())}
                </p>
                <p className="text-sm text-muted-foreground">Based on last 30 days</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Total Monthly Spending</h3>
                <p className="text-2xl font-bold">
                  {formatCurrency(mockData.getTotalSpending('monthly'))}
                </p>
                <p className="text-sm text-muted-foreground">Current month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Analytics;
