// Abstract class
class Blob {
    constructor() {
        if (this.constructor === Blob) {
            throw new Error("Cannot instantiate abstract class blob");
        }
    }

    addParent() {
        throw new Error("Add parent must be implemented");
    }

    // Performs its task, if possible at the time of acting

    act() {
        throw new Error("Act must be implemented");
    }

    // Changes the blob status and prepares it for the next round

    synchronise() {
        throw new Error("Synchronise must be implemented");
    }

    // Reactivates / wakes-up the blob

    restart() {
        throw new Error("Restart must be implemented");
    }

    status() {
        throw new Error("Status must be implemented");
    }

    name() {
        throw new Error("Name must be implemented");
    }

    toJSON() {
        throw new Error("to JSON must be implemented");
    }
}

export default Blob;
