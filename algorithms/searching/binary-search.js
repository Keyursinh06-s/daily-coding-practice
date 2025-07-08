/**
 * Binary Search Algorithm
 * Time Complexity: O(log n)
 * Space Complexity: O(1) iterative, O(log n) recursive
 */

/**
 * Iterative Binary Search
 */
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid; // Found target, return index
        } else if (arr[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    
    return -1; // Target not found
}

/**
 * Recursive Binary Search
 */
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) {
        return -1; // Base case: target not found
    }
    
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
        return mid; // Found target
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

/**
 * Binary Search for First Occurrence
 */
function binarySearchFirst(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            result = mid;
            right = mid - 1; // Continue searching left for first occurrence
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

/**
 * Binary Search for Last Occurrence
 */
function binarySearchLast(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            result = mid;
            left = mid + 1; // Continue searching right for last occurrence
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

/**
 * Binary Search for Insertion Point
 */
function binarySearchInsertionPoint(arr, target) {
    let left = 0;
    let right = arr.length;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

/**
 * Binary Search in Rotated Sorted Array
 */
function searchRotated(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        }
        
        // Check which half is sorted
        if (arr[left] <= arr[mid]) {
            // Left half is sorted
            if (target >= arr[left] && target < arr[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // Right half is sorted
            if (target > arr[mid] && target <= arr[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}

// Test cases
console.log('Basic Binary Search:');
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log(binarySearch(sortedArray, 7)); // 3
console.log(binarySearch(sortedArray, 4)); // -1

console.log('\\nRecursive Binary Search:');
console.log(binarySearchRecursive(sortedArray, 11)); // 5
console.log(binarySearchRecursive(sortedArray, 20)); // -1

console.log('\\nFirst/Last Occurrence:');
const duplicateArray = [1, 2, 2, 2, 3, 4, 4, 5];
console.log(binarySearchFirst(duplicateArray, 2)); // 1
console.log(binarySearchLast(duplicateArray, 2)); // 3
console.log(binarySearchFirst(duplicateArray, 4)); // 5
console.log(binarySearchLast(duplicateArray, 4)); // 6

console.log('\\nInsertion Point:');
console.log(binarySearchInsertionPoint([1, 3, 5, 7], 4)); // 2
console.log(binarySearchInsertionPoint([1, 3, 5, 7], 0)); // 0
console.log(binarySearchInsertionPoint([1, 3, 5, 7], 8)); // 4

console.log('\\nRotated Array Search:');
const rotatedArray = [4, 5, 6, 7, 0, 1, 2];
console.log(searchRotated(rotatedArray, 0)); // 4
console.log(searchRotated(rotatedArray, 3)); // -1

module.exports = {
    binarySearch,
    binarySearchRecursive,
    binarySearchFirst,
    binarySearchLast,
    binarySearchInsertionPoint,
    searchRotated
};