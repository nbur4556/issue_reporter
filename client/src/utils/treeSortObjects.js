function Node(value) {
    this.value = value;
    this.leftNode = null;
    this.rightNode = null;
}

function BinaryTree(rootNode) {
    this.rootNode = rootNode;

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
}

function treeSortObjects(data, sortParam) {

    // Build binary tree

    const rootNode = new Node(data[0]);
    const tree = new BinaryTree(rootNode);

    for (let i = 1; i < data.length; i++) {
        const node = new Node(data[i]);
        tree.addTo(node);
    }

    console.log(tree);
}

treeSortObjects(
    [9, 14, 17, 18, 19, 5, 8, 12, 19, 20, 4, 6, 12, 16, 20, 1, 9, 11, 15, 19, 3, 4, 10, 12, 15, 5, 7, 8, 10, 12, 5, 12, 13, 15, 16, 11, 13, 15, 18, 19, 3, 6, 9, 11, 20, 1, 4, 6, 14, 16],
    'sortParam'
);