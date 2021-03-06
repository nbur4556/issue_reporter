function Node(value) {
    this.value = value;
    this.leftNode = null;
    this.rightNode = null;
}

function BinaryTree(rootNode) {
    this.rootNode = rootNode;

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

function treeSort(data, sortParam) {

    // Build binary tree

    const rootNode = new Node(data[0]);
    const tree = new BinaryTree(rootNode);

    const rightNode = new Node(data[1]);
    tree.addTo(rightNode);

    const leftNode = new Node(data[2]);
    tree.addTo(leftNode);

    const largestNode = new Node(data[3]);
    tree.addTo(largestNode);

    const smallestNode = new Node(data[4]);
    tree.addTo(smallestNode);


    console.log(tree);
}

treeSort([5, 5, 4, 321, 1, 564, 651, 35, 574, 684, 351, 74, 684, 351, 1], 'sortParam');