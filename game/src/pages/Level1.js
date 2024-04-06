import LevelCreator from "../components/LevelCreator";

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
        redBlob: 1,
        blueBlob: 1,
        greenBlob: 5,
        orangeBlob: 10,
        purpleBlob: 5,
        yellowBlob: 5,
    };

    return (
        <div className="container">
            <LevelCreator env={env} target={target} costs={costs} />
        </div>
    );
}

export default Level1;
