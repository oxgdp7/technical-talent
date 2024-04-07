import LevelCreator from "../components/LevelCreator";
import BlobCostCreator from "../utils/BlobCostCreator";

function Level2() {
    const env = {
        trees: 5,
        waterFlow: 10,
    };

    const target = {
        wood: 50,
        water: 20,
    };

    const costs = {
        redBlob: new BlobCostCreator(((_) => 5), "5"),
        blueBlob: new BlobCostCreator(((_) => 10), "10"),
        greenBlob: new BlobCostCreator(((_) => 2), "2"),
        orangeBlob: new BlobCostCreator(((_) => 10), "10"),
        purpleBlob: new BlobCostCreator(((x) => 3*x), "3 * number of blobs repeated"),
        yellowBlob: new BlobCostCreator(((x) => 2*x), "2 * number of repetitions"),
    };

    return (
        <div className="container">
            <LevelCreator env={env} target={target} costs={costs} />
        </div>
    );
}

export default Level2;
