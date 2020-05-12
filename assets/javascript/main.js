;(function(window, document, Mousetrap) {
  "use strict"

  const options = { passive: true }

  const bindMousetrap = el => {
    Mousetrap.bind(el.innerText.toLowerCase(), _ => {
      window.location.href = el.parentElement.href
    })
  }

  const setupMousetrap = () => {
    Array.from(document.querySelectorAll("[data-mousetrap]")).forEach(
      bindMousetrap
    )

    Mousetrap.bind("j", _ => {
      window.scroll(0, window.scrollY + 16)
    })
    Mousetrap.bind("k", _ => {
      window.scroll(0, window.scrollY - 16)
    })
    Mousetrap.bind("g g", _ => {
      window.scroll(0, 0)
    })
    Mousetrap.bind("G", _ => {
      window.scroll(0, window.document.body.scrollHeight)
    })
    Mousetrap.bind("?", _ => {
      window.location.href = "/help"
    })
    Mousetrap.bind("t", _ => {
      window.location.href = "/tag"
    })
  }

  const setupGlider = () => {
    const el = document.querySelector('.glider')
    if (!el) { return }

    return new Glider(el, {
      slidesToShow: 2,
      dots: '#dots',
      draggable: true,
    })
  }

  const onDomContentLoad = _ => {
    setupMousetrap()
    setupGlider()
  }

  const onSwUpdate = _ => {
    if (!navigator.onLine) {
      return
    }

    window.setTimeout(_ => window.location.reload(true), 100)
  }

  window.addEventListener("DOMContentLoaded", onDomContentLoad, options)
  window.addEventListener("sw.update", onSwUpdate, options)
})(window, document, Mousetrap)
