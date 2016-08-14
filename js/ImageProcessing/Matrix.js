
// This should be a monad that always returns a new Matrix object

import ops from 'ndarray-ops';
import mult from 'ndarray-gemm';
import conv from 'ndarray-convolve';
import gauss from 'ndarray-gaussian-filter';
import pack from 'ndarray-pack';
import unpack from 'ndarray-unpack';
import isnd from 'isndarray';
import zeros from 'zeros';

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
        return new Matrix(zeros([1, 1]));
    }

    this.matrix = () => matrix;
    this.parse = () => unpack(matrix);
    this.parseToString = () => {
      return unpack(matrix)
        .map((row) => row.join(' '))
        .map((col) => col.join(',\n'));
    };

    return this;
  }

  typeCheck(input) {
    const types = [
      isnd,
      Array.isArray,
      (str) => str.constructor === String,
    ];
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
    const out = zeros(this.size());
    conv(out, this.matrix(), kernel.matrix());
    return new Matrix(out);
  }

  multiply(mat) {
    const out = zeros(this.size()[0], mat.size()[1]);
    mult(out, this.matrix(), mat.matrix());
    return new Matrix(out);
  }

  // element-wise exponentiation
  exp(ord) {
    const copy = pack(unpack(this.matrix()));
    ops(copy, ord);
    return new Matrix(copy);
  }

  // element-wise multiplication
  scalarMult(scalar) {
    const out = zeros(this.size());
    ops.mul(out, this.matrix(), scalar);
    return new Matrix(out);
  }

  blur(radius) {
    const out = zeros(this.size());
    ops.adds(out, this.matrix(), 0);
    gauss(out, radius);
    return out;
  }

}

