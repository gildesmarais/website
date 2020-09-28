;((window, document, Mousetrap) => {
  const options = { passive: true }

  const bindMousetrap = ({ innerText, parentElement }) => {
    Mousetrap.bind(innerText.toLowerCase(), _ => {
      window.location.href = parentElement.href
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

  const onDomContentLoad = _ => {
    setupMousetrap()
  }

  window.addEventListener("DOMContentLoaded", onDomContentLoad, options)

  if (window.console && window.console.log) {
    const font = "font-family: monospace; font-size:16px; line-height: 2"

    window.console.log("%c👋🏽 Hey there!", `font-weight:bold;${font}`)
    window.console.log(
      "%c🧐 Looks like you are interested in my work. That's cool.",
      font
    )
    window.console.log(
      "%c📧 If you like what you see, don't hesitate to contact me!",
      font
    )
  }
})(window, document, Mousetrap)
