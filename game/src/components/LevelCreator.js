import { useState } from "react";
import RedBlob from "../models/blobs/RedBlob";
import BlueBlob from "../models/blobs/BlueBlob";
import GreenBlob from "../models/blobs/GreenBlob";
import OrangeBlob from "../models/blobs/OrangeBlob";
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
    const env = new Environment();
    const createBlobs = () => {
        let currentBlobs = [];
        for (let i = 0; i < blobs.redBlobs; i++) {
            currentBlobs.push(new RedBlob(i, env));
        }
        for (let i = 0; i < blobs.blueBlobs; i++) {
            currentBlobs.push(new BlueBlob(i, env));
        }
        for (let i = 0; i < blobs.greenBlobs; i++) {
            currentBlobs.push(new GreenBlob(i, env));
        }
        for (let i = 0; i < blobs.orangeBlobs; i++) {
            currentBlobs.push(new OrangeBlob(i, env));
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
                level={props.level}
                email={props.email}
                name={props.name}
                blobs={createBlobs()}
            />
        </div>
    );
}

export default LevelCreator;
