/**
 * Heap Sort Algorithm
 * Time Complexity: O(n log n) - consistent in all cases
 * Space Complexity: O(1) - in-place sorting
 * 
 * Heap Sort uses a binary heap data structure to sort elements.
 * It first builds a max heap, then repeatedly extracts the maximum element.
 */

/**
 * Main heap sort function
 */
function heapSort(arr) {
    const n = arr.length;
    
    // Build max heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [arr[0], arr[i]] = [arr[i], arr[0]];
        
        // Call heapify on the reduced heap
        heapify(arr, i, 0);
    }
    
    return arr;
}

/**
 * Heapify a subtree rooted at index i
 * n is the size of the heap
 */
function heapify(arr, n, i) {
    let largest = i; // Initialize largest as root
    let left = 2 * i + 1; // Left child
    let right = 2 * i + 2; // Right child
    
    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    // If largest is not root
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        
        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
}

/**
 * Min Heap Sort (sorts in descending order)
 */
function heapSortDescending(arr) {
    const n = arr.length;
    
    // Build min heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        minHeapify(arr, n, i);
    }
    
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        minHeapify(arr, i, 0);
    }
    
    return arr;
}

function minHeapify(arr, n, i) {
    let smallest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    
    if (left < n && arr[left] < arr[smallest]) {
        smallest = left;
    }
    
    if (right < n && arr[right] < arr[smallest]) {
        smallest = right;
    }
    
    if (smallest !== i) {
        [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
        minHeapify(arr, n, smallest);
    }
}

/**
 * Iterative heapify (alternative implementation)
 */
function heapifyIterative(arr, n, i) {
    while (true) {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        
        if (largest === i) break;
        
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        i = largest;
    }
}

/**
 * Heap Sort with custom comparator
 */
function heapSortWithComparator(arr, compareFn = (a, b) => a - b) {
    const n = arr.length;
    
    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapifyWithComparator(arr, n, i, compareFn);
    }
    
    // Extract elements
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapifyWithComparator(arr, i, 0, compareFn);
    }
    
    return arr;
}

function heapifyWithComparator(arr, n, i, compareFn) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    
    if (left < n && compareFn(arr[left], arr[largest]) > 0) {
        largest = left;
    }
    
    if (right < n && compareFn(arr[right], arr[largest]) > 0) {
        largest = right;
    }
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapifyWithComparator(arr, n, largest, compareFn);
    }
}

/**
 * Heap class for educational purposes
 */
class MaxHeap {
    constructor() {
        this.heap = [];
    }
    
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }
    
    getLeftChildIndex(index) {
        return 2 * index + 1;
    }
    
    getRightChildIndex(index) {
        return 2 * index + 2;
    }
    
    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }
    
    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }
    
    heapifyUp() {
        let index = this.heap.length - 1;
        
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            
            if (this.heap[parentIndex] >= this.heap[index]) break;
            
            this.swap(parentIndex, index);
            index = parentIndex;
        }
    }
    
    extractMax() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        
        return max;
    }
    
    heapifyDown() {
        let index = 0;
        
        while (this.getLeftChildIndex(index) < this.heap.length) {
            let largerChildIndex = this.getLeftChildIndex(index);
            const rightChildIndex = this.getRightChildIndex(index);
            
            if (rightChildIndex < this.heap.length && 
                this.heap[rightChildIndex] > this.heap[largerChildIndex]) {
                largerChildIndex = rightChildIndex;
            }
            
            if (this.heap[index] >= this.heap[largerChildIndex]) break;
            
            this.swap(index, largerChildIndex);
            index = largerChildIndex;
        }
    }
    
    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }
    
    size() {
        return this.heap.length;
    }
    
    toArray() {
        return [...this.heap];
    }
}

// Test cases
console.log('Standard Heap Sort:');
console.log(heapSort([64, 34, 25, 12, 22, 11, 90])); // [11, 12, 22, 25, 34, 64, 90]
console.log(heapSort([5, 1, 4, 2, 8])); // [1, 2, 4, 5, 8]

console.log('\\nDescending Heap Sort:');
console.log(heapSortDescending([64, 34, 25, 12, 22, 11, 90])); // [90, 64, 34, 25, 22, 12, 11]

console.log('\\nHeap Sort with Custom Comparator:');
const people = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 35 }
];
console.log(heapSortWithComparator([...people], (a, b) => a.age - b.age));

console.log('\\nMax Heap Class Demo:');
const maxHeap = new MaxHeap();
[3, 1, 6, 5, 2, 4].forEach(val => maxHeap.insert(val));
console.log('Heap array:', maxHeap.toArray());
console.log('Extract max:', maxHeap.extractMax()); // 6
console.log('Heap after extraction:', maxHeap.toArray());

// Performance comparison
function performanceTest() {
    const sizes = [1000, 5000, 10000];
    
    console.log('\\nPerformance Test:');
    
    sizes.forEach(size => {
        const testArray = Array.from({length: size}, () => Math.floor(Math.random() * size));
        
        console.log(`\\nArray size: ${size}`);
        
        // Test heap sort
        const start1 = performance.now();
        heapSort([...testArray]);
        const end1 = performance.now();
        console.log(`Heap Sort: ${(end1 - start1).toFixed(4)}ms`);
        
        // Test native sort for comparison
        const start2 = performance.now();
        [...testArray].sort((a, b) => a - b);
        const end2 = performance.now();
        console.log(`Native Sort: ${(end2 - start2).toFixed(4)}ms`);
    });
}

performanceTest();

module.exports = {
    heapSort,
    heapSortDescending,
    heapSortWithComparator,
    heapify,
    MaxHeap
};