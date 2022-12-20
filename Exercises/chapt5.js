// Question 1: Flattening ------------------

/** Use reduce method to flatten an array of arrays into a single array.
 *  Combine reduce with concat
 */

testArr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
testArr.reduce((a, b) => (a.concat(b))); // Flatten testArr


// Question 2: Your Own Loop -----------------

/** Write a higher order function loop that provides similar functionality to a
 *  for loop.
 *  It takes a value, test function, update function and a body.
 */
function loop(value, test, update, body) {
    while (test(value)) {
        body(value);
        value = update(value);
    }
}

// Execute loop()
loop(1, a => a < 10, a => a + 1, console.log);

// Question 3: Everything -------------------

/** Implement an every function. One that uses a loop and one that uses some().
 * 
 *  everySome() utilises De Morgan's Laws to convert && operations (every) to
 *  || (some) and vice versa. The formula is a && b == !(!a || !b)
 * 
 *  everySome works by taking the negation of the test on each element then 
 *  negating the entire || operation. !(some(!a || !b || !c, etc...))
 */
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

// Question 4: Dominant Writing Direction

/** Write a function that computes the dominant writing direction in a string of text.
 * 
 * Uses functions defined in textbook characterScript(), countBy()
 */

function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
        let name = groupName(item);
        let known = counts.findIndex(c => c.name == name);
        if (known == -1) {
            counts.push({ name, count: 1 });
        } else {
            counts[known].count++;
        }
    }
    return counts;
}

function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => {
            return code >= from && code < to;
        })) {
            return script;
        }
    }
    return null;
}

function dominantDirection(text) {
    let directions = countBy(text, char => {
        let script = characterScript(char.codePointAt(0));
        return script ? script.direction : "none";
    }).filter(({ direction }) => direction != "none");

    return directions.reduce((a, b) => a.count > b.count ? a : b).name;
}

console.log(dominantDirection("Hello!"));
