
import React from 'react';
import { JSONFormatter } from '@/components/JSONFormatter';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const JSONFormatterPage = () => {
  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-gradient-to-br from-slate-50 to-indigo-50">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-800">JSON Formatter</h1>
        <Link to="/">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </header>
      
      <main className="flex-1 w-full">
        <JSONFormatter />
      </main>
      
      <footer className="mt-12 text-center text-sm text-slate-500">
        <p>Built with care for efficient string operations</p>
      </footer>
    </div>
  );
};

export default JSONFormatterPage;
