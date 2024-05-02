import ProgenitorBlob from "./ProgenitorBlob";

function Selection(props) {
    return (
        <div className="Selection" >
            {props.selection.map((blobList) => {
                return (
                    <ProgenitorBlob
                        blob={blobList[0]}
                        key={blobList[0].id}
                        buy={(oldID, newBlob) =>
                            props.addBlobToSelection(oldID, newBlob)
                        }
                        children={blobList.slice(1)}
                        adjustRepetitions={props.adjustRepetitions}
                        margin={0}
                    />
                );
            })}
        </div>
    );
}

export default Selection;
