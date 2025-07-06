/**
 * Dynamic Array Implementation
 * A resizable array that grows automatically when needed
 */

class DynamicArray {
    constructor(initialCapacity = 2) {
        this.data = new Array(initialCapacity);
        this.size = 0;
        this.capacity = initialCapacity;
    }

    // Get element at index
    get(index) {
        if (index < 0 || index >= this.size) {
            throw new Error('Index out of bounds');
        }
        return this.data[index];
    }

    // Set element at index
    set(index, value) {
        if (index < 0 || index >= this.size) {
            throw new Error('Index out of bounds');
        }
        this.data[index] = value;
    }

    // Add element to end
    push(value) {
        if (this.size >= this.capacity) {
            this._resize();
        }
        this.data[this.size] = value;
        this.size++;
    }

    // Remove and return last element
    pop() {
        if (this.size === 0) {
            throw new Error('Array is empty');
        }
        const value = this.data[this.size - 1];
        this.size--;
        return value;
    }

    // Insert element at specific index
    insert(index, value) {
        if (index < 0 || index > this.size) {
            throw new Error('Index out of bounds');
        }
        
        if (this.size >= this.capacity) {
            this._resize();
        }

        // Shift elements to the right
        for (let i = this.size; i > index; i--) {
            this.data[i] = this.data[i - 1];
        }
        
        this.data[index] = value;
        this.size++;
    }

    // Remove element at index
    delete(index) {
        if (index < 0 || index >= this.size) {
            throw new Error('Index out of bounds');
        }

        const value = this.data[index];
        
        // Shift elements to the left
        for (let i = index; i < this.size - 1; i++) {
            this.data[i] = this.data[i + 1];
        }
        
        this.size--;
        return value;
    }

    // Double the capacity
    _resize() {
        const newCapacity = this.capacity * 2;
        const newData = new Array(newCapacity);
        
        for (let i = 0; i < this.size; i++) {
            newData[i] = this.data[i];
        }
        
        this.data = newData;
        this.capacity = newCapacity;
    }

    // Get current size
    getSize() {
        return this.size;
    }

    // Check if empty
    isEmpty() {
        return this.size === 0;
    }

    // Convert to regular array
    toArray() {
        const result = new Array(this.size);
        for (let i = 0; i < this.size; i++) {
            result[i] = this.data[i];
        }
        return result;
    }
}

// Test the implementation
const arr = new DynamicArray();
arr.push(1);
arr.push(2);
arr.push(3);
console.log(arr.toArray()); // [1, 2, 3]

arr.insert(1, 10);
console.log(arr.toArray()); // [1, 10, 2, 3]

arr.delete(0);
console.log(arr.toArray()); // [10, 2, 3]

module.exports = DynamicArray;