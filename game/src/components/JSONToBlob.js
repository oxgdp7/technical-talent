import RedBlob from "../models/blobs/RedBlob.js";
import BlueBlob from "../models/blobs/BlueBlob.js";
import GreenBlob from "../models/blobs/GreenBlob.js";
import OrangeBlob from "../models/blobs/OrangeBlob.js";
import PurpleBlob from "../models/blobs/PurpleBlob.js";
import YellowBlob from "../models/blobs/YellowBlob.js";

function JSONToBlob(blobsJSON, env) {
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

    if (!blobsJSON) return [];
    const orderedBlobs = [];
    const blobs = {};
    blobsJSON.forEach((blobJSON) => {
        const newBlob = loadBlob(blobJSON, env);
        orderedBlobs.push(newBlob);
        blobs[blobJSON["color"] + blobJSON["number"].toString()] = newBlob;
    });
    blobsJSON.forEach((blobJSON) => {
        addChildren(blobs, blobJSON);
    });
    return orderedBlobs;
}

export default JSONToBlob;
