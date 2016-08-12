
// This should be a monad that always returns a new Matrix object

import ops from "ndarray-ops"
import mult from "ndarray-gemm";
import pack from "ndarray-pack";
import unpack from "ndarray-unpack";
import isnd from "isndarray";
import zeros from "zeros";

export default class Matrix {

  constructor(input) {
    let matrix;

    switch (this.typeheck(input)) {
      case 0:
        matrix = input;
        break;
      case 1:
        matrix = pack(input);
        break;
      case 2:
        matrix = this.parseStringInput(input);
        break;
      default:
        return new Matrix(zeros([1,1]));
        break;
    }

    this.matrix = () => {
      return matrix;
    }

    this.parseMatrix = () => {
      return unpack(matrix);
    }
  }

  typeCheck(input) {
    const types = [isnd, Array.isArray, (el) => el.constructor === String];
    return types
      .map((check) => check(input))
      .indexOf(true);
  }

  parseStringInput(input) {
    const nestedArrays = input.split(',')
      .map((str) => str.trim().split(' '));
    return pack(nestedArrays);
  }

  conv(kernel) {

  }

  multiply(mat) {

  }

  exp(ord) {

  }

}
