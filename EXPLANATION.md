# How the game works
The player is given a list of targets (e.g. 20 wood, 15 water) and resources
they have available at the start (e.g. 10 trees, 5 water per round).
The player is then given a list of prices for each 'Blob' and they can choose
to buy as many or as few blobs as they want.
The aim of the game is to meet the targets by spending as little as possible.
The player does not have control over the simulation, only the number and
types of blobs initially bought (and which blobs are children of which other
blobs)


# Checking whether the player has met the targets
The simulation is divided into an infinite number of rounds. On each round, a
blob will (if it is not asleep) attempt to do an action. Then, the blobs will
synchronise (change their state to whatever is appropriate.
If the blob has finished its action, it will start sleeping.
If the blob needs to wait for something else to occur for it to take its
action, it will start waiting.
Otherwise, the blob will be active

The simulation ends when either: the target has been met, all blobs have
been either waiting or sleeping for 2 rounds or the player has manually
cancelled the simulation.


# Types of blobs
Red blob - Chops down 1 tree (1 action)

Blue blob - Collects 1 water (1 action)

Green blob - Plants 1 tree as long as there is a seed (2 actions)

Orange blob - Plants and chops 1 tree as long as there is a seed (2 actions)

Purple blob - Makes x blobs repeat their action 1 time (x * 1 actions)

Yellow blob - makes 1 blob repeat its action y times (y * 1 actions)


# Things to notes
## Seeds
At the start of every round, if there is alteast one tree present, then
there will be infinite seeds so enough for all blobs that need to collect a
seed.

## Purple blobs
The purple blob only goes to sleep after ALL its children have
been woken up once. So, even if the purple blob can be repeated, if even 1
child is stuck waiting, it will cause all other children to be blocked

Also, the order that purple blobs repeat in matters:
Example: Yellow blob repeating purple blob repeating blue and red blob (r1), 
1 red blob by itself (r2). If there is 1 tree left, then if the r1 chops the
tree, the purple blob will restart it and then sleep. It will be woken up so
the blue blob will collect water 3 times. If r2 chops the tree, the purple blob
will never go to sleep so the blue blob will only collect water 2 times. 
Also, the order matters a lot if you have greens and reds in the same purple 
as the reds may be restarted before the greens can be restarted, causing all
the trees to be cut down.

## Maths
There's some weird maths involved here. Basically, if I repeat a blobs
action 10 times, theres actually 11 repetitions of the action (as the blob will
act by itself 1 time). This makes it quite hard to figure out how many
resources you will get as if you repeat a repetition blob on a blob, you get 3
actions of the primary blob.
Example: 1 purple blob repeating 1 purple blob repeating 2 red blobs will
result in 6 wood being collected. If you add a yellow repeating the first
purple blob 10 times, you only get 26 wood.

## Children
The simulation breaks if there are infinite loops of blobs repeating
each other. Additionally, the order may become too complex if blobs are
repeated by more than one blob so each blob can have 1 parent and as many
children as it is allowed to by the type of blob it is. The graph must be
acyclic.



# Example Simulation
(order of blobs in written order)

Purple: children (Red, Green, Blue1)

Blue2

Yellow(x=1): children (Orange)


Environment: 1 tree, 1 water per round

Target: 5 wood, 5 water

Initial state: All blobs active

## Round 1
There is 1 tree so there are seeds.

Purple - No sleeping children so waits

Red - Chops down 1 tree (0 trees left)

Green - Collects a seed

Blue1 - Collects 1 water (0 water left)

Blue2 - No available water so waits

Yellow - No sleeping children so waits

Orange - Collects a seeds

Collected: (1 wood, 1 water)

Synchronising:

Purple - Waiting

Red - Sleeping

Green - Active

Blue1 - Sleeping

Blue2 - Waiting

Yellow - Waiting

Orange - Active

Available water reset to 1

## Round 2

There are no trees so there are no seeds.

Purple - Wakes Red

Red - Sleeps (will wake at the end)

Green - Plants a tree

Blue1 - Sleeps

Blue2 - Collects 1 water

Yellow - No sleeping children

Orange - Plants a tree and chops it immediately 

Collected: (2 wood, 2 water)


Synchronising:


Purple - Active (has not woken up all of its children yet)

Red - Active (was woken up by Purple)

Green - Sleeping

Blue1 - Sleeping

Blue2 - Sleeping

Yellow - Waiting

Orange - Sleeping

Available water reset to 1

1 tree grown


## Round 3
There is 1 tree so there are seeds

Purple - Wakes Green

Red - Chops 1 tree

Green - Sleeps

Blue1 - Sleeps

Blue2 - Sleeps

Yellow - Wakes Orange

Orange - Sleeps

Collected: (3 wood, 2 water)


Synchronising:

Purple - Active

Red - Sleeping

Green - Active

Blue1 - Sleeping

Blue2 - Sleeping

Yellow - Sleeping (has reset its child 1/1 times)

Orange - Active

Available water reset to 1


## Round 4
There are no trees so there are no seeds

Purple - Wakes Blue1

Red - Sleeps

Green - Waiting (no seeds)

Blue1 - Sleeps

Blue2 - Sleeps

Yellow - Sleeps

Orange - Waiting

Collected: (3 wood, 2 water)


Synchronising:

Purple - Sleeping

Red - Sleeping

Green - Waiting

Blue1 - Active

Blue2 - Sleeping

Yellow - Sleeping

Orange - Waiting

Available water reset to 1


## Round 5
There are no trees so there are no seeds

Purple - Sleeps

Red - Sleeps

Green - Waiting

Blue1 - Collects 1 water

Blue2 - Sleeps

Yellow - Sleeps

Orange - Waiting

Collected: (3 wood, 3 water)


Synchronising:

Purple - Sleeping

Red - Sleeping

Green - Waiting

Blue1 - Sleeping

Blue2 - Sleeping

Yellow - Sleeping

Orange - Waiting

Available water reset to 1


## Round 6
There are no trees so there are no seeds

Purple - Sleeps

Red - Sleeps

Green - Waiting

Blue1 - Sleeps

Blue2 - Sleeps

Yellow - Sleeps

Orange - Waiting

Collected: (3 wood, 3 water)


Synchronising:

Purple - Sleeping

Red - Sleeping

Green - Waiting

Blue1 - Sleeping

Blue2 - Sleeping

Yellow - Sleeping

Orange - Waiting

Available water reset to 1


All blobs have been sleeping or waiting for 2 rounds so the simulation ends.
The target was not met so this solution fails.
