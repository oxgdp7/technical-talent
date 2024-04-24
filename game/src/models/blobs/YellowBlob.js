import Blob from "./Blob";
import Status from "./Status";

class YellowBlob extends Blob {
    #name;
    #number;
    #child;
    #parent;
    #neededRestarts;
    #completedRestarts;
    #restartedChild;
    #status;
    #activated;

    constructor(number, repetitions, child = null) {
        super();
        this.#name = "yellow" + number;
        this.#number = number;
        this.#child = child;
        if (this.#child !== null) this.#child.addParent(this);
        this.#parent = null;
        this.#neededRestarts = repetitions;
        this.#completedRestarts = 0;
        this.#restartedChild = false;
        this.#status = new Status("Active");
        this.#activated = false;
    }

    addParent(parent) {
        this.#parent = parent;
    }

    addChild(child) {
        this.#child = child;
        this.#child.addParent(this);
    }

    /* The yellow blob will wake up its 'child' child #repetitions times and
     * then go to sleep */

    act() {
        return {
            color: "blue",
            number: this.#number,
            status: this.#resolveAction(),
            parent: this.#parent ? this.#parent.name() : null,
        };
    }

    #resolveAction() {
        if (this.#completedRestarts >= this.#neededRestarts) return "Sleeping";
        if (this.#child.status().name === Status.Sleeping.name) {
            console.log(this.#name + ": Restarts " + this.#child.name());
            this.#child.restart();
            this.#completedRestarts++;
            this.#restartedChild = true;
            return "Active";
        }
        return "Waiting";
    }

    synchronise() {
        if (this.#activated) {
            this.#status = new Status("Active");
            this.#activated = false;
        } else if (this.#completedRestarts === this.#neededRestarts) {
            this.#status = new Status("Sleeping");
        } else if (this.#restartedChild) {
            this.#status = new Status("Active");
        } else {
            this.#status = new Status("Waiting");
        }
        this.#restartedChild = false;
        console.log(this.#name + ": Status = " + this.#status);
    }

    restart() {
        if (this.#status.name !== Status.Sleeping.name) {
            throw new Error(
                "Child should not be restarted if it is not sleeping",
            );
        }
        if (this.#neededRestarts !== this.#completedRestarts) {
            throw new Error("Child has not done all of its repeats");
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

    toJSON() {
        return {
            color: "yellow",
            number: this.#number.toString(),
            child: this.#child.name(),
            repetitions: this.#neededRestarts,
        };
    }
}

export default YellowBlob;
