import React, { useState, useEffect } from "react";

const spriteImages = [
    { color: "blue", images: ["sprites/blue.png", "sprites/BLUE_ZZZ.png"] },
    {
        color: "green",
        images: ["sprites/green.png", "sprites/GREEN_ZZZ.png"],
    },
    {
        color: "orange",
        images: ["sprites/orange.png", "sprites/ORANGE_ZZZ.png"],
    },
    {
        color: "purple",
        images: ["sprites/purple.png", "sprites/PURPLE_ZZZ.png"],
    },
    { color: "red", images: ["sprites/red.png", "sprites/RED_ZZZ.png"] },
    {
        color: "yellow",
        images: ["sprites/yellow.png", "sprites/YELLOW_ZZZ.png"],
    },
];
function AnimatedBlob(props) {
    const [imageIndex, setImageIndex] = useState(0);
    const [isBobbing] = useState(true);

    useEffect(() => {
        const colorData = spriteImages.find(
            (sprite) => sprite.color === props.blob.color,
        );

        if (props.blob.status === "Active") {
            if (colorData) {
                setImageIndex(0);
            }
        } else {
            if (colorData) {
                setImageIndex(1);
            }
        }
    }, [props.blob.color, props.blob.status]);

    const colorData = spriteImages.find(
        (sprite) => sprite.color === props.blob.color,
    );
    if (!colorData) {
        return null;
    }

    function blobPosition(blob) {
        let x = 0;
        let y = 0;

        function getRandomPointInCircle(centerX, centerY, radius) {
            const angle = Math.random() * Math.PI * 2; // Random angle between 0 and 2π
            const x = centerX + Math.cos(angle) * radius; // Convert polar coordinate to Cartesian coordinate for x
            const y = centerY + Math.sin(angle) * radius; // Convert polar coordinate to Cartesian coordinate for y
            return { x, y };
        }

        if (blob.status === "Waiting" || blob.status === "Sleeping") {
            ({ x, y } = getRandomPointInCircle(20, 30, 5));
        } else {
            switch (blob.color) {
                case "red":
                    ({ x, y } = getRandomPointInCircle(60, 40, 5));
                    break;
                case "blue":
                    ({ x, y } = getRandomPointInCircle(30, 50, 5));
                    break;
                case "green":
                    ({ x, y } = getRandomPointInCircle(83, 20, 5));
                    break;
                case "orange":
                    ({ x, y } = getRandomPointInCircle(85, 80, 5));
                    break;
                case "purple":
                    ({ x, y } = getRandomPointInCircle(50, 40, 5));
                    break;
                case "yellow":
                    ({ x, y } = getRandomPointInCircle(50, 50, 5));
                    break;
                default:
                    x = 0;
                    y = 0;
            }
        }

        return { x, y };
    }

    const { x, y } = blobPosition(props.blob);

    const bobbingAnimation = isBobbing ? "bobbing-animation" : "";

    return (
        <img
            src={colorData.images[imageIndex]}
            alt="Blob"
            className={`blob-image ${props.blob.status} ${bobbingAnimation}`}
            style={{ left: `${x}%`, top: `${y}%` }}
            onMouseEnter={() => props.onMouseHover(props.blob)}
        />
    );
}

export default AnimatedBlob;
