
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ComparisonResultProps {
  diffResult: Array<{ type: 'equal' | 'removed' | 'added', value: string }>;
}

export function ComparisonResult({ diffResult }: ComparisonResultProps) {
  if (diffResult.length === 0) {
    return <div className="text-muted-foreground">Enter text in both fields to see comparison results</div>;
  }

  // Check if strings are identical
  const areIdentical = diffResult.length === 1 && diffResult[0].type === 'equal';
  
  if (areIdentical) {
    return (
      <div className="bg-green-50 p-4 rounded-md border border-green-200">
        <p className="text-green-600 font-medium">The strings are identical! ✓</p>
      </div>
    );
  }
  
  // Process the diff result to organize by lines
  const processedContent = diffResult.reduce((acc, part) => {
    const lines = part.value.split('\n');
    
    lines.forEach((line, index) => {
      // If not the last line or if the line ends with a newline character
      if (index < lines.length - 1 || part.value.endsWith('\n')) {
        acc.push({ type: part.type, value: line, endsWithNewline: true });
      } else {
        acc.push({ type: part.type, value: line, endsWithNewline: false });
      }
    });
    
    return acc;
  }, [] as Array<{ type: 'equal' | 'removed' | 'added', value: string, endsWithNewline: boolean }>);
  
  // Group the processed content by lines
  const lines: Array<Array<{ type: 'equal' | 'removed' | 'added', value: string }>> = [];
  let currentLine: Array<{ type: 'equal' | 'removed' | 'added', value: string }> = [];
  
  processedContent.forEach((part) => {
    currentLine.push({ type: part.type, value: part.value });
    
    if (part.endsWithNewline) {
      lines.push([...currentLine]);
      currentLine = [];
    }
  });
  
  // Add the last line if it exists
  if (currentLine.length > 0) {
    lines.push(currentLine);
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4 mb-3">
        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Removed</Badge>
        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Added</Badge>
        <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">Unchanged</Badge>
      </div>
      
      <div className="font-mono rounded-md overflow-hidden border border-input">
        <div className="flex">
          {/* Line numbers */}
          <div className="flex-shrink-0 select-none py-2 px-2 text-right text-muted-foreground bg-muted border-r border-input" style={{ width: '3rem' }}>
            {lines.map((_, index) => (
              <div key={index} className="leading-6">{index + 1}</div>
            ))}
          </div>
          
          {/* Content with highlight */}
          <div className="flex-grow p-2 bg-background whitespace-pre-wrap break-all">
            {lines.map((line, lineIndex) => (
              <div key={lineIndex} className="leading-6">
                {line.map((part, partIndex) => {
                  let className = '';
                  
                  switch (part.type) {
                    case 'added':
                      className = 'bg-green-100 text-green-800';
                      break;
                    case 'removed':
                      className = 'bg-red-100 text-red-800';
                      break;
                    default:
                      className = '';
                  }
                  
                  return (
                    <span key={partIndex} className={className}>
                      {part.value}
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
