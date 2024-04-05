class Status {
    static Active = new Status("Active");
    static Waiting = new Status("Waiting");
    static Sleeping = new Status("Sleeping");

    constructor(name) {
        this.name = name;
    }
    toString() {
        return `Status.${this.name}`;
    }
}

export default Status;
