/**
 * Рендер всего сайта + интерактивность.
 * Русский контент — js/data.js, английский — js/data-en.js.
 * Правьте контент там, сюда лезть не обязательно.
 */

(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const el = (tag, className, html) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  };

  // ---------- Язык ----------
  const LANG_KEY = "site-lang";

  function currentLang() {
    const saved = localStorage.getItem(LANG_KEY);
    return saved === "en" || saved === "ru" ? saved : "ru";
  }

  // Данные текущего языка. Контакты и логотипы общие — берём из RU-версии.
  let DATA = SITE_DATA;
  let T = UI_STRINGS.ru;

  function selectLang(lang) {
    const base = lang === "en" ? SITE_DATA_EN : SITE_DATA;
    DATA = Object.assign({}, base, {
      contacts: SITE_DATA.contacts,
      clientLogos: SITE_DATA.clientLogos,
    });
    T = UI_STRINGS[lang];
  }

  // ---------- Hero ----------
  function renderHero() {
    const p = DATA.profile;
    // Строку можно задать массивом — тогда перенос ставится ровно там,
    // где нужно по макету, а не там, где решит браузер.
    const setLines = (sel, value) => {
      const node = $(sel);
      node.textContent = "";
      const parts = Array.isArray(value) ? value : [value];
      parts.forEach((part, i) => {
        if (i > 0) node.appendChild(document.createElement("br"));
        node.appendChild(document.createTextNode(part));
      });
    };
    setLines("#hero-headline", p.headline);
    setLines("#hero-subheadline", p.subheadline);

    const lines = $("#hero-lines");
    p.lines.forEach((line) => lines.appendChild(el("p", "", line)));

    $("#cta-label").textContent = p.ctaLabel;
    $("#cta-button").href = p.ctaHref;

    const photo = $("#hero-photo");
    const showFallback = () => {
      const fallback = el("div", "mx-auto h-28 w-28 md:h-32 md:w-32 rounded-full photo-fallback ring-1 ring-black/5 shadow-sm", p.name.charAt(0));
      photo.replaceWith(fallback);
    };
    // Картинка могла уже упасть с ошибкой до того, как этот код выполнился
    // (script стоит в конце body, но <img> начинает грузиться сразу при парсинге HTML).
    if (photo.complete && photo.naturalWidth === 0) {
      showFallback();
    } else {
      photo.addEventListener("error", showFallback);
    }
  }

  // ---------- Client logos ----------
  function renderClientLogos() {
    const wrap = $("#client-logos");
    DATA.clientLogos.forEach((logo) => {
      if (logo.type === "image" && logo.src) {
        const img = el("img");
        img.src = logo.src;
        img.alt = logo.name;
        img.loading = "lazy";
        // Логотипы имеют разные пропорции — object-contain в боксе фиксированной
        // высоты выравнивает их по оптическому размеру.
        // shrink-0 держит логотипы в одну строку; ширина распределяется justify-between
        img.className =
          "h-11 sm:h-14 lg:h-[68px] w-auto shrink-0 object-contain opacity-75 hover:opacity-100 transition-opacity";
        wrap.appendChild(img);
      } else {
        const chip = el("span", "logo-chip text-sm md:text-base opacity-70 hover:opacity-100 transition-opacity", logo.short || logo.name);
        chip.title = logo.name;
        wrap.appendChild(chip);
      }
    });
  }

  // ---------- Skills ----------
  function renderSkills() {
    const s = DATA.skills;
    $("#skills-eyebrow").textContent = s.eyebrow;
    $("#skills-title").textContent = s.title;
    $("#skills-title-highlight").textContent = s.titleHighlight;

    const grid = $("#skills-grid");
    s.columns.forEach((col) => {
      const colEl = el("div");
      colEl.appendChild(el("h3", "font-bold text-accent text-base md:text-lg", col.title));
      const list = el("ul", "mt-3 space-y-2 text-sm md:text-base text-gray-700");
      col.items.forEach((item) => list.appendChild(el("li", "", item)));
      colEl.appendChild(list);
      grid.appendChild(colEl);
    });
  }

  // ---------- Bio ----------
  function renderBio() {
    const b = DATA.bio;
    // Кегль и жирность наследуются от .display-text — здесь только цвет.
    $("#bio-text").innerHTML =
      `<span class="text-ink">${b.strong1}</span> ` +
      `<span class="text-ink">${b.muted}</span> ` +
      `<span class="text-ink">${b.strong2}</span>`;
  }

  // ---------- Experience accordion ----------
  const LOGO_STYLES = {
    moex: "bg-red-600 text-white",
    sber: "bg-emerald-600 text-white",
    bre: "bg-gray-800 text-white",
    generic: "bg-gray-200 text-gray-700",
  };

  // Цвет пилюль-тегов: по умолчанию синий, у Сбера — фирменный зелёный
  const ACCENT_BG = {
    green: "bg-emerald-600",
    blue: "bg-accent",
  };

  function pill(text, isFill, accent) {
    const bg = isFill ? "bg-amber-500" : ACCENT_BG[accent] || ACCENT_BG.blue;
    return el(
      "span",
      `inline-flex items-center rounded-full text-white text-[10px] md:text-[11px] font-bold uppercase tracking-wide px-3 py-1 whitespace-nowrap ${bg}`,
      text
    );
  }

  function renderAchievement(item, accent) {
    const isFill = item.tag.startsWith("[ЗАПОЛНИТЬ]");
    const wrap = el("div", "rounded-2xl bg-card p-5 flex flex-col");

    // Верхняя строка: тег слева, опциональный тег справа
    const top = el("div", "flex items-start justify-between gap-3");
    top.appendChild(pill(item.tag, isFill, accent));
    if (item.tagRight) top.appendChild(pill(item.tagRight, isFill, accent));
    wrap.appendChild(top);

    wrap.appendChild(
      el("p", `mt-4 font-bold text-[17px] md:text-[19px] leading-snug ${isFill ? "fill-marker" : "text-ink"}`, item.value)
    );

    if (item.desc) {
      wrap.appendChild(
        el("p", `mt-2 text-body font-normal leading-relaxed ${isFill ? "fill-marker" : "text-muted"}`, item.desc)
      );
    }

    return wrap;
  }

  // Достижения могут быть плоским списком (MOEX) или сгруппированными
  // по подзаголовкам (Сбер, Feymanlabs, БРЭ) — приводим к одному виду.
  function achievementGroupsOf(company) {
    if (company.achievementGroups) return company.achievementGroups;
    if (company.achievements) return [{ items: company.achievements }];
    return [];
  }

  // Компания — вложенный аккордеон внутри индустрии (как на макете):
  // шапка с логотипом и шевроном, раскрывающаяся в «Что сделала» +
  // «Ключевые достижения».
  function renderCompanyCard(company) {
    const item = el("div", "accordion-item border-b border-gray-200 last:border-b-0");

    const trigger = el("button", "w-full flex items-center justify-between gap-4 text-left py-5");
    trigger.type = "button";
    trigger.setAttribute("aria-expanded", "false");

    const left = el("span", "flex items-center gap-4 min-w-0");
    const textLogo = () =>
      el(
        "span",
        `flex h-9 px-3 items-center justify-center rounded-lg text-xs font-bold shrink-0 ${
          LOGO_STYLES[company.logoType] || LOGO_STYLES.generic
        }`,
        company.logoText
      );

    if (company.logoSrc) {
      const img = el("img");
      img.src = company.logoSrc;
      img.alt = company.name;
      // Высота под кегль названия компании (28px), чтобы лого и текст
      // читались как одна строка.
      img.className = "h-[28px] md:h-[36px] w-auto max-w-[150px] object-contain shrink-0";
      // Файла лого нет — подставляем текстовую плашку вместо битой картинки.
      img.addEventListener("error", () => img.replaceWith(textLogo()));
      left.appendChild(img);
    } else {
      left.appendChild(textLogo());
    }
    // Тот же кегль, что у заголовков «Что сделала» / «Ключевые достижения»
    left.appendChild(el("span", "text-[22px] md:text-[28px] font-semibold text-ink leading-tight", company.name));

    trigger.appendChild(left);
    trigger.appendChild(
      el(
        "span",
        "accordion-chevron text-ink shrink-0",
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>'
      )
    );

    const panel = el("div", "accordion-panel");
    // Внешняя обёртка без отступов: padding на прямом потомке панели не
    // схлопывается при закрытии и оставляет полоску контента видимой.
    const clip = el("div");
    const body = el("div", "pb-6");
    clip.appendChild(body);

    body.appendChild(el("h4", "text-[22px] md:text-[28px] font-semibold text-accent mb-4", T.whatIDid));
    const whatGrid = el("div", "grid grid-cols-1 md:grid-cols-2 gap-4");
    company.whatIDid.forEach((block) => {
      const cardEl = el("div", "rounded-2xl bg-card p-5");
      const isFill = block.title.startsWith("[ЗАПОЛНИТЬ]");
      cardEl.appendChild(el("p", `font-bold text-body ${isFill ? "fill-marker" : "text-ink"}`, block.title));
      cardEl.appendChild(
        el("p", `mt-2 text-body font-normal leading-relaxed ${isFill ? "fill-marker" : "text-muted"}`, block.text)
      );
      whatGrid.appendChild(cardEl);
    });
    body.appendChild(whatGrid);

    body.appendChild(el("h4", "mt-10 text-[22px] md:text-[28px] font-semibold text-ink", T.keyAchievements));
    if (company.achievementsSubtitle) {
      body.appendChild(el("p", "mt-1 text-body font-normal text-muted", company.achievementsSubtitle));
    }

    achievementGroupsOf(company).forEach((group) => {
      if (group.label) {
        body.appendChild(
          el("p", "mt-8 mb-3 text-[15px] md:text-[17px] font-medium uppercase tracking-wide text-muted", group.label)
        );
      }
      const achGrid = el("div", `${group.label ? "" : "mt-4 "}grid grid-cols-1 md:grid-cols-2 gap-4`);
      group.items.forEach((a) => achGrid.appendChild(renderAchievement(a, company.accent)));
      body.appendChild(achGrid);
    });

    panel.appendChild(clip);

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.toggle("open");
      trigger.setAttribute("aria-expanded", String(isOpen));
    });

    item.appendChild(trigger);
    item.appendChild(panel);
    return item;
  }

  function renderExperience() {
    const wrap = $("#experience-accordion");

    DATA.experience.forEach((group) => {
      const item = el("div", "accordion-item");

      const trigger = el("button", "w-full flex items-center justify-between gap-4 text-left py-6");
      trigger.type = "button";
      trigger.setAttribute("aria-expanded", "false");

      // scroll-focus: цвет и масштаб анимируются через IntersectionObserver
      // в initScrollFocus(), сам класс text-ink здесь больше не нужен —
      // цвет теперь полностью определяет .scroll-focus в CSS.
      const left = el("span", "display-text scroll-focus", group.industry);
      const right = el("span", "flex items-center gap-4 shrink-0");
      right.appendChild(
        el(
          "span",
          "inline-flex items-center rounded-full bg-accent text-white text-[10px] md:text-[11px] font-bold uppercase tracking-wide px-4 py-1.5",
          group.badge
        )
      );
      right.appendChild(
        el(
          "span",
          "accordion-chevron text-ink",
          '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>'
        )
      );

      trigger.appendChild(left);
      trigger.appendChild(right);

      const panel = el("div", "accordion-panel");
      const panelClip = el("div");
      const panelInner = el("div", "pb-4");
      group.companies.forEach((company) => panelInner.appendChild(renderCompanyCard(company)));
      panelClip.appendChild(panelInner);
      panel.appendChild(panelClip);

      trigger.addEventListener("click", () => {
        const isOpen = item.classList.toggle("open");
        trigger.setAttribute("aria-expanded", String(isOpen));
      });

      item.appendChild(trigger);
      item.appendChild(panel);
      wrap.appendChild(item);
    });
  }

  // ---------- Projects ----------
  function renderProjects() {
    const grid = $("#projects-grid");
    DATA.projects.forEach((project) => {
      const card = el(
        "div",
        "rounded-2xl border border-gray-200 overflow-hidden hover:border-gray-300 transition-colors flex flex-col"
      );

      // Рамка обложки есть всегда — так все карточки в сетке одной высоты
      // и кнопки «Behance →» стоят на одной линии.
      const frame = el("div", "aspect-[808/632] bg-card overflow-hidden relative");
      const placeholder = el(
        "div",
        "absolute inset-0 flex items-center justify-center text-center px-6 text-body font-semibold text-muted",
        project.title
      );
      frame.appendChild(placeholder);

      if (project.cover) {
        const img = el("img");
        img.src = project.cover;
        img.alt = project.title;
        img.loading = "lazy";
        img.className = "relative w-full h-full object-cover";
        // Файл не найден — остаётся плейсхолдер с названием.
        img.addEventListener("error", () => img.remove());
        frame.appendChild(img);
      }
      card.appendChild(frame);

      const body = el("div", "p-6 flex flex-col flex-1");
      body.appendChild(el("h3", "text-cardtitle font-semibold text-ink", project.title));
      body.appendChild(el("p", "mt-2 text-body font-normal text-muted leading-relaxed", project.description));

      const tags = el("div", "mt-4 flex flex-wrap gap-1.5");
      project.tags.forEach((tag) =>
        tags.appendChild(el("span", "text-tag font-normal text-tagink bg-gray-100 rounded-full px-2.5 py-1", tag))
      );
      body.appendChild(tags);

      // mt-auto прижимает ссылки к низу карточки — во всех карточках на одной линии
      const links = el("div", "mt-auto pt-4 flex flex-wrap gap-4");
      project.links.forEach((link) => {
        const a = el("a", "text-body font-semibold text-accent hover:text-blue-700 transition-colors", link.label + " →");
        a.href = link.href;
        a.target = "_blank";
        a.rel = "noopener";
        links.appendChild(a);
      });
      body.appendChild(links);

      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  // ---------- Contacts / footer ----------
  function renderContacts() {
    const c = DATA.contacts;
    [
      ["#behance-link", c.behance],
      ["#tg-link", c.telegram],
      ["#footer-behance", c.behance],
      ["#contact-telegram", c.telegram],
      ["#all-projects-button", c.behance],
    ].forEach(([sel, href]) => {
      const node = $(sel);
      if (node) node.href = href;
    });

    const email = $("#contact-email");
    if (email) email.href = c.email;

    $("#year").textContent = new Date().getFullYear();
  }

  // ---------- Статичные подписи в разметке ----------
  function renderUIStrings() {
    const set = (sel, text) => {
      const node = $(sel);
      if (node) node.textContent = text;
    };
    set("#lang-label", T.langLabel);
    set("#skills-heading", T.skillsHeading);
    set("#experience-heading", T.experienceHeading);
    set("#projects-heading", T.projectsHeading);
    set("#projects-subtitle", T.projectsSubtitle);
    set("#contact-heading", T.contactHeading);
    set("#contact-subtitle", T.contactSubtitle);
    set("#contact-email", T.emailButton);
    set("#contact-telegram", T.telegramButton);
    set("#footer-note", T.footerNote);

    // Кнопка «Посмотреть все проекты» — текст со стрелкой
    const allBtn = $("#all-projects-button");
    if (allBtn) allBtn.innerHTML = `${T.allProjects} <span aria-hidden="true">→</span>`;

    // Имя и роль в hero
    const h1 = $("#hero h1") || document.querySelector("h1");
    if (h1) h1.textContent = DATA.profile.name;
    const role = h1 && h1.nextElementSibling;
    if (role) role.textContent = DATA.profile.role;

    document.documentElement.lang = T.htmlLang;
  }

  // ---------- Рендер всей страницы ----------
  function render() {
    // Контейнеры очищаем — иначе при смене языка контент задвоится
    ["#hero-lines", "#client-logos", "#skills-grid", "#experience-accordion", "#projects-grid"].forEach((sel) => {
      const node = $(sel);
      if (node) node.innerHTML = "";
    });

    renderHero();
    renderClientLogos();
    renderSkills();
    renderBio();
    renderExperience();
    renderProjects();
    renderContacts();
    renderUIStrings();
    initScrollFocus();
  }

  // ---------- Проявление строк «Опыт» по скроллу ----------
  let scrollFocusObserver = null;
  function initScrollFocus() {
    // При смене языка render() вызывается заново — старый наблюдатель
    // нужно снять, иначе он будет следить за уже удалёнными узлами.
    if (scrollFocusObserver) scrollFocusObserver.disconnect();

    const targets = document.querySelectorAll(".scroll-focus");
    if (!targets.length) return;

    // Тонкая полоса в центре экрана: строка «загорается», когда попадает
    // в неё, и гаснет, когда уходит выше или ниже.
    scrollFocusObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("in-focus", entry.isIntersecting);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    targets.forEach((t) => scrollFocusObserver.observe(t));
  }

  function init() {
    let lang = currentLang();
    selectLang(lang);
    render();

    $("#lang-toggle").addEventListener("click", () => {
      lang = lang === "ru" ? "en" : "ru";
      localStorage.setItem(LANG_KEY, lang);
      selectLang(lang);
      render();
      window.scrollTo({ top: 0 });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
