import { useState } from "react";
import RedBlob from "../models/blobs/RedBlob";
import Environment from "../models/Environment";
import DisplayLevelDetails from "./DisplayLevelDetails";
import Simulation from "./Simulation";
import SubmitButton from "./SubmitButton";
import UserInput from "./UserInput";

function LevelCreator(props) {
    const [blobs, setBlobs] = useState({
        redBlobs: 0,
        blueBlobs: 0,
        greenBlobs: 0,
        orangeBlobs: 0,
    });

    // TODO: Fix all of this
    // Currently just set up to test sending data to the server
    const env = new Environment()
    const createBlobs = () => {
        let currentBlobs = [];
        for (let i = 0; i < blobs.redBlobs; i++) {
            currentBlobs.push(new RedBlob(i, env));
        }
        return currentBlobs;
    };

    const test = (newBlobs) => {
        setBlobs(newBlobs);
    };

    return (
        <div className="container">
            <DisplayLevelDetails
                target={props.target}
                env={props.env}
                costs={props.costs}
            />
            <UserInput test={test} />
            <Simulation blobs={blobs} env={props.env} />
            <SubmitButton
                email={props.email}
                name={props.name}
                blobs={createBlobs()}
            />
        </div>
    );
}

export default LevelCreator;
