import Blob from "./Blob";
import Status from "./Status";

class BlueBlob extends Blob {
    #name;
    #collectedWater;
    #status;
    #activated;
    #env;

    constructor(name, env) {
        super();
        this.#name = "Blue" + name;
        this.#collectedWater = false;
        this.#status = new Status("Active");
        this.#activated = false;
        this.#env = env;
    }

    act() {
        if (
            this.#status.name !== Status.Sleeping.name &&
            this.#env.collectWater()
        ) {
            console.log(this.#name + ": Collect 1 water");
            this.#collectedWater = true;
            return true;
        }
        return false;
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
}

export default BlueBlob;