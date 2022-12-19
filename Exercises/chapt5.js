testArr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
testArr.reduce((a, b) => (a.concat(b))); // Flatten testArr

function loop(value, test, update, body) {
    while (test(value)) {
        body(value);
        value = update(value);
    }
}

loop(1, a => a < 10, a => a + 1, console.log);

function everyLoop(inArr, test) {
    for (element of inArr) {
        if (!test(element)) {
            return false;
        }
    }
    return true;
}

function everySome(inArr, test) {
    return !inArr.some((a) => (!test(a)));

    return !(!inArr.some(test) || !inArr.some(test)); //!(!test(a) || !test(b))
}

isEvery = [1, 2, 3];
notEVery = [-1, 2, 3];

everyLoop(isEvery, a => a > 0);
everySome(isEvery, a => a > 0);