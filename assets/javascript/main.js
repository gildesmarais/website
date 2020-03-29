window.addEventListener('DOMContentLoaded', function() {
  Array.from(document.querySelectorAll('[data-mousetrap]')).forEach(function(el) {
    Mousetrap.bind(el.innerText.toLowerCase(), function() {
      window.location.href = el.parentElement.href
    })
  })
})
