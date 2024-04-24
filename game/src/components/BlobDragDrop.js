import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
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

    const sell = useDrop(() => ({
        accept: "bought",
        drop: (item) => removeBlobFromSelection(item.id),
    }))[1];

    let navigate = useNavigate();
    const loadButtonPressed = () => {
        localStorage.setItem("blobs", BoughtBlobsToString(selection));
        navigate(localStorage.getItem("level"));
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
            <BlobShop sell={sell} BlobsToBuy={BlobsToBuy} />
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
        </div>
    );
}

export default BlobDragDrop;
