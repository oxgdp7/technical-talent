import { useEffect, useState } from "react";
import BlobList from "./BlobList";
import RedBlob from "./blobs/RedBlob";
import BlueBlob from "./blobs/BlueBlob";
import GreenBlob from "./blobs/GreenBlob";
import OrangeBlob from "./blobs/OrangeBlob";
import Environment from "./Environment";
import EnvironmentDisplay from "./EnvironmentDisplay";
import PurpleBlob from "./blobs/PurpleBlob";
import YellowBlob from "./blobs/YellowBlob";

function Simulation(props) {
    const [blobs, setBlobs] = useState([]);
    const [env, setEnv] = useState(new Environment(0, 0));
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        setEnv(new Environment(20, 5));
    }, [props.blobs]);

    useEffect(() => {
        let currentBlobs = [];
        for (let i = 0; i < props.blobs.redBlobs; i++) {
            currentBlobs.push(new RedBlob(i, env));
        }
        for (let i = 0; i < props.blobs.blueBlobs; i++) {
            currentBlobs.push(new BlueBlob(i, env));
        }
        for (let i = 0; i < props.blobs.greenBlobs; i++) {
            currentBlobs.push(new GreenBlob(i, env));
        }
        for (let i = 0; i < props.blobs.orangeBlobs; i++) {
            currentBlobs.push(new OrangeBlob(i, env));
        }
        //To test purple and yellow blobs
        //const purple0 = new PurpleBlob("0", currentBlobs)
        //currentBlobs.push(purple0);
        //currentBlobs.push(new YellowBlob("0", purple0, 5))
        setBlobs(currentBlobs);
    }, [props.blobs, env]);

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
