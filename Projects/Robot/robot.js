const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
];

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
]

function buildGraph(edges) {
    let graph = Object.create(null);

    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return { place: destination, address: p.address };
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }
}

VillageState.random = function (parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);

        parcels.push({ place, address });
    }
    return new VillageState("Post Office", parcels);
};

function runRobot(state, robot, memory) {
    for (let turn = 0; ; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            return turn;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

/** Route helper functions random and find */

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function findRoute(graph, from, to) {
    // work: the route to be worked on through iteration
    let work = [{ at: from, route: [] }];

    // Continue looping through work until to is found
    for (let i = 0; i < work.length; i++) {
        // Initalise current location and route using work
        let { at, route } = work[i];

        // Loop through each edge attached to current place on graph
        for (let place of graph[at]) {
            if (place == to) return route.concat(place); // Found place - return the route

            // Find if some element of work was at place
            // If not yet searched this place - add to work
            if (!work.some(w => w.at == place)) {
                work.push({ at: place, route: route.concat(place) });
            }
        }
    }
}

/** Robot route functions */

function randomRobot(state) {
    /** Pick a random direction each turn */

    return { direction: randomPick(roadGraph[state.place]) };
}

function routeRobot(state, memory) {
    /** Have the robot follow a specified route */

    if (memory.length == 0) {
        memory = mailRoute;
    }
    return { direction: memory[0], memory: memory.slice(1) };
}

function goalOrientedRobot({ place, parcels }, route) {
    /** Robot will find a route to deliver each parcel */

    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return { direction: route[0], memory: route.slice(1) };
}

const roadGraph = buildGraph(roads);
// runRobot(VillageState.random(), randomRobot);
//runRobot(VillageState.random(), goalOrientedRobot)

/** Exercises section of Robot Project ---------------------------------
 * 
 * */

/** Measuring a Robot
 * 
 * Write a function compareRobots that compares the time it takes for two 
 * different robots to complete the same set of tasks. Create a set of 100 
 * different scenarios and compare against each.
 */

function compareRobots(robotOne, robotTwo) {
    /** Compare the effectiveness of two different robots against the same set of tasks
     * 
     */

    let r1Results = [];
    let r2Results = [];
    for (let i = 0; i < 100; i++) {
        let scenario = VillageState.random();

        r1Results.push(runRobot(scenario, robotOne, []));
        r2Results.push(runRobot(scenario, robotTwo, []));
    }
    r1Average = r1Results.reduce((a, b) => a + b, 0) / 100;
    r2Average = r2Results.reduce((a, b) => a + b, 0) / 100;

    console.log(`Robot one average time: ${r1Average}, robot two average time: ${r2Average}`);
}