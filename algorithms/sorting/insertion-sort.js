/**
 * Insertion Sort Algorithm
 * Time Complexity: O(n²) worst case, O(n) best case (already sorted)
 * Space Complexity: O(1) - in-place sorting
 * 
 * Insertion sort builds the final sorted array one item at a time.
 * It's efficient for small datasets and nearly sorted arrays.
 */

/**
 * Standard Insertion Sort
 */
function insertionSort(arr) {
    const n = arr.length;
    
    // Start from the second element (index 1)
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        
        // Move elements greater than key one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Place key in its correct position
        arr[j + 1] = key;
    }
    
    return arr;
}

/**
 * Insertion Sort with step-by-step visualization
 */
function insertionSortWithSteps(arr) {
    const steps = [];
    const n = arr.length;
    
    steps.push({ step: 0, array: [...arr], description: 'Initial array' });
    
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        
        steps.push({ 
            step: i, 
            array: [...arr], 
            description: `Inserting ${key} into sorted portion`,
            key: key,
            sortedPortion: arr.slice(0, i)
        });
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = key;
        
        steps.push({ 
            step: i, 
            array: [...arr], 
            description: `${key} inserted at position ${j + 1}`,
            inserted: true
        });
    }
    
    return { sortedArray: arr, steps };
}

/**
 * Binary Insertion Sort (optimized for comparisons)
 * Uses binary search to find insertion position
 */
function binaryInsertionSort(arr) {
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        
        // Find location to insert using binary search
        const insertPos = binarySearch(arr, key, 0, i);
        
        // Shift elements to make space
        for (let j = i; j > insertPos; j--) {
            arr[j] = arr[j - 1];
        }
        
        // Insert the key
        arr[insertPos] = key;
    }
    
    return arr;
}

/**
 * Binary search to find insertion position
 */
function binarySearch(arr, key, start, end) {
    while (start < end) {
        const mid = Math.floor((start + end) / 2);
        
        if (arr[mid] > key) {
            end = mid;
        } else {
            start = mid + 1;
        }
    }
    
    return start;
}

/**
 * Insertion Sort with custom comparator
 */
function insertionSortWithComparator(arr, compareFn = (a, b) => a - b) {
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        
        while (j >= 0 && compareFn(arr[j], key) > 0) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = key;
    }
    
    return arr;
}

/**
 * Recursive Insertion Sort
 */
function insertionSortRecursive(arr, n = arr.length) {
    // Base case
    if (n <= 1) {
        return arr;
    }
    
    // Sort first n-1 elements
    insertionSortRecursive(arr, n - 1);
    
    // Insert last element at its correct position
    const last = arr[n - 1];
    let j = n - 2;
    
    while (j >= 0 && arr[j] > last) {
        arr[j + 1] = arr[j];
        j--;
    }
    
    arr[j + 1] = last;
    
    return arr;
}

/**
 * Insertion Sort for Linked List
 */
class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

function insertionSortList(head) {
    if (!head || !head.next) return head;
    
    const dummy = new ListNode(0);
    let current = head;
    
    while (current) {
        const next = current.next;
        
        // Find the position to insert current node
        let prev = dummy;
        while (prev.next && prev.next.val < current.val) {
            prev = prev.next;
        }
        
        // Insert current node
        current.next = prev.next;
        prev.next = current;
        
        current = next;
    }
    
    return dummy.next;
}

/**
 * Optimized Insertion Sort for nearly sorted arrays
 */
function optimizedInsertionSort(arr) {
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        // If current element is already in correct position, skip
        if (arr[i] >= arr[i - 1]) {
            continue;
        }
        
        const key = arr[i];
        let j = i - 1;
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = key;
    }
    
    return arr;
}

/**
 * Insertion Sort with gap (Shell Sort preparation)
 */
