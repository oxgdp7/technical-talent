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
    if not res[0]:
        return 0
    return budget - res[1]


def createBlobs(blobDetails: list, costs: dict) -> list[Blob]:
    blobs = []
    for blob in blobDetails:
        blobs.append(createBlob(blob=blob, costs=costs))
    return blobs


def createBlob(blob: dict, costs: dict) -> Blob:
    if blob["color"] == "red":
        return RedBlob(costs["red"])
    if blob["color"] == "blue":
        return BlueBlob(costs["blue"])
    if blob["color"] == "green":
        return GreenBlob(costs["green"])
    if blob["color"] == "orange":
        return OrangeBlob(costs["orange"])
    raise Exception("Wrong blob color")
