function range(start, end, step = 1) {
    /** Create and store the range of numbers from start to end in an array. 
     * 
     * If given negative difference with a positive step - undefined
     * If given positive difference with a negative step - undefined
    */
    if (end - start < 0 && step > 0) {
        return undefined;
    } else if (end - start > 0 && step < 0) {
        return undefined;
    }

    let elements = 0;
    let difference = Math.abs(start - end);
    if (difference % 2 === 0) {
        elements = 1 + Math.ceil(difference / Math.abs(step));
    } else if (difference % 2 != 0 && step % 2 == 0) {
        elements = Math.ceil(difference / Math.abs(step));
    } else {
        elements = 1 + Math.ceil(difference / Math.abs(step));
    }

    let numbers = [];
    console.log("Getting range...");
    for (let i = 0; i < elements; i++) {
        numbers[i] = start + (step * i);
    }
    return numbers;
}

function sum(numbers) {
    /** Calculate the sum of numbers stored in numbers array. */
    let sum = 0;
    for (number of numbers) {
        sum = sum + number;
    }
    return sum;
}

function reverseArray(inArray) {
    /** Create a new array with the same elements of inArray but reversed. */
    reversedArray = [];
    let revIndex = inArray.length - 1;
    let index = 0;
    do {
        reversedArray[index] = inArray[revIndex];
        index++;
        revIndex--;
    } while (revIndex >= 0)
    return reversedArray;
}

function reverseArrayInPlace(inArray) {
    /** Reverse the inArray array. */
    let length = inArray.length;
    swaps = Math.floor(length / 2);
    for (let i = 0; i < swaps; i++) {
        let temp = inArray[i];
        inArray[i] = inArray[length - 1 - i];
        inArray[length - 1 - i] = temp;
    }
}

function arrayToList(inArray) {
    let list = {};
    if (inArray.length > 1) {
        list = {
            value: inArray[0],
            rest: arrayToList(inArray.slice(1))
        };
    } else {
        list = {
            value: inArray[0],
            rest: null
        };
    }
    return list;
}

function listToArray(inList) {
    let nextList = inList.rest;
    let value = inList.value;
    let i = 0;
    let newArr = [];

    while (nextList != null) {
        newArr[i] = value;
        value = nextList.value;
        nextList = nextList.rest;
        i++;
    }
    newArr[i] = value;
    return newArr;
}

function prepend(element, list) {
    let newList = {
        value: element,
        rest: list
    };
    return newList;
}

function nth(n, list) {
    let result;
    if (n > 0) {
        if (list.rest != null) {
            result = nth(n - 1, list.rest);
        } else {
            result = undefined;
        }
    } else {
        result = list.value;
    }
    return result
}