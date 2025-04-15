
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, TrendingDown, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

export const SmartInsights = () => {
  const insights = [
    {
      title: "35% Higher Food Spending",
      description: "You've spent 35% more on dining out compared to last week.",
      type: "warning",
      icon: TrendingUp,
    },
    {
      title: "Recurring Netflix Payment",
      description: "Your Netflix subscription ($13.99) will be charged tomorrow.",
      type: "info",
      icon: BrainCircuit,
    },
    {
      title: "Utilities Spending Down",
      description: "Your utilities spending is down 12% from last month. Great job!",
      type: "success",
      icon: TrendingDown,
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Smart Insights</CardTitle>
          <Link to="/assistant">
            <Button variant="ghost" size="sm">
              Ask AI Assistant
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg flex items-start gap-3 ${
                insight.type === 'warning' 
                  ? 'bg-red-50 dark:bg-red-900/20' 
                  : insight.type === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : 'bg-blue-50 dark:bg-blue-900/20'
              }`}
            >
              <div className={`mt-0.5 p-2 rounded-full ${
                insight.type === 'warning' 
                  ? 'bg-red-100 text-red-600 dark:bg-red-800/50 dark:text-red-300' 
                  : insight.type === 'success'
                    ? 'bg-green-100 text-green-600 dark:bg-green-800/50 dark:text-green-300'
                    : 'bg-blue-100 text-blue-600 dark:bg-blue-800/50 dark:text-blue-300'
              }`}>
                <insight.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">{insight.title}</p>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
