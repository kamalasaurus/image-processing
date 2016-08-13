import fromImage from 'get-pixels';
import toImage from 'save-pixels';

import Matrix from './Matirx';
import cannyFilter from './cannyFilter';
import drawCanvas from './drawCanvas';

export default function processImage(image) {
  const reader = new FileReader();
  reader.readAsDataURL(image);

  const matx = new Matrix(fromImage(reader.result));
  const processedMatx = cannyFilter(matx);
  const processedImage = toImage(processedMatx, 'canvas');
  drawCanvas(processedImage);

  return;
}

