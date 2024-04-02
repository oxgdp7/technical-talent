from abc import ABC, abstractmethod
from collections.abc import Callable
from enum import Enum


class Environment:
    def __init__(self, trees: int, water: int) -> None:
        """
        Creates an environment starting with:
        trees -- number of trees
        water -- rate of flow of water
        """
        self.__trees = trees
        self.__water = water
        self.__seeds = self.__trees > 0
        self.__treesToPlant = 0
        self.__waterLeft = self.__water
        self.__collectedWood = 0
        self.__collectedWater = 0

    def chopTree(self) -> bool:
        """
        Chops a tree if possible and then returns whether that was successful
        """
        if not self.__trees:
            return False
        self.__trees -= 1
        self.__collectedWood += 1
        return True

    def chopRenewable(self) -> None:
        """Plants and then immediately chops a tree"""
        self.__collectedWood += 1

    def collectSeed(self) -> bool:
        """Returns whether there are any possible seeds to pick up"""
        return self.__seeds

    def plantTree(self) -> None:
        """Plants a tree"""
        self.__treesToPlant += 1

    def collectWater(self) -> bool:
        """
        Collects water if possible and then returns whether that was successful
        """
        if self.__waterLeft == 0:
            return False
        self.__waterLeft -= 1
        self.__collectedWater += 1
        return True

    def synchronise(self) -> None:
        """
        Handles all planting and chopping of trees, resets variables
        """
        self.__trees += self.__treesToPlant
        self.__seeds = self.__trees > 0
        self.__treesToPlant = 0
        self.__waterLeft = self.__water

    def resources(self) -> tuple[int, int]:
        """Returns (#collected wood, #collected water"""
        return (self.__collectedWood, self.__collectedWater)


class BlobStatus(Enum):
    ACTIVE = 1
    WAITING = 2
    SLEEPING = 3


class Blob(ABC):
    # Causes the blob to take one action
    @abstractmethod
    def act(self, env: Environment) -> bool: ...

    # Resolves the action for the blob (such as changing the status)
    # Resolve should be called after all blobs have acted
    @abstractmethod
    def synchronise(self) -> None: ...

    # Restarts the blob (so it acts as if it has just been initialised)
    # Must be done on sleeping blob
    @abstractmethod
    def restart(self) -> None: ...

    # Returns the current Status of the blob (acting, waiting or sleeping)
    @abstractmethod
    def status(self) -> BlobStatus: ...

    # Returns the numerical value of the cost of the blob
    @abstractmethod
    def cost(self) -> int: ...


# The red blob will wait until it can chop down a tree (1 action)
# and then go to sleep
class RedBlob(Blob):
    def __init__(self, cost: int) -> None:
        self.__cost = cost
        self.__choppedTree = False
        self.__status = BlobStatus.ACTIVE
        self.__activated = False

    # If the red blob is active, it will try to chop 1 piece of wood
    def act(self, env: Environment) -> bool:
        if self.__status != BlobStatus.SLEEPING:
            if env.chopTree():
                self.__choppedTree = True
                return True
        return False

    def synchronise(self) -> None:
        if self.__activated:
            self.__status = BlobStatus.ACTIVE
            self.__activated = False
            self.__choppedTree = False
        elif self.__choppedTree:
            self.__status = BlobStatus.SLEEPING
        else:
            self.__status = BlobStatus.WAITING

    def restart(self) -> None:
        assert self.__status == BlobStatus.SLEEPING
        self.__activated = True

    def status(self) -> BlobStatus:
        return self.__status

    def cost(self) -> int:
        return self.__cost


# The blue blob will wait until it can collect a bucket of water (1 action)
# and then go to sleep
class BlueBlob(Blob):
    def __init__(self, cost: int) -> None:
        self.__cost = cost
        self.__collectedWater = False
        self.__status = BlobStatus.ACTIVE
        self.__activated = False

    # If the blue blob is active, it will try to collect 1 piece of water
    def act(self, env: Environment) -> bool:
        if self.__status != BlobStatus.SLEEPING:
            if env.collectWater():
                self.__collectedWater = True
                return True
        return False

    def synchronise(self) -> None:
        if self.__activated:
            self.__status = BlobStatus.ACTIVE
            self.__activated = False
            self.__collectedWater = False
        elif self.__collectedWater:
            self.__status = BlobStatus.SLEEPING
        else:
            self.__status = BlobStatus.WAITING

    def restart(self) -> None:
        assert self.__status == BlobStatus.SLEEPING
        self.__activated = True

    def status(self) -> BlobStatus:
        return self.__status

    def cost(self) -> int:
        return self.__cost


