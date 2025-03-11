
import React, { useState, useEffect } from 'react';
import { compareStrings } from '@/utils/stringUtils';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ComparisonResult } from '@/components/ComparisonResult';

export function StringComparison() {
  const [string1, setString1] = useState('');
  const [string2, setString2] = useState('');
  const [diffResult, setDiffResult] = useState<Array<{ type: 'equal' | 'removed' | 'added', value: string }>>([]);

  useEffect(() => {
    const result = compareStrings(string1, string2);
    setDiffResult(result);
  }, [string1, string2]);

  const handleReset = () => {
    setString1('');
    setString2('');
  };

  return (
    <div className="flex flex-col space-y-6 w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h2 className="text-lg font-medium mb-2">String 1</h2>
          <Textarea 
            placeholder="Enter first string here..." 
            value={string1}
            onChange={(e) => setString1(e.target.value)}
            className="min-h-[400px] font-mono w-full"
            showLineNumbers={true}
          />
        </Card>
        
        <Card className="p-4">
          <h2 className="text-lg font-medium mb-2">String 2</h2>
          <Textarea 
            placeholder="Enter second string here..." 
            value={string2}
            onChange={(e) => setString2(e.target.value)}
            className="min-h-[400px] font-mono w-full"
            showLineNumbers={true}
          />
        </Card>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" onClick={handleReset} className="mr-2">
          Reset
        </Button>
      </div>

      <Card className="p-4">
        <h2 className="text-lg font-medium mb-4">Comparison Result</h2>
        <ComparisonResult diffResult={diffResult} />
      </Card>
    </div>
  );
}
