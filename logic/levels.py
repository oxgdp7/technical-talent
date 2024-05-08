from logic.levelCreator import calculateScore

levels = {
    "1": {
        "costs": {
            "red": 1,
            "blue": 1,
            "green": 2,
            "orange": 5,
            "purple": lambda x: 2 * x,
            "yellow": lambda y: 3 * y,
        },
        "woodToCollect": 50,
        "waterToCollect": 20,
        "trees": 20,
        "rateOfWater": 5,
        "budget": 300,
    },
    "2": {
        "costs": {
            "red": 5,
            "blue": 10,
            "green": 2,
            "orange": 10,
            "purple": lambda x: 30 * x * x,
            "yellow": lambda y: 20 * y,
        },
        "woodToCollect": 80,
        "waterToCollect": 20,
        "trees": 5,
        "rateOfWater": 10,
        "budget": 500,
    },
}


def levelSelector(level: int, blobDetails: list) -> int:
    levelDetails = levels[str(level)]
    if not levelDetails:
        raise Exception("Invalid level")
    return max(
        0,
        calculateScore(
            blobDetails=blobDetails,
            woodToCollect=levelDetails["woodToCollect"],
            waterToCollect=levelDetails["waterToCollect"],
            trees=levelDetails["trees"],
            rateOfWater=levelDetails["rateOfWater"],
            costs=levelDetails["costs"],
            budget=levelDetails["budget"],
        ),
    )
