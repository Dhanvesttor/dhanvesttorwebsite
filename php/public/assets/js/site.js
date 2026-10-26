// Site behaviour that React and Motion provided in the Next.js version: header, mega menu, mobile menu,
// scroll reveal, count-up stats, tabs, FAITH letters, "What we do" panels, hero parallax and AJAX forms.
// Everything degrades gracefully: without this file all content is visible and forms post normally.
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const words = (s) => (s || "").split(/\s+/).filter(Boolean);
  const nextFrame = (fn) => requestAnimationFrame(() => requestAnimationFrame(fn));

  /** Swap an element's classes between its data-on and data-off sets. */
  const swap = (el, on) => {
    el.classList.remove(...words(on ? el.dataset.off : el.dataset.on));
    el.classList.add(...words(on ? el.dataset.on : el.dataset.off));
  };
  const setActive = (root, on) => [root, ...$$("[data-on],[data-off]", root)].forEach((el) => ("on" in el.dataset || "off" in el.dataset) && swap(el, on));

  /* ---------- Header: shadow once scrolled ---------- */
  const header = document.querySelector("[data-header]");
  if (header) {
    let scrolled = null;
    const onScroll = () => {
      const s = window.scrollY > 8;
      if (s === scrolled) return;
      scrolled = s;
      header.classList.remove(...words(s ? header.dataset.top : header.dataset.scrolled));
      header.classList.add(...words(s ? header.dataset.scrolled : header.dataset.top));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---------- Mega menu (desktop) ---------- */
    const panels = new Map($$("[data-mega]", header).map((p) => [p.dataset.mega, p]));
    let openName = null, timer = 0;
    const trigger = (name) => header.querySelector(`[data-mega-trigger="${CSS.escape(name)}"] > a`);
    const close = (name, now = false) => {
      const p = panels.get(name);
      if (!p) return;
      p.classList.remove("is-open");
      trigger(name)?.setAttribute("aria-expanded", "false");
      if (now) p.hidden = true;
      else setTimeout(() => { if (!p.classList.contains("is-open")) p.hidden = true; }, 230);
      if (openName === name) openName = null;
    };
    const show = (name) => {
      clearTimeout(timer);
      if (openName === name) return;
      if (openName) close(openName, true);
      const p = panels.get(name);
      p.hidden = false;
      nextFrame(() => p.classList.add("is-open"));
      trigger(name)?.setAttribute("aria-expanded", "true");
      openName = name;
    };
    const hide = () => { clearTimeout(timer); timer = setTimeout(() => openName && close(openName), 120); };

    $$("[data-mega-trigger]", header).forEach((li) => {
      li.addEventListener("mouseenter", () => show(li.dataset.megaTrigger));
      li.addEventListener("mouseleave", hide);
      li.querySelector("a").addEventListener("focus", () => show(li.dataset.megaTrigger));
    });
    $$("nav li, header ul > li", header).forEach((li) => !li.dataset.megaTrigger && li.addEventListener("mouseenter", hide));
    panels.forEach((p, name) => { p.addEventListener("mouseenter", () => show(name)); p.addEventListener("mouseleave", hide); });
    header.addEventListener("mouseleave", hide);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && openName) { const n = openName; close(n, true); trigger(n)?.focus(); } });
    document.addEventListener("focusin", (e) => { if (openName && !header.contains(e.target)) close(openName, true); });

    /* ---------- Mobile menu (drawer) ---------- */
    const menu = document.querySelector("[data-mobile-menu]");
    const openBtn = header.querySelector("[data-menu-open]");
    if (menu && openBtn) {
      const aside = menu.querySelector("aside");
      const isOpen = () => menu.classList.contains("is-open");
      const openMenu = () => {
        menu.hidden = false;
        document.documentElement.style.overflow = "hidden";
        openBtn.setAttribute("aria-expanded", "true");
        nextFrame(() => menu.classList.add("is-open"));
        aside.querySelector("[data-menu-close]").focus({ preventScroll: true });
      };
      const closeMenu = (restoreFocus = true) => {
        if (!isOpen()) return;
        menu.classList.remove("is-open");
        document.documentElement.style.overflow = "";
        openBtn.setAttribute("aria-expanded", "false");
        setTimeout(() => { if (!isOpen()) menu.hidden = true; }, 360);
        if (restoreFocus) openBtn.focus({ preventScroll: true });
      };
      openBtn.addEventListener("click", openMenu);
      $$("[data-menu-close]", menu).forEach((b) => b.addEventListener("click", () => closeMenu()));
      $$("a", aside).forEach((a) => a.addEventListener("click", () => closeMenu(false)));
      menu.addEventListener("keydown", (e) => {
        if (e.key === "Escape") return closeMenu();
        if (e.key !== "Tab") return;
        const items = $$("a[href], button:not([tabindex='-1'])", aside);
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });
      window.matchMedia("(min-width: 1024px)").addEventListener("change", (m) => m.matches && closeMenu(false));
    }
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = $$("[data-reveal]");
  if (reduce || !("IntersectionObserver" in window)) reveals.forEach((el) => el.classList.add("is-in"));
  else {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -10% 0px" });
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Count-up numbers ---------- */
  const counters = $$("[data-count]");
  if (!reduce && "IntersectionObserver" in window && counters.length) {
    const run = (el) => {
      const target = parseFloat(el.dataset.count), dec = el.dataset.count.includes(".") ? 2 : 0, start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / 1200), eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(dec);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { io.unobserve(en.target); run(en.target); }
    }), { rootMargin: "-10% 0px" });
    counters.forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight) el.textContent = el.dataset.count.includes(".") ? "0.00" : "0";
      io.observe(el);
    });
  }

  /* ---------- Tabs ---------- */
  $$("[data-tabs]").forEach((root) => {
    const tabs = $$("[role=tab]", root);
    const select = (i, focus = false) => tabs.forEach((t, k) => {
      const on = k === i;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      swap(t, on);
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      if (on && focus) t.focus();
    });
    tabs.forEach((t, k) => {
      t.tabIndex = k === 0 ? 0 : -1;
      t.addEventListener("click", () => select(k));
      t.addEventListener("keydown", (e) => {
        const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (d) { e.preventDefault(); select((k + d + tabs.length) % tabs.length, true); }
      });
    });
  });

  /* ---------- FAITH letters ---------- */
  $$("[data-faith]").forEach((root) => {
    const letters = $$("[role=tab]", root), panels = $$("[data-faith-panel]", root);
    let current = 0;
    const select = (i) => {
      if (i === current) return;
      current = i;
      letters.forEach((b, k) => { swap(b, k === i); b.setAttribute("aria-selected", String(k === i)); });
      panels.forEach((p, k) => (p.hidden = k !== i));
    };
    letters.forEach((b, k) => ["mouseenter", "focus", "click"].forEach((ev) => b.addEventListener(ev, () => select(k))));
  });

  /* ---------- "What we do" panels (desktop) ---------- */
  $$("[data-wwd]").forEach((root) => {
    const panels = $$("[data-wwd-panel]", root);
    let current = 0;
    const select = (i) => {
      if (i === current) return;
      current = i;
      panels.forEach((p, k) => {
        const on = k === i;
        setActive(p, on);
        p.toggleAttribute("data-active", on);
        p.querySelector("[data-wwd-detail]").hidden = !on;
      });
    };
    panels.forEach((p, k) => { p.addEventListener("mouseenter", () => select(k)); p.addEventListener("focusin", () => select(k)); });
    root.addEventListener("mouseleave", () => select(0));
  });

  /* ---------- Hero image parallax ---------- */
  const para = document.querySelector("[data-parallax]");
  if (para && !reduce) {
    const section = para.closest("section");
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = section.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / r.height));
      para.style.transform = `translate3d(0, ${(p * 12).toFixed(2)}%, 0)`;
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  }

  /* ---------- Forms: post in the background, show errors inline ---------- */
  $$("form[data-form]").forEach((form) => {
    const submit = form.querySelector("[type=submit]");
    const failed = form.querySelector("[data-form-failed]");
    const clear = () => {
      $$("[data-error-for]", form).forEach((p) => { p.hidden = true; p.textContent = ""; });
      $$("[data-hint]", form).forEach((p) => (p.hidden = false));
      $$("[aria-invalid]", form).forEach((el) => { el.removeAttribute("aria-invalid"); el.classList.remove("border-raspberry"); });
      if (failed) failed.hidden = true;
    };
    const showErrors = (errors) => {
      let first = null;
      Object.entries(errors).forEach(([name, msgs]) => {
        const p = form.querySelector(`[data-error-for="${name}"]`);
        if (p) { p.textContent = msgs[0]; p.hidden = false; }
        const input = form.elements[name];
        if (input && input.classList) {
          input.setAttribute("aria-invalid", "true");
          if (input.type !== "checkbox") input.classList.add("border-raspberry");
          input.closest("div")?.querySelector("[data-hint]")?.setAttribute("hidden", "");
          first ??= input;
        }
      });
      first?.focus();
    };
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (submit.disabled) return;
      clear();
      const label = submit.innerHTML;
      submit.disabled = true;
      submit.textContent = submit.dataset.busyLabel || "Sending…";
      try {
        const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        const json = await res.json().catch(() => ({}));
        if (res.ok && json.ok) {
          if (form.dataset.inlineDone) {
            const p = document.createElement("p");
            p.className = form.dataset.doneClass || "";
            p.setAttribute("role", "status");
            p.textContent = form.dataset.inlineDone;
            form.replaceWith(p);
          } else {
            window.location.href = `/thank-you?for=${encodeURIComponent(form.dataset.form)}`;
          }
          return;
        }
        if (json.errors && Object.keys(json.errors).length) showErrors(json.errors);
        else if (failed) failed.hidden = false;
      } catch {
        if (failed) failed.hidden = false;
      } finally {
        submit.disabled = false;
        submit.innerHTML = label;
      }
    });
  });
})();
