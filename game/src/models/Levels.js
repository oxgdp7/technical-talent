import BlobCostCreator from "../models/BlobCostCreator";
import Environment from "../models/Environment";

function Levels(level) {
    const levels = {
        1: {
            // Creates the environment with (trees, waterFlow)
            env: new Environment(20, 5),
            // Sets the target resources to collect
            target: {
                wood: 50,
                water: 20,
            },
            costs: {
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
            },
            // Sets the budget for the level. If the choice of blobs is successful, the
            // user will get budget-spent points. Here, 300 is used because you can
            // afford 50 orange blobs, and 20 blue blos with some points left over.
            budget: 300,
        },
        2: {
            env: new Environment(5, 10),
            target: {
                wood: 80,
                water: 20,
            },
            costs: {
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
            },
            budget: 1010,
        },
    };

    return levels[level];
}

export default Levels;
