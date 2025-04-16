
import React from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';

export default function Index() {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to Spence</h1>
        <p className="mb-6">Manage your finances intelligently</p>
        <Link to="/signin">
          <Button>Sign In</Button>
        </Link>
      </div>
    </AppLayout>
  );
}
