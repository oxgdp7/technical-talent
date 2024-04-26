import { useEffect, useState } from "react";
import BlobList from "./BlobList";
import Environment from "../models/Environment";
import EnvironmentDisplay from "./EnvironmentDisplay";
import SimulateRound from "../models/SimulateRound";

function Simulation(props) {
    // Re renders the component once all of the blobs have acted
    const [rerender, setRerender] = useState(false);
    const [env, setEnv] = useState(new Environment(0, 0));
    const [blobs, setBlobs] = useState([]);

    useEffect(() => {
        setEnv(props.env);
    }, [props.env]);

    useEffect(() => {
        setBlobs(props.blobs);
    }, [props.blobs]);

    useEffect(() => {
        setRerender(false);
    }, [rerender]);

    const startButtonPressed = () => {
        console.log(SimulateRound(blobs, env));
        setRerender(true);
    };

    return (
        <div className="Container">
            <h1>Simulation</h1>
            <BlobList blobs={blobs} status={true}/>
            <EnvironmentDisplay
                trees={env.trees()}
                water={env.waterFlow()}
                woodCollected={env.woodCollected()}
                waterCollected={env.waterCollected()}
            />
            <div className="row mt-3">
                <button
                    type="button"
                    className="btn btn-dark"
                    onClick={startButtonPressed}
                >
                    Start next round
                </button>
            </div>
        </div>
    );
}

export default Simulation;
