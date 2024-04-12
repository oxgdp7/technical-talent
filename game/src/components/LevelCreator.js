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
import PurpleBlob from "../models/blobs/PurpleBlob";
import YellowBlob from "../models/blobs/YellowBlob";

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
        let blobsToRepeat = [];
        for (let i = 0; i < blobs.redBlobs; i++) {
            let blob = new RedBlob(i, env);
            currentBlobs.push(blob);
            blobsToRepeat.push(blob);
        }
        for (let i = 0; i < blobs.blueBlobs; i++) {
            let blob = new BlueBlob(i, env);
            currentBlobs.push(blob);
            blobsToRepeat.push(blob);
        }
        for (let i = 0; i < blobs.greenBlobs; i++) {
            let blob = new GreenBlob(i, env);
            currentBlobs.push(blob);
            blobsToRepeat.push(blob);
        }
        for (let i = 0; i < blobs.orangeBlobs; i++) {
            let blob = new OrangeBlob(i, env);
            currentBlobs.push(blob);
            blobsToRepeat.push(blob);
        }
        let purple = new PurpleBlob(0, blobsToRepeat);
        let yellow = new YellowBlob(0, purple, 10);
        currentBlobs.push(purple, yellow);
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