# The green blob will wait until it can collect a seed (1 action),
# plant it (1 action) and then go to sleep
class GreenBlob(Blob):
    def __init__(self, cost: int) -> None:
        self.__cost = cost
        self.__collectedSeed = False
        self.__plantedTree = False
        self.__status = BlobStatus.ACTIVE
        self.__activated = False

    # if it has a seed already, it plants it, otherwise it tries to pick up
    # a seed
    def act(self, env: Environment) -> bool:
        if self.__status != BlobStatus.SLEEPING:
            if self.__collectedSeed:
                env.plantTree()
                self.__collectedSeed = False
                self.__plantedTree = True
                return True
            if env.collectSeed():
                self.__collectedSeed = True
                return True
        return False

    def synchronise(self) -> None:
        if self.__activated:
            self.__status = BlobStatus.ACTIVE
            self.__activated = False
            self.__plantedTree = False
        elif self.__plantedTree:
            self.__status = BlobStatus.SLEEPING
        elif self.__collectedSeed:
            self.__status = BlobStatus.ACTIVE
        else:
            self.__status = BlobStatus.WAITING

    def restart(self) -> None:
        assert self.__status == BlobStatus.SLEEPING
        self.__activated = True

    def status(self) -> BlobStatus:
        return self.__status

    def cost(self) -> int:
        return self.__cost


# The orange blob waits until it can collect a seed (1 action) and
# immediately plants and chops it (1 action)
class OrangeBlob(Blob):
    def __init__(self, cost: int) -> None:
        self.__cost = cost
        self.__collectedSeed = False
        self.__choppedTree = False
        self.__status = BlobStatus.ACTIVE
        self.__activated = False

    # if it has a seed already, it plants and chops it, otherwise it tries to
    # pick up a seed
    def act(self, env: Environment) -> bool:
        if self.__status != BlobStatus.SLEEPING:
            if self.__collectedSeed:
                env.chopRenewable()
                self.__collectedSeed = False
                self.__choppedTree = True
                return True
            if env.collectSeed():
                self.__collectedSeed = True
                return True
        return False

    def synchronise(self) -> None:
        if self.__activated:
            self.__status = BlobStatus.ACTIVE
            self.__activated = False
            self.__choppedTree = False
        elif self.__choppedTree:
            self.__status = BlobStatus.SLEEPING
        elif self.__collectedSeed:
            self.__status = BlobStatus.ACTIVE
        else:
            self.__status = BlobStatus.WAITING

    def restart(self) -> None:
        assert self.__status == BlobStatus.SLEEPING
        self.__activated = True

    def status(self) -> BlobStatus:
        return self.__status

    def cost(self) -> int:
        return self.__cost


# The purple blob will wait until any one of its children is asleep and then
# wakes it up (in the original order to break ties). Once all of its children
# have been woken up once, it goes to sleep
class PurpleBlob(Blob):
    def __init__(self, costFunc: Callable[[int], int], blobs: list[Blob]) -> None:
        self.__blobs = blobs
        self.__numBlobs = len(self.__blobs)
        self.__blobRestarted = [False] * self.__numBlobs
        self.__totalRestarted = 0
        self.__cost = costFunc(self.__numBlobs)
        self.__restartedBlob = False
        self.__status = BlobStatus.ACTIVE
        self.__activated = False

    # The purple blob will check if any of its child blobs are asleep and wake
    # them up if necessary
    def act(self, env: Environment) -> bool:
        foundBlob = False
        if self.__totalRestarted < self.__numBlobs:
            i = 0
            while i < self.__numBlobs and not foundBlob:
                if self.__checkCanRestart(i):
                    self.__blobs[i].restart()
                    self.__blobRestarted[i] = True
                    self.__totalRestarted += 1
                    foundBlob = True
                i += 1
            self.__restartedBlob = foundBlob
        return foundBlob

    def __checkCanRestart(self, i: int) -> bool:
        if self.__blobRestarted[i]:
            return False
        return self.__blobs[i].status() == BlobStatus.SLEEPING

    def synchronise(self) -> None:
        if self.__activated:
            self.__status = BlobStatus.ACTIVE
            self.__activated = False
        elif self.__totalRestarted == self.__numBlobs:
            self.__status = BlobStatus.SLEEPING
        elif self.__restartedBlob:
            self.__status = BlobStatus.ACTIVE
        else:
            self.__status = BlobStatus.WAITING
        self.__restartedBlob = False

    def restart(self) -> None:
        assert self.__status == BlobStatus.SLEEPING
        assert self.__totalRestarted == self.__numBlobs
        self.__blobRestarted = [False] * self.__numBlobs
        self.__totalRestarted = 0
        self.__activated = True

    def status(self) -> BlobStatus:
        return self.__status

    def cost(self) -> int:
        return self.__cost


