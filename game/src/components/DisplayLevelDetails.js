import DisplayBlobCosts from "./DisplayBlobCosts";

function DisplayTargets(props) {
    const redBlob = {
        color: "Red",
        cost: props.costs.redBlob,
    };
    const blueBlob = {
        color: "Blue",
        cost: props.costs.blueBlob,
    };
    const greenBlob = {
        color: "Green",
        cost: props.costs.greenBlob,
    };
    const orangeBlob = {
        color: "Orange",
        cost: props.costs.orangeBlob,
    };
    const purpleBlob = {
        color: "Purple",
        cost: props.costs.purpleBlob,
    };
    const yellowBlob = {
        color: "Yellow",
        cost: props.costs.yellowBlob,
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
            <p>
                You need to get {props.target.wood} wood and{" "}
                {props.target.water} water. At the start, there are{" "}
                {props.env.trees} trees and {props.env.waterFlow} units of water
                flow every round. The prices of the blobs are as listed below:
            </p>
            <DisplayBlobCosts blobs={blobs} />
        </div>
    );
}

export default DisplayTargets;
