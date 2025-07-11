/**
 * LeetCode Problem 14: Longest Common Prefix
 * 
 * Write a function to find the longest common prefix string amongst an array of strings.
 * If there is no common prefix, return an empty string "".
 * 
 * Example 1:
 * Input: strs = ["flower","flow","flight"]
 * Output: "fl"
 * 
 * Example 2:
 * Input: strs = ["dog","racecar","car"]
 * Output: ""
 * Explanation: There is no common prefix among the input strings.
 * 
 * Constraints:
 * - 1 <= strs.length <= 200
 * - 0 <= strs[i].length <= 200
 * - strs[i] consists of only lowercase English letters.
 */

/**
 * Approach 1: Vertical Scanning
 * Time Complexity: O(S) where S is the sum of all characters in all strings
 * Space Complexity: O(1)
 */
function longestCommonPrefix(strs) {
    if (!strs || strs.length === 0) return "";
    
    // Use first string as reference
    const firstString = strs[0];
    
    for (let i = 0; i < firstString.length; i++) {
        const char = firstString[i];
        
        // Check if this character exists at position i in all other strings
        for (let j = 1; j < strs.length; j++) {
            if (i >= strs[j].length || strs[j][i] !== char) {
                return firstString.substring(0, i);
            }
        }
    }
    
    return firstString;
}

/**
 * Approach 2: Horizontal Scanning
 * Time Complexity: O(S)
 * Space Complexity: O(1)
 */
function longestCommonPrefixHorizontal(strs) {
    if (!strs || strs.length === 0) return "";
    
    let prefix = strs[0];
    
    for (let i = 1; i < strs.length; i++) {
        // Find common prefix between current prefix and strs[i]
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === "") return "";
        }
    }
    
    return prefix;
}

/**
 * Approach 3: Divide and Conquer
 * Time Complexity: O(S)
 * Space Complexity: O(m log n) where m is the length of the longest string
 */
function longestCommonPrefixDivideConquer(strs) {
    if (!strs || strs.length === 0) return "";
    
    return divideAndConquer(strs, 0, strs.length - 1);
}

function divideAndConquer(strs, left, right) {
    if (left === right) {
        return strs[left];
    }
    
    const mid = Math.floor((left + right) / 2);
    const leftPrefix = divideAndConquer(strs, left, mid);
    const rightPrefix = divideAndConquer(strs, mid + 1, right);
    
    return commonPrefix(leftPrefix, rightPrefix);
}

function commonPrefix(str1, str2) {
    const minLength = Math.min(str1.length, str2.length);
    
    for (let i = 0; i < minLength; i++) {
        if (str1[i] !== str2[i]) {
            return str1.substring(0, i);
        }
    }
    
    return str1.substring(0, minLength);
}

/**
 * Approach 4: Binary Search
 * Time Complexity: O(S log m) where m is the length of the shortest string
 * Space Complexity: O(1)
 */
function longestCommonPrefixBinarySearch(strs) {
    if (!strs || strs.length === 0) return "";
    
    const minLength = Math.min(...strs.map(str => str.length));
    
    let left = 0;
    let right = minLength;
    
    while (left < right) {
        const mid = Math.floor((left + right + 1) / 2);
        
        if (isCommonPrefix(strs, mid)) {
            left = mid;
        } else {
            right = mid - 1;
        }
    }
    
    return strs[0].substring(0, left);
}

function isCommonPrefix(strs, length) {
    const prefix = strs[0].substring(0, length);
    
    for (let i = 1; i < strs.length; i++) {
        if (!strs[i].startsWith(prefix)) {
            return false;
        }
    }
    
    return true;
}

/**
 * Approach 5: Trie-based Solution
 * Time Complexity: O(S) for building trie + O(m) for finding prefix
 * Space Complexity: O(S) for trie storage
 */
class TrieNode {
    constructor() {
        this.children = {};
        this.count = 0; // Number of strings passing through this node
    }
}

function longestCommonPrefixTrie(strs) {
    if (!strs || strs.length === 0) return "";
    
    const root = new TrieNode();
    
    // Build trie
    for (const str of strs) {
        let current = root;
        for (const char of str) {
            if (!current.children[char]) {
                current.children[char] = new TrieNode();
            }
            current = current.children[char];
            current.count++;
        }
    }
    
    // Find longest common prefix
    let prefix = "";
    let current = root;
    
    while (true) {
        const children = Object.keys(current.children);
        
        // If no children or more than one child, stop
        if (children.length !== 1) break;
        
        const child = children[0];
        const childNode = current.children[child];
        
        // If this node doesn't contain all strings, stop
        if (childNode.count !== strs.length) break;
        
        prefix += child;
        current = childNode;
    }
    
    return prefix;
}

/**
 * Approach 6: Using reduce function (functional approach)
 * Time Complexity: O(S)
 * Space Complexity: O(1)
 */
function longestCommonPrefixReduce(strs) {
    if (!strs || strs.length === 0) return "";
    
    return strs.reduce((prefix, str) => {
        while (str.indexOf(prefix) !== 0) {
            prefix = prefix.slice(0, -1);
            if (prefix === "") return "";
        }
        return prefix;
    });
}

