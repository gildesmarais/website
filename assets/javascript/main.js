;(() => {
  const options = { passive: true }

  const bindMousetrap = ({ innerText, parentElement }) => {
    Mousetrap.bind(innerText.toLowerCase(), (_) => {
      window.location.href = parentElement.href
    })
  }

  const setupMousetrap = () => {
    ;[].forEach.call(document.querySelectorAll("[data-mousetrap]"), bindMousetrap)

    Mousetrap.bind("m", (_) => {
      const checkbox = document.querySelector("#_nav-checkbox")
      checkbox.checked = !checkbox.checked
    })
    Mousetrap.bind("j", (_) => {
      window.scroll(0, window.scrollY + 16)
    })
    Mousetrap.bind("k", (_) => {
      window.scroll(0, window.scrollY - 16)
    })
    Mousetrap.bind("g g", (_) => {
      window.scroll(0, 0)
    })
    Mousetrap.bind("G", (_) => {
      window.scroll(0, window.document.body.scrollHeight)
    })
    Mousetrap.bind("?", (_) => {
      window.location.href = "/help"
    })
    Mousetrap.bind("t", (_) => {
      window.location.href = "/tag"
    })
  }

  const makeEmailLinkClickable = (_) => {
    const body = encodeURIComponent(`Hi Gil,\nI found your contact details on ${window.location.href}\n`)

    ;[].forEach.call(document.querySelectorAll("[data-mail]"), (el) => {
      el.href = `mailto:${el.dataset.mail}?body=${body}`
    })
  }

  const lockBodySizeOnNavMenuOpen = () => {
    const el = document.querySelector("#_nav-checkbox")
    el.addEventListener(
      "change",
      ({ target }) => {
        document.body.classList.toggle("body--nav-open", target.checked)
      },
      options
    )
  }

  const setupHeadroom = (_) => {
    const headroom = new Headroom(document.querySelector("body > header"))
    headroom.init()
  }

  const setupNavigationA11y = (_) => {
    const checkbox = document.querySelector("#_nav-checkbox")

    const handler = (event) => {
      // code 32 == space
      if (event.keyCode !== 32) return

      event.preventDefault()
      checkbox.checked = !checkbox.checked
    }

    ;[].forEach.call(document.querySelectorAll("[data-nav-toggle]"), (el) => {
      el.addEventListener("click", handler)
      el.addEventListener("keydown", handler)
    })
  }

  const setupGlide = (_) => {
    if (!window.Glide) {
      return
    }
    ;[].forEach.call(document.querySelectorAll(".glide"), (el) => {
      const glide = new Glide(el)
      glide.mount()
    })
  }

  const onDomContentLoad = (_) => {
    setupHeadroom()
    setupNavigationA11y()
    lockBodySizeOnNavMenuOpen()
    setupMousetrap()
    makeEmailLinkClickable()
    setupGlide()
  }

  window.addEventListener("DOMContentLoaded", onDomContentLoad, options)

  if (window.console && window.console.log) {
    const font = "font-family: var(--font-mono); font-size: 1rem; line-height: 1.618"

    window.console.log("%c👋🏽 Hey there!", `font-weight: 700;${font}`)
    window.console.log("%c🧐 Looks like you are interested in my work. That's cool.", font)
    window.console.log("%c📧 If you like what you see, don't hesitate to contact me!", font)
  }
})()
