import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Levels from "../models/Levels";
import DisplayLevelDetails from "./DisplayLevelDetails";
import Simulation from "./Simulation";
import SubmitButton from "./SubmitButton";
import UserInput from "./UserInput";
import RedBlob from "../models/blobs/RedBlob.js";
import BlueBlob from "../models/blobs/BlueBlob.js";
import GreenBlob from "../models/blobs/GreenBlob.js";
import OrangeBlob from "../models/blobs/OrangeBlob.js";
import PurpleBlob from "../models/blobs/PurpleBlob.js";
import YellowBlob from "../models/blobs/YellowBlob.js";

function LevelCreator(props) {
    const [blobs, setBlobs] = useState([]);

    const level = Levels(props.level)

    const load = (newBlobs) => {
        level.env.reset();
        setBlobs(newBlobs);
    };

    let navigate = useNavigate();
    const shop = () => {
        localStorage.setItem("level", "/level1");
        navigate("/shop");
    };

    const loadBlob = (blob, env) => {
        switch (blob["color"]) {
            case "red":
                return new RedBlob(blob["number"], env);
            case "blue":
                return new BlueBlob(blob["number"], env);
            case "green":
                return new GreenBlob(blob["number"], env);
            case "orange":
                return new OrangeBlob(blob["number"], env);
            case "purple":
                return new PurpleBlob(blob["number"]);
            case "yellow":
                return new YellowBlob(
                    blob["number"],
                    parseInt(blob["repetitions"], 10),
                );
            default:
                throw new Error("Invalid blob color");
        }
    };

    const addChildren = (blobs, parent) => {
        if (parent["children"]) {
            parent["children"].forEach((child) =>
                blobs[parent["color"] + parent["number"].toString()].addChild(
                    blobs[child],
                ),
            );
        } else if (parent["child"]) {
            blobs[parent["color"] + parent["number"].toString()].addChild(
                blobs[parent["child"]],
            );
        }
    };

    useEffect(() => {
        const blobsJSON = JSON.parse(localStorage.getItem("blobs"));
        if (blobsJSON) {
            const orderedBlobs = [];
            const blobs = {};
            blobsJSON.forEach((blobJSON) => {
                const newBlob = loadBlob(blobJSON, level.env);
                orderedBlobs.push(newBlob);
                blobs[blobJSON["color"] + blobJSON["number"].toString()] =
                    newBlob;
            });
            blobsJSON.forEach((blobJSON) => {
                addChildren(blobs, blobJSON);
            });
            setBlobs(orderedBlobs);
        }
    }, [level.env]);

    return (
        <div className="container">
            <DisplayLevelDetails
                target={level.target}
                env={level.env}
                costs={level.costs}
            />
            <button type="button" className="btn btn-dark" onClick={shop}>
                shop
            </button>
            <UserInput load={load} env={level.env} />
            <Simulation blobs={blobs} env={level.env} />
            <SubmitButton level={level.level} blobs={blobs} />
        </div>
    );
}

export default LevelCreator;
