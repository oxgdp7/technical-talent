import BlobToBuy from "./BlobToBuy";

function BlobShop(props) {
    return (
        <div className="container">
            <div
                className="shop"
                ref={props.sell}
                style={{
                    position: "fixed",
                    top: 50,
                    left: "8%",
                    width: "84vw",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "lightblue",
                }}
            >
                {props.BlobsToBuy.map((blob) => {
                    return (
                        <BlobToBuy
                            key={blob.id}
                            id={blob.id}
                            color={blob.color}
                            buy={props.buy}
                        />
                    );
                })}
                <button
                    type="button"
                    className="btn btn-dark"
                    onClick={props.reset}
                >
                    Reset
                </button>
                <label
                    style={{
                        margin: "20px",
                        color: props.totalCost > props.budget ? "red" : "black",
                    }}
                >
                    Spent: {props.totalCost} / {props.budget}
                </label>
            </div>
        </div>
    );
}

export default BlobShop;
