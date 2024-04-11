import Blob from "./Blob";
import Status from "./Status";

class BlueBlob extends Blob {
    #name;
    #number;
    #collectedWater;
    #status;
    #activated;
    #env;

    constructor(number, env) {
        super();
        this.#name = "Blue" + number;
        this.#number = number;
        this.#collectedWater = false;
        this.#status = new Status("Active");
        this.#activated = false;
        this.#env = env;
    }

    /* The blue blob collects 1 bucket of water if it can */

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

    toJSON() {
        return {
            color: "blue",
            number: this.#number,
        };
    }
}

export default BlueBlob;
