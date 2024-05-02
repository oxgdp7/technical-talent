import DisplayBlobCosts from "./DisplayBlobCosts";

function DisplayLevelDetails(props) {
    const redBlob = {
        color: "Red",
        cost: props.costs.red,
    };
    const blueBlob = {
        color: "Blue",
        cost: props.costs.blue,
    };
    const greenBlob = {
        color: "Green",
        cost: props.costs.green,
    };
    const orangeBlob = {
        color: "Orange",
        cost: props.costs.orange,
    };
    const purpleBlob = {
        color: "Purple",
        cost: props.costs.purple,
    };
    const yellowBlob = {
        color: "Yellow",
        cost: props.costs.yellow,
    };
    const blobs = [
        redBlob,
        blueBlob,
        greenBlob,
        orangeBlob,
        purpleBlob,
        yellowBlob,
    ];

    return (
        <div className="container">
            <p
                style={{
                    marginTop: props.marginTop ? props.marginTop : null,
                }}
            >
                You need to get {props.target.wood} wood and{" "}
                {props.target.water} water. At the start, there are{" "}
                {props.env.trees()} trees and {props.env.waterFlow()} units of
                water flow every round. The prices of the blobs are as listed
                below:
            </p>
            <DisplayBlobCosts blobs={blobs} />
        </div>
    );
}

export default DisplayLevelDetails;
