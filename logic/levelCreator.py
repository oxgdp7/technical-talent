from logic.blob import *


def calculateScore(
    blobDetails: list,
    woodToCollect: int,
    waterToCollect: int,
    trees: int,
    rateOfWater: int,
    costs: dict,
    budget: int,
) -> int:
    blobs = createBlobs(blobDetails=blobDetails, costs=costs)
    simulation = Simulation(
        blobs=blobs,
        woodToCollect=woodToCollect,
        waterToCollect=waterToCollect,
        trees=trees,
        rateOfWater=rateOfWater,
    )
    res = simulation.result()
    print("Results")
    print(res[0])
    print(res[1])
    print(simulation.resources())
    if not res[0]:
        return 0
    return budget - res[1]


def createBlobs(blobDetails: list, costs: dict) -> list[Blob]:
    # Mapping from blob name to a class for that blob
    blobs = {}
    # Create the blobs
    for blob in blobDetails:
        key, value = createBlob(blob=blob, costs=costs)
        blobs[key] = value
    # Add children
    for blob in blobDetails:
        if blob["color"] == "purple":
            children = []
            for child in blob["children"]:
                children.append(blobs[child])
            blobs["purple" + blob["number"]].addBlobs(children)
        if blob["color"] == "yellow":
            blobs["yellow" + blob["number"]].addBlob(blobs[blob["child"]])
    return list(blobs.values())


def createBlob(blob: dict, costs: dict) -> tuple[str, Blob]:
    print(blob)
    print(type(blob))
    if blob["color"] == "red":
        return ("red" + blob["number"], RedBlob(costs["red"]))
    if blob["color"] == "blue":
        return ("blue" + blob["number"], BlueBlob(costs["blue"]))
    if blob["color"] == "green":
        return ("green" + blob["number"], GreenBlob(costs["green"]))
    if blob["color"] == "orange":
        return ("orange" + blob["number"], OrangeBlob(costs["orange"]))
    if blob["color"] == "purple":
        return ("purple" + blob["number"], PurpleBlob(costs["purple"], []))
    if blob["color"] == "yellow":
        return (
            "yellow" + blob["number"],
            YellowBlob(costs["yellow"], blob["repetitions"]),
        )
    raise Exception("Wrong blob color")
