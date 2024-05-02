import Blob from "./Blob";
import Status from "./Status";

class RedBlob extends Blob {
    #name;
    #number;
    #parent;
    #choppedTree;
    #status;
    #activated;
    #env;

    constructor(number, env) {
        super();
        this.#name = "red" + number;
        this.#number = number;
        this.#parent = null;
        this.#choppedTree = false;
        this.#status = new Status("Active");
        this.#activated = false;
        this.#env = env;
    }

    addParent(parent) {
        this.#parent = parent;
    }

    /* The red blob chops 1 tree if it can */

    act() {
        return {
            color: "red",
            number: this.#number,
            status: this.#resolveAction(),
            parent: this.#parent ? this.#parent.name() : null,
        };
    }

    #resolveAction() {
        if (this.#status.name === Status.Sleeping.name) return "Sleeping";
        if (this.#env.chopTree()) {
            console.log(this.#name + ": Chop 1 tree");
            this.#choppedTree = true;
            return "Active";
        }
        return "Waiting";
    }

    synchronise() {
        if (this.#activated) {
            this.#status = new Status("Active");
            this.#activated = false;
            this.#choppedTree = false;
        } else if (this.#choppedTree) {
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
            color: "red",
            number: this.#number.toString(),
        };
    }
}

export default RedBlob;
