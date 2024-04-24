import Environment from "../models/Environment.js";
import RedBlob from "../models/blobs/RedBlob.js";
import BlueBlob from "../models/blobs/BlueBlob.js";
import GreenBlob from "../models/blobs/GreenBlob.js";
import OrangeBlob from "../models/blobs/OrangeBlob.js";
import PurpleBlob from "../models/blobs/PurpleBlob.js";
import YellowBlob from "../models/blobs/YellowBlob.js";

function BoughtBlobsToString(selection) {
    const createBlobs = (blobList) => {
        blobList.forEach((blob) => {
            if (Array.isArray(blob)) {
                createBlobs(blob);
            } else {
                let newBlob = null;
                switch (blob.color) {
                    case "red":
                        newBlob = new RedBlob(count[blob.color], env);
                        break;
                    case "blue":
                        newBlob = new BlueBlob(count[blob.color], env);
                        break;
                    case "green":
                        newBlob = new GreenBlob(count[blob.color], env);
                        break;
                    case "orange":
                        newBlob = new OrangeBlob(count[blob.color], env);
                        break;
                    case "purple":
                        newBlob = new PurpleBlob(count[blob.color]);
                        break;
                    case "yellow":
                        // TODO: Change from 10 to a number
                        // also currently adding a yellow with no child causes an error
                        newBlob = new YellowBlob(
                            count[blob.color],
                            blob.repetitions,
                        );
                        break;
                    case "empty":
                        break;
                    default:
                        throw new Error("Invalid color" + blob.color);
                }
                if (blob.color !== "empty") {
                    orderedBlobs.push(newBlob);
                    blobs[blob.color].push(newBlob);
                    count[blob.color] += 1;
                }
            }
        });
    };
    const createChildren = (blobs, blobList) => {
        if (blobList.length > 1) {
            const parent =
                blobs[blobList[0].color][
                    blobList[0].id.replace(blobList[0].color, "")
                ];
            for (let i = 1; i < blobList.length; i++) {
                if (Array.isArray(blobList[i])) {
                    parent.addChild(
                        blobs[blobList[i][0].color][
                            blobList[i][0].id.replace(blobList[i][0].color, "")
                        ],
                    );
                    createChildren(blobs, blobList[i]);
                } else {
                    if (blobList[i].color !== "empty") {
                        parent.addChild(
                            blobs[blobList[i].color][
                                blobList[i].id.replace(blobList[i].color, "")
                            ],
                        );
                    }
                }
            }
        }
    };

    // Just to create the classes
    const env = new Environment(0, 0);
    let orderedBlobs = [];
    const count = {
        red: 0,
        blue: 0,
        green: 0,
        orange: 0,
        purple: 0,
        yellow: 0,
    };
    const blobs = {
        red: [],
        blue: [],
        green: [],
        orange: [],
        purple: [],
        yellow: [],
    };
    selection.forEach((blobList) => createBlobs(blobList));
    selection.forEach((blobList) => createChildren(blobs, blobList));
    return JSON.stringify(orderedBlobs);
}

export default BoughtBlobsToString;
