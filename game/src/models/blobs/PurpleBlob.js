import Blob from "./Blob";
import Status from "./Status";

class PurpleBlob extends Blob {
    #name;
    #number;
    #blobs;
    #numBlobs;
    #blobsRestarted;
    #totalRestarted;
    #restartedBlob;
    #status;
    #activated;

    constructor(number, blobs) {
        super();
        this.#name = "purple" + number;
        this.#number = number;
        this.#blobs = blobs;
        this.#numBlobs = this.#blobs.length;
        this.#blobsRestarted = new Array(this.#numBlobs).fill(false);
        this.#totalRestarted = 0;
        this.#restartedBlob = false;
        this.#status = new Status("Active");
        this.#activated = false;
    }

    /* The purple blob wakes up each of its 'children' once and then goes
     * to sleep */

    act() {
        let foundBlob = false;
        if (this.#totalRestarted < this.#numBlobs) {
            let i = 0;
            while (i < this.#numBlobs && !foundBlob) {
                if (this.#checkCanRestart(i)) {
                    console.log(
                        this.#name + ": Restarts " + this.#blobs[i].name(),
                    );
                    this.#blobs[i].restart();
                    this.#blobsRestarted[i] = true;
                    this.#totalRestarted++;
                    foundBlob = true;
                }
                i++;
            }
            this.#restartedBlob = foundBlob;
        }
        return foundBlob;
    }

    #checkCanRestart(i) {
        if (this.#blobsRestarted[i]) {
            return false;
        }
        return this.#blobs[i].status().name === Status.Sleeping.name;
    }

    synchronise() {
        if (this.#activated) {
            this.#status = new Status("Active");
            this.#activated = false;
        } else if (this.#totalRestarted === this.#numBlobs) {
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
        if (this.#totalRestarted !== this.#numBlobs) {
            throw new Error("Blob has not done all of its repeats");
        }
        this.#blobsRestarted = new Array(this.#numBlobs).fill(false);
        this.#totalRestarted = 0;
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
            color: "purple",
            number: this.#number.toString(),
            children: this.#blobs.map((child) => child.name()),
        };
    }
}

export default PurpleBlob;
