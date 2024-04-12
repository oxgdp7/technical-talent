import Blob from "./Blob";
import Status from "./Status";

class OrangeBlob extends Blob {
    #name;
    #number;
    #collectedSeed;
    #choppedTree;
    #status;
    #activated;
    #env;

    constructor(number, env) {
        super();
        this.#name = "orange" + number;
        this.#number = number;
        this.#collectedSeed = false;
        this.#choppedTree = false;
        this.#status = new Status("Active");
        this.#activated = false;
        this.#env = env;
    }

    /* The orange blob has 2 actions:
     * For the first action, it waits until it can collect a seed
     * Then, it will plant and then chop down a tree */

    act() {
        if (this.#status.name !== Status.Sleeping.name) {
            if (this.#collectedSeed) {
                console.log(this.#name + ": Chop 1 tree (renewable)");
                this.#env.chopRenewable();
                this.#collectedSeed = false;
                this.#choppedTree = true;
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
