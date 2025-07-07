/**
 * Quick Sort Algorithm
 * Time Complexity: O(n log n) average, O(n²) worst case
 * Space Complexity: O(log n) average due to recursion
 */

function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        // Partition the array and get the pivot index
        const pivotIndex = partition(arr, low, high);
        
        // Recursively sort elements before and after partition
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
    
    return arr;
}

/**
 * Partition function using Lomuto partition scheme
 */
function partition(arr, low, high) {
    // Choose the rightmost element as pivot
    const pivot = arr[high];
    
    // Index of smaller element (indicates right position of pivot)
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        // If current element is smaller than or equal to pivot
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        }
    }
    
    // Place pivot in correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    
    return i + 1; // Return pivot index
}

/**
 * Alternative implementation with Hoare partition scheme
 */
function quickSortHoare(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIndex = partitionHoare(arr, low, high);
        quickSortHoare(arr, low, pivotIndex);
        quickSortHoare(arr, pivotIndex + 1, high);
    }
    return arr;
}

function partitionHoare(arr, low, high) {
    const pivot = arr[low];
    let i = low - 1;
    let j = high + 1;
    
    while (true) {
        do {
            i++;
        } while (arr[i] < pivot);
        
        do {
            j--;
        } while (arr[j] > pivot);
        
        if (i >= j) {
            return j;
        }
        
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

/**
 * Randomized Quick Sort for better average performance
 */
function randomizedQuickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        // Randomly choose pivot
        const randomIndex = Math.floor(Math.random() * (high - low + 1)) + low;
        [arr[randomIndex], arr[high]] = [arr[high], arr[randomIndex]];
        
        const pivotIndex = partition(arr, low, high);
        randomizedQuickSort(arr, low, pivotIndex - 1);
        randomizedQuickSort(arr, pivotIndex + 1, high);
    }
    return arr;
}

// Test cases
console.log('Standard Quick Sort:');
console.log(quickSort([64, 34, 25, 12, 22, 11, 90])); // [11, 12, 22, 25, 34, 64, 90]
console.log(quickSort([5, 1, 4, 2, 8])); // [1, 2, 4, 5, 8]

console.log('\\nHoare Partition Quick Sort:');
console.log(quickSortHoare([64, 34, 25, 12, 22, 11, 90])); // [11, 12, 22, 25, 34, 64, 90]

console.log('\\nRandomized Quick Sort:');
console.log(randomizedQuickSort([64, 34, 25, 12, 22, 11, 90])); // [11, 12, 22, 25, 34, 64, 90]

// Performance comparison function
function performanceTest(sortFunction, arr, name) {
    const testArr = [...arr];
    const start = performance.now();
    sortFunction(testArr);
    const end = performance.now();
    console.log(`${name}: ${(end - start).toFixed(4)}ms`);
}

// Example performance test
const largeArray = Array.from({length: 10000}, () => Math.floor(Math.random() * 10000));
console.log('\\nPerformance Test (10,000 elements):');
performanceTest(quickSort, largeArray, 'Quick Sort');
performanceTest(randomizedQuickSort, largeArray, 'Randomized Quick Sort');

module.exports = { 
    quickSort, 
    quickSortHoare, 
    randomizedQuickSort, 
    partition, 
    partitionHoare 
};