import Matrix from './Matrix';

export default function cannyFilter(inputMatrix) {
  const dx = new Matrix('-1 1, -1 1');
  const dy = new Matrix('1 1, -1 -1');

  return inputMatrix.blur(5);
}

