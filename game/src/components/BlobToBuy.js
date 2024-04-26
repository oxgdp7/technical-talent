import React from "react";
import { useDrag } from "react-dnd";
import red from "../sprites/red_150.png";
import blue from "../sprites/blue_150.png";
import green from "../sprites/green_150.png";
import orange from "../sprites/orange_150.png";
import purple from "../sprites/purple_150.png";
import yellow from "../sprites/yellow_150.png";

// I've made the smaller pngs here because for dragging, it was taking the
// original size of the image instead of the resized image, so it was 500px big
// which is far too large. I couldn't get it to resize the preview so I have
// just created some smaller pngs (150 seemed like a happy median between
// quality and size)
function BlobToBuy(props) {
    // Needs src or it doesn't work
    const src = {
        red: red,
        blue: blue,
        green: green,
        orange: orange,
        purple: purple,
        yellow: yellow,
    };

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "toBuy",
        item: { id: props.id, color: props.color },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <img
            ref={drag}
            src={src[props.color]}
            alt={props.color}
            onDoubleClick={() =>
                props.buy({ id: props.id, color: props.color })
            }
            width="100px"
            style={{ border: isDragging ? "1px solid green" : "0px" }}
        />
    );
}

export default BlobToBuy;
