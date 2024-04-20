import LevelCreator from "../components/LevelCreator";
import BlobCostCreator from "../utils/BlobCostCreator";
import Environment from "../models/Environment";

function Level1() {
    // Creates the environment with (trees, waterFlow)
    const env = new Environment(20, 5);

    // Sets the target resources to collect
    const target = {
        wood: 50,
        water: 20,
    };

    // Sets the cost of each blob
    const costs = {
        // Red, blue, green and orange all have fixed costs
        redBlob: new BlobCostCreator((_) => 1, "1"),
        blueBlob: new BlobCostCreator((_) => 1, "1"),
        greenBlob: new BlobCostCreator((_) => 2, "2"),
        orangeBlob: new BlobCostCreator((_) => 5, "5"),
        // Purple and yellow have costs that depend on the number of repetitions
        purpleBlob: new BlobCostCreator(
            (x) => 2 * x,
            "2 * number of blobs repeated",
        ),
        yellowBlob: new BlobCostCreator(
            (x) => 3 * x,
            "3 * number of repetitions",
        ),
    };

    // Sets the budget for the level. If the choice of blobs is successful, the
    // user will get budget-spent points. Here, 300 is used because you can
    // afford 50 orange blobs, and 20 blue blos with some points left over.
    const budget = 300;

    return (
        <div className="container">
            <LevelCreator
                // Make sure to replace this if you are creating a new level
                level={1}
                env={env}
                target={target}
                costs={costs}
                budget={budget}
            />
        </div>
    );
}

export default Level1;
