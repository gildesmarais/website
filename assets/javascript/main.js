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

    Mousetrap.bind('j', _ => { window.scroll(0, window.scrollY + 16) })
    Mousetrap.bind('k', _ => { window.scroll(0, window.scrollY - 16) })
    Mousetrap.bind('g g', _ => { window.scroll(0, 0) })
    Mousetrap.bind('G', _ => { window.scroll(0, window.document.body.scrollHeight) })
    Mousetrap.bind('?', _ => { window.location.href = '/help' })
  })
})(window, document, Mousetrap)
