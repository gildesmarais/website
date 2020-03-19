window.addEventListener('DOMContentLoaded', function() {
  Array.from(document.querySelectorAll('kbd')).forEach(function(el) {
    Mousetrap.bind(el.innerText.toLowerCase(), function() {
      window.location.href = el.parentElement.href
    })
  })
})