# The yellow blob waits until its child goes to sleep and then wakes it up
# (1 action). It goes to sleep once its child has been woken up
# #repetitions times
class YellowBlob(Blob):
    def __init__(
        self, costFunc: Callable[[int], int], blob: Blob, repetitions: int
    ) -> None:
        self.__blob = blob
        self.__restartsNeeded = repetitions
        self.__completedRestarts = 0
        self.__cost = costFunc(self.__restartsNeeded)
        self.__restartedBlob = False
        self.__status = BlobStatus.ACTIVE
        self.__activated = False

    # The yellow blob will restart its blob x times
    def act(self, env: Environment) -> bool:
        if self.__completedRestarts < self.__restartsNeeded:
            if self.__blob.status() == BlobStatus.SLEEPING:
                self.__blob.restart()
                self.__completedRestarts += 1
                self.__restartedBlob = True
                return True
        return False

    def synchronise(self) -> None:
        if self.__activated:
            self.__status = BlobStatus.ACTIVE
            self.__activated = False
        elif self.__completedRestarts == self.__restartsNeeded:
            self.__status = BlobStatus.SLEEPING
        elif self.__restartedBlob:
            self.__status = BlobStatus.ACTIVE
        else:
            self.__status = BlobStatus.WAITING
        self.__restartedBlob = False

    def restart(self) -> None:
        assert self.__status == BlobStatus.SLEEPING
        assert self.__restartsNeeded == self.__completedRestarts
        self.__completedRestarts = 0
        self.__activated = True

    def status(self) -> BlobStatus:
        return self.__status

    def cost(self) -> int:
        return self.__cost


class Simulation:
    def __init__(
        self,
        blobs: list[Blob],
        woodToCollect: int,
        waterToCollect: int,
        trees: int,
        rateOfWater: int,
        endEarly: bool = True,
    ) -> None:
        self.__env = Environment(trees=trees, water=rateOfWater)
        self.__target = (woodToCollect, waterToCollect)
        self.__blobs = blobs
        self.__endEarly = endEarly
        self.__run()

    def __run(self) -> None:
        noneActed = False
        finished = False
        while not finished:
            prevNoneActed = noneActed
            noneActed = True
            for blob in self.__blobs:
                result = blob.act(self.__env)
                noneActed = noneActed and not result
            for blob in self.__blobs:
                blob.synchronise()
            self.__env.synchronise()
            if self.__endEarly and self.__checkSolution():
                # Checks to see if the target has been met to end early
                finished = True
            else:
                finished = noneActed and prevNoneActed

    def __getCost(self) -> int:
        total = 0
        for blob in self.__blobs:
            total += blob.cost()
        return total

    def __checkSolution(self) -> bool:
        resources = self.__env.resources()
        return resources[0] >= self.__target[0] and resources[1] >= self.__target[1]

    def result(self) -> tuple[bool, int]:
        return (self.__checkSolution(), self.__getCost())

    def resources(self) -> tuple[int, int]:
        return self.__env.resources()


def f(x: int) -> int:
    return x * 2


def example() -> None:
    red = RedBlob(1)
    green = GreenBlob(1)
    blue1 = BlueBlob(1)
    purple = PurpleBlob(f, [red, green, blue1])
    blue2 = BlueBlob(1)
    orange = OrangeBlob(1)
    yellow = YellowBlob(f, orange, 1)
    blobs = [purple, red, green, blue1, blue2, yellow, orange]
    simulation = Simulation(
        blobs=blobs,
        woodToCollect=3,
        waterToCollect=3,
        trees=1,
        rateOfWater=1,
        endEarly=False,
    )
    print(simulation.result())
    print(simulation.resources())


def example2() -> None:
    red1 = RedBlob(1)
    red2 = RedBlob(1)
    blue1 = BlueBlob(1)
    green1 = GreenBlob(1)
    green2 = GreenBlob(1)
    purple1 = PurpleBlob(f, [red1, red2, green1, green2])
    purple2 = PurpleBlob(f, [purple1, blue1])
    yellow1 = YellowBlob(f, purple2, 10)
    blobs = [red1, red2, green1, green2, blue1, purple1, purple2, yellow1]
    simulation = Simulation(
        blobs=blobs,
        woodToCollect=25,
        waterToCollect=20,
        trees=20,
        rateOfWater=5,
        endEarly=False,
    )
    print(simulation.result())
    print(simulation.resources())


def main() -> None:
    example()


if __name__ == "__main__":
    main()
