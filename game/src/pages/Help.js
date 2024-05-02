import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function Help() {
    const [userDetails, setUserDetails] = useState({});
    const navigate = useNavigate();

    const getUserDetails = async (accessToken) => {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
        );
        const data = await response.json();
        setUserDetails(data);
      };
    
      useEffect(() => {
        const accessToken = Cookies.get("access_token");
    
        if (!accessToken) {
          navigate("/");
        }
    
        getUserDetails(accessToken);
      }, [navigate]);
    
      console.log(userDetails);
    
      useEffect(() => {
        console.log(userDetails.name);
        localStorage.setItem("name", userDetails.name);
        localStorage.setItem("email", userDetails.email);
        localStorage.setItem("google_id", userDetails.id)
      }, [userDetails])

    const redBlob = {
        color: "Red",
        action: "Chops 1 tree",
        condition: "Needs 1 tree to chop",
        rounds: "1",
    };
    const blueBlob = {
        color: "Blue",
        action: "Collects 1 water",
        condition: "Needs 1 water to collect",
        rounds: "1",
    };
    const greenBlob = {
        color: "Green",
        action: "Plants 1 tree",
        condition: "Needs 1 seed initially",
        rounds: "2",
    };
    const orangeBlob = {
        color: "Orange",
        action: "Plants and then chops 1 tree",
        condition: "Needs 1 seed initially",
        rounds: "2",
    };
    const purpleBlob = {
        color: "Purple",
        action: "Wakes up all of its x children once each",
        condition: "Needs each child to be asleep before they can be woken up",
        rounds: "x",
    };
    const yellowBlob = {
        color: "Yellow",
        action: "Wakes up its single child, y times",
        condition: "Needs its child to be asleep before it can be woken up",
        rounds: "y",
    };
    const blobs = [
        redBlob,
        blueBlob,
        greenBlob,
        orangeBlob,
        purpleBlob,
        yellowBlob,
    ];

    const showBlob = (blob) => {
        return (
            <tr key={blob.color}>
                <th scope="row">{blob.color}</th>
                <td>{blob.action}</td>
                <td>{blob.condition}</td>
                <td>{blob.rounds}</td>
            </tr>
        );
    };

    return (
        <div className="container">
            <h1 style={{marginTop:"30px"}}>Help Sheet</h1>
            <h2>What is the game about?</h2>
            <p>
                You are in charge of a village of lots of different blobs. As
                the leader of this village, you need to achieve a certain target
                in order for the village to be successful. This will be given in
                each level (such as needing to gather 20 wood and 5 water). The
                village starts off with a forest with a specified number of
                trees and a river with a specified rate of flow. To help you
                achieve the goal, you can recruit a variety of different colours
                of blobs to do work. You can recruit as many or as few blobs as
                you want, as long as you meet the target of the level. If you
                meet the target, then your score will be calculated by looking
                at the costs of the blobs you recruited.
            </p>
            <h2>What does a blob do?</h2>
            <p>
                Each blob has a job that is determined by its color (type).
                Blobs are lazy so as soon as they have completed their task,
                they will go to sleep and not do any more work. They can,
                however, be woken up again by certain types of blobs.
            </p>
            <h2>How does the game work?</h2>
            <p>
                The game is divided into a sequence of 'rounds'. In each round,
                any blob that is awake, will try to perform its action. At the
                end of the round, the game is synchronised so each blob then
                changes its status (active, waiting, sleeping) to the status it
                will be for the next round. Additionally, any seeds planted will
                grow into trees.
            </p>
            <p>
                Once all blobs are either waiting or sleeping for 2 rounds (in
                case a seed has been planted), the game will end and your
                collected resources will be compared with the target. It does
                not matter whether you meet or exceed the target.
            </p>
            <h2>What is the cost of the blobs?</h2>
            <p>
                Each color of blob will have a cost associated with it. These
                costs can (but do not have to) vary between levels so make sure
                to read the new level carefully. Some blobs will have variable
                costs that are determined by a factor associated with the blobs
                role (such as the yellow blob may have a cost associated with
                the number of times it makes a blob repeat its action).
            </p>
            <p>
                Often, blobs require certain conditions to be met before they
                can complete their role. They will wait until these conditions
                are met before proceeding with their task.
            </p>
            <h2>What are the different types of blobs?</h2>
            <div className="row">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Blob color</th>
                            <th scope="col">Action</th>
                            <th scope="col">Condition</th>
                            <th scope="col">Time taken (Rounds)</th>
                        </tr>
                    </thead>
                    <tbody>{blobs.map((blob) => showBlob(blob))}</tbody>
                </table>
            </div>
            <h2>How do the trees work?</h2>
            <p>
                At the start of the level, there is a certain number of trees,
                each time a tree is cut down by a red blob (not an orange blob),
                the number of trees will decrease by 1. Each time a green blob
                plants a tree, the number will increase by 1. The number can
                never be negative, although if it goes to zero and there are no
                trees currently being planted, you will PERMANENTLY run out of
                trees.
            </p>
            <h2>How does the water work?</h2>
            <p>
                At the start of the level, you will be given the flow of water.
                Each round, this much water will flow in the river. Each time a
                blue blob collects water, the total amount of water in the river
                decreases by 1. At the end of the round, the water is reset to
                the flow value. Any left over water does not matter.
            </p>
            <h2>How do seeds work?</h2>
            <p>
                At the start of each round, if there are any trees, then there
                will be an infinite supply of seeds in the forest. If there are
                no trees at the start of a round, there will be no seeds. Seeds
                do not carry over.
            </p>
        </div>
    );
}

export default Help;
