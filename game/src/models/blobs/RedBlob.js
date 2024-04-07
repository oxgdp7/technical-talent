import Blob from "./Blob";
import Status from "./Status";

class RedBlob extends Blob {
    #name;
    #choppedTree;
    #status;
    #activated;
    #env;

    constructor(name, env) {
        super();
        this.#name = "Red" + name;
        this.#choppedTree = false;
        this.#status = new Status("Active");
        this.#activated = false;
        this.#env = env;
    }

    /* The red blob chops 1 tree if it can */

    act() {
        if (
            this.#status.name !== Status.Sleeping.name &&
            this.#env.chopTree()
        ) {
            console.log(this.#name + ": Chop 1 tree");
            this.#choppedTree = true;
            return true;
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

export default RedBlob;
