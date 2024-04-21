import Blob from "./Blob";
import Status from "./Status";

class OrangeBlob extends Blob {
    #name;
    #number;
    #parent;
    #collectedSeed;
    #choppedTree;
    #status;
    #activated;
    #env;

    constructor(number, env) {
        super();
        this.#name = "orange" + number;
        this.#number = number;
        this.#parent = null;
        this.#collectedSeed = false;
        this.#choppedTree = false;
        this.#status = new Status("Active");
        this.#activated = false;
        this.#env = env;
    }

    addParent(parent) {
        this.#parent = parent;
    }

    /* The orange blob has 2 actions:
     * For the first action, it waits until it can collect a seed
     * Then, it will plant and then chop down a tree */

    act() {
        const result = this.#resolveAction();
        return {
            color: "orange",
            number: this.#number,
            status: result[0],
            phase: result[1],
            parent: this.#parent ? this.#parent.name() : null,
        };
    }

    #resolveAction() {
        if (this.#status.name === Status.Sleeping.name) return ["Sleeping", -1];
        if (this.#collectedSeed) {
            console.log(this.#name + ": Chop 1 tree (renewable)");
            this.#env.chopRenewable();
            this.#collectedSeed = false;
            this.#choppedTree = true;
            return ["Active", 1];
        }
        if (this.#env.collectSeed()) {
            console.log(this.#name + ": Collect a seed");
            this.#collectedSeed = true;
            return ["Active", 0];
        }
        return ["Waiting", -1];
    }

    synchronise() {
        if (this.#activated) {
            this.#status = new Status("Active");
            this.#activated = false;
            this.#choppedTree = false;
        } else if (this.#choppedTree) {
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

    toJSON() {
        return {
            color: "orange",
            number: this.#number.toString(),
        };
    }
}

export default OrangeBlob;
