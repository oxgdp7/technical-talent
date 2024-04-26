import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import ChildlessError from "../utils/ChildlessError.js";
import NegativeValueError from "../utils/NegativeValueError.js";
import BlobShop from "./BlobShop.js";
import Selection from "./Selection.js";
import BoughtBlobsToString from "../utils/BoughtBlobsToString.js";
import AddBlobToSelection from "../utils/AddBlobToSelection.js";

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

function BlobDragDrop() {
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

    // Renumbers all the blobs
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

    // Buy a blob and add it to the display
    const addBlobToSelection = (oldID, newBlob) => {
        setSelection((selection) =>
            AddBlobToSelection(selection, oldID, newBlob),
        );
        setBlobAdded(true);
    };

    // TODO: Fix for when blob has children
    const removeBlobFromSelection = (id) => {
        setSelection((selection) =>
            selection
                .map((blobList) => blobList.filter((blob) => id !== blob.id))
                .filter((blobList) => blobList.length > 0),
        );
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
    };

    return (
        <div className="container">
            <BlobShop sell={sell} BlobsToBuy={BlobsToBuy} reset={reset} />
            <Selection
                selection={selection}
                addBlobToSelection={addBlobToSelection}
                adjustRepetitions={adjustRepetitions}
            />
            <div className="row mt-3">
                <button
                    type="button"
                    className="btn btn-dark"
                    onClick={loadButtonPressed}
                >
                    Load blobs
                </button>
            </div>
            <h1>{errorMessage ? errorMessage : null}</h1>
        </div>
    );
}

export default BlobDragDrop;
