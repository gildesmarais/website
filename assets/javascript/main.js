;(function(window, document, Mousetrap) {
  "use strict"

  const options = { passive: true }

  const bindMousetrap = (el) => {
    Mousetrap.bind(el.innerText.toLowerCase(), _ => {
      window.location.href = el.parentElement.href
    })
  }

  const onDomContentLoad = _ => {
    Array.from(document.querySelectorAll("[data-mousetrap]")).forEach(
      bindMousetrap
    )

    Mousetrap.bind('j', _ => { window.scroll(0, window.scrollY + 16) })
    Mousetrap.bind('k', _ => { window.scroll(0, window.scrollY - 16) })
    Mousetrap.bind('g g', _ => { window.scroll(0, 0) })
    Mousetrap.bind('G', _ => { window.scroll(0, window.document.body.scrollHeight) })
    Mousetrap.bind('?', _ => { window.location.href = '/help' })
  }

  const onSwUpdate = _ => {
    if (!navigator.onLine) {
      return
    }

    const el = document.querySelector('#sw-update')
    el.hidden = false
    el.tabIndex = 0
    el.addEventListener('click', _ => { window.location.reload(true) }, options)
  }

  window.addEventListener("DOMContentLoaded", onDomContentLoad, options)
  window.addEventListener("sw.update", onSwUpdate, options)
  window.onSwUpdate = onSwUpdate

})(window, document, Mousetrap)
