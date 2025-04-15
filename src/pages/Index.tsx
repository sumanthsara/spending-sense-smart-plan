
import { AppLayout } from '@/components/layout/AppLayout';
import { AccountsSummary } from '@/components/dashboard/AccountsSummary';
import { SpendingOverview } from '@/components/dashboard/SpendingOverview';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { UpcomingBills } from '@/components/dashboard/UpcomingBills';
import { SpendingByCategory } from '@/components/dashboard/SpendingByCategory';
import { SmartInsights } from '@/components/dashboard/SmartInsights';

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <SpendingOverview />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AccountsSummary />
          <SmartInsights />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SpendingByCategory />
          <div className="space-y-6">
            <RecentTransactions />
            <UpcomingBills />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
