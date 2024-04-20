import { useEffect, useState } from "react";
import BlobList from "./BlobList";
import Environment from "../models/Environment";
import EnvironmentDisplay from "./EnvironmentDisplay";

function Simulation(props) {
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
        simulationAct(env);
        simulationSynchronise();
        setRerender(true);
    };

    const simulationAct = () => {
        blobs.forEach((blob) => blob.act());
    };

    const simulationSynchronise = () => {
        blobs.forEach((blob) => blob.synchronise());
        env.synchronise();
    };

    return (
        <div className="Container">
            <h1>Simulation</h1>
            <BlobList blobs={blobs} />
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
