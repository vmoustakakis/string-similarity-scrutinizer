
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function JSONFormatter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'format' | 'minify'>('format');

  const handleProcess = () => {
    try {
      // Parse the JSON first to validate it
      const jsonObject = JSON.parse(inputText);
      
      if (mode === 'format') {
        // Format with 2 spaces indentation
        setOutputText(JSON.stringify(jsonObject, null, 2));
      } else {
        // Minify by removing all whitespace
        setOutputText(JSON.stringify(jsonObject));
      }
    } catch (error) {
      setOutputText(`Error: ${error instanceof Error ? error.message : 'Invalid JSON'}`);
    }
  };

  const handleReset = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="flex flex-col space-y-6 w-full max-w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4 w-full">
          <h2 className="text-lg font-medium mb-2">Input JSON</h2>
          <Textarea 
            placeholder="Enter JSON to process..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[500px] font-mono"
            showLineNumbers={true}
          />
        </Card>
        
        <Card className="p-4 w-full">
          <h2 className="text-lg font-medium mb-2">Output JSON</h2>
          <Textarea 
            placeholder="Result will appear here..."
            value={outputText}
            readOnly
            className="min-h-[500px] font-mono"
            showLineNumbers={true}
          />
        </Card>
      </div>

      <div className="flex justify-between">
        <div className="space-x-2">
          <Button 
            variant={mode === 'format' ? 'default' : 'outline'} 
            onClick={() => setMode('format')}
          >
            Format
          </Button>
          <Button 
            variant={mode === 'minify' ? 'default' : 'outline'} 
            onClick={() => setMode('minify')}
          >
            Minify
          </Button>
        </div>
        
        <div className="space-x-2">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleProcess}>
            Process
          </Button>
        </div>
      </div>
    </div>
  );
}
