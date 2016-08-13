import fromImage from 'get-pixels';
import toImage from 'save-pixels';

import cannyFilter from './cannyFilter';
import drawCanvas from './drawCanvas';

export default function processImage(image) {

  let matx = new Matrix(fromImage(image));
  let processedMatx = cannyFilter(matx);
  let processedImage = toImage(processedMatx);
  drawCanvas(processedImage);

  return;
}

