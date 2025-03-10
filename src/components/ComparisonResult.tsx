
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
  
  return (
    <div className="space-y-4">
      {areIdentical ? (
        <div className="bg-green-50 p-4 rounded-md border border-green-200">
          <p className="text-green-600 font-medium">The strings are identical! ✓</p>
        </div>
      ) : (
        <>
          <div className="flex items-center space-x-4 mb-3">
            <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Removed</Badge>
            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Added</Badge>
            <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">Unchanged</Badge>
          </div>
          
          <div className="font-mono p-4 bg-muted rounded-md whitespace-pre-wrap break-all">
            {diffResult.map((part, index) => {
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
                <span key={index} className={className}>
                  {part.value}
                </span>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
