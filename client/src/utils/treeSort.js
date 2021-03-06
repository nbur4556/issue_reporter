function Node(value) {
    this.value = value;
    this.leftNode = null;
    this.rightNode = null;
}

function BinaryTree(rootNode) {
    this.rootNode = rootNode;

    this.addTo = (node, parentNode = this.rootNode) => {
        if (node.value <= parentNode.value) {
            parentNode.leftNode = node;
        }
        else {
            parentNode.rightNode = node;
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

    console.log(tree);
}

treeSort([5, 7, 4, 321, 9874, 564, 651, 35, 574, 684, 351, 74, 684, 351, 1], 'sortParam');