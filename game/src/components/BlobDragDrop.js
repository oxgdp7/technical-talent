import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import ChildlessError from "../utils/ChildlessError.js";
import NegativeValueError from "../utils/NegativeValueError.js";
import BlobShop from "./BlobShop.js";
import Selection from "./Selection.js";
import BoughtBlobsToString from "../utils/BoughtBlobsToString.js";
import AddBlobToSelection from "../utils/AddBlobToSelection.js";
import Levels from "../models/Levels.js";

// Sets up the shop blobs
const BlobsToBuy = [
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

function BlobDragDrop(props) {
    // Blobs that have been 'purchased'
    const [selection, setSelection] = useState([
        [
            {
                id: "empty0",
                color: "empty",
            },
        ],
    ]);

    const [blobAdded, setBlobAdded] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const [totalCost, setTotalCost] = useState(0);

    const level = Levels(localStorage.getItem("level"));

    // Renumbers all the blobs, recalculates cost
    useEffect(() => {
        const numberBlobs = () => {
            const numberBlobList = (blobList, count) => {
                blobList.forEach((blob) => {
                    if (Array.isArray(blob)) {
                        numberBlobList(blob, count);
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
                numberBlobList(blobList, count);
            });
        };

        const calculateBlobs = () => {
            let cost = 0;
            const calculateBlobList = (blobList) => {
                blobList.forEach((blob) => {
                    if (Array.isArray(blob)) {
                        calculateBlobList(blob);
                    } else {
                        if (blob.color === "purple") {
                            if (blobList.length !== 1) {
                                cost += level["costs"][blob.color].cost(
                                    blobList.length,
                                );
                            }
                        } else if (blob.color === "yellow") {
                            if (blob.repetitions >= 1) {
                                cost += level["costs"][blob.color].cost(
                                    blob.repetitions,
                                );
                            }
                        } else if (blob.color !== "empty") {
                            cost += level["costs"][blob.color].cost();
                        }
                    }
                });
            };

            selection.forEach((blobList) => {
                calculateBlobList(blobList);
            });
            setTotalCost(cost);
        };

        numberBlobs();
        calculateBlobs();
        setBlobAdded(false);
    }, [selection, blobAdded, level]);

    // Buy a blob and add it to the display
    const addBlobToSelection = (oldID, newBlob) => {
        setSelection((selection) =>
            AddBlobToSelection(selection, oldID, newBlob),
        );
        setBlobAdded(true);
    };

    const removeBlobFromSelection = (id) => {
        const recursiveDeletion = (blobList) => {
            if (blobList[0].id === id) {
                return [];
            }
            let newList = blobList.filter(
                (blob) =>
                    (Array.isArray(blob) && blob[0].id !== id) ||
                    blob.id !== id,
            );
            newList.forEach((blob) => {
                if (Array.isArray(blob)) {
                    recursiveDeletion(blob);
                }
            });
            newList.filter((blobList) => blobList.length > 0);
            return newList;
        };
        const removeFromSelection = (selection) => {
            let newSelection = selection.map((blobList) =>
                recursiveDeletion(blobList),
            );
            if (!newSelection) {
                return [
                    [
                        {
                            id: "empty0",
                            color: "empty",
                        },
                    ],
                ];
            }
            return newSelection.filter((blobList) => blobList.length > 0);
        };
        setSelection((selection) => removeFromSelection(selection));
        setBlobAdded(true);
    };

    const reset = () =>
        setSelection([
            [
                {
                    id: "empty0",
                    color: "empty",
                },
            ],
        ]);

    const sell = useDrop(() => ({
        accept: "bought",
        drop: (item) => removeBlobFromSelection(item.id),
    }))[1];

    let navigate = useNavigate();
    const loadButtonPressed = () => {
        try {
            localStorage.setItem("blobs", BoughtBlobsToString(selection));
            navigate("/level" + localStorage.getItem("level"));
        } catch (e) {
            if (e instanceof ChildlessError) {
                setErrorMessage("Ensure all yellow blobs have a child");
            } else if (e instanceof NegativeValueError) {
                setErrorMessage(
                    "Ensure all yellow blobs have positive repetitions",
                );
            } else {
                setErrorMessage("Unknown error");
            }
        }
    };

    // Changes how many times a yellow blob is repeated
    const adjustRepetitions = (blobID, newVal) => {
        const adjustList = (blobList, blobID, newVal) => {
            blobList.forEach((blob) => {
                if (Array.isArray(blob)) {
                    adjustList(blob);
                } else {
                    if (blob.id === blobID) {
                        blob.repetitions = newVal;
                    }
                }
            });
        };
        selection.forEach((blobList) => adjustList(blobList, blobID, newVal));
        // Recalculates total cost
        setBlobAdded(true)
    };

    return (
        <div className="container">
            <BlobShop
                sell={sell}
                BlobsToBuy={BlobsToBuy}
                reset={reset}
                buy={(newBlob) =>
                    addBlobToSelection(
                        selection[selection.length - 1][0].id,
                        newBlob,
                    )
                }
                budget={props.budget}
                totalCost={totalCost}
            />
            <Selection
                selection={selection}
                addBlobToSelection={addBlobToSelection}
                adjustRepetitions={adjustRepetitions}
            />
            <h1>{errorMessage ? errorMessage : null}</h1>
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
