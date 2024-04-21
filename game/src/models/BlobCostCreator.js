// Function that encapsulates the cost of a blob
// Func(x) is used since some blobs can have variable costs
// e.g. purple blobs cost if func(#blobs repeated)
// If the blob does not have variable cost, func should be in the form
// ((_) => y)
// Description should be a string to display to the user how the cost is
// calculated

class BlobCostCreator {
    #func;
    #description;

    constructor(func, description) {
        this.#func = func;
        this.#description = description;
    }

    cost(x) {
        return this.#func(x);
    }

    describe() {
        return this.#description;
    }
}

export default BlobCostCreator;
