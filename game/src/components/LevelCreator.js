import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Levels from "../models/Levels";
import DisplayLevelDetails from "./DisplayLevelDetails";
import Simulation from "./Simulation";
import SubmitButton from "./SubmitButton";
import UserInput from "./UserInput";
import JSONToBlob from "./JSONToBlob";

function LevelCreator(props) {
    const [blobs, setBlobs] = useState([]);

    const level = Levels(props.level);
    const env = level.env

    const load = (newBlobs) => {
        env.reset();
        setBlobs(newBlobs);
    };

    let navigate = useNavigate();
    const shop = () => {
        localStorage.setItem("level", "1");
        navigate("/shop");
    };
    const animation = () => {
        navigate("/animation");
    };

    useEffect(() => {
        const blobsJSON = JSON.parse(localStorage.getItem("blobs"));
        setBlobs(JSONToBlob(blobsJSON, env))
    }, []);

    return (
        <div className="container">
            <DisplayLevelDetails
                target={level.target}
                env={env}
                costs={level.costs}
            />
            <button type="button" className="btn btn-dark" onClick={shop}>
                Shop
            </button>
            <button type="button" className="btn btn-dark" onClick={animation}>
                Animation
            </button>
            <UserInput load={load} env={env} />
            <Simulation blobs={blobs} env={env} />
            <SubmitButton level={level.level} blobs={blobs} />
        </div>
    );
}

export default LevelCreator;
