
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
  
  // Process the diff result to organize by lines and remove trailing empty lines
  const processedContent = diffResult.reduce((acc, part) => {
    const lines = part.value.split('\n');
    
    // Skip empty lines at the end
    if (part.value.endsWith('\n')) {
      lines.pop();
    }
    
    lines.forEach((line, index) => {
      // If not the last line or if the line ends with a newline character
      const endsWithNewline = index < lines.length - 1 || part.value.endsWith('\n');
      acc.push({ type: part.type, value: line, endsWithNewline });
    });
    
    return acc;
  }, [] as Array<{ type: 'equal' | 'removed' | 'added', value: string, endsWithNewline: boolean }>);
  
  // Group the processed content into diff chunks
  const diffChunks: Array<{
    type: 'unchanged' | 'modified',
    content: Array<{ type: 'equal' | 'removed' | 'added', value: string, endsWithNewline: boolean }>
  }> = [];
  
  let currentChunk: {
    type: 'unchanged' | 'modified',
    content: Array<{ type: 'equal' | 'removed' | 'added', value: string, endsWithNewline: boolean }>
  } | null = null;
  
  processedContent.forEach((part) => {
    if (part.type === 'equal') {
      if (!currentChunk || currentChunk.type === 'modified') {
        if (currentChunk) {
          diffChunks.push(currentChunk);
        }
        currentChunk = { type: 'unchanged', content: [part] };
      } else {
        currentChunk.content.push(part);
      }
    } else {
      if (!currentChunk || currentChunk.type === 'unchanged') {
        if (currentChunk) {
          diffChunks.push(currentChunk);
        }
        currentChunk = { type: 'modified', content: [part] };
      } else {
        currentChunk.content.push(part);
      }
    }
  });
  
  if (currentChunk) {
    diffChunks.push(currentChunk);
  }
  
  // Transform chunks into display lines
  const displayLines: Array<{
    lineNumber: number | null,
    content: { type: 'equal' | 'removed' | 'added', value: string }
  }> = [];
  
  let lineCounter = 1;
  
  diffChunks.forEach(chunk => {
    if (chunk.type === 'unchanged') {
      chunk.content.forEach(part => {
        displayLines.push({
          lineNumber: lineCounter++,
          content: { type: part.type, value: part.value }
        });
      });
    } else {
      // For modified chunks, add removed lines first with line numbers
      const removedLines = chunk.content.filter(part => part.type === 'removed');
      removedLines.forEach(part => {
        displayLines.push({
          lineNumber: lineCounter++,
          content: { type: part.type, value: part.value }
        });
      });
      
      // Then add added lines without line numbers
      const addedLines = chunk.content.filter(part => part.type === 'added');
      addedLines.forEach(part => {
        displayLines.push({
          lineNumber: null,
          content: { type: part.type, value: part.value }
        });
      });
    }
  });
  
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
            {displayLines.map((line, index) => (
              <div key={index} className="leading-6">
                {line.lineNumber !== null ? line.lineNumber : ''}
              </div>
            ))}
          </div>
          
          {/* Content with highlight */}
          <div className="flex-grow p-2 bg-background whitespace-pre-wrap break-all">
            {displayLines.map((line, index) => {
              let className = '';
              
              switch (line.content.type) {
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
                <div key={index} className="leading-6">
                  <span className={className}>
                    {line.content.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
