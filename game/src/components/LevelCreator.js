import { useState } from "react";
import DisplayLevelDetails from "./DisplayLevelDetails";
import Simulation from "./Simulation";
import SubmitButton from "./SubmitButton";
import UserInput from "./UserInput";

function LevelCreator(props) {
    const [blobs, setBlobs] = useState([]);

    const load = (newBlobs) => {
        props.env.reset();
        setBlobs(newBlobs);
    };

    return (
        <div className="container">
            <DisplayLevelDetails
                target={props.target}
                env={props.env}
                costs={props.costs}
            />
            <UserInput load={load} env={props.env} />
            <Simulation blobs={blobs} env={props.env} />
            <SubmitButton
                level={props.level}
                email={props.email}
                name={props.name}
                blobs={blobs}
            />
        </div>
    );
}

export default LevelCreator;
