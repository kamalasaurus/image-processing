import processImage from 'ImageProcessing/processImage';

// event handler
function submitFile(event) {
  var fileList = window
    .document
    .getElementById('file-input')
    .files;

  fileList.length > 0
    ? processImage(fileList[0])
    : console.error("no files uploaded!");

  event.stopPropagation();
  return false;
}

// main function adds click-event listener on submit button
void function() {
  window
    .document
    .getElementById('submit')
    .addEventListener('click', submitFile);
}();

