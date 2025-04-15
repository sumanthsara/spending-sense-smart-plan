
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { AppLayout } from '@/components/layout/AppLayout';
import { CreditCard, Building, AlertCircle, CheckCircle } from 'lucide-react';

// Define types for mock banks and cards
type FinancialInstitution = {
  id: string;
  name: string;
  icon: React.ElementType;
  type: 'bank' | 'card';
};

export default function ConnectBank() {
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState<string | null>(null);

  // Mock list of popular banks and credit cards
  const institutions: FinancialInstitution[] = [
    { id: 'chase', name: 'Chase', icon: Building, type: 'bank' },
    { id: 'bofa', name: 'Bank of America', icon: Building, type: 'bank' },
    { id: 'wells', name: 'Wells Fargo', icon: Building, type: 'bank' },
    { id: 'citi', name: 'Citibank', icon: Building, type: 'bank' },
    { id: 'amex', name: 'American Express', icon: CreditCard, type: 'card' },
    { id: 'capital', name: 'Capital One', icon: CreditCard, type: 'card' },
    { id: 'discover', name: 'Discover', icon: CreditCard, type: 'card' },
  ];

  const handleConnectInstitution = (id: string) => {
    setSelectedInstitution(id);
    setIsConnecting(true);
    
    // In a real app, this would trigger the Plaid Link process
    console.log(`Connecting to ${id}`);
    
    // Simulate connection process
    setTimeout(() => {
      toast.success(`Successfully connected to ${institutions.find(i => i.id === id)?.name}!`);
      setIsConnecting(false);
      navigate("/");
    }, 2000);
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Connect Your Accounts</h1>
          <p className="text-muted-foreground">
            Connect your bank accounts and credit cards to track your finances in one place.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                Banking Accounts
              </CardTitle>
              <CardDescription>
                Connect your checking and savings accounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {institutions
                .filter(inst => inst.type === 'bank')
                .map(bank => (
                  <Button
                    key={bank.id}
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => handleConnectInstitution(bank.id)}
                    disabled={isConnecting && selectedInstitution === bank.id}
                  >
                    <div className="flex items-center">
                      <bank.icon className="mr-2 h-5 w-5" />
                      {bank.name}
                    </div>
                    {isConnecting && selectedInstitution === bank.id ? (
                      <div className="animate-pulse">Connecting...</div>
                    ) : (
                      <span>Connect</span>
                    )}
                  </Button>
                ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Credit Cards
              </CardTitle>
              <CardDescription>
                Connect your credit cards to track spending
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {institutions
                .filter(inst => inst.type === 'card')
                .map(card => (
                  <Button
                    key={card.id}
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => handleConnectInstitution(card.id)}
                    disabled={isConnecting && selectedInstitution === card.id}
                  >
                    <div className="flex items-center">
                      <card.icon className="mr-2 h-5 w-5" />
                      {card.name}
                    </div>
                    {isConnecting && selectedInstitution === card.id ? (
                      <div className="animate-pulse">Connecting...</div>
                    ) : (
                      <span>Connect</span>
                    )}
                  </Button>
                ))}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
              Security Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                <p>Spence uses bank-level security to protect your credentials.</p>
              </div>
              <div className="flex">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                <p>Your bank login credentials are never stored on our servers.</p>
              </div>
              <div className="flex">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                <p>We use read-only access - we can never withdraw or move your money.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
