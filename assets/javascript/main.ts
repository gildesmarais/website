
import Headroom from "headroom.js";
import Glide from '@glidejs/glide';

namespace Utils {
  export function makeEmailLinkClickable(): void {
    const body = encodeURIComponent(`Hi Gil,\nI found your contact details on ${window.location.href}\n`);

    document.querySelectorAll("a[data-mail]").forEach(el => {
      if (el instanceof HTMLAnchorElement) {
        el.href = `mailto:${el.dataset.mail}?body=${body}`;
      }
    });
  }

  export function lockBodySizeOnNavMenuOpen(): void {
    let el: HTMLInputElement = document.querySelector("#_nav-checkbox");
    el.addEventListener("change", ({ target }) => {
      document.body.classList.toggle("body--nav-open", (target as HTMLInputElement).checked);
    });
  }

  export function setupHeadroom(): void {
    const headroom = new Headroom(document.querySelector("body > header"));
    headroom.init();
  }

  export function setupNavigationA11y(): void {
    let checkbox: HTMLInputElement = document.querySelector("#_nav-checkbox");

    const handler = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.code !== " ")
        return;

      event.preventDefault();
      checkbox.checked = !checkbox.checked;
    }

    document.querySelectorAll("[data-nav-toggle]").forEach(el => {
      el.addEventListener("click", handler);
      el.addEventListener("keydown", handler);
    });
  }

  export function setupGlide(): void {
    document.querySelectorAll(".glide").forEach((el, key) => {
      if (!el.id) {
        el.id = `glide-${key}`
      }

      const glide = new Glide(el.id);
      glide.mount();
    });
  }

  export function printMessageOnConsole(): void {
    if (window.console && window.console.log) {
      const font = "font-family: var(--font-mono); font-size: 1rem; line-height: 1.61";

      window.console.log("%c👋🏽 Hey there!", `font-weight: 700;${font}`);
      window.console.log("%c🧐 Looks like you are interested in my work. That's cool.", font);
      window.console.log("%c📧 If you like what you see, don't hesitate to contact me!", font);
    }
  }
}

window.addEventListener("DOMContentLoaded", function () {
  Utils.setupHeadroom();
  Utils.setupNavigationA11y();
  Utils.lockBodySizeOnNavMenuOpen();
  Utils.makeEmailLinkClickable();
  Utils.setupGlide();
  Utils.printMessageOnConsole();
});

