const ready = (() => {
  const makeEmailLinkClickable = () => {
    const body = encodeURIComponent(
      `Hi Gil,\nI found your contact details on ${window.location.href}\n`,
    );

    [].forEach.call(document.querySelectorAll("[data-mail]"), (el) => {
      el.href = `mailto:${el.dataset.mail}?body=${body}`;
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

  return (_) => {
    [setupPronunciation, makeEmailLinkClickable, printToConsole].forEach((fn) =>
      globalThis.setTimeout(fn, 0),
    );
  };
})();

if (typeof document !== "undefined") {
  document.readyState !== "loading"
    ? ready()
    : document.addEventListener("DOMContentLoaded", ready);
}
