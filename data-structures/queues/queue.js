/**
 * Queue Data Structure Implementation
 * FIFO (First In, First Out) principle
 * 
 * A queue is a linear data structure that follows the FIFO principle.
 * Elements are added at the rear (enqueue) and removed from the front (dequeue).
 */

/**
 * Array-based Queue Implementation
 */
class ArrayQueue {
    constructor() {
        this.items = [];
    }

    // Add element to rear of queue
    enqueue(element) {
        this.items.push(element);
        return this.size();
    }

    // Remove and return front element
    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        return this.items.shift();
    }

    // Return front element without removing it
    front() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        return this.items[0];
    }

    // Return rear element without removing it
    rear() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        return this.items[this.items.length - 1];
    }

    // Check if queue is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Get number of elements in queue
    size() {
        return this.items.length;
    }

    // Clear all elements
    clear() {
        this.items = [];
    }

    // Convert queue to array (front to rear)
    toArray() {
        return [...this.items];
    }

    // Print queue contents
    print() {
        if (this.isEmpty()) {
            console.log('Queue is empty');
            return;
        }
        
        console.log('Queue (front to rear):');
        console.log(this.items.map((item, index) => 
            `${index === 0 ? '→ ' : '  '}${item}`
        ).join('\n'));
    }
}

/**
 * Linked List-based Queue Implementation (more efficient for large queues)
 */
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedListQueue {
    constructor() {
        this.front = null;
        this.rear = null;
        this.count = 0;
    }

    // Add element to rear of queue
    enqueue(element) {
        const newNode = new Node(element);
        
        if (this.isEmpty()) {
            this.front = this.rear = newNode;
        } else {
            this.rear.next = newNode;
            this.rear = newNode;
        }
        
        this.count++;
        return this.count;
    }

    // Remove and return front element
    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        
        const dequeuedData = this.front.data;
        this.front = this.front.next;
        
        if (!this.front) {
            this.rear = null;
        }
        
        this.count--;
        return dequeuedData;
    }

    // Return front element without removing it
    getFront() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        return this.front.data;
    }

    // Return rear element without removing it
    getRear() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        return this.rear.data;
    }

    // Check if queue is empty
    isEmpty() {
        return this.front === null;
    }

    // Get number of elements in queue
    size() {
        return this.count;
    }

    // Clear all elements
    clear() {
        this.front = null;
        this.rear = null;
        this.count = 0;
    }

    // Convert queue to array (front to rear)
    toArray() {
        const result = [];
        let current = this.front;
        
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        
        return result;
    }

    // Print queue contents
    print() {
        if (this.isEmpty()) {
            console.log('Queue is empty');
            return;
        }
        
        console.log('Queue (front to rear):');
        let current = this.front;
        let isFirst = true;
        
        while (current) {
            console.log(`${isFirst ? '→ ' : '  '}${current.data}`);
            current = current.next;
            isFirst = false;
        }
    }
}

/**
 * Circular Queue Implementation (fixed size)
 */
class CircularQueue {
    constructor(capacity) {
        this.capacity = capacity;
        this.items = new Array(capacity);
        this.front = -1;
        this.rear = -1;
        this.count = 0;
    }

    // Add element to rear of queue
    enqueue(element) {
        if (this.isFull()) {
            throw new Error('Queue is full');
        }
        
        if (this.isEmpty()) {
            this.front = this.rear = 0;
        } else {
            this.rear = (this.rear + 1) % this.capacity;
        }
        
        this.items[this.rear] = element;
        this.count++;
        return this.count;
    }

    // Remove and return front element
    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        
        const dequeuedElement = this.items[this.front];
        this.items[this.front] = undefined;
        
        if (this.count === 1) {
            this.front = this.rear = -1;
        } else {
            this.front = (this.front + 1) % this.capacity;
        }
        
        this.count--;
        return dequeuedElement;
    }

    // Return front element without removing it
    getFront() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        return this.items[this.front];
    }

    // Return rear element without removing it
    getRear() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        return this.items[this.rear];
    }

    // Check if queue is empty
    isEmpty() {
        return this.count === 0;
    }

    // Check if queue is full
    isFull() {
        return this.count === this.capacity;
    }

    // Get number of elements in queue
    size() {
        return this.count;
    }

    // Get capacity of queue
    getCapacity() {
        return this.capacity;
    }

    // Convert queue to array (front to rear)
    toArray() {
        if (this.isEmpty()) return [];
        
        const result = [];
        let index = this.front;
        
        for (let i = 0; i < this.count; i++) {
            result.push(this.items[index]);
            index = (index + 1) % this.capacity;
        }
        
        return result;
    }

    // Print queue contents
    print() {
        if (this.isEmpty()) {
            console.log('Circular Queue is empty');
            return;
        }
        
        console.log('Circular Queue (front to rear):');
        const array = this.toArray();
        array.forEach((item, index) => {
            console.log(`${index === 0 ? '→ ' : '  '}${item}`);
        });
        console.log(`Capacity: ${this.capacity}, Size: ${this.count}`);
    }
}

/**
 * Priority Queue Implementation (Min Heap based)
 */
class PriorityQueue {
    constructor(compareFn = (a, b) => a.priority - b.priority) {
        this.items = [];
        this.compare = compareFn;
    }

    // Add element with priority
    enqueue(element, priority = 0) {
        const queueElement = { element, priority };
        this.items.push(queueElement);
        this.heapifyUp();
        return this.size();
    }

