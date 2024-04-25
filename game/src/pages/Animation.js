import React, { useState, useEffect } from "react";
import AnimatedBlob from "../components/AnimatedBlob";
import "../App.css";
import JSONToBlob from "../components/JSONToBlob";
import Levels from "../models/Levels";
import SimulateRound from "../models/SimulateRound";

// hover effect to display child/parent relationship

// Define paths for background and sprite images
const backgroundImage = "sprites/background.jpg";

function Animation() {
    const [blobs, setBlobs] = useState([]);
    const [blobList, setBlobList] = useState([])
    const level = Levels(localStorage.getItem("level"))

    useEffect(() => {
        const blobsJSON = JSON.parse(localStorage.getItem("blobs"));
        setBlobList(JSONToBlob(blobsJSON, level.env))
    }, []);

    const nextRound = () => {
        const blobDetails = SimulateRound(blobList, level.env)
        // Process blob details and set state
        const processedBlobs = processBlobDetails(blobDetails);
        console.log(processedBlobs)
        setBlobs(processedBlobs);
    }

    const processBlobDetails = (blobDetails) => {
        console.log(blobDetails)
        // Create a map of blobs by their IDs for easy access
        const blobMap = {};
        blobDetails.forEach((blob) => {
            blobMap[blob.color + blob.number] = { ...blob, children: [] }; // Initialize children array
        });

        // Assign children to their respective parent blobs
        blobDetails.forEach((blob) => {
            if (blob.parent) {
                console.log(blob.parent)
                console.log(blobMap)
                blobMap[blob.parent].children.push(blobMap[blob.color + blob.number]); // Add child blob to parent's children array
            }
        });

        // Identify top-level blobs (those without parents)
        const topLevelBlobs = blobDetails.filter((blob) => !blob.parent);

        // Function to recursively process blobs and their children
        const processBlob = (blob) => {
            return {
                ...blob,
                children: blob.children.map((child) => processBlob(child)), // Recursively process children
            };
        };

        // Process each top-level blob and its descendants recursively
        const processedBlobs = topLevelBlobs.map((blob) =>
            processBlob(blobMap[blob.color + blob.number]),
        );

        return processedBlobs;
    };

    // Function to handle mouse hover events
    const handleMouseHover = () => {
        // Mouse hover event handling logic goes here
    };

    // Function to recursively render blobs and their children
    const renderBlobs = (blobs) => {
        return blobs.map((blob) => (
            <React.Fragment key={blob.color + blob.number}>
                <AnimatedBlob blob={blob} onMouseHover={handleMouseHover} />
                {blob.children.length > 0 && renderBlobs(blob.children)}
            </React.Fragment>
        ));
    };

    return (
        <div className="App">
            <div className="background-container">
                <img
                    src={backgroundImage}
                    alt="Background"
                    className="background-image"
                />
                {renderBlobs(blobs)}
                {/* Render arrows */}
                {/* {arrows.map(arrow => (
          <Arrow key={arrow.id} arrow={arrow} />
        ))} */}
            </div>
            <button type="button" className="btn btn-dark" onClick={nextRound}>
                Start next round
            </button>
        </div>
    );
}

export default Animation;
