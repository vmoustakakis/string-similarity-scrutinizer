
/**
 * Compares two strings and returns an array of differences
 * Each element in the array represents a part of the string that is either:
 * - equal: present in both strings
 * - removed: only in the first string
 * - added: only in the second string
 */
export function compareStrings(str1: string, str2: string) {
  if (str1 === str2) {
    return [{ type: 'equal' as const, value: str1 }];
  }
  
  const result: Array<{ type: 'equal' | 'removed' | 'added', value: string }> = [];
  let i = 0;
  let j = 0;
  
  while (i < str1.length || j < str2.length) {
    // Find a common subsequence
    if (i < str1.length && j < str2.length && str1[i] === str2[j]) {
      let equalChunk = '';
      
      while (i < str1.length && j < str2.length && str1[i] === str2[j]) {
        equalChunk += str1[i];
        i++;
        j++;
      }
      
      if (equalChunk) {
        result.push({ type: 'equal', value: equalChunk });
      }
      
      continue;
    }
    
    // Check for removed characters (only in str1)
    let removedChunk = '';
    const originalI = i;
    
    while (i < str1.length && (j >= str2.length || str1[i] !== str2[j])) {
      removedChunk += str1[i];
      i++;
    }
    
    if (removedChunk) {
      result.push({ type: 'removed', value: removedChunk });
    }
    
    // Check for added characters (only in str2)
    let addedChunk = '';
    const originalJ = j;
    
    while (j < str2.length && (i === originalI || (i < str1.length && str1[i] !== str2[j]))) {
      addedChunk += str2[j];
      j++;
    }
    
    if (addedChunk) {
      result.push({ type: 'added', value: addedChunk });
    }
  }
  
  return result;
}
