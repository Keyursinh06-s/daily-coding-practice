/**
 * Merge Sort Algorithm
 * Time Complexity: O(n log n) - consistent in all cases
 * Space Complexity: O(n) - requires additional space for merging
 */

/**
 * Main merge sort function
 */
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    
    return merge(mergeSort(left), mergeSort(right));
}

/**
 * Merge two sorted arrays
 */
function merge(left, right) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    // Compare elements and merge in sorted order
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] <= right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    
    // Add remaining elements
    while (leftIndex < left.length) {
        result.push(left[leftIndex]);
        leftIndex++;
    }
    
    while (rightIndex < right.length) {
        result.push(right[rightIndex]);
        rightIndex++;
    }
    
    return result;
}

/**
 * In-place merge sort (more memory efficient)
 */
function mergeSortInPlace(arr, start = 0, end = arr.length - 1) {
    if (start >= end) {
        return arr;
    }
    
    const mid = Math.floor((start + end) / 2);
    
    mergeSortInPlace(arr, start, mid);
    mergeSortInPlace(arr, mid + 1, end);
    mergeInPlace(arr, start, mid, end);
    
    return arr;
}

/**
 * In-place merge function
 */
function mergeInPlace(arr, start, mid, end) {
    const temp = [];
    let i = start;
    let j = mid + 1;
    let k = 0;
    
    // Merge into temporary array
    while (i <= mid && j <= end) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }
    
    // Copy remaining elements
    while (i <= mid) {
        temp[k++] = arr[i++];
    }
    
    while (j <= end) {
        temp[k++] = arr[j++];
    }
    
    // Copy back to original array
    for (let i = start; i <= end; i++) {
        arr[i] = temp[i - start];
    }
}

/**
 * Iterative merge sort (bottom-up approach)
 */
function mergeSortIterative(arr) {
    const n = arr.length;
    const result = [...arr]; // Create a copy
    
    // Start with subarrays of size 1, then 2, 4, 8, etc.
    for (let size = 1; size < n; size *= 2) {
        // Pick starting point of left sub array
        for (let start = 0; start < n - 1; start += 2 * size) {
            const mid = Math.min(start + size - 1, n - 1);
            const end = Math.min(start + 2 * size - 1, n - 1);
            
            if (mid < end) {
                mergeIterative(result, start, mid, end);
            }
        }
    }
    
    return result;
}

/**
 * Helper function for iterative merge
 */
function mergeIterative(arr, start, mid, end) {
    const temp = [];
    let i = start;
    let j = mid + 1;
    let k = 0;
    
    while (i <= mid && j <= end) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }
    
    while (i <= mid) {
        temp[k++] = arr[i++];
    }
    
    while (j <= end) {
        temp[k++] = arr[j++];
    }
    
    for (let i = start; i <= end; i++) {
        arr[i] = temp[i - start];
    }
}

/**
 * Merge sort with custom comparator
 */
function mergeSortWithComparator(arr, compareFn = (a, b) => a - b) {
    if (arr.length <= 1) {
        return arr;
    }
    
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    
    return mergeWithComparator(
        mergeSortWithComparator(left, compareFn),
        mergeSortWithComparator(right, compareFn),
        compareFn
    );
}

function mergeWithComparator(left, right, compareFn) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    while (leftIndex < left.length && rightIndex < right.length) {
        if (compareFn(left[leftIndex], right[rightIndex]) <= 0) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Test cases
console.log('Standard Merge Sort:');
console.log(mergeSort([64, 34, 25, 12, 22, 11, 90])); // [11, 12, 22, 25, 34, 64, 90]
console.log(mergeSort([5, 1, 4, 2, 8])); // [1, 2, 4, 5, 8]

console.log('\\nIn-place Merge Sort:');
const arr1 = [64, 34, 25, 12, 22, 11, 90];
console.log(mergeSortInPlace([...arr1])); // [11, 12, 22, 25, 34, 64, 90]

console.log('\\nIterative Merge Sort:');
console.log(mergeSortIterative([64, 34, 25, 12, 22, 11, 90])); // [11, 12, 22, 25, 34, 64, 90]

console.log('\\nMerge Sort with Custom Comparator:');
const people = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 35 }
];
console.log(mergeSortWithComparator(people, (a, b) => a.age - b.age));

// Performance comparison
function performanceTest() {
    const sizes = [1000, 5000, 10000];
    
    console.log('\\nPerformance Comparison:');
    
    sizes.forEach(size => {
        const testArray = Array.from({length: size}, () => Math.floor(Math.random() * size));
        
        console.log(`\\nArray size: ${size}`);
        
        // Test recursive merge sort
        const start1 = performance.now();
        mergeSort([...testArray]);
        const end1 = performance.now();
        console.log(`Recursive: ${(end1 - start1).toFixed(4)}ms`);
        
        // Test iterative merge sort
        const start2 = performance.now();
        mergeSortIterative([...testArray]);
        const end2 = performance.now();
        console.log(`Iterative: ${(end2 - start2).toFixed(4)}ms`);
        
        // Test in-place merge sort
        const start3 = performance.now();
        mergeSortInPlace([...testArray]);
        const end3 = performance.now();
        console.log(`In-place: ${(end3 - start3).toFixed(4)}ms`);
    });
}

performanceTest();

module.exports = {
    mergeSort,
    mergeSortInPlace,
    mergeSortIterative,
    mergeSortWithComparator,
    merge
};