/**
 * Stack Data Structure Implementation
 * LIFO (Last In, First Out) principle
 * 
 * A stack is a linear data structure that follows the LIFO principle.
 * Elements are added and removed from the same end, called the "top" of the stack.
 */

/**
 * Array-based Stack Implementation
 */
class ArrayStack {
    constructor() {
        this.items = [];
    }

    // Add element to top of stack
    push(element) {
        this.items.push(element);
        return this.size();
    }

    // Remove and return top element
    pop() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty');
        }
        return this.items.pop();
    }

    // Return top element without removing it
    peek() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty');
        }
        return this.items[this.items.length - 1];
    }

    // Check if stack is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Get number of elements in stack
    size() {
        return this.items.length;
    }

    // Clear all elements
    clear() {
        this.items = [];
    }

    // Convert stack to array (top to bottom)
    toArray() {
        return [...this.items].reverse();
    }

    // Print stack contents
    print() {
        if (this.isEmpty()) {
            console.log('Stack is empty');
            return;
        }
        
        console.log('Stack (top to bottom):');
        for (let i = this.items.length - 1; i >= 0; i--) {
            console.log(`${i === this.items.length - 1 ? '→ ' : '  '}${this.items[i]}`);
        }
    }
}

/**
 * Linked List-based Stack Implementation
 */
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedListStack {
    constructor() {
        this.top = null;
        this.count = 0;
    }

    // Add element to top of stack
    push(element) {
        const newNode = new Node(element);
        newNode.next = this.top;
        this.top = newNode;
        this.count++;
        return this.count;
    }

    // Remove and return top element
    pop() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty');
        }
        
        const poppedData = this.top.data;
        this.top = this.top.next;
        this.count--;
        return poppedData;
    }

    // Return top element without removing it
    peek() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty');
        }
        return this.top.data;
    }

    // Check if stack is empty
    isEmpty() {
        return this.top === null;
    }

    // Get number of elements in stack
    size() {
        return this.count;
    }

    // Clear all elements
    clear() {
        this.top = null;
        this.count = 0;
    }

    // Convert stack to array (top to bottom)
    toArray() {
        const result = [];
        let current = this.top;
        
        while (current) {
            result.push(current.data);
            current = current.next;
        }
        
        return result;
    }

    // Print stack contents
    print() {
        if (this.isEmpty()) {
            console.log('Stack is empty');
            return;
        }
        
        console.log('Stack (top to bottom):');
        let current = this.top;
        let isFirst = true;
        
        while (current) {
            console.log(`${isFirst ? '→ ' : '  '}${current.data}`);
            current = current.next;
            isFirst = false;
        }
    }
}

/**
 * Stack with Maximum Element Tracking
 */
class MaxStack {
    constructor() {
        this.stack = [];
        this.maxStack = [];
    }

    push(element) {
        this.stack.push(element);
        
        // Update max stack
        if (this.maxStack.length === 0 || element >= this.getMax()) {
            this.maxStack.push(element);
        }
        
        return this.size();
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty');
        }
        
        const poppedElement = this.stack.pop();
        
        // Update max stack
        if (poppedElement === this.getMax()) {
            this.maxStack.pop();
        }
        
        return poppedElement;
    }

    peek() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty');
        }
        return this.stack[this.stack.length - 1];
    }

    getMax() {
        if (this.maxStack.length === 0) {
            throw new Error('Stack is empty');
        }
        return this.maxStack[this.maxStack.length - 1];
    }

    isEmpty() {
        return this.stack.length === 0;
    }

    size() {
        return this.stack.length;
    }
}

/**
 * Stack Applications and Utility Functions
 */

// Check if parentheses are balanced
function isBalancedParentheses(expression) {
    const stack = new ArrayStack();
    const pairs = { ')': '(', '}': '{', ']': '[' };
    
    for (let char of expression) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else if (char === ')' || char === '}' || char === ']') {
            if (stack.isEmpty() || stack.pop() !== pairs[char]) {
                return false;
            }
        }
    }
    
    return stack.isEmpty();
}

