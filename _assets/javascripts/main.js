(function() {
  'use strict'

  var element = document.querySelector('[data-timed-display]')
  if ((Date.now() - Date.parse(element.dataset.postDate)) < 60 * 60 * 24 * 30 * 1000) {
    element.classList.toggle('index__post--hidden')
  }
}())
