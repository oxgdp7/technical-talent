import Blob from "./Blob";
import Status from "./Status";

class YellowBlob extends Blob {
    #name;
    #blob;
    #neededRestarts;
    #completedRestarts;
    #restartedBlob;
    #status;
    #activated;

    constructor(name, blob, repetitions) {
        super();
        this.#name = "Yellow" + name;
        this.#blob = blob;
        this.#neededRestarts = repetitions;
        this.#completedRestarts = 0;
        this.#restartedBlob = false;
        this.#status = new Status("Active");
        this.#activated = false;
    }

    /* The yellow blob will wake up its 'child' blob #repetitions times and
     * then go to sleep */

    act() {
        if (this.#completedRestarts >= this.#neededRestarts) {
            return false;
        }
        console.log("Test");
        if (this.#blob.status().name === Status.Sleeping.name) {
            console.log(this.#name + ": Restarts " + this.#blob.name());
            this.#blob.restart();
            this.#completedRestarts++;
            this.#restartedBlob = true;
            return true;
        }
        return false;
    }

    synchronise() {
        if (this.#activated) {
            this.#status = new Status("Active");
            this.#activated = false;
        } else if (this.#completedRestarts === this.#neededRestarts) {
            this.#status = new Status("Sleeping");
        } else if (this.#restartedBlob) {
            this.#status = new Status("Active");
        } else {
            this.#status = new Status("Waiting");
        }
        this.#restartedBlob = false;
        console.log(this.#name + ": Status = " + this.#status);
    }

    restart() {
        if (this.#status.name !== Status.Sleeping.name) {
            throw new Error(
                "Blob should not be restarted if it is not sleeping",
            );
        }
        if (this.#neededRestarts !== this.#completedRestarts) {
            throw new Error("Blob has not done all of its repeats");
        }
        this.#completedRestarts = 0;
        this.#activated = true;
    }

    status() {
        return this.#status;
    }

    name() {
        return this.#name;
    }
}

export default YellowBlob;