// Evaluate postfix expression
function evaluatePostfix(expression) {
    const stack = new ArrayStack();
    const tokens = expression.split(' ');
    
    for (let token of tokens) {
        if (!isNaN(token)) {
            stack.push(parseFloat(token));
        } else {
            if (stack.size() < 2) {
                throw new Error('Invalid postfix expression');
            }
            
            const operand2 = stack.pop();
            const operand1 = stack.pop();
            
            switch (token) {
                case '+':
                    stack.push(operand1 + operand2);
                    break;
                case '-':
                    stack.push(operand1 - operand2);
                    break;
                case '*':
                    stack.push(operand1 * operand2);
                    break;
                case '/':
                    if (operand2 === 0) {
                        throw new Error('Division by zero');
                    }
                    stack.push(operand1 / operand2);
                    break;
                default:
                    throw new Error(`Unknown operator: ${token}`);
            }
        }
    }
    
    if (stack.size() !== 1) {
        throw new Error('Invalid postfix expression');
    }
    
    return stack.pop();
}

// Convert infix to postfix notation
function infixToPostfix(expression) {
    const stack = new ArrayStack();
    const result = [];
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
    const rightAssociative = { '^': true };
    
    const tokens = expression.replace(/\s+/g, '').split('');
    
    for (let token of tokens) {
        if (!isNaN(token) || token.match(/[a-zA-Z]/)) {
            result.push(token);
        } else if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            while (!stack.isEmpty() && stack.peek() !== '(') {
                result.push(stack.pop());
            }
            if (!stack.isEmpty()) {
                stack.pop(); // Remove '('
            }
        } else if (precedence[token]) {
            while (!stack.isEmpty() && 
                   stack.peek() !== '(' &&
                   (precedence[stack.peek()] > precedence[token] ||
                    (precedence[stack.peek()] === precedence[token] && !rightAssociative[token]))) {
                result.push(stack.pop());
            }
            stack.push(token);
        }
    }
    
    while (!stack.isEmpty()) {
        result.push(stack.pop());
    }
    
    return result.join(' ');
}

// Reverse a string using stack
function reverseString(str) {
    const stack = new ArrayStack();
    
    // Push all characters to stack
    for (let char of str) {
        stack.push(char);
    }
    
    // Pop all characters to get reversed string
    let reversed = '';
    while (!stack.isEmpty()) {
        reversed += stack.pop();
    }
    
    return reversed;
}

// Test and demonstration
console.log('=== Array Stack Demo ===');
const arrayStack = new ArrayStack();
arrayStack.push(10);
arrayStack.push(20);
arrayStack.push(30);
arrayStack.print();
console.log('Popped:', arrayStack.pop());
console.log('Top element:', arrayStack.peek());
console.log('Size:', arrayStack.size());

console.log('\\n=== Linked List Stack Demo ===');
const linkedStack = new LinkedListStack();
linkedStack.push('A');
linkedStack.push('B');
linkedStack.push('C');
linkedStack.print();
console.log('Popped:', linkedStack.pop());
console.log('Array representation:', linkedStack.toArray());

console.log('\\n=== Max Stack Demo ===');
const maxStack = new MaxStack();
maxStack.push(3);
maxStack.push(1);
maxStack.push(4);
maxStack.push(2);
console.log('Current max:', maxStack.getMax()); // 4
maxStack.pop();
console.log('Max after pop:', maxStack.getMax()); // 4

console.log('\\n=== Stack Applications ===');
console.log('Balanced parentheses:');
console.log('"{[()]}" is balanced:', isBalancedParentheses('{[()]}')); // true
console.log('"{[(]}" is balanced:', isBalancedParentheses('{[(]}')); // false

console.log('\\nPostfix evaluation:');
console.log('3 4 + 2 * =', evaluatePostfix('3 4 + 2 *')); // 14

console.log('\\nInfix to Postfix:');
console.log('A + B * C =', infixToPostfix('A + B * C')); // A B C * +
console.log('(A + B) * C =', infixToPostfix('(A + B) * C')); // A B + C *

console.log('\\nString reversal:');
console.log('Reverse "Hello" =', reverseString('Hello')); // olleH

module.exports = {
    ArrayStack,
    LinkedListStack,
    MaxStack,
    isBalancedParentheses,
    evaluatePostfix,
    infixToPostfix,
    reverseString
};