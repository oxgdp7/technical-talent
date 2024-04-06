import { useState } from "react";
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
            <UserInput test={test} />
            <Simulation blobs={blobs} env={props.env} />
        </div>
    );
}

export default LevelCreator;
