/** Exercises for Eloquent Javascript Textbook 
 *  Chapter 6: The secret life of objects 
 */

/** Exercise 1: A Vector Type --------------------------------------------------
 * 
 * Write a Vec class that represents an object in 2-d space.
 *  Properties:
 *      x, y
 *  Class methods:
 *      plus(Vec)
 *      minus(Vec)
 */

class Vec {
    /** A vector in 2d space.
     *  
     * Stores x and y coordinates that give the location of the vector. Can
     * add or subtract vectors from each other using plus and minus methods.
     */

    constructor(x, y) {
        /** Initialise vector with x and y coords. */

        this.x = x;
        this.y = y;
    }

    get length() {
        /** Give the distance of the vector from the origin (0, 0). 
         * 
         * The distance from origin is calculated by finding the hypotenuse of 
         * the triangle created between the instance vector and the origin.
         * 
         *  sqrt(x^2 + y^2)
        */

        length = Math.sqrt((this.x ** 2) + (this.y ** 2));

        return length;
    }

    plus(vector) {
        /** Add this vector to another vector taken as a paramter. */

        let addX = this.x + vector.x;
        let addY = this.y + vector.y;

        let resultVector = new Vec(addX, addY);
        return resultVector;
    }

    minus(vector) {
        /** Subtract this vector from another vector taken as a parameter. */

        let subX = this.x - vector.x;
        let subY = this.y - vector.y;

        let resultVector = new Vec(subX, subY);
        return resultVector;
    }
}

/** Exercise 2: Groups ---------------------------------------------------------
 * 
 *  Write a Group class that is similar to the standard Set class.
 * 
 *  Required methods:
 *      add, delete, has, from
 */

class Group {
    /** Class that that contains a unique set of elements. */

    constructor() {
        /** Initalise an empty group. */
        this.values = [];
    }

    add(newValue) {
        /** Add a value to the group if not already present. */

        if (this.has(newValue) === false) {
            this.values.push(newValue)
        }
    }

    delete(newValue) {
        /** Remove value from the group if it exists. */

        for (let i = 0; i < this.values.length; i++) {
            if (this.values[i] === newValue) {
                this.values.splice(i, 1); // Remove one element at i
            }
        }
    }

    has(value) {
        /** Check if value is in the group */

        for (let element of this.values) {
            if (value === element) {
                return true;
            }
        }

        return false;
    }

    static from(object) {
        /** Creates a new group using the elements from object.
         * 
         * object must be an interable type of object
         */

        let newGroup = new Group();
        for (let element of object) {
            newGroup.add(element);
        }
        return newGroup;
    }
}