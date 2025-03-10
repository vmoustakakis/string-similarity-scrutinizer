
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function URLConverter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleConvert = () => {
    try {
      if (mode === 'encode') {
        setOutputText(encodeURIComponent(inputText));
      } else {
        setOutputText(decodeURIComponent(inputText));
      }
    } catch (error) {
      setOutputText(`Error: ${error instanceof Error ? error.message : 'Invalid input'}`);
    }
  };

  const handleReset = () => {
    setInputText('');
    setOutputText('');
  };

  return (
    <div className="flex flex-col space-y-6 w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h2 className="text-lg font-medium mb-2">Input Text</h2>
          <Textarea 
            placeholder={mode === 'encode' ? "Enter text to encode..." : "Enter text to decode..."}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[150px] font-mono"
            showLineNumbers={true}
          />
        </Card>
        
        <Card className="p-4">
          <h2 className="text-lg font-medium mb-2">Output Text</h2>
          <Textarea 
            placeholder="Result will appear here..."
            value={outputText}
            readOnly
            className="min-h-[150px] font-mono"
            showLineNumbers={true}
          />
        </Card>
      </div>

      <div className="flex justify-between">
        <div className="space-x-2">
          <Button 
            variant={mode === 'encode' ? 'default' : 'outline'} 
            onClick={() => setMode('encode')}
          >
            Encode
          </Button>
          <Button 
            variant={mode === 'decode' ? 'default' : 'outline'} 
            onClick={() => setMode('decode')}
          >
            Decode
          </Button>
        </div>
        
        <div className="space-x-2">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleConvert}>
            Convert
          </Button>
        </div>
      </div>
    </div>
  );
}
