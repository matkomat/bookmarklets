var downloadRename = function (url, fileName) {
window.URL = window.URL || window.webkitURL;

var xhr = new XMLHttpRequest(),
      a = document.createElement('a'), file;

xhr.open('GET', url, true);
xhr.responseType = 'blob';
xhr.onload = function () {
    file = new Blob([xhr.response], { type : 'application/octet-stream' });
    a.href = window.URL.createObjectURL(file);
    a.download = fileName;  // Set to whatever file name you want
    // Now just click the link you created
    // Note that you may have to append the a element to the body somewhere
    // for this to work in Firefox
    a.click();
};
xhr.send();
};
