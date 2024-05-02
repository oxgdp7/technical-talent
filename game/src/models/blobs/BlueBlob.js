import Blob from "./Blob";
import Status from "./Status";

class BlueBlob extends Blob {
    #name;
    #number;
    #parent;
    #collectedWater;
    #status;
    #activated;
    #env;

    constructor(number, env) {
        super();
        this.#name = "blue" + number;
        this.#number = number;
        this.#parent = null;
        this.#collectedWater = false;
        this.#status = new Status("Active");
        this.#activated = false;
        this.#env = env;
    }

    addParent(parent) {
        this.#parent = parent;
    }

    /* The blue blob collects 1 bucket of water if it can */

    act() {
        return {
            color: "blue",
            number: this.#number,
            status: this.#resolveAction(),
            parent: this.#parent ? this.#parent.name() : null,
        };
    }

    #resolveAction() {
        if (this.#status.name === Status.Sleeping.name) return "Sleeping";
        if (this.#env.collectWater()) {
            console.log(this.#name + ": Collect 1 water");
            this.#collectedWater = true;
            return "Active";
        }
        return "Waiting";
    }

    synchronise() {
        if (this.#activated) {
            this.#status = new Status("Active");
            this.#activated = false;
            this.#collectedWater = false;
        } else if (this.#collectedWater) {
            this.#status = new Status("Sleeping");
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

    parent() {
        return this.#parent;
    }

    toJSON() {
        return {
            color: "blue",
            number: this.#number.toString(),
        };
    }
}

export default BlueBlob;
