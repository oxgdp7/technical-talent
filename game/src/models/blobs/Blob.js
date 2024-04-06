// Abstract class
class Blob {
    constructor() {
        if (this.constructor === Blob) {
            throw new Error("Cannot instantiate abstract class blob");
        }
    }

    act() {
        throw new Error("Act must be implemented");
    }

    synchronise() {
        throw new Error("Synchronise must be implemented");
    }

    restart() {
        throw new Error("Restart must be implemented");
    }

    status() {
        throw new Error("Status must be implemented");
    }

    name() {
        throw new Error("Name must be implemented");
    }
}

export default Blob;
