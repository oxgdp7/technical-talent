import BlobToBuy from "./BlobToBuy";

function BlobShop(props) {
    return (
        <div className="container">
            <div
                height="50px"
                style={{
                    position: "fixed",
                    top: 29.5,
                    width: "80vw",
                    height: "50px",
                    backgroundColor: "white",
                }}
            ></div>
            <div
                className="shop"
                ref={props.sell}
                style={{
                    position: "fixed",
                    top: 50,
                    width: "80vw",
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
            </div>
        </div>
    );
}

export default BlobShop;
