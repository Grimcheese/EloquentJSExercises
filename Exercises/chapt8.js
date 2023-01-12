/** Chapter 8 - Bugs and Errors - Exercises */

/** Question 1 - Retry */
function tryPrimitiveMultiply() {
    try {
        primitiveMultiply();
    } catch (e) {
        if (e instanceof MultiplcatorUnitFailure) {
            tryPrimitiveMultiply();
        } else {
            throw e;
        }
    }
}

/** Question 2 - The Locked Box 
 * 
 * Write a function called withBoxUnlocked that takes a function as an argument, 
 * unlocks the box, runs the function, and ensures that the xo is locked again 
 * before returning.  
*/

const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() {
        this.locked = true;
    },
    _content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};

function withBoxUnlocked(func) {
    let intial_state = box.locked;
    try {
        if (box.locked) {
            box.unlock();
        }
        func();
    } catch (e) {
        console.log("Error raised: ", e);
    } finally {
        if (intial_state) {
            box.lock();
        }

    }
}
