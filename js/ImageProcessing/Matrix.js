
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
    }

    this.matrix = () => matrix;
    this.parse = () => unpack(matrix);
    this.parseToString = () => {
      return unpack(matrix)
        .map((row) => row.join(' '))
        .map((col) => col.join(',\n'));
    }

    return this;
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

  size() {
    return this.matrix().shape();
  }

  conv(kernel) {
    let out = zeros(this.matrix.shape());
    conv(out, this.matrix(), kernel.matrix());
    return new Matrix(out);
  }

  multiply(mat) {
    let out = zeros(this.matrix().shape()[0], mat.matrix().shape()[1]);
    mult(out, this.matrix(), mat.matrix());
    return new Matrix(out);
  }

  // element-wise exponentiation
  exp(ord) {
    let copy = pack(unpack(this.matrix()));
    ops(copy, ord);
    return new Matrix(copy);
  }

  // element-wise multiplication
  scalarMult(scalar) {
    let out = zeros(this.matrix());
    ops.mul(out, this.matrix(), scalar);
    return new Matrix(out);
  }

}
