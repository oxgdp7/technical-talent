from logic.levelCreator import calculateScore


def levelSelector(level: int, blobDetails: list) -> int:
    if level == 1:
        return level1(blobDetails=blobDetails)
    raise Exception("Invalid level")


def level1(blobDetails: list) -> int:
    costs = {
        "red": 1,
        "blue": 1,
        "green": 2,
        "orange": 5,
    }
    return calculateScore(
        blobDetails=blobDetails,
        woodToCollect=50,
        waterToCollect=20,
        trees=20,
        rateOfWater=5,
        costs=costs,
        budget=300,
    )
