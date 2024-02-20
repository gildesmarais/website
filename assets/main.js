const ready = (() => {
  const makeEmailLinkClickable = () => {
    const body = encodeURIComponent(
      `Hi Gil,\nI found your contact details on ${window.location.href}\n\n`,
    );

    [].forEach.call(document.querySelectorAll("[data-mail]"), (el) => {
      const span = document.createElement("span");
      span.innerHTML = atob(el.dataset.mail);
      const mail = span.innerText;
      delete el.dataset.mail;

      el.href = `mailto:${mail}?body=${body}`;
    });
  };

  const setupPronunciation = () => {
    const el = document.getElementById("pronunciation");
    if (!el) {
      return;
    }

    el.addEventListener("click", () => {
      el.querySelector("audio").play();
    });
  };

  const printToConsole = () => {
    if (!window.console?.log) {
      return;
    }

    const font =
      "font-family: var(--font-mono); font-size: 1rem; line-height: 1.61";

    window.console.log("%c👋🏽 Hey there!", `font-weight: 700;${font}`);
    window.console.log(
      "%c🧐 Looks like you are interested in my work. That's cool.",
      font,
    );
    window.console.log(
      "%c📧 If you like what you see, don't hesitate to contact me!",
      font,
    );
  };

  const setupNoContextMenu = () => {
    if (!document.querySelector("[data-nocontextmenu]")) {
      return;
    }

    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  };

  return (_) => {
    [
      setupPronunciation,
      makeEmailLinkClickable,
      printToConsole,
      setupNoContextMenu,
    ].forEach((fn) => globalThis.setTimeout(fn, 0));
  };
})();

if (typeof document !== "undefined") {
  document.readyState !== "loading"
    ? ready()
    : document.addEventListener("DOMContentLoaded", ready);
}
