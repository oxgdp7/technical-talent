import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import BlobToBuy from "./BlobToBuy.js";
import Environment from "../models/Environment.js";
import RedBlob from "../models/blobs/RedBlob.js";
import BlueBlob from "../models/blobs/BlueBlob.js";
import GreenBlob from "../models/blobs/GreenBlob.js";
import OrangeBlob from "../models/blobs/OrangeBlob.js";
import PurpleBlob from "../models/blobs/PurpleBlob.js";
import YellowBlob from "../models/blobs/YellowBlob.js";
import ProgenitorBlob from "./ProgenitorBlob.js";

const BlobList = [
    {
        id: 1,
        color: "red",
    },
    {
        id: 2,
        color: "blue",
    },
    {
        id: 3,
        color: "green",
    },
    {
        id: 4,
        color: "orange",
    },
    {
        id: 5,
        color: "purple",
    },
    {
        id: 6,
        color: "yellow",
    },
];

function BlobDragDrop() {
    const [selection, setSelection] = useState([
        [
            {
                id: "empty0",
                color: "empty",
            },
        ],
    ]);

    const [blobAdded, setBlobAdded] = useState(false);

    useEffect(() => {
        const numberBlobs = (blobList, count) => {
            blobList.forEach((blob) => {
                if (Array.isArray(blob)) {
                    numberBlobs(blob, count);
                } else {
                    blob.id = blob.color + count[blob.color];
                    count[blob.color] += 1;
                }
            });
        };
        const count = {
            red: 0,
            blue: 0,
            green: 0,
            orange: 0,
            purple: 0,
            yellow: 0,
            empty: 0,
        };
        selection.forEach((blobList) => {
            numberBlobs(blobList, count);
        });
        setBlobAdded(false);
    }, [selection, blobAdded]);

    const addBlobToEnd = (selection, blob) => {
        const newRow = [blob];
        if (blob.color === "purple" || blob.color === "yellow") {
            newRow.push({
                id: "newEmptyChild",
                color: "empty",
            });
        }
        return [
            ...selection.slice(0, -1),
            newRow,
            selection[selection.length - 1],
        ];
    };

    const addBlobAsChild = (blobList, oldID, newBlob) => {
        const newList = [];
        for (let i = 0; i < blobList.length; i++) {
            if (Array.isArray(blobList[i])) {
                newList.push(addBlobAsChild(blobList[i], oldID, newBlob));
            } else {
                if (blobList[i].id === oldID) {
                    if (
                        newBlob.color === "purple" ||
                        newBlob.color === "yellow"
                    ) {
                        newList.push([
                            newBlob,
                            {
                                id: "newEmptyChild",
                                color: "empty",
                            },
                        ]);
                    } else {
                        newList.push(newBlob);
                    }
                    if (blobList[0].color === "purple") {
                        newList.push(blobList[i]);
                    }
                } else {
                    newList.push(blobList[i]);
                }
            }
        }
        return newList;
    };

    const addBlobToSelection = (oldID, newBlob) => {
        const blob = {
            id: "newBlob",
            color: newBlob.color,
        };
        if (selection[selection.length - 1][0].id === oldID) {
            setSelection((selection) => addBlobToEnd(selection, blob));
        } else {
            setSelection((selection) => addBlobAsChild(selection, oldID, blob));
        }
        setBlobAdded(true);
    };

    const removeBlobFromSelection = (id) => {
        setSelection((selection) =>
            selection
                .map((blobList) => blobList.filter((blob) => id !== blob.id))
                .filter((blobList) => blobList.length > 0),
        );
    };

    const sell = useDrop(() => ({
        accept: "bought",
        drop: (item) => removeBlobFromSelection(item.id),
    }))[1];

    let navigate = useNavigate();
    const loadButtonPressed = () => {
        localStorage.setItem("blobs", blobString());
        navigate(localStorage.getItem("level"));
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

    const blobString = () => {
        setBlobAdded(true);
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
                            newBlob = new YellowBlob(count[blob.color], 10);
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
        selection.forEach((blobList) => createBlobs(blobList));
        selection.forEach((blobList) => createChildren(blobs, blobList));
        return JSON.stringify(orderedBlobs);
    };

    return (
        <div className="container">
            <div className="shop" ref={sell}>
                {BlobList.map((blob) => {
                    return (
                        <BlobToBuy
                            key={blob.id}
                            id={blob.id}
                            color={blob.color}
                        />
                    );
                })}
            </div>
            <div className="Selection">
                {selection.map((blobList) => {
                    return (
                        <ProgenitorBlob
                            blob={blobList[0]}
                            key={blobList[0].id}
                            buy={(oldID, newBlob) =>
                                addBlobToSelection(oldID, newBlob)
                            }
                            children={blobList.slice(1)}
                            margin={0}
                        />
                    );
                })}
            </div>
            <div className="row mt-3">
                <button
                    type="button"
                    className="btn btn-dark"
                    onClick={loadButtonPressed}
                >
                    Load blobs
                </button>
            </div>
        </div>
    );
}

export default BlobDragDrop;
