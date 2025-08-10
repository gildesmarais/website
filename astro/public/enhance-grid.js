// /public/enhance-grid.js — reusable progressive grid enhancement
(() => {
  const grids = document.querySelectorAll("[data-enhance-grid]");
  const toNum = (s) => {
    const n = Number(String(s).replace(/[^\d.-]/g, ""));
    return Number.isNaN(n) ? null : n;
  };
  const toDate = (s) => {
    const t = Date.parse(String(s));
    return Number.isNaN(t) ? null : t;
  };

  for (const grid of grids) {
    const filterSel = grid.getAttribute("data-filter");
    const filterInput = filterSel ? document.querySelector(filterSel) : null;
    const items = Array.from(grid.children);

    const sortButtons = document.querySelectorAll("[data-sort-by]");
    const filterButtons = document.querySelectorAll("[data-filter-by]");

    let currentFilters = new Map();

    const applySort = (sortBy, sortDir, updateHistory = true) => {
      const visibleItems = items.filter((item) => !item.hidden);
      const hiddenItems = items.filter((item) => item.hidden);

      const sortedVisible = visibleItems.slice().sort((a, b) => {
        const aVal = a.dataset[sortBy];
        const bVal = b.dataset[sortBy];

        const numA = toNum(aVal);
        const numB = toNum(bVal);

        let valA, valB;

        if (numA !== null && numB !== null) {
          valA = numA;
          valB = numB;
        } else {
          valA = aVal.toLowerCase();
          valB = bVal.toLowerCase();
        }

        if (valA < valB) return sortDir === "asc" ? -1 : 1;
        if (valA > valB) return sortDir === "asc" ? 1 : -1;
        return 0;
      });

      grid.replaceChildren(...sortedVisible, ...hiddenItems);

      if (updateHistory) {
        const p = new URLSearchParams(location.search);
        p.set("sort", sortBy);
        p.set("dir", sortDir);
        history.replaceState(
          null,
          "",
          p.toString() ? "?" + p.toString() : location.pathname,
        );
      }
    };

    sortButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const sortBy = button.dataset.sortBy;
        const currentDir = button.dataset.sortDir || "asc";
        const newDir = currentDir === "asc" ? "desc" : "asc";

        sortButtons.forEach((btn) => {
          if (btn !== button) {
            btn.removeAttribute("data-sort-dir");
          }
        });
        button.dataset.sortDir = newDir;
        applySort(sortBy, newDir);
      });
    });

    const applyFilters = (updateHistory = true) => {
      const term = (filterInput ? filterInput.value : "").trim().toLowerCase();
      items.forEach((item) => {
        const textMatch =
          !term || (item.textContent || "").toLowerCase().includes(term);
        const filterMatch = [...currentFilters.entries()].every(
          ([key, value]) => item.dataset[key] === value,
        );
        item.hidden = !(textMatch && filterMatch);
      });

      if (updateHistory) {
        const p = new URLSearchParams();
        if (term) p.set("q", term);
        currentFilters.forEach((value, key) => p.set(key, value));
        const sortButton = document.querySelector(
          "[data-sort-by][data-sort-dir]",
        );
        if (sortButton) {
          p.set("sort", sortButton.dataset.sortBy);
          p.set("dir", sortButton.dataset.sortDir);
        }
        history.replaceState(
          null,
          "",
          p.toString() ? "?" + p.toString() : location.pathname,
        );
      }
    };

    if (filterInput) {
      filterInput.addEventListener("input", () => applyFilters());
    }

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filterBy = button.dataset.filterBy;
        const filterValue = button.dataset.filterValue;

        if (currentFilters.get(filterBy) === filterValue) {
          currentFilters.delete(filterBy);
          button.removeAttribute("data-sort-dir");
        } else {
          currentFilters.set(filterBy, filterValue);
          filterButtons.forEach((btn) => {
            if (btn.dataset.filterBy === filterBy && btn !== button) {
              btn.removeAttribute("data-sort-dir");
            }
          });
          button.dataset.sortDir = "asc";
        }
        applyFilters();
      });
    });

    const params = new URLSearchParams(location.search);
    if (filterInput && params.get("q")) {
      filterInput.value = params.get("q");
    }

    const toCamelCase = (s) =>
      s.replace(/([-_][a-z])/g, (g) =>
        g.toUpperCase().replace("-", "").replace("_", ""),
      );

    params.forEach((value, key) => {
      if (key !== "q" && key !== "sort" && key !== "dir") {
        // Handle the parameter name as-is first, then try camelCase conversion
        let targetKey = key;
        let btn = document.querySelector(
          `[data-filter-by="${targetKey}"][data-filter-value="${value}"]`,
        );

        // If not found and key contains dashes/underscores, try camelCase
        if (!btn && (key.includes('-') || key.includes('_'))) {
          targetKey = toCamelCase(key);
          btn = document.querySelector(
            `[data-filter-by="${targetKey}"][data-filter-value="${value}"]`,
          );
        }

        if (btn) {
          currentFilters.set(targetKey, value);
          btn.dataset.sortDir = "asc";
        }
      }
    });

    // Apply initial filters without updating history
    applyFilters(false);

    const sortId = params.get("sort");
    const dir = params.get("dir") || "asc";
    if (sortId) {
      const sortButton = document.querySelector(`[data-sort-by="${sortId}"]`);
      if (sortButton) {
        sortButton.dataset.sortDir = dir;
        // Apply initial sort without updating history
        applySort(sortId, dir, false);
      }
    }

    // Update history once after initial setup
    const p = new URLSearchParams(location.search);
    history.replaceState(
      null,
      "",
      p.toString() ? "?" + p.toString() : location.pathname,
    );
  }
})();
