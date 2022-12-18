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