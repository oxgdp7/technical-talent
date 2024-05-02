import BlobBought from "./BlobBought";

function ProgenitorBlob(props) {
    return (
        <div className="container" key={props.blob.id}>
            <BlobBought
                key={props.blob.id}
                id={props.blob.id}
                color={props.blob.color}
                repetitions={props.blob.repetitions}
                buy={props.buy}
                adjustRepetitions={(e) => props.adjustRepetitions(props.blob.id, e)}
                margin={props.margin}
            />
            <div></div>
            {props.children.map((child) => {
                if (Array.isArray(child)) {
                    return (
                        <ProgenitorBlob
                            blob={child[0]}
                            key={child[0].id}
                            buy={(oldID, newBlob) => props.buy(oldID, newBlob)}
                            children={child.slice(1)}
                            adjustRepetitions={props.adjustRepetitions}
                            margin={props.margin + 100}
                        />
                    );
                } else {
                    return (
                        <span key={child.id}>
                            <BlobBought
                                key={child.id}
                                id={child.id}
                                repetitions={child.repetitions}
                                color={child.color}
                                buy={props.buy}
                                adjustRepetitions={(e) => props.adjustRepetitions(child.id, e)}
                                margin={props.margin ? props.margin + 100 : 100}
                            />
                            <div></div>
                        </span>
                    );
                }
            })}
        </div>
    );
}

export default ProgenitorBlob;
