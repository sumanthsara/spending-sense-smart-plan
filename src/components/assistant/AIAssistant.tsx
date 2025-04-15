
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowUp, Bot, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type Message = {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export const AIAssistant = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      content: "Hi there! I'm your SpendingSense AI assistant. I can help you understand your spending habits, find ways to save money, and answer questions about your finances. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length,
        content: input,
        sender: 'user',
        timestamp: new Date(),
      },
    ]);

    // Clear input
    setInput('');

    // Simulate AI response based on user input
    setTimeout(() => {
      let aiResponse = '';

      if (input.toLowerCase().includes('food') || input.toLowerCase().includes('dining')) {
        aiResponse = "I've analyzed your food spending. You spent $320 on dining this month, which is 35% higher than last month. Most of your spending was at restaurants during weekends. Would you like some tips to reduce your food expenses?";
      } else if (input.toLowerCase().includes('save') || input.toLowerCase().includes('saving')) {
        aiResponse = "Based on your spending patterns, you could save about $150 monthly by reducing subscription services and dining out less. You currently have 5 active subscriptions totaling $65/month. Would you like me to list them all?";
      } else if (input.toLowerCase().includes('budget') || input.toLowerCase().includes('plan')) {
        aiResponse = "Looking at your income and expenses, I recommend allocating 50% to necessities (housing, food, utilities), 30% to discretionary spending, and 20% to savings. Based on your recent transactions, you're currently spending 65% on necessities, 30% on discretionary items, and saving 5%.";
      } else if (input.toLowerCase().includes('bill') || input.toLowerCase().includes('payment')) {
        aiResponse = "You have 3 upcoming bills: Rent ($1,800) due in 5 days, Electricity ($120) due in 8 days, and Internet ($79.99) due in 12 days. Your rent payment is your largest monthly expense at 35% of your total monthly spending.";
      } else {
        aiResponse = "I've analyzed your spending patterns and noticed a few trends. Your highest spending category is housing at 35%, followed by dining at 15% and transportation at 12%. Compared to last month, your overall spending has increased by 8%. Is there a specific area of your finances you'd like me to focus on?";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length,
          content: aiResponse,
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="h-[calc(100vh-7rem)]">
      <CardHeader>
        <CardTitle>AI Financial Assistant</CardTitle>
        <CardDescription>
          Ask questions about your spending habits, get financial insights, and receive personalized advice
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-[calc(100%-5rem)]">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.sender === 'user' ? 'justify-end' : ''
              }`}
            >
              {message.sender === 'ai' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                  <AvatarImage src="/placeholder.svg" />
                </Avatar>
              )}
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              {message.sender === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-500 text-white">U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
        <div className="border rounded-md flex items-center p-1">
          <Input
            className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Ask something about your finances..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button size="sm" className="rounded-full" onClick={handleSend} disabled={!input.trim()}>
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
