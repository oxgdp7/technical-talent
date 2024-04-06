class Environment {
    #trees;
    #water;
    #seeds;
    #treesToPlant;
    #waterLeft;
    #collectedWood;
    #collectedWater;

    constructor(trees, water) {
        this.#trees = trees;
        this.#water = water;
        this.#seeds = this.#trees > 0;
        this.#treesToPlant = 0;
        this.#waterLeft = this.#water;
        this.#collectedWood = 0;
        this.#collectedWater = 0;
    }

    chopTree() {
        if (!this.#trees) return false;
        this.#trees--;
        this.#collectedWood++;
        return true;
    }

    chopRenewable() {
        this.#collectedWood++;
    }

    collectSeed() {
        return this.#seeds;
    }

    plantTree() {
        this.#treesToPlant++;
    }

    collectWater() {
        if (!this.#waterLeft) {
            return false;
        }
        this.#waterLeft--;
        this.#collectedWater++;
        return true;
    }

    synchronise() {
        this.#trees += this.#treesToPlant;
        this.#seeds = this.#trees > 0;
        this.#treesToPlant = 0;
        this.#waterLeft = this.#water;
        console.log("Trees: " + this.#trees);
        console.log("Wood collected: " + this.#collectedWood);
        console.log("Water collected: " + this.#collectedWater);
    }

    trees() {
        return this.#trees;
    }

    waterFlow() {
        return this.#water;
    }

    woodCollected() {
        return this.#collectedWood;
    }

    waterCollected() {
        return this.#collectedWater;
    }
}

export default Environment;