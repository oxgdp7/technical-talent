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
