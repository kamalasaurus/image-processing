import processImage from './ImageProcessing/processImage';

// event handler
function submitFile(event) {
  const fileList = document
    .getElementById('file-input')
    .files;

  if (fileList.length > 0) {
    processImage(fileList[0]);
  } else {
    console.error('no files uploaded!');
  }

  event.stopPropagation();
  return false;
}

// main function adds click-event listener on submit button
void function init() {
  document
    .getElementById('submit')
    .addEventListener('click', submitFile);
}();

