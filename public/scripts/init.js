// handle theme.colorMode
(() => {
  const THEME_STORAGE_KEY = "violet-ui-theme";
  let theme = {};
  let isDark = false;
  try {
    theme = JSON.parse(localStorage.getItem(THEME_STORAGE_KEY));
  } catch (_error) {}
  const colorMode = theme.colorMode;
  if (colorMode === "system") {
    isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  if (colorMode === "dark") {
    isDark = true;
  }
  if (isDark) {
    document.documentElement.classList.add("dark");
  }
})();

// handle theme.palette
(() => {
  const THEME_PALETTE_STYLE_STORAGE_KEY = "violet-ui-theme-palette-style";
  const styleString = localStorage.getItem(THEME_PALETTE_STYLE_STORAGE_KEY);
  if (styleString) {
    document.head.insertAdjacentHTML(
      "beforeend",
      `<style id="theme-palette-initial">${styleString}</style>`
    );
  }
})();
