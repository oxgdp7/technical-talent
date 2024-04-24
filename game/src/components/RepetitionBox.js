import { useState } from "react";

function RepetitionBox(props) {
    const [val, setVal] = useState(props.repetitions)

    return (
        <input
            id="blue-blob-field"
            type="number"
            className="form-control"
            value={val}
            onChange={(e) => {
                props.adjustRepetitions(e.target.value)
                setVal(e.target.value)
            }}
            style={{
                width: "100px",
                marginLeft: props.margin ? props.margin : 0,
            }}
        />
    );
}

export default RepetitionBox;
