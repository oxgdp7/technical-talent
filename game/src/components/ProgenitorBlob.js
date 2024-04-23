import BlobBought from "./BlobBought";

function ProgenitorBlob(props) {
    return (
        <div className="container" key={props.blob.id}>
            <BlobBought
                key={props.blob.id}
                id={props.blob.id}
                color={props.blob.color}
                buy={props.buy}
            />
            {props.children.map((child) => {
                return (
                    <BlobBought
                        key={child.id}
                        id={child.id}
                        color={child.color}
                        buy={props.buy}
                    />
                );
            })}
        </div>
    );
}

export default ProgenitorBlob;
