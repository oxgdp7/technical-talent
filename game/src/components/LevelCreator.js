import { useState } from "react";
import DisplayLevelDetails from "./DisplayLevelDetails";
import Simulation from "./Simulation";
import UserInput from "./UserInput";

function LevelCreator(props) {
    const [blobs, setBlobs] = useState({
        redBlobs: 0,
        blueBlobs: 0,
        greenBlobs: 0,
        orangeBlobs: 0,
    });

    const test = (newBlobs) => {
        setBlobs(newBlobs);
    };

    return (
        <div className="container">
            <DisplayLevelDetails target={props.target} env={props.env} costs={props.costs} />
            <UserInput test={test} />
            <Simulation blobs={blobs} env={props.env} />
        </div>
    );
}

export default LevelCreator;
