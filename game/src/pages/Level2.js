import LevelCreator from "../components/LevelCreator";
import BlobCostCreator from "../models/BlobCostCreator";
import Environment from "../models/Environment";

function Level2() {
    const env = new Environment(5, 10);

    const target = {
        wood: 80,
        water: 20,
    };

    const costs = {
        redBlob: new BlobCostCreator((_) => 1, "5"),
        blueBlob: new BlobCostCreator((_) => 1, "10"),
        greenBlob: new BlobCostCreator((_) => 2, "2"),
        orangeBlob: new BlobCostCreator((_) => 5, "10"),
        purpleBlob: new BlobCostCreator(
            (x) => 3 * x,
            "3 * number of blobs repeated",
        ),
        yellowBlob: new BlobCostCreator(
            (x) => 2 * x,
            "2 * number of repetitions",
        ),
    };

    const budget = 1010;

    return (
        <div className="container">
            <LevelCreator
                level={2}
                env={env}
                target={target}
                costs={costs}
                budget={budget}
            />
        </div>
    );
}

export default Level2;
