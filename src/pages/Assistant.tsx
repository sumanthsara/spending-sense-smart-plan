
import { AppLayout } from '@/components/layout/AppLayout';
import { AIAssistant } from '@/components/assistant/AIAssistant';

const Assistant = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">AI Financial Assistant</h1>
        <p className="text-muted-foreground">
          Get personalized insights about your spending habits, find ways to save money, and receive answers to your financial questions.
        </p>
        
        <AIAssistant />
      </div>
    </AppLayout>
  );
};

export default Assistant;
