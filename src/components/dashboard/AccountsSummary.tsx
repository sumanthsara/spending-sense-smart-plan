
import { mockData } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { CreditCard } from 'lucide-react';

export const AccountsSummary = () => {
  const accounts = mockData.accounts;
  
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  
  return (
    <div className="finance-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Accounts</h2>
        <span className="text-sm font-medium text-muted-foreground">
          Net Worth: {formatCurrency(totalBalance)}
        </span>
      </div>
      
      <div className="space-y-3">
        {accounts.map((account) => (
          <div key={account.id} className="flex items-center justify-between p-2.5 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                account.type === 'credit' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
              }`}>
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium">{account.name}</h3>
                <p className="text-sm text-muted-foreground">{account.institution}</p>
              </div>
            </div>
            <span className={`font-medium ${
              account.balance < 0 ? 'text-red-600' : 'text-green-600'
            }`}>
              {formatCurrency(account.balance)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
