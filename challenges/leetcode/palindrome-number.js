/**
 * LeetCode Problem 9: Palindrome Number
 * 
 * Given an integer x, return true if x is a palindrome, and false otherwise.
 * 
 * Example 1:
 * Input: x = 121
 * Output: true
 * Explanation: 121 reads as 121 from left to right and from right to left.
 * 
 * Example 2:
 * Input: x = -121
 * Output: false
 * Explanation: From left to right, it reads -121. From right to left, it becomes 121-.
 * 
 * Follow up: Could you solve it without converting the integer to a string?
 */

/**
 * Approach 1: Convert to string (simple but uses extra space)
 * Time Complexity: O(log n) where n is the input number
 * Space Complexity: O(log n) for the string
 */
function isPalindromeString(x) {
    // Negative numbers are not palindromes
    if (x < 0) return false;
    
    const str = x.toString();
    const reversed = str.split('').reverse().join('');
    
    return str === reversed;
}

/**
 * Approach 2: Two pointers on string
 * Time Complexity: O(log n)
 * Space Complexity: O(log n)
 */
function isPalindromeTwoPointers(x) {
    if (x < 0) return false;
    
    const str = x.toString();
    let left = 0;
    let right = str.length - 1;
    
    while (left < right) {
        if (str[left] !== str[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}

/**
 * Approach 3: Mathematical approach (no string conversion)
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function isPalindrome(x) {
    // Negative numbers and numbers ending with 0 (except 0 itself) are not palindromes
    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return false;
    }
    
    let original = x;
    let reversed = 0;
    
    // Reverse the entire number
    while (x > 0) {
        reversed = reversed * 10 + x % 10;
        x = Math.floor(x / 10);
    }
    
    return original === reversed;
}

/**
 * Approach 4: Optimized mathematical approach (reverse only half)
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function isPalindromeOptimized(x) {
    // Negative numbers and numbers ending with 0 (except 0 itself) are not palindromes
    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return false;
    }
    
    let reversedHalf = 0;
    
    // Reverse only half of the number
    while (x > reversedHalf) {
        reversedHalf = reversedHalf * 10 + x % 10;
        x = Math.floor(x / 10);
    }
    
    // For even number of digits: x === reversedHalf
    // For odd number of digits: x === Math.floor(reversedHalf / 10)
    return x === reversedHalf || x === Math.floor(reversedHalf / 10);
}

/**
 * Helper function to check if a number is palindrome using recursion
 */
function isPalindromeRecursive(x) {
    if (x < 0) return false;
    
    const digits = getDigits(x);
    return checkPalindromeRecursive(digits, 0, digits.length - 1);
}

function getDigits(num) {
    const digits = [];
    while (num > 0) {
        digits.unshift(num % 10);
        num = Math.floor(num / 10);
    }
    return digits;
}

function checkPalindromeRecursive(digits, left, right) {
    if (left >= right) return true;
    
    if (digits[left] !== digits[right]) return false;
    
    return checkPalindromeRecursive(digits, left + 1, right - 1);
}

/**
 * Edge case handler for various input types
 */
function isPalindromeRobust(x) {
    // Handle edge cases
    if (typeof x !== 'number' || !Number.isInteger(x)) {
        throw new Error('Input must be an integer');
    }
    
    if (x < 0) return false;
    if (x < 10) return true; // Single digit numbers are palindromes
    
    return isPalindromeOptimized(x);
}

// Test cases
console.log('String Approach:');
console.log(isPalindromeString(121)); // true
console.log(isPalindromeString(-121)); // false
console.log(isPalindromeString(10)); // false

console.log('\\nTwo Pointers Approach:');
console.log(isPalindromeTwoPointers(121)); // true
console.log(isPalindromeTwoPointers(1221)); // true

console.log('\\nMathematical Approach:');
console.log(isPalindrome(121)); // true
console.log(isPalindrome(-121)); // false
console.log(isPalindrome(10)); // false
console.log(isPalindrome(0)); // true

console.log('\\nOptimized Mathematical Approach:');
console.log(isPalindromeOptimized(121)); // true
console.log(isPalindromeOptimized(1221)); // true
console.log(isPalindromeOptimized(12321)); // true
console.log(isPalindromeOptimized(123)); // false

console.log('\\nRecursive Approach:');
console.log(isPalindromeRecursive(121)); // true
console.log(isPalindromeRecursive(1234321)); // true

// Performance comparison
function performanceTest() {
    const testNumbers = [121, 1221, 12321, 123454321, 1234567890987654321];
    const iterations = 100000;
    
    console.log('\\nPerformance Test:');
    
    testNumbers.forEach(num => {
        console.log(`\\nTesting with number: ${num}`);
        
        // Test string approach
        const start1 = performance.now();
        for (let i = 0; i < iterations; i++) {
            isPalindromeString(num);
        }
        const end1 = performance.now();
        console.log(`String approach: ${(end1 - start1).toFixed(4)}ms`);
        
        // Test optimized mathematical approach
        const start2 = performance.now();
        for (let i = 0; i < iterations; i++) {
            isPalindromeOptimized(num);
        }
        const end2 = performance.now();
        console.log(`Optimized math: ${(end2 - start2).toFixed(4)}ms`);
    });
}

performanceTest();

module.exports = {
    isPalindrome,
    isPalindromeString,
    isPalindromeTwoPointers,
    isPalindromeOptimized,
    isPalindromeRecursive,
    isPalindromeRobust
};