from logic.levelCreator import calculateScore


def levelSelector(level: int, blobDetails: list) -> int:
    score = 0
    if level == 1:
        score = level1(blobDetails=blobDetails)
    else:
        raise Exception("Invalid level")
    return max(score, 0)


def level1(blobDetails: list) -> int:
    costs = {
        "red": 1,
        "blue": 1,
        "green": 2,
        "orange": 5,
        "purple": lambda x: 2 * x,
        "yellow": lambda y: 3 * y,
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
