function Node(value) {
    this.value = value;
    this.leftNode = null;
    this.rightNode = null;
}

function BinaryTree(rootNode) {
    this.rootNode = rootNode;
    this.sortedArray = [];

    // Smaller values added to the left, larger values added to the right
    this.addTo = (node, parentNode = this.rootNode) => {
        if (node.value <= parentNode.value) {
            (parentNode.leftNode === null)
                ? parentNode.leftNode = node
                : this.addTo(node, parentNode.leftNode);
        }
        else {
            (parentNode.rightNode === null)
                ? parentNode.rightNode = node
                : this.addTo(node, parentNode.rightNode);
        }
    }

    // Generate sorted array from current tree
    this.generateSortedArray = (currentNode = this.rootNode) => {
        if (currentNode.leftNode !== null) {
            this.generateSortedArray(currentNode.leftNode);
        }

        this.sortedArray.push(currentNode.value);

        if (currentNode.rightNode !== null) {
            this.generateSortedArray(currentNode.rightNode)
        }
    }

    // Return sorted array
    this.getSortedArray = () => {
        this.generateSortedArray();
        return this.sortedArray;
    }
}

function treeSortObjects(data, sortParam) {

    // Build binary tree

    const rootNode = new Node(data[0]);
    const tree = new BinaryTree(rootNode);

    for (let i = 1; i < data.length; i++) {
        const node = new Node(data[i]);
        tree.addTo(node);
    }

    return tree.getSortedArray();
}

// Testing
const sortedArray = treeSortObjects(
    [4366, 4960, 1166, 6071, 3329, 1441, 4823, 7343, 2995, 5188, 4603, 5144, 8030, 4235, 7458, 3343, 5298, 3880, 1452, 8549, 2546, 9062, 5488, 5467, 5053, 1918, 7929, 3383, 9851, 1416, 2564, 5035, 8555, 3127,],
    'sortParam'
);

console.log(sortedArray);