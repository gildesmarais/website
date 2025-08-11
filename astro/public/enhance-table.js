// /public/enhance-table.js — reusable progressive table enhancement
;(() => {
  const tables = document.querySelectorAll("table[data-enhance]")
  const toNum = (s) => {
    const n = Number(String(s).replace(/[^\d.-]/g, ""))
    return Number.isNaN(n) ? null : n
  }
  const toDate = (s) => {
    const t = Date.parse(String(s))
    return Number.isNaN(t) ? null : t
  }
  const cellValue = (cell) => (cell?.getAttribute("data-value") ?? cell?.textContent ?? "").trim()

  for (const table of tables) {
    const thead = table.querySelector("thead")
    const tbody = table.querySelector("tbody")
    if (!thead || !tbody) continue

    const rows = Array.from(tbody.querySelectorAll("tr"))
    const ths = Array.from(thead.querySelectorAll("th"))
    const filterSel = table.getAttribute("data-filter")
    const filterInput = filterSel ? document.querySelector(filterSel) : null

    ths.forEach((th, colIdx) => {
      if (th.dataset.nosort !== undefined) return
      if (th.querySelector("button")) return
      const btn = document.createElement("button")
      btn.type = "button"
      btn.className += "border-0 outline contrast"
      btn.setAttribute("aria-label", `Sort by ${th.textContent?.trim() || "column"}`)
      while (th.firstChild) btn.appendChild(th.firstChild)
      th.appendChild(btn)

      btn.addEventListener("click", () => {
        const same = thead.querySelector("th[aria-sort]") === th
        const dir = same && th.getAttribute("aria-sort") === "ascending" ? "descending" : "ascending"
        thead.querySelectorAll("th[aria-sort]").forEach((h) => h.removeAttribute("aria-sort"))
        th.setAttribute("aria-sort", dir)

        const type = th.dataset.sortType || "auto"
        const valFn = (tr) => {
          const cell = tr.children[colIdx] || tr.querySelector("th, td")
          const raw = cellValue(cell)
          if (type === "number") return toNum(raw) ?? raw.toLowerCase()
          if (type === "date") return toDate(raw) ?? raw.toLowerCase()
          const n = toNum(raw)
          if (n !== null) return n
          const d = toDate(raw)
          if (d !== null) return d
          return raw.toLowerCase()
        }

        const sorted = rows.slice().sort((a, b) => {
          const av = valFn(a),
            bv = valFn(b)
          let r = av < bv ? -1 : av > bv ? 1 : 0
          return dir === "ascending" ? r : -r
        })
        tbody.replaceChildren(...sorted)

        const p = new URLSearchParams(location.search)
        p.set("sort", th.dataset.colId || String(colIdx))
        p.set("dir", dir === "ascending" ? "asc" : "desc")
        history.replaceState(null, "", p.toString() ? "?" + p.toString() : location.pathname)
      })
    })

    const applyFilter = (term) => {
      const t = term.trim().toLowerCase()
      rows.forEach((tr) => (tr.hidden = t && !(tr.textContent || "").toLowerCase().includes(t)))
      const p = new URLSearchParams(location.search)
      if (t) p.set("q", t)
      else p.delete("q")
      history.replaceState(null, "", p.toString() ? "?" + p.toString() : location.pathname)
    }

    if (filterInput) filterInput.addEventListener("input", () => applyFilter(filterInput.value))

    const params = new URLSearchParams(location.search)
    if (filterInput && params.get("q")) {
      filterInput.value = params.get("q")
      applyFilter(filterInput.value)
    }
    const sortId = params.get("sort")
    const dir = params.get("dir")
    if (sortId !== null) {
      const th = ths.find((h) => h.dataset.colId === sortId) || ths[Number(sortId)]
      const btn = th?.querySelector("button")
      if (btn) {
        btn.click()
        if (dir === "desc") btn.click()
      }
    }
  }
})()
