/**
 * LeetCode Problem 20: Valid Parentheses
 * 
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', 
 * determine if the input string is valid.
 * 
 * An input string is valid if:
 * 1. Open brackets must be closed by the same type of brackets.
 * 2. Open brackets must be closed in the correct order.
 * 3. Every close bracket has a corresponding open bracket of the same type.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

function isValid(s) {
    const stack = [];
    const pairs = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (char === '(' || char === '{' || char === '[') {
            // Opening bracket - push to stack
            stack.push(char);
        } else if (char === ')' || char === '}' || char === ']') {
            // Closing bracket - check if it matches the last opening bracket
            if (stack.length === 0 || stack.pop() !== pairs[char]) {
                return false;
            }
        }
    }
    
    // Valid if all brackets are matched (stack is empty)
    return stack.length === 0;
}

// Test cases
console.log(isValid("()")); // true
console.log(isValid("()[]{}")); // true
console.log(isValid("(]")); // false
console.log(isValid("([)]")); // false
console.log(isValid("{[]}")); // true
console.log(isValid("")); // true

/**
 * Alternative solution using Map for cleaner code
 */
function isValidAlt(s) {
    const stack = [];
    const closeToOpen = new Map([
        [')', '('],
        ['}', '{'],
        [']', '[']
    ]);
    
    for (let char of s) {
        if (closeToOpen.has(char)) {
            if (stack.length === 0 || stack.pop() !== closeToOpen.get(char)) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}

module.exports = { isValid, isValidAlt };