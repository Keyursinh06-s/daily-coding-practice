/**
 * LeetCode Problem 13: Roman to Integer
 * 
 * Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.
 * 
 * Symbol       Value
 * I             1
 * V             5
 * X             10
 * L             50
 * C             100
 * D             500
 * M             1000
 * 
 * For example, 2 is written as II in Roman numeral, just two ones added together.
 * 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.
 * 
 * Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII.
 * Instead, the number four is written as IV. Because the one is before the five we subtract it making four.
 * The same principle applies to the number nine, which is written as IX.
 * 
 * There are six instances where subtraction is used:
 * - I can be placed before V (5) and X (10) to make 4 and 9.
 * - X can be placed before L (50) and C (100) to make 40 and 90.
 * - C can be placed before D (500) and M (1000) to make 400 and 900.
 * 
 * Given a roman numeral, convert it to an integer.
 */

/**
 * Approach 1: Left to Right with Subtraction Logic
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function romanToInt(s) {
    const romanMap = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };
    
    let result = 0;
    
    for (let i = 0; i < s.length; i++) {
        const current = romanMap[s[i]];
        const next = romanMap[s[i + 1]];
        
        // If current value is less than next value, subtract it
        if (current < next) {
            result -= current;
        } else {
            result += current;
        }
    }
    
    return result;
}

/**
 * Approach 2: Right to Left Processing
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function romanToIntRightToLeft(s) {
    const romanMap = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };
    
    let result = 0;
    let prevValue = 0;
    
    // Process from right to left
    for (let i = s.length - 1; i >= 0; i--) {
        const currentValue = romanMap[s[i]];
        
        // If current value is less than previous value, subtract it
        if (currentValue < prevValue) {
            result -= currentValue;
        } else {
            result += currentValue;
        }
        
        prevValue = currentValue;
    }
    
    return result;
}

/**
 * Approach 3: Using Subtraction Pairs
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function romanToIntWithPairs(s) {
    const romanMap = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000,
        // Special subtraction cases
        'IV': 4,
        'IX': 9,
        'XL': 40,
        'XC': 90,
        'CD': 400,
        'CM': 900
    };
    
    let result = 0;
    let i = 0;
    
    while (i < s.length) {
        // Check for two-character combinations first
        if (i + 1 < s.length && romanMap[s.substring(i, i + 2)]) {
            result += romanMap[s.substring(i, i + 2)];
            i += 2;
        } else {
            result += romanMap[s[i]];
            i += 1;
        }
    }
    
    return result;
}

/**
 * Approach 4: Replace and Sum
 * Time Complexity: O(n)
 * Space Complexity: O(n) for string operations
 */
function romanToIntReplace(s) {
    // Replace subtraction cases with addition equivalents
    s = s.replace('IV', 'IIII');
    s = s.replace('IX', 'VIIII');
    s = s.replace('XL', 'XXXX');
    s = s.replace('XC', 'LXXXX');
    s = s.replace('CD', 'CCCC');
    s = s.replace('CM', 'DCCCC');
    
    const romanMap = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };
    
    let result = 0;
    for (let char of s) {
        result += romanMap[char];
    }
    
    return result;
}

/**
 * Approach 5: Using Switch Statement (more readable)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function romanToIntSwitch(s) {
    let result = 0;
    
    for (let i = 0; i < s.length; i++) {
        switch (s[i]) {
            case 'I':
                // Check for IV or IX
                if (i + 1 < s.length && (s[i + 1] === 'V' || s[i + 1] === 'X')) {
                    result -= 1;
                } else {
                    result += 1;
                }
                break;
            case 'V':
                result += 5;
                break;
            case 'X':
                // Check for XL or XC
                if (i + 1 < s.length && (s[i + 1] === 'L' || s[i + 1] === 'C')) {
                    result -= 10;
                } else {
                    result += 10;
                }
                break;
            case 'L':
                result += 50;
                break;
            case 'C':
                // Check for CD or CM
                if (i + 1 < s.length && (s[i + 1] === 'D' || s[i + 1] === 'M')) {
                    result -= 100;
                } else {
                    result += 100;
                }
                break;
            case 'D':
                result += 500;
                break;
            case 'M':
                result += 1000;
                break;
        }
    }
    
    return result;
}

/**
 * Helper function to validate Roman numeral
 */
function isValidRoman(s) {
    const validPattern = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
    return validPattern.test(s);
}

/**
 * Robust version with validation
 */
function romanToIntRobust(s) {
    if (!s || typeof s !== 'string') {
        throw new Error('Input must be a non-empty string');
    }
    
    s = s.toUpperCase().trim();
    
    if (!isValidRoman(s)) {
        throw new Error('Invalid Roman numeral format');
    }
    
    return romanToInt(s);
}

// Test cases
console.log('Basic Roman to Integer:');
console.log(romanToInt("III")); // 3
console.log(romanToInt("LVIII")); // 58
console.log(romanToInt("MCMXC")); // 1990

console.log('\\nRight to Left Approach:');
console.log(romanToIntRightToLeft("IV")); // 4
console.log(romanToIntRightToLeft("IX")); // 9
console.log(romanToIntRightToLeft("CDXLIV")); // 444

console.log('\\nWith Pairs Approach:');
console.log(romanToIntWithPairs("MCMXC")); // 1990
console.log(romanToIntWithPairs("MMCDXLIV")); // 2444

console.log('\\nReplace Approach:');
console.log(romanToIntReplace("MCMLIV")); // 1954

console.log('\\nSwitch Statement Approach:');
console.log(romanToIntSwitch("MCDLIV")); // 1454

console.log('\\nValidation Tests:');
console.log('Is "MCMXC" valid?', isValidRoman("MCMXC")); // true
console.log('Is "IIII" valid?', isValidRoman("IIII")); // false

// Performance comparison
function performanceTest() {
    const testCases = ["MCMXC", "MMCDXLIV", "MCDLIV", "MCMLIV"];
    const iterations = 100000;
    
    console.log('\\nPerformance Test:');
    
    testCases.forEach(testCase => {
        console.log(`\\nTesting with: ${testCase}`);
        
        // Test basic approach
        const start1 = performance.now();
        for (let i = 0; i < iterations; i++) {
            romanToInt(testCase);
        }
        const end1 = performance.now();
        console.log(`Basic approach: ${(end1 - start1).toFixed(4)}ms`);
        
        // Test pairs approach
        const start2 = performance.now();
        for (let i = 0; i < iterations; i++) {
            romanToIntWithPairs(testCase);
        }
        const end2 = performance.now();
        console.log(`Pairs approach: ${(end2 - start2).toFixed(4)}ms`);
    });
}

performanceTest();

module.exports = {
    romanToInt,
    romanToIntRightToLeft,
    romanToIntWithPairs,
    romanToIntReplace,
    romanToIntSwitch,
    romanToIntRobust,
    isValidRoman
};