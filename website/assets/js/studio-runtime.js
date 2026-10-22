(() => {
  const params = new URLSearchParams(location.search);
  const editMode = params.get("studioEdit") === "1";
  const ignored = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "SVG"]);
  const editable = "h1,h2,h3,h4,p,li,figcaption,.footer-tagline,.footer-nav a,.nav-row a,.nav-row button,.menu-link strong,.year-trigger";
  let selected = null;

  function pageKey() {
    const url = new URL(location.href);
    const keyParam = ["project", "paper", "place"].find((key) => url.searchParams.has(key));
    const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
    return pathname + (keyParam ? `?${keyParam}=${url.searchParams.get(keyParam)}` : "");
  }

  function selectorFor(element) {
    const parts = [];
    let node = element;
    while (node && node !== document.documentElement) {
      if (node.id) { parts.unshift(`#${CSS.escape(node.id)}`); break; }
      const tag = node.tagName.toLowerCase();
      const siblings = [...node.parentElement.children].filter((item) => item.tagName === node.tagName);
      parts.unshift(`${tag}:nth-of-type(${siblings.indexOf(node) + 1})`);
      node = node.parentElement;
    }
    return parts.join(" > ");
  }

  function readAll() {
    try { return JSON.parse(localStorage.getItem("rex-site-copy-v1") || "{}"); }
    catch { return {}; }
  }

  function applySaved() {
    const edits = readAll()[pageKey()] || {};
    for (const [selector, value] of Object.entries(edits)) {
      const node = document.querySelector(selector);
      if (node && node.textContent !== value) node.textContent = value;
    }
  }

  applySaved();
  const observer = new MutationObserver(() => { if (!editMode || !selected) applySaved(); });
  observer.observe(document.body, { childList: true, subtree: true });
  if (!editMode) {
    window.addEventListener("storage", (event) => { if (event.key === "rex-site-copy-v1") applySaved(); });
    return;
  }

  document.documentElement.classList.add("studio-edit-mode");
  const style = document.createElement("style");
  style.textContent = `.studio-edit-mode ${editable.replaceAll(",", ",.studio-edit-mode ")} { cursor: text; outline: 1px dashed #c9a64a; outline-offset: 3px; } .studio-edit-mode .studio-selected { outline: 2px solid #c9a64a; outline-offset: 4px; }`;
  document.head.append(style);
  document.addEventListener("click", (event) => {
    const node = event.target.closest(editable);
    if (!node || ignored.has(node.tagName)) return;
    event.preventDefault();
    event.stopPropagation();
    selected?.classList.remove("studio-selected");
    selected = node;
    selected.classList.add("studio-selected");
    parent.postMessage({ type: "studio-select", text: node.textContent.trim(), selector: selectorFor(node) }, location.origin);
  }, true);

  window.addEventListener("message", (event) => {
    if (event.origin !== location.origin || !selected) return;
    if (event.data?.type === "studio-preview-text") selected.textContent = event.data.text;
    if (event.data?.type === "studio-save-text") {
      const all = readAll();
      all[pageKey()] ||= {};
      all[pageKey()][selectorFor(selected)] = String(event.data.text);
      localStorage.setItem("rex-site-copy-v1", JSON.stringify(all));
      selected.textContent = String(event.data.text);
    }
    if (event.data?.type === "studio-reset-text") {
      const all = readAll();
      delete all[pageKey()]?.[selectorFor(selected)];
      localStorage.setItem("rex-site-copy-v1", JSON.stringify(all));
      location.reload();
    }
  });
})();