    // Remove and return highest priority element
    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Priority Queue is empty');
        }
        
        if (this.items.length === 1) {
            return this.items.pop().element;
        }
        
        const root = this.items[0];
        this.items[0] = this.items.pop();
        this.heapifyDown();
        
        return root.element;
    }

    // Return highest priority element without removing it
    front() {
        if (this.isEmpty()) {
            throw new Error('Priority Queue is empty');
        }
        return this.items[0].element;
    }

    // Check if queue is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Get number of elements in queue
    size() {
        return this.items.length;
    }

    // Heapify up (for insertion)
    heapifyUp() {
        let index = this.items.length - 1;
        
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            
            if (this.compare(this.items[index], this.items[parentIndex]) >= 0) {
                break;
            }
            
            [this.items[index], this.items[parentIndex]] = 
            [this.items[parentIndex], this.items[index]];
            
            index = parentIndex;
        }
    }

    // Heapify down (for deletion)
    heapifyDown() {
        let index = 0;
        
        while (this.getLeftChildIndex(index) < this.items.length) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            const rightChildIndex = this.getRightChildIndex(index);
            
            if (rightChildIndex < this.items.length && 
                this.compare(this.items[rightChildIndex], this.items[smallerChildIndex]) < 0) {
                smallerChildIndex = rightChildIndex;
            }
            
            if (this.compare(this.items[index], this.items[smallerChildIndex]) <= 0) {
                break;
            }
            
            [this.items[index], this.items[smallerChildIndex]] = 
            [this.items[smallerChildIndex], this.items[index]];
            
            index = smallerChildIndex;
        }
    }

    getLeftChildIndex(parentIndex) {
        return 2 * parentIndex + 1;
    }

    getRightChildIndex(parentIndex) {
        return 2 * parentIndex + 2;
    }

    // Print queue contents
    print() {
        if (this.isEmpty()) {
            console.log('Priority Queue is empty');
            return;
        }
        
        console.log('Priority Queue (by priority):');
        this.items
            .sort((a, b) => this.compare(a, b))
            .forEach((item, index) => {
                console.log(`${index === 0 ? '→ ' : '  '}${item.element} (priority: ${item.priority})`);
            });
    }
}

/**
 * Double-ended Queue (Deque) Implementation
 */
class Deque {
    constructor() {
        this.items = [];
    }

    // Add element to front
    addFront(element) {
        this.items.unshift(element);
        return this.size();
    }

    // Add element to rear
    addRear(element) {
        this.items.push(element);
        return this.size();
    }

    // Remove and return front element
    removeFront() {
        if (this.isEmpty()) {
            throw new Error('Deque is empty');
        }
        return this.items.shift();
    }

    // Remove and return rear element
    removeRear() {
        if (this.isEmpty()) {
            throw new Error('Deque is empty');
        }
        return this.items.pop();
    }

    // Return front element without removing it
    peekFront() {
        if (this.isEmpty()) {
            throw new Error('Deque is empty');
        }
        return this.items[0];
    }

    // Return rear element without removing it
    peekRear() {
        if (this.isEmpty()) {
            throw new Error('Deque is empty');
        }
        return this.items[this.items.length - 1];
    }

    // Check if deque is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Get number of elements in deque
    size() {
        return this.items.length;
    }

    // Convert deque to array
    toArray() {
        return [...this.items];
    }

    // Print deque contents
    print() {
        if (this.isEmpty()) {
            console.log('Deque is empty');
            return;
        }
        
        console.log('Deque (front to rear):');
        console.log(this.items.map((item, index) => 
            `${index === 0 ? '→ ' : '  '}${item}`
        ).join('\n'));
    }
}

// Test and demonstration
console.log('=== Array Queue Demo ===');
const arrayQueue = new ArrayQueue();
arrayQueue.enqueue(10);
arrayQueue.enqueue(20);
arrayQueue.enqueue(30);
arrayQueue.print();
console.log('Dequeued:', arrayQueue.dequeue());
console.log('Front:', arrayQueue.front());
console.log('Size:', arrayQueue.size());

console.log('\\n=== Linked List Queue Demo ===');
const linkedQueue = new LinkedListQueue();
linkedQueue.enqueue('A');
linkedQueue.enqueue('B');
linkedQueue.enqueue('C');
linkedQueue.print();
console.log('Dequeued:', linkedQueue.dequeue());
console.log('Array representation:', linkedQueue.toArray());

console.log('\\n=== Circular Queue Demo ===');
const circularQueue = new CircularQueue(3);
circularQueue.enqueue(1);
circularQueue.enqueue(2);
circularQueue.enqueue(3);
circularQueue.print();
console.log('Dequeued:', circularQueue.dequeue());
circularQueue.enqueue(4);
circularQueue.print();

console.log('\\n=== Priority Queue Demo ===');
const priorityQueue = new PriorityQueue();
priorityQueue.enqueue('Low priority task', 3);
priorityQueue.enqueue('High priority task', 1);
priorityQueue.enqueue('Medium priority task', 2);
priorityQueue.print();
console.log('Dequeued:', priorityQueue.dequeue()); // High priority task

console.log('\\n=== Deque Demo ===');
const deque = new Deque();
deque.addRear(1);
deque.addFront(2);
deque.addRear(3);
deque.addFront(4);
deque.print(); // 4, 2, 1, 3
console.log('Remove front:', deque.removeFront()); // 4
console.log('Remove rear:', deque.removeRear()); // 3

module.exports = {
    ArrayQueue,
    LinkedListQueue,
    CircularQueue,
    PriorityQueue,
    Deque
};