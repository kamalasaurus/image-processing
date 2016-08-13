import fromImage from 'get-pixels';
import toImage from 'save-pixels';

import Matrix from './Matirx';
import cannyFilter from './cannyFilter';
import drawCanvas from './drawCanvas';

export default function processImage(image) {
  const matx = new Matrix(fromImage(image));
  const processedMatx = cannyFilter(matx);
  const processedImage = toImage(processedMatx);
  drawCanvas(processedImage);

  return;
}

