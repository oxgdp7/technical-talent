import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Levels from "../models/Levels";
import BlobList from "./BlobList";
import DisplayLevelDetails from "./DisplayLevelDetails";
import JSONToBlob from "./JSONToBlob";
import SubmitButton from "./SubmitButton";

function LevelCreator(props) {
    const [blobs, setBlobs] = useState([]);

    const level = Levels(props.level);
    const env = level.env;
    localStorage.setItem("level", props.level);

    let navigate = useNavigate();
    const shop = () => {
        navigate("/shop");
    };
    const animation = () => {
        navigate("/animation");
    };

    useEffect(() => {
        const blobsJSON = JSON.parse(localStorage.getItem("blobs"));
        setBlobs(JSONToBlob(blobsJSON, env));
    }, []);

    return (
        <div className="container">
            <DisplayLevelDetails
                target={level.target}
                env={env}
                costs={level.costs}
                marginTop={"30px"}
            />
            <div className="container">
                <button type="button" className="btn btn-dark" onClick={shop}>
                    Shop
                </button>
            </div>
            <BlobList blobs={blobs} />
            <div className="container">
                <button
                    type="button"
                    className="btn btn-dark"
                    onClick={animation}
                >
                    Animation
                </button>
            </div>
            <SubmitButton level={props.level} blobs={blobs} />
        </div>
    );
}

export default LevelCreator;
