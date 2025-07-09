/**
 * Binary Tree Implementation
 * A hierarchical data structure with nodes containing data and references to left and right children
 */

class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    // Insert a new node (level-order insertion for complete binary tree)
    insert(data) {
        const newNode = new TreeNode(data);
        
        if (!this.root) {
            this.root = newNode;
            return;
        }

        const queue = [this.root];
        
        while (queue.length > 0) {
            const current = queue.shift();
            
            if (!current.left) {
                current.left = newNode;
                return;
            } else if (!current.right) {
                current.right = newNode;
                return;
            } else {
                queue.push(current.left);
                queue.push(current.right);
            }
        }
    }

    // Search for a value in the tree
    search(data) {
        return this._searchRecursive(this.root, data);
    }

    _searchRecursive(node, data) {
        if (!node) return false;
        if (node.data === data) return true;
        
        return this._searchRecursive(node.left, data) || 
               this._searchRecursive(node.right, data);
    }

    // Tree Traversals
    
    // Inorder: Left -> Root -> Right
    inorderTraversal() {
        const result = [];
        this._inorderRecursive(this.root, result);
        return result;
    }

    _inorderRecursive(node, result) {
        if (node) {
            this._inorderRecursive(node.left, result);
            result.push(node.data);
            this._inorderRecursive(node.right, result);
        }
    }

    // Preorder: Root -> Left -> Right
    preorderTraversal() {
        const result = [];
        this._preorderRecursive(this.root, result);
        return result;
    }

    _preorderRecursive(node, result) {
        if (node) {
            result.push(node.data);
            this._preorderRecursive(node.left, result);
            this._preorderRecursive(node.right, result);
        }
    }

    // Postorder: Left -> Right -> Root
    postorderTraversal() {
        const result = [];
        this._postorderRecursive(this.root, result);
        return result;
    }

    _postorderRecursive(node, result) {
        if (node) {
            this._postorderRecursive(node.left, result);
            this._postorderRecursive(node.right, result);
            result.push(node.data);
        }
    }

    // Level-order traversal (Breadth-First Search)
    levelOrderTraversal() {
        if (!this.root) return [];
        
        const result = [];
        const queue = [this.root];
        
        while (queue.length > 0) {
            const current = queue.shift();
            result.push(current.data);
            
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
        
        return result;
    }

    // Get height of the tree
    getHeight() {
        return this._getHeightRecursive(this.root);
    }

    _getHeightRecursive(node) {
        if (!node) return -1;
        
        const leftHeight = this._getHeightRecursive(node.left);
        const rightHeight = this._getHeightRecursive(node.right);
        
        return Math.max(leftHeight, rightHeight) + 1;
    }

    // Count total number of nodes
    getSize() {
        return this._getSizeRecursive(this.root);
    }

    _getSizeRecursive(node) {
        if (!node) return 0;
        
        return 1 + this._getSizeRecursive(node.left) + this._getSizeRecursive(node.right);
    }

    // Find minimum value in the tree
    findMin() {
        if (!this.root) return null;
        
        const queue = [this.root];
        let min = this.root.data;
        
        while (queue.length > 0) {
            const current = queue.shift();
            
            if (current.data < min) {
                min = current.data;
            }
            
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
        
        return min;
    }

    // Find maximum value in the tree
    findMax() {
        if (!this.root) return null;
        
        const queue = [this.root];
        let max = this.root.data;
        
        while (queue.length > 0) {
            const current = queue.shift();
            
            if (current.data > max) {
                max = current.data;
            }
            
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
        
        return max;
    }

    // Check if tree is balanced
    isBalanced() {
        return this._isBalancedRecursive(this.root) !== -1;
    }

    _isBalancedRecursive(node) {
        if (!node) return 0;
        
        const leftHeight = this._isBalancedRecursive(node.left);
        if (leftHeight === -1) return -1;
        
        const rightHeight = this._isBalancedRecursive(node.right);
        if (rightHeight === -1) return -1;
        
        if (Math.abs(leftHeight - rightHeight) > 1) return -1;
        
        return Math.max(leftHeight, rightHeight) + 1;
    }

    // Mirror the tree (swap left and right subtrees)
    mirror() {
        this._mirrorRecursive(this.root);
    }

    _mirrorRecursive(node) {
        if (!node) return;
        
        // Swap left and right children
        const temp = node.left;
        node.left = node.right;
        node.right = temp;
        
        // Recursively mirror subtrees
        this._mirrorRecursive(node.left);
        this._mirrorRecursive(node.right);
    }

    // Print tree structure (simple visualization)
    printTree() {
        if (!this.root) {
            console.log('Tree is empty');
            return;
        }
        
        this._printTreeRecursive(this.root, '', true);
    }

    _printTreeRecursive(node, prefix, isLast) {
        if (node) {
            console.log(prefix + (isLast ? '└── ' : '├── ') + node.data);
            
            const children = [];
            if (node.left) children.push(node.left);
            if (node.right) children.push(node.right);
            
            children.forEach((child, index) => {
                const isLastChild = index === children.length - 1;
                const newPrefix = prefix + (isLast ? '    ' : '│   ');
                this._printTreeRecursive(child, newPrefix, isLastChild);
            });
        }
    }

    // Convert tree to array representation
    toArray() {
        if (!this.root) return [];
        
        const result = [];
        const queue = [this.root];
        
        while (queue.length > 0) {
            const current = queue.shift();
            
            if (current) {
                result.push(current.data);
                queue.push(current.left);
                queue.push(current.right);
            } else {
                result.push(null);
            }
        }
        
        // Remove trailing nulls
        while (result.length > 0 && result[result.length - 1] === null) {
            result.pop();
        }
        
        return result;
    }
}

// Example usage and testing
const tree = new BinaryTree();

// Insert nodes
[1, 2, 3, 4, 5, 6, 7].forEach(val => tree.insert(val));

console.log('Tree structure:');
tree.printTree();

console.log('\\nTraversals:');
console.log('Inorder:', tree.inorderTraversal());
console.log('Preorder:', tree.preorderTraversal());
console.log('Postorder:', tree.postorderTraversal());
console.log('Level-order:', tree.levelOrderTraversal());

console.log('\\nTree properties:');
console.log('Height:', tree.getHeight());
console.log('Size:', tree.getSize());
console.log('Min value:', tree.findMin());
console.log('Max value:', tree.findMax());
console.log('Is balanced:', tree.isBalanced());

console.log('\\nSearch operations:');
console.log('Search 5:', tree.search(5));
console.log('Search 10:', tree.search(10));

console.log('\\nArray representation:', tree.toArray());

// Mirror the tree
tree.mirror();
console.log('\\nAfter mirroring:');
console.log('Inorder:', tree.inorderTraversal());

module.exports = { BinaryTree, TreeNode };