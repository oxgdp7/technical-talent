import { useState } from "react";
import "./App.css";
import Simulation from "./Simulation";
import UserInput from "./UserInput";

function App() {
    const [blobs, setBlobs] = useState({
        redBlobs: 0,
        blueBlobs: 0,
        greenBlobs: 0,
        orangeBlobs: 0,
    });

    const test = (newBlobs) => {
        setBlobs(newBlobs);
    };

    return (
        <div className="App">
            <UserInput test={test} />
            <Simulation blobs={blobs} />
        </div>
    );
}

export default App;
