function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var MAX_FONT_SIZE = 21;
var MIN_FONT_SIZE = 13;
var CUTOFF = 16;
var MAX_LENGTH = 64;

function scaleFontSize(len) {
  if (len < CUTOFF) {
    return MAX_FONT_SIZE;
  }
  return MAX_FONT_SIZE - (MAX_FONT_SIZE - MIN_FONT_SIZE) * ((len - CUTOFF) / (MAX_LENGTH - CUTOFF));
}

function prepareText(text) {
  if (text.length > MAX_LENGTH) {
    text = text.substring(0, MAX_LENGTH);
  }
  return {size: scaleFontSize(text.length), comment: text};
}

var comment = getParameterByName('q');
if (comment) {
    var el = document.getElementById("comment");
    var text = prepareText(comment);
    el.appendChild(document.createTextNode(text.comment));
    el.style['font-size'] = text.size + 'px';
}
