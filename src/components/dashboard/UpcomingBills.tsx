
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockData } from '@/lib/mock-data';
import { formatCurrency, getCategoryColor, getCategoryIcon, getRelativeDateLabel } from '@/lib/utils';
import { Bill } from '@/types';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UpcomingBills = () => {
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    // Get upcoming bills
    const upcomingBills = mockData.getUpcomingBills().slice(0, 4);
    setBills(upcomingBills);
  }, []);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Upcoming Bills</CardTitle>
            <CardDescription>Don't forget to pay these bills</CardDescription>
          </div>
          <Link to="/bills">
            <Button variant="outline" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {bills.map((bill) => (
            <div 
              key={bill.id} 
              className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getCategoryColor(bill.category)}`}>
                  <span className="text-lg">{getCategoryIcon(bill.category)}</span>
                </div>
                <div>
                  <p className="font-medium">{bill.name}</p>
                  <div className="flex items-center">
                    <p className="text-sm text-muted-foreground">Due {getRelativeDateLabel(bill.dueDate)}</p>
                    {bill.isAutoPay && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        AutoPay
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <span className="font-medium text-red-600">
                {formatCurrency(bill.amount)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
