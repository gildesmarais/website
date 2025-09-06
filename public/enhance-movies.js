// Progressive enhancement for movies page
;(() => {
  if (!window.fetch) return

  const CONFIG = {
    searchDebounceMs: 300,
    selectors: {
      forms: 'form[method="GET"]',
      searchInput: "#movieFilter",
      grid: ".recommendations-grid",
      controls: ".filter-sort-controls",
      searchForm: ".search-form",
    },
  }

  const state = {
    forms: [],
    searchInput: null,
    isProcessing: false,
  }

  const initializeElements = () => {
    state.forms = Array.from(document.querySelectorAll(CONFIG.selectors.forms))
    state.searchInput = document.querySelector(CONFIG.selectors.searchInput)
  }
  const LoadingState = {
    add(form) {
      const button = form.querySelector('button[type="submit"]')
      if (button) {
        button.disabled = true
        button.textContent = button.textContent.replace(/[▲▼]/, "") + " ⏳"
      }
    },

    remove(form) {
      const button = form.querySelector('button[type="submit"]')
      if (button) {
        button.disabled = false
        const text = button.textContent.replace(" ⏳", "")
        if (text.includes("Title")) button.textContent = text + " ▲"
        else if (text.includes("Year")) button.textContent = text + " ▲"
        else if (text.includes("My Rating")) button.textContent = text + " ▲"
        else if (text.includes("IMDb Rating")) button.textContent = text + " ▲"
        else if (text.includes("Runtime")) button.textContent = text + " ▲"
        else button.textContent = text
      }
    },
  }
  const ContentUpdater = {
    async updateFromResponse(url) {
      const response = await fetch(url)
      if (!response.ok) throw new Error("Network error")

      const html = await response.text()
      const parser = new DOMParser()
      return parser.parseFromString(html, "text/html")
    },

    updatePageContent(doc) {
      const newGrid = doc.querySelector(CONFIG.selectors.grid)
      const newControls = doc.querySelector(CONFIG.selectors.controls)
      const newSearchForm = doc.querySelector(CONFIG.selectors.searchForm)

      if (newGrid) {
        const currentGrid = document.querySelector(CONFIG.selectors.grid)
        if (currentGrid) currentGrid.innerHTML = newGrid.innerHTML
      }

      if (newControls) {
        const currentControls = document.querySelector(CONFIG.selectors.controls)
        if (currentControls) {
          currentControls.innerHTML = newControls.innerHTML
          attachFormListeners()
        }
      }

      if (newSearchForm) {
        const newInput = newSearchForm.querySelector(CONFIG.selectors.searchInput)
        const currentInput = document.querySelector(CONFIG.selectors.searchInput)
        if (newInput && currentInput) {
          currentInput.value = newInput.value
        }
      }
    },
  }

  const handleFormSubmit = async (form) => {
    if (state.isProcessing) return
    state.isProcessing = true

    try {
      LoadingState.add(form)

      const formData = new FormData(form)
      const params = new URLSearchParams(formData)
      const url = `${window.location.pathname}?${params.toString()}`

      const doc = await ContentUpdater.updateFromResponse(url)
      ContentUpdater.updatePageContent(doc)

      history.pushState(null, "", url)
    } catch (error) {
      console.warn("Enhancement failed, falling back to page reload:", error)
      form.submit()
    } finally {
      LoadingState.remove(form)
      state.isProcessing = false
    }
  }
  const SearchHandler = {
    timeout: null,

    init() {
      if (!state.searchInput) return

      state.searchInput.addEventListener("input", () => {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          const form = state.searchInput.closest("form")
          if (form) form.dispatchEvent(new Event("submit"))
        }, CONFIG.searchDebounceMs)
      })
    },
  }

  const FormManager = {
    attachListeners(forms) {
      forms.forEach((form) => {
        if (form.hasAttribute("data-enhanced")) return

        form.setAttribute("data-enhanced", "true")
        form.addEventListener("submit", (e) => {
          e.preventDefault()
          handleFormSubmit(form)
        })
      })
    },

    attachFormListeners() {
      const newForms = document.querySelectorAll(`${CONFIG.selectors.forms}:not([data-enhanced])`)
      this.attachListeners(Array.from(newForms))
    },
  }

  const NavigationHandler = {
    async handlePopState() {
      try {
        const doc = await ContentUpdater.updateFromResponse(window.location.href)
        ContentUpdater.updatePageContent(doc)
      } catch (error) {
        console.warn("Enhancement failed, reloading page:", error)
        window.location.reload()
      }
    },
  }

  const init = () => {
    initializeElements()
    FormManager.attachListeners(state.forms)
    SearchHandler.init()
    window.addEventListener("popstate", NavigationHandler.handlePopState)
  }

  init()
})()