function insertionSortWithGap(arr, gap) {
    const n = arr.length;
    
    for (let i = gap; i < n; i++) {
        const key = arr[i];
        let j = i - gap;
        
        while (j >= 0 && arr[j] > key) {
            arr[j + gap] = arr[j];
            j -= gap;
        }
        
        arr[j + gap] = key;
    }
    
    return arr;
}

/**
 * Count inversions while sorting (for analysis)
 */
function insertionSortWithInversions(arr) {
    const n = arr.length;
    let inversions = 0;
    
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            inversions++; // Count each swap as an inversion
            j--;
        }
        
        arr[j + 1] = key;
    }
    
    return { sortedArray: arr, inversions };
}

// Test cases and demonstrations
console.log('=== Standard Insertion Sort ===');
console.log(insertionSort([64, 34, 25, 12, 22, 11, 90])); // [11, 12, 22, 25, 34, 64, 90]
console.log(insertionSort([5, 1, 4, 2, 8])); // [1, 2, 4, 5, 8]

console.log('\\n=== Insertion Sort with Steps ===');
const { sortedArray, steps } = insertionSortWithSteps([5, 2, 4, 6, 1, 3]);
console.log('Final result:', sortedArray);
console.log('Steps taken:', steps.length);

console.log('\\n=== Binary Insertion Sort ===');
console.log(binaryInsertionSort([64, 34, 25, 12, 22, 11, 90])); // [11, 12, 22, 25, 34, 64, 90]

console.log('\\n=== Custom Comparator (Descending) ===');
console.log(insertionSortWithComparator([5, 1, 4, 2, 8], (a, b) => b - a)); // [8, 5, 4, 2, 1]

console.log('\\n=== Recursive Insertion Sort ===');
console.log(insertionSortRecursive([64, 34, 25, 12, 22, 11, 90])); // [11, 12, 22, 25, 34, 64, 90]

console.log('\\n=== Optimized for Nearly Sorted ===');
console.log(optimizedInsertionSort([1, 2, 4, 3, 5, 6])); // [1, 2, 3, 4, 5, 6]

console.log('\\n=== Insertion Sort with Inversions ===');
const { sortedArray: sorted, inversions } = insertionSortWithInversions([5, 2, 4, 6, 1, 3]);
console.log('Sorted array:', sorted);
console.log('Number of inversions:', inversions);

console.log('\\n=== Object Sorting ===');
const people = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 35 }
];
console.log(insertionSortWithComparator([...people], (a, b) => a.age - b.age));

// Performance analysis
function performanceAnalysis() {
    console.log('\\n=== Performance Analysis ===');
    
    const sizes = [100, 500, 1000];
    
    sizes.forEach(size => {
        console.log(`\\nArray size: ${size}`);
        
        // Best case: already sorted
        const sortedArray = Array.from({length: size}, (_, i) => i);
        const start1 = performance.now();
        insertionSort([...sortedArray]);
        const end1 = performance.now();
        console.log(`Best case (sorted): ${(end1 - start1).toFixed(4)}ms`);
        
        // Worst case: reverse sorted
        const reversedArray = Array.from({length: size}, (_, i) => size - i);
        const start2 = performance.now();
        insertionSort([...reversedArray]);
        const end2 = performance.now();
        console.log(`Worst case (reversed): ${(end2 - start2).toFixed(4)}ms`);
        
        // Average case: random
        const randomArray = Array.from({length: size}, () => Math.floor(Math.random() * size));
        const start3 = performance.now();
        insertionSort([...randomArray]);
        const end3 = performance.now();
        console.log(`Average case (random): ${(end3 - start3).toFixed(4)}ms`);
    });
}

performanceAnalysis();

module.exports = {
    insertionSort,
    insertionSortWithSteps,
    binaryInsertionSort,
    insertionSortWithComparator,
    insertionSortRecursive,
    insertionSortList,
    optimizedInsertionSort,
    insertionSortWithGap,
    insertionSortWithInversions
};