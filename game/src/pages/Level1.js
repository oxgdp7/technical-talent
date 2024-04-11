import { useLocation } from "react-router-dom";
import LevelCreator from "../components/LevelCreator";
import BlobCostCreator from "../utils/BlobCostCreator";

function Level1() {
    const env = {
        trees: 20,
        waterFlow: 5,
    };

    const target = {
        wood: 50,
        water: 20,
    };

    const costs = {
        redBlob: new BlobCostCreator((_) => 1, "1"),
        blueBlob: new BlobCostCreator((_) => 1, "1"),
        greenBlob: new BlobCostCreator((_) => 2, "2"),
        orangeBlob: new BlobCostCreator((_) => 5, "5"),
        purpleBlob: new BlobCostCreator(
            (x) => 2 * x,
            "2 * number of blobs repeated",
        ),
        yellowBlob: new BlobCostCreator(
            (x) => 3 * x,
            "3 * number of repetitions",
        ),
    };

    // Enough to buy 50 orange blobs, 20 blue blobs
    const budget = 300;

    const { state } = useLocation();

    return (
        <div className="container">
            <LevelCreator
                level={1}
                env={env}
                target={target}
                costs={costs}
                budget={budget}
                email={state.email}
                name={state.name}
            />
        </div>
    );
}

export default Level1;
