
/**
 * Compares two strings line by line and returns an array of differences
 * Each element in the array represents a part of the string that is either:
 * - equal: present in both strings
 * - removed: only in the first string
 * - added: only in the second string
 */
export function compareStrings(str1: string, str2: string) {
  if (str1 === str2) {
    return [{ type: 'equal' as const, value: str1 }];
  }

  // Split the strings into lines
  const lines1 = str1.split('\n');
  const lines2 = str2.split('\n');
  
  const result: Array<{ type: 'equal' | 'removed' | 'added', value: string }> = [];
  
  // Compare each line
  const maxLines = Math.max(lines1.length, lines2.length);
  
  for (let i = 0; i < maxLines; i++) {
    const line1 = i < lines1.length ? lines1[i] : null;
    const line2 = i < lines2.length ? lines2[i] : null;
    
    if (line1 === null) {
      // Line only exists in the second string
      result.push({ type: 'added', value: line2 + '\n' });
    } else if (line2 === null) {
      // Line only exists in the first string
      result.push({ type: 'removed', value: line1 + '\n' });
    } else if (line1 === line2) {
      // Lines are identical
      result.push({ type: 'equal', value: line1 + '\n' });
    } else {
      // Lines differ, we need to find specific differences within the line
      const lineDiff = compareLineContent(line1, line2);
      result.push(...lineDiff);
      
      // Add newline after the last part of the line
      if (lineDiff.length > 0) {
        const lastPart = lineDiff[lineDiff.length - 1];
        result[result.length - 1] = { 
          ...lastPart, 
          value: lastPart.value + '\n' 
        };
      }
    }
  }
  
  return result;
}

/**
 * Compares the content of two lines character by character
 */
function compareLineContent(line1: string, line2: string) {
  const result: Array<{ type: 'equal' | 'removed' | 'added', value: string }> = [];
  let i = 0;
  let j = 0;
  
  while (i < line1.length || j < line2.length) {
    // Find a common subsequence
    if (i < line1.length && j < line2.length && line1[i] === line2[j]) {
      let equalChunk = '';
      
      while (i < line1.length && j < line2.length && line1[i] === line2[j]) {
        equalChunk += line1[i];
        i++;
        j++;
      }
      
      if (equalChunk) {
        result.push({ type: 'equal', value: equalChunk });
      }
      
      continue;
    }
    
    // Check for removed characters (only in line1)
    let removedChunk = '';
    const originalI = i;
    
    while (i < line1.length && (j >= line2.length || line1[i] !== line2[j])) {
      removedChunk += line1[i];
      i++;
    }
    
    if (removedChunk) {
      result.push({ type: 'removed', value: removedChunk });
    }
    
    // Check for added characters (only in line2)
    let addedChunk = '';
    const originalJ = j;
    
    while (j < line2.length && (i === originalI || (i < line1.length && line1[i] !== line2[j]))) {
      addedChunk += line2[j];
      j++;
    }
    
    if (addedChunk) {
      result.push({ type: 'added', value: addedChunk });
    }
  }
  
  return result;
}
