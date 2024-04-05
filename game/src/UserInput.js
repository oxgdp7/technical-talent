import { useState } from "react";

function UserInput(props) {
    const [redBlobs, setRedBlobs] = useState(0);
    const [blueBlobs, setBlueBlobs] = useState(0);
    const [greenBlobs, setGreenBlobs] = useState(0);
    const [orangeBlobs, setOrangeBlobs] = useState(0);
    const [negativeValueError, setNegativeValueError] = useState(false);

    const testButtonPressed = () => {
        if (checkAllPositive) {
            props.test({
                redBlobs: redBlobs,
                blueBlobs: blueBlobs,
                greenBlobs: greenBlobs,
                orangeBlobs: orangeBlobs,
            });
        }
    };

    const checkAllPositive = () => {
        let blobs = {
            redBlobs: redBlobs,
            blueBlobs: blueBlobs,
            greenBlobs: greenBlobs,
            orangeBlobs: orangeBlobs,
        };
        let allPositive = true;
        for (var key in blobs) {
            allPositive = allPositive && blobs[key] >= 0;
        }
        setNegativeValueError(!allPositive);
    };

    return (
        <div className="container">
            <div className="row">
                <label htmlFor="red-blob-field">Red blobs:</label>
                <input
                    id="red-blob-field"
                    type="number"
                    className="form-control"
                    value={redBlobs}
                    onChange={(e) => setRedBlobs(e.target.value)}
                />
            </div>
            <div className="row">
                <label htmlFor="blue-blob-field">Blue blobs:</label>
                <input
                    id="blue-blob-field"
                    type="number"
                    className="form-control"
                    value={blueBlobs}
                    onChange={(e) => setBlueBlobs(e.target.value)}
                />
            </div>
            <div className="row">
                <label htmlFor="green-blob-field">Green blobs:</label>
                <input
                    id="green-blob-field"
                    type="number"
                    className="form-control"
                    value={greenBlobs}
                    onChange={(e) => setGreenBlobs(e.target.value)}
                />
            </div>
            <div className="row">
                <label htmlFor="orange-blob-field">Orange blobs:</label>
                <input
                    id="orange-blob-field"
                    type="number"
                    className="form-control"
                    value={orangeBlobs}
                    onChange={(e) => setOrangeBlobs(e.target.value)}
                />
            </div>
            <div className="row mt-3">
                <button
                    type="button"
                    className="btn btn-dark"
                    onClick={testButtonPressed}
                >
                    Test
                </button>
            </div>
            {negativeValueError ? <h1>NO NEGATIVES</h1> : null}
        </div>
    );
}

export default UserInput;
