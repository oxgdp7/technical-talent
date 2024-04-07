import Blob from "./Blob";
import Status from "./Status";

class GreenBlob extends Blob {
    #name;
    #collectedSeed;
    #plantedTree;
    #status;
    #activated;
    #env;

    constructor(name, env) {
        super();
        this.#name = "Green" + name;
        this.#collectedSeed = false;
        this.#plantedTree = false;
        this.#status = new Status("Active");
        this.#activated = false;
        this.#env = env;
    }

    /* The green blob has 2 actions:
     * For the first action, it waits until it can collect a seed
     * Then, it will plant and grow a tree (the tree is added at the end
     * of the round it was planted) */

    act() {
        if (this.#status.name !== Status.Sleeping.name) {
            if (this.#collectedSeed) {
                console.log(this.#name + ": Plant 1 tree");
                this.#env.plantTree();
                this.#collectedSeed = false;
                this.#plantedTree = true;
                return true;
            }
            if (this.#env.collectSeed()) {
                console.log(this.#name + ": Collect a seed");
                this.#collectedSeed = true;
                return true;
            }
        }
        return false;
    }

    synchronise() {
        if (this.#activated) {
            this.#status = new Status("Active");
            this.#activated = false;
            this.#plantedTree = false;
        } else if (this.#plantedTree) {
            this.#status = new Status("Sleeping");
        } else if (this.#collectedSeed) {
            this.#status = new Status("Active");
        } else {
            this.#status = new Status("Waiting");
        }
        console.log(this.#name + ": Status = " + this.#status);
    }

    restart() {
        if (this.#status.name !== Status.Sleeping.name) {
            throw new Error(
                "Blob should not be restarted if it is not sleeping",
            );
        }
        this.#activated = true;
    }

    status() {
        return this.#status;
    }

    name() {
        return this.#name;
    }
}

export default GreenBlob;
