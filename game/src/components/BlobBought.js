import { useDrag, useDrop } from "react-dnd";
import red from "../sprites/red_150.png";
import blue from "../sprites/blue_150.png";
import green from "../sprites/green_150.png";
import orange from "../sprites/orange_150.png";
import purple from "../sprites/purple_150.png";
import yellow from "../sprites/yellow_150.png";
import empty from "../sprites/empty_150.png";

// I've made the smaller pngs here because for dragging, it was taking the
// original size of the image instead of the resized image, so it was 500px big
// which is far too large. I couldn't get it to resize the preview so I have
// just created some smaller pngs (150 seemed like a happy median between
// quality and size)
function BlobBought(props) {
    // Needs src or it doesn't work
    const src = {
        red: red,
        blue: blue,
        green: green,
        orange: orange,
        purple: purple,
        yellow: yellow,
        empty: empty,
    };

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "bought",
        item: { id: props.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const buy = useDrop(() => ({
        accept: "toBuy",
        drop: (blob) => {
            if (props.color === "empty") props.buy(props.id, blob);
        },
    }))[1];

    return (
        <span ref={buy}>
            <img
                ref={props.color !== "empty" ? drag : null}
                src={src[props.color]}
                alt={props.color}
                width="100px"
                style={{ border: isDragging ? "1px solid green" : "0px" }}
            />
        </span>
    );
}

export default BlobBought;
