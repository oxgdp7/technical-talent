import Blob from "./Blob";
import Status from "./Status";

class PurpleBlob extends Blob {
    #name;
    #number;
    #children;
    #numChildren;
    #parent;
    #childrenRestarted;
    #totalRestarted;
    #restartedChild;
    #status;
    #activated;

    constructor(number, children = []) {
        super();
        this.#name = "purple" + number;
        this.#number = number;
        this.#children = children;
        this.#children.forEach((blob) => blob.addParent(this));
        this.#parent = null;
        this.#totalRestarted = 0;
        this.#restartedChild = false;
        this.#numChildren = this.#children.length;
        this.#childrenRestarted = new Array(this.#numChildren).fill(false);
        this.#status = new Status("Active");
        this.#activated = false;
    }

    addParent(parent) {
        this.#parent = parent;
    }

    addChild(child) {
        this.#children.push(child)
        child.addParent(this)
        this.#numChildren = this.#children.length;
        this.#childrenRestarted = new Array(this.#numChildren).fill(false);
    }

    addChildren(children) {
        this.#children = children;
        this.#children.forEach((blob) => blob.addParent(this));
        this.#numChildren = this.#children.length;
        this.#childrenRestarted = new Array(this.#numChildren).fill(false);
    }
    /* The purple blob wakes up each of its 'children' once and then goes
     * to sleep */

    act() {
        const result = this.#resolveAction();
        return {
            color: "purple",
            number: this.#number,
            status: result[0],
            restarted: result[1],
            children: this.#listChildren(),
            parent: this.#parent ? this.#parent.name() : null,
        };
    }

    #resolveAction() {
        if (this.#totalRestarted >= this.#numChildren)
            return ["Sleeping", null];
        for (let i = 0; i < this.#numChildren; i++) {
            if (this.#checkCanRestart(i)) {
                console.log(
                    this.#name + ": Restarts " + this.#children[i].name(),
                );
                this.#children[i].restart();
                this.#childrenRestarted[i] = true;
                this.#totalRestarted++;
                this.#restartedChild = true;
                return ["Active", this.#children[i].name()];
            }
        }
        this.#restartedChild = false;
        return ["Waiting", null];
    }

    #listChildren() {
        return this.#children.map((blob) => blob.name());
    }

    #checkCanRestart(i) {
        if (this.#childrenRestarted[i]) {
            return false;
        }
        return this.#children[i].status().name === Status.Sleeping.name;
    }

    synchronise() {
        if (this.#activated) {
            this.#status = new Status("Active");
            this.#activated = false;
        } else if (this.#totalRestarted === this.#numChildren) {
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
        if (this.#totalRestarted !== this.#numChildren) {
            throw new Error("Child has not done all of its repeats");
        }
        this.#childrenRestarted = new Array(this.#numChildren).fill(false);
        this.#totalRestarted = 0;
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
            color: "purple",
            number: this.#number.toString(),
            children: this.#children.map((child) => child.name()),
        };
    }
}

export default PurpleBlob;
