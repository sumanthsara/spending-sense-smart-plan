
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockData } from '@/lib/mock-data';
import { calculatePercentChange, formatCurrency } from '@/lib/utils';
import { ArrowDownIcon, ArrowUpIcon, CreditCard, DollarSign, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { TimeFrame } from '@/types';

export const SpendingOverview = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('weekly');
  const [totalSpending, setTotalSpending] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [netCashFlow, setNetCashFlow] = useState(0);
  const [previousSpending, setPreviousSpending] = useState(0);
  const [spendingPercentChange, setSpendingPercentChange] = useState(0);
  
  useEffect(() => {
    // Get spending data for the selected time frame
    const spending = mockData.getTotalSpending(timeFrame);
    const income = mockData.getTotalIncome(timeFrame);
    const cashFlow = mockData.getNetCashFlow(timeFrame);
    
    // Calculate previous period spending for comparison
    let prevSpending = 0;
    if (timeFrame === 'daily') {
      // Previous day
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      prevSpending = mockData.getTotalSpending('daily', yesterday);
    } else if (timeFrame === 'weekly') {
      // Previous week
      prevSpending = mockData.getTransactionsByTimeFrame('weekly')
        .filter(tx => {
          const txDate = new Date(tx.date);
          const twoWeeksAgo = new Date();
          twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          return txDate >= twoWeeksAgo && txDate < oneWeekAgo && tx.amount < 0;
        })
        .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    } else if (timeFrame === 'monthly') {
      // Previous month
      prevSpending = mockData.getTransactionsByTimeFrame('monthly')
        .filter(tx => {
          const txDate = new Date(tx.date);
          const twoMonthsAgo = new Date();
          twoMonthsAgo.setDate(twoMonthsAgo.getDate() - 60);
          const oneMonthAgo = new Date();
          oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
          return txDate >= twoMonthsAgo && txDate < oneMonthAgo && tx.amount < 0;
        })
        .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    }
    
    // Calculate percent change
    const percentChange = calculatePercentChange(spending, prevSpending);
    
    setTotalSpending(spending);
    setTotalIncome(income);
    setNetCashFlow(cashFlow);
    setPreviousSpending(prevSpending);
    setSpendingPercentChange(percentChange);
    
  }, [timeFrame]);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Spending Overview</CardTitle>
            <CardDescription>Track your spending and income</CardDescription>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Spending Card */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Spending</p>
                <h3 className="text-2xl font-bold">{formatCurrency(totalSpending)}</h3>
                
                <div className="flex items-center mt-2">
                  {spendingPercentChange > 0 ? (
                    <>
                      <div className="flex items-center rounded-full bg-red-200 px-2 py-1 text-xs font-medium">
                        <ArrowUpIcon className="h-3 w-3 mr-1" />
                        <span>{Math.abs(spendingPercentChange).toFixed(1)}%</span>
                      </div>
                      <span className="text-xs ml-2 text-muted-foreground">vs previous {timeFrame}</span>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center rounded-full bg-green-200 px-2 py-1 text-xs font-medium">
                        <ArrowDownIcon className="h-3 w-3 mr-1" />
                        <span>{Math.abs(spendingPercentChange).toFixed(1)}%</span>
                      </div>
                      <span className="text-xs ml-2 text-muted-foreground">vs previous {timeFrame}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="bg-red-100 dark:bg-red-800/50 p-3 rounded-full">
                <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-300" />
              </div>
            </div>
          </div>
          
          {/* Income Card */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Income</p>
                <h3 className="text-2xl font-bold">{formatCurrency(totalIncome)}</h3>
                <p className="text-xs text-muted-foreground mt-3">For the selected {timeFrame} period</p>
              </div>
              <div className="bg-green-100 dark:bg-green-800/50 p-3 rounded-full">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-300" />
              </div>
            </div>
          </div>
          
          {/* Net Flow Card */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Net Cash Flow</p>
                <h3 className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(netCashFlow)}
                </h3>
                <p className="text-xs text-muted-foreground mt-3">Income minus expenses</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-800/50 p-3 rounded-full">
                <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
