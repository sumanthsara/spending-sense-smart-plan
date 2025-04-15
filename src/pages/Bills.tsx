
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockData } from '@/lib/mock-data';
import { formatCurrency, getCategoryColor, getCategoryIcon, getRelativeDateLabel } from '@/lib/utils';
import { Bill } from '@/types';
import { useState, useEffect } from 'react';
import { CheckCircle, Calendar, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

const Bills = () => {
  const [upcomingBills, setUpcomingBills] = useState<Bill[]>([]);
  const [paidBills, setPaidBills] = useState<Bill[]>([]);

  useEffect(() => {
    // Get bills data
    const allBills = mockData.getUpcomingBills();
    setUpcomingBills(allBills.filter(bill => !bill.isPaid));
    setPaidBills(allBills.filter(bill => bill.isPaid));
  }, []);

  const markAsPaid = (billId: string) => {
    setUpcomingBills(prev => prev.filter(bill => bill.id !== billId));
    setPaidBills(prev => {
      const billToPay = upcomingBills.find(bill => bill.id === billId);
      if (!billToPay) return prev;
      
      return [...prev, { ...billToPay, isPaid: true }];
    });
    
    toast({
      title: "Bill marked as paid",
      description: "The bill has been moved to paid bills.",
    });
  };

  const toggleAutoPay = (billId: string) => {
    setUpcomingBills(prev => prev.map(bill => 
      bill.id === billId ? { ...bill, isAutoPay: !bill.isAutoPay } : bill
    ));
    
    toast({
      title: "AutoPay setting updated",
      description: "Your AutoPay preference has been saved.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Bills & Payments</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Bills</CardTitle>
            <CardDescription>Bills due in the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingBills.length > 0 ? (
              <div className="space-y-4">
                {upcomingBills.map((bill) => (
                  <div 
                    key={bill.id} 
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg border gap-4"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getCategoryColor(bill.category)}`}>
                        <span className="text-lg">{getCategoryIcon(bill.category)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{bill.name}</p>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span className={`${
                            new Date(bill.dueDate) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) 
                              ? 'text-red-600 font-medium' 
                              : 'text-muted-foreground'
                          }`}>
                            Due {getRelativeDateLabel(bill.dueDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 sm:space-x-6 w-full sm:w-auto">
                      <div className="flex flex-col items-start sm:items-end">
                        <span className="font-bold text-red-600">{formatCurrency(bill.amount)}</span>
                        <div className="flex items-center text-sm mt-1">
                          <span className="text-muted-foreground mr-2">AutoPay</span>
                          <Switch 
                            checked={bill.isAutoPay}
                            onCheckedChange={() => toggleAutoPay(bill.id)}
                          />
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="ml-auto"
                        onClick={() => markAsPaid(bill.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Mark as Paid
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No upcoming bills</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recently Paid Bills</CardTitle>
            <CardDescription>Bills you've already paid</CardDescription>
          </CardHeader>
          <CardContent>
            {paidBills.length > 0 ? (
              <div className="space-y-4">
                {paidBills.map((bill) => (
                  <div 
                    key={bill.id} 
                    className="flex justify-between items-center p-4 rounded-lg border opacity-70"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getCategoryColor(bill.category)}`}>
                        <span className="text-lg">{getCategoryIcon(bill.category)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{bill.name}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Paid {getRelativeDateLabel(new Date().toISOString())}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className="font-medium">{formatCurrency(bill.amount)}</span>
                      <div className="flex items-center text-sm text-green-600 mt-1">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        <span>Paid</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No paid bills</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Bills;
