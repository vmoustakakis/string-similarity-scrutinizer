
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
  
  // Use Longest Common Subsequence to find the best alignment
  const lcsMatrix = buildLCSMatrix(lines1, lines2);
  const diff = backtrackLCS(lines1, lines2, lcsMatrix);
  
  // Convert the diff to our result format with newlines
  const result: Array<{ type: 'equal' | 'removed' | 'added', value: string }> = [];
  
  diff.forEach(item => {
    if (item.type === 'equal') {
      result.push({ type: 'equal', value: item.value + '\n' });
    } else if (item.type === 'removed') {
      result.push({ type: 'removed', value: item.value + '\n' });
    } else if (item.type === 'added') {
      result.push({ type: 'added', value: item.value + '\n' });
    }
  });
  
  return result;
}

/**
 * Builds a matrix for the Longest Common Subsequence algorithm
 */
function buildLCSMatrix(lines1: string[], lines2: string[]) {
  const matrix = Array(lines1.length + 1)
    .fill(null)
    .map(() => Array(lines2.length + 1).fill(0));
  
  for (let i = 1; i <= lines1.length; i++) {
    for (let j = 1; j <= lines2.length; j++) {
      if (lines1[i - 1] === lines2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1] + 1;
      } else {
        matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
      }
    }
  }
  
  return matrix;
}

/**
 * Backtrack through the LCS matrix to find the actual diff
 */
function backtrackLCS(lines1: string[], lines2: string[], matrix: number[][]) {
  const diff: Array<{ type: 'equal' | 'removed' | 'added', value: string }> = [];
  let i = lines1.length;
  let j = lines2.length;
  
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && lines1[i - 1] === lines2[j - 1]) {
      // Equal lines
      diff.unshift({ type: 'equal', value: lines1[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || matrix[i][j - 1] >= matrix[i - 1][j])) {
      // Line added in the second string
      diff.unshift({ type: 'added', value: lines2[j - 1] });
      j--;
    } else if (i > 0) {
      // Line removed from the first string
      diff.unshift({ type: 'removed', value: lines1[i - 1] });
      i--;
    }
  }
  
  return diff;
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
