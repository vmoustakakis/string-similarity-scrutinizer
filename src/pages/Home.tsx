
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ArrowRight, FileText, Link2, Code } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col px-6 py-12 bg-gradient-to-br from-slate-50 to-indigo-50">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-indigo-800 mb-3">String Tools</h1>
        <p className="text-slate-600 max-w-xl mx-auto">
          Select a tool to work with your text data
        </p>
      </header>
      
      <main className="flex-1 w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/string-comparison" className="block">
            <Card className="h-full transition-all hover:shadow-md hover:border-indigo-200">
              <CardHeader>
                <FileText className="h-8 w-8 text-indigo-600 mb-2" />
                <CardTitle>String Comparison</CardTitle>
                <CardDescription>Compare two strings and see their differences</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-end">
                <ArrowRight className="h-5 w-5 text-indigo-500" />
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/url-converter" className="block">
            <Card className="h-full transition-all hover:shadow-md hover:border-indigo-200">
              <CardHeader>
                <Link2 className="h-8 w-8 text-indigo-600 mb-2" />
                <CardTitle>URL Converter</CardTitle>
                <CardDescription>Encode or decode URL strings</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-end">
                <ArrowRight className="h-5 w-5 text-indigo-500" />
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/json-formatter" className="block">
            <Card className="h-full transition-all hover:shadow-md hover:border-indigo-200">
              <CardHeader>
                <Code className="h-8 w-8 text-indigo-600 mb-2" />
                <CardTitle>JSON Formatter</CardTitle>
                <CardDescription>Format or minify your JSON data</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-end">
                <ArrowRight className="h-5 w-5 text-indigo-500" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
      
      <footer className="mt-12 text-center text-sm text-slate-500">
        <p>Built with care for efficient string operations</p>
      </footer>
    </div>
  );
};

export default Home;
