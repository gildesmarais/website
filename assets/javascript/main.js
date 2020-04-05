;(function(window, document, Mousetrap) {
  "use strict"

  function bindMousetrap(el) {
    Mousetrap.bind(el.innerText.toLowerCase(), function() {
      window.location.href = el.parentElement.href
    })
  }

  window.addEventListener("DOMContentLoaded", function() {
    Array.from(document.querySelectorAll("[data-mousetrap]")).forEach(
      bindMousetrap
    )
  })
})(window, document, Mousetrap)