/**
 * Approach 7: Character by character comparison (optimized)
 * Time Complexity: O(S)
 * Space Complexity: O(1)
 */
function longestCommonPrefixOptimized(strs) {
    if (!strs || strs.length === 0) return "";
    if (strs.length === 1) return strs[0];
    
    let prefix = "";
    const minLength = Math.min(...strs.map(str => str.length));
    
    for (let i = 0; i < minLength; i++) {
        const char = strs[0][i];
        
        // Early termination if any string doesn't match
        for (let j = 1; j < strs.length; j++) {
            if (strs[j][i] !== char) {
                return prefix;
            }
        }
        
        prefix += char;
    }
    
    return prefix;
}

/**
 * Helper function to validate input
 */
function longestCommonPrefixRobust(strs) {
    // Input validation
    if (!Array.isArray(strs)) {
        throw new Error('Input must be an array');
    }
    
    if (strs.length === 0) return "";
    
    // Filter out non-string elements
    const validStrings = strs.filter(item => typeof item === 'string');
    
    if (validStrings.length === 0) return "";
    if (validStrings.length === 1) return validStrings[0];
    
    return longestCommonPrefix(validStrings);
}

/**
 * Case-insensitive version
 */
function longestCommonPrefixCaseInsensitive(strs) {
    if (!strs || strs.length === 0) return "";
    
    const lowerStrs = strs.map(str => str.toLowerCase());
    const result = longestCommonPrefix(lowerStrs);
    
    // Return with original case from first string
    return strs[0].substring(0, result.length);
}

// Test cases
console.log('=== Vertical Scanning ===');
console.log(longestCommonPrefix(["flower","flow","flight"])); // "fl"
console.log(longestCommonPrefix(["dog","racecar","car"])); // ""
console.log(longestCommonPrefix(["interspecies","interstellar","interstate"])); // "inters"

console.log('\\n=== Horizontal Scanning ===');
console.log(longestCommonPrefixHorizontal(["flower","flow","flight"])); // "fl"
console.log(longestCommonPrefixHorizontal(["ab", "a"])); // "a"

console.log('\\n=== Divide and Conquer ===');
console.log(longestCommonPrefixDivideConquer(["flower","flow","flight"])); // "fl"
console.log(longestCommonPrefixDivideConquer(["abc","abc","abc"])); // "abc"

console.log('\\n=== Binary Search ===');
console.log(longestCommonPrefixBinarySearch(["flower","flow","flight"])); // "fl"
console.log(longestCommonPrefixBinarySearch([""])); // ""

console.log('\\n=== Trie-based ===');
console.log(longestCommonPrefixTrie(["flower","flow","flight"])); // "fl"
console.log(longestCommonPrefixTrie(["abc","ab","abcd"])); // "ab"

console.log('\\n=== Reduce Function ===');
console.log(longestCommonPrefixReduce(["flower","flow","flight"])); // "fl"

console.log('\\n=== Optimized ===');
console.log(longestCommonPrefixOptimized(["flower","flow","flight"])); // "fl"

console.log('\\n=== Case Insensitive ===');
console.log(longestCommonPrefixCaseInsensitive(["Flower","flow","FLIGHT"])); // "Fl"

console.log('\\n=== Edge Cases ===');
console.log(longestCommonPrefix([])); // ""
console.log(longestCommonPrefix([""])); // ""
console.log(longestCommonPrefix(["a"])); // "a"
console.log(longestCommonPrefix(["", "b"])); // ""

// Performance comparison
function performanceTest() {
    const testCases = [
        ["flower","flow","flight"],
        ["interspecies","interstellar","interstate"],
        Array(100).fill("commonprefix").map((str, i) => str + i),
        Array(50).fill("a").map((str, i) => str.repeat(i + 1))
    ];
    
    console.log('\\n=== Performance Comparison ===');
    
    testCases.forEach((testCase, index) => {
        console.log(`\\nTest case ${index + 1} (${testCase.length} strings):`);
        
        // Vertical scanning
        const start1 = performance.now();
        for (let i = 0; i < 1000; i++) {
            longestCommonPrefix([...testCase]);
        }
        const end1 = performance.now();
        console.log(`Vertical: ${(end1 - start1).toFixed(4)}ms`);
        
        // Binary search
        const start2 = performance.now();
        for (let i = 0; i < 1000; i++) {
            longestCommonPrefixBinarySearch([...testCase]);
        }
        const end2 = performance.now();
        console.log(`Binary Search: ${(end2 - start2).toFixed(4)}ms`);
        
        // Optimized
        const start3 = performance.now();
        for (let i = 0; i < 1000; i++) {
            longestCommonPrefixOptimized([...testCase]);
        }
        const end3 = performance.now();
        console.log(`Optimized: ${(end3 - start3).toFixed(4)}ms`);
    });
}

performanceTest();

module.exports = {
    longestCommonPrefix,
    longestCommonPrefixHorizontal,
    longestCommonPrefixDivideConquer,
    longestCommonPrefixBinarySearch,
    longestCommonPrefixTrie,
    longestCommonPrefixReduce,
    longestCommonPrefixOptimized,
    longestCommonPrefixRobust,
    longestCommonPrefixCaseInsensitive
};