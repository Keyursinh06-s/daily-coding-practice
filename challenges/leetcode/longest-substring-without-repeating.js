/**
 * LeetCode Problem 3: Longest Substring Without Repeating Characters
 * 
 * Given a string s, find the length of the longest substring without repeating characters.
 * 
 * Example 1:
 * Input: s = "abcabcbb"
 * Output: 3
 * Explanation: The answer is "abc", with the length of 3.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(min(m,n)) where m is charset size
 */

/**
 * Sliding Window Approach with Set
 */
function lengthOfLongestSubstring(s) {
    const charSet = new Set();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        // If character is already in set, shrink window from left
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        
        // Add current character to set
        charSet.add(s[right]);
        
        // Update maximum length
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

/**
 * Optimized Sliding Window with HashMap
 */
function lengthOfLongestSubstringOptimized(s) {
    const charMap = new Map();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        
        // If character is seen before and is within current window
        if (charMap.has(char) && charMap.get(char) >= left) {
            left = charMap.get(char) + 1;
        }
        
        // Update character's last seen position
        charMap.set(char, right);
        
        // Update maximum length
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

/**
 * Brute Force Approach (for comparison)
 * Time Complexity: O(n³)
 */
function lengthOfLongestSubstringBruteForce(s) {
    let maxLength = 0;
    
    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            if (hasUniqueCharacters(s, i, j)) {
                maxLength = Math.max(maxLength, j - i + 1);
            }
        }
    }
    
    return maxLength;
}

function hasUniqueCharacters(s, start, end) {
    const charSet = new Set();
    
    for (let i = start; i <= end; i++) {
        if (charSet.has(s[i])) {
            return false;
        }
        charSet.add(s[i]);
    }
    
    return true;
}

/**
 * Get the actual longest substring (not just length)
 */
function getLongestSubstring(s) {
    const charMap = new Map();
    let left = 0;
    let maxLength = 0;
    let maxStart = 0;
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        
        if (charMap.has(char) && charMap.get(char) >= left) {
            left = charMap.get(char) + 1;
        }
        
        charMap.set(char, right);
        
        if (right - left + 1 > maxLength) {
            maxLength = right - left + 1;
            maxStart = left;
        }
    }
    
    return {
        length: maxLength,
        substring: s.substring(maxStart, maxStart + maxLength)
    };
}

// Test cases
console.log('Sliding Window with Set:');
console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb")); // 1
console.log(lengthOfLongestSubstring("pwwkew")); // 3
console.log(lengthOfLongestSubstring("")); // 0
console.log(lengthOfLongestSubstring("au")); // 2

console.log('\\nOptimized Sliding Window:');
console.log(lengthOfLongestSubstringOptimized("abcabcbb")); // 3
console.log(lengthOfLongestSubstringOptimized("dvdf")); // 3
console.log(lengthOfLongestSubstringOptimized("anviaj")); // 5

console.log('\\nGet Actual Substring:');
console.log(getLongestSubstring("abcabcbb")); // { length: 3, substring: "abc" }
console.log(getLongestSubstring("pwwkew")); // { length: 3, substring: "wke" }

// Performance comparison
function performanceTest() {
    const testString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const iterations = 1000;
    
    console.log('\\nPerformance Test:');
    
    // Test optimized version
    const start1 = performance.now();
    for (let i = 0; i < iterations; i++) {
        lengthOfLongestSubstringOptimized(testString);
    }
    const end1 = performance.now();
    console.log(`Optimized: ${(end1 - start1).toFixed(4)}ms`);
    
    // Test set version
    const start2 = performance.now();
    for (let i = 0; i < iterations; i++) {
        lengthOfLongestSubstring(testString);
    }
    const end2 = performance.now();
    console.log(`Set Version: ${(end2 - start2).toFixed(4)}ms`);
}

performanceTest();

module.exports = {
    lengthOfLongestSubstring,
    lengthOfLongestSubstringOptimized,
    lengthOfLongestSubstringBruteForce,
    getLongestSubstring
};