function AddBlobToSelection(selection, oldID, newBlob) {
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

    // TODO: only yellow blobs have repetitions
    const blob = {
        id: "newBlob",
        color: newBlob.color,
        repetitions: 1,
    };
    if (selection[selection.length - 1][0].id === oldID) {
        return addBlobToEnd(selection, blob);
    } else {
        return addBlobAsChild(selection, oldID, blob);
    }
}

export default AddBlobToSelection;
