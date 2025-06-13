import { int } from "three/src/nodes/TSL.js";

export default function (start, end, factor) {
    return (1 - factor) * start + factor * end;
}
//performs interpolation between two values
// Linear interpolation (lerp) is a mathematical operation that calculates a point between two values based on a given factor. It is commonly used in computer graphics, animations, and simulations to create smooth transitions between values. The formula for lerp is: