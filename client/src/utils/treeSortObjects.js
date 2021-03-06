function Node(value) {
    this.value = value;
    this.leftNode = null;
    this.rightNode = null;
}

function BinaryTree(rootNode, sortParam) {
    this.rootNode = rootNode;
    this.sortParam = sortParam
    this.sortedArray = [];

    // Smaller values added to the left, larger values added to the right
    this.addTo = (node, parentNode = this.rootNode) => {
        if (node.value[this.sortParam] <= parentNode.value[this.sortParam]) {
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

// Generate tree and return sorted array
function treeSortObjects(data, sortParam) {
    const rootNode = new Node(data[0]);
    const tree = new BinaryTree(rootNode, sortParam);

    // Loop through each item and add to tree
    for (let i = 1; i < data.length; i++) {
        const node = new Node(data[i]);
        tree.addTo(node);
    }

    return tree.getSortedArray();
}

export default treeSortObjects;