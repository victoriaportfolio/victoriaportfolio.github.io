// Materialize the existing page renderers at build time for readers without JavaScript.
// Run with Node after editing page copy, then publish dist/ as usual.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = root;
const read = relative => fs.readFileSync(path.join(dist, relative), 'utf8');

function rendererContext() {
  const nodes = new Map();
  function node(key) {
    if (nodes.has(key)) return nodes.get(key);
    const element = {
      innerHTML: '', textContent: '', dataset: {}, hidden: false, scrollLeft: 0,
      scrollWidth: 1120, clientWidth: 1120, scrollHeight: 900,
      style: { setProperty() {} }, classList: { add() {}, remove() {}, toggle() {} },
      attributes: {}, setAttribute(name, value) { this.attributes[name] = value; },
      getAttribute(name) { return this.attributes[name] ?? null; },
      removeAttribute(name) { delete this.attributes[name]; },
      querySelector(selector) { return node(`${key} ${selector}`); },
      querySelectorAll() { return []; }, addEventListener() {}, removeEventListener() {},
      insertAdjacentHTML(position, content) { if (position === 'beforeend') this.innerHTML += content; },
      pause() {}, play() { return Promise.resolve(); }, focus() {}, observe() {},
      getBoundingClientRect() { return { width: 280, height: 150, top: 0 }; }
    };
    nodes.set(key, element);
    return element;
  }
  const document = {
    getElementById: id => node(id), querySelector: selector => node(selector),
    querySelectorAll: () => [], addEventListener() {}, documentElement: node('html'),
    body: node('body'), createTreeWalker: () => ({ nextNode: () => false }),
    fonts: { ready: { then() {} } }
  };
  const context = {
    document, URL, URLSearchParams, location: { search: '?lang=ru', hash: '', href: 'https://victoriaportfolio.github.io/?lang=ru' },
    localStorage: { getItem: () => 'ru', setItem() {} }, history: { replaceState() {} },
    matchMedia: () => ({ matches: false, addEventListener() {} }),
    requestAnimationFrame: () => 1, cancelAnimationFrame() {}, addEventListener() {},
    IntersectionObserver: class { observe() {} disconnect() {} },
    ResizeObserver: class { observe() {} disconnect() {} }, NodeFilter: { SHOW_TEXT: 4 },
    innerHeight: 900, scrollY: 0, getComputedStyle: () => ({ columnGap: '24px' }),
    setTimeout: () => 1, clearTimeout() {}, console
  };
  context.window = context;
  vm.createContext(context);
  return { context, nodes, run: file => vm.runInContext(read(file), context, { filename: file, timeout: 3000 }) };
}

function innerRange(html, opening) {
  const tag = opening[1];
  const start = opening.index + opening[0].length;
  const tags = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi');
  tags.lastIndex = start;
  let depth = 1, match;
  while ((match = tags.exec(html))) {
    depth += /^<\//.test(match[0]) ? -1 : 1;
    if (depth === 0) return [start, match.index];
  }
  throw new Error(`Unclosed ${tag}`);
}

function fillId(html, id, content) {
  const opening = new RegExp(`<([a-z][\\w:-]*)\\b[^>]*\\bid="${id}"[^>]*>`, 'i').exec(html);
  if (!opening) throw new Error(`Missing #${id}`);
  const [start, end] = innerRange(html, opening);
  return html.slice(0, start) + content + html.slice(end);
}

function fillCopy(html, attribute, copy) {
  const matches = [...html.matchAll(new RegExp(`<([a-z][\\w:-]*)\\b[^>]*\\b${attribute}="([^"]+)"[^>]*>`, 'gi'))];
  for (const opening of matches.reverse()) {
    const content = copy[opening[2]];
    if (content === undefined) throw new Error(`Missing copy ${opening[2]}`);
    const [start, end] = innerRange(html, opening);
    html = html.slice(0, start) + content + html.slice(end);
  }
  return html;
}

function cleanHeadings(html) {
  return html.replace(/(<h[1-4]\b[^>]*>)([\s\S]*?)(<\/h[1-4]>)/gi,
    (_, start, content, end) => start + content.replace(/(^|>)([^<]*)/g, (all, prefix, text) => prefix + text.replace(/\./g, '')).replace(/<br\s*\/?>/g, '<br>\n').replace(/<span\b/g, '\n<span') + end);
}

function exportCopy(build, expression) {
  return vm.runInContext(expression, build.context, { timeout: 1000 });
}

const home = rendererContext();
home.run('js/data.js');
home.run('js/data-en.js');
home.run('js/app.js');
let html = fillCopy(read('index.html'), 'data-i18n', exportCopy(home, 'COPY.ru'));
for (const id of ['highlights', 'services', 'projects', 'skills', 'experience-list', 'education']) {
  const content = home.nodes.get(id)?.innerHTML;
  if (!content) throw new Error(`Homepage renderer produced no #${id}`);
  html = fillId(html, id, content);
}
html = fillId(html, 'show-more-projects', home.nodes.get('show-more-projects').innerHTML);
fs.writeFileSync(path.join(dist, 'index.html'), cleanHeadings(html));
console.log('Prerendered homepage with three featured projects and five hidden projects.');

for (const [slug, script, copyName] of [
  ['cross-border-payments', 'case-payments.js', 'CASE_COPY'],
  ['create', 'case-create.js', 'COPY'],
  ['haqqex', 'case-haqqex.js', 'CASE_COPY']
]) {
  const build = rendererContext();
  if (slug === 'cross-border-payments') build.run('js/disclosures.js');
  build.run(`js/${script}`);
  let content = build.nodes.get('case-content')?.innerHTML;
  if (!content || content.length < 5000) throw new Error(`Case renderer produced incomplete ${slug}`);
  for (const id of ['module-panel', 'hypothesis-panel', 'product-screen-panel']) {
    const panel = build.nodes.get(id);
    if (panel?.innerHTML && content.includes(`id="${id}"`)) {
      content = fillId(content, id, panel.innerHTML);
    }
  }
  if (slug !== 'create') {
    const glass = new Set(['case-metric', 'summary-panel', 'ttv', 'insight-panel', 'hypothesis-tab', 'hypothesis-panel', 'solution', 'design-principles', 'trust-outcome', 'result-hero', 'takeaway', 'case-next', 'image-expand']);
    content = content.replace(/class="([^"]+)"/g, (attribute, value) => {
      const classes = value.split(/\s+/);
      return classes.some(c => glass.has(c)) && !classes.includes('glass') ? `class="${value} glass"` : attribute;
    });
  }
  const relative = `case/${slug}/index.html`;
  let page = fillCopy(read(relative), 'data-copy', exportCopy(build, `${copyName}.ru`));
  page = fillId(page, 'case-content', cleanHeadings(content));
  // The complete content is now available without scripts, so an enable-JS notice is obsolete.
  page = page.replace(/\s*<noscript>[\s\S]*?<\/noscript>/g, '');
  fs.writeFileSync(path.join(dist, relative), page);
  console.log(`Prerendered ${slug}: ${content.length} characters.`);
}

// Plain-text alternatives let text readers consume all four pages from one URL.
const origin = 'https://victoriaportfolio.github.io';
const exports = [
  ['index.html', 'home', '/'],
  ['case/cross-border-payments/index.html', 'cross-border-payments', '/case/cross-border-payments/'],
  ['case/create/index.html', 'create', '/case/create/'],
  ['case/haqqex/index.html', 'haqqex', '/case/haqqex/']
];
const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
fs.mkdirSync(path.join(dist, 'readable'), { recursive: true });
const all = [];
for (const [relative, slug, url] of exports) {
  let page = read(relative);
  const alternate = `<link rel="alternate" type="text/plain" href="/readable/${slug}.txt" title="Текстовая версия">`;
  if (!page.includes(alternate)) {
    page = page.replace('</head>', `  ${alternate}\n</head>`);
    fs.writeFileSync(path.join(dist, relative), page);
  }
  const main = page.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  if (!main) throw new Error(`Missing main text: ${relative}`);
  const text = main.replace(/<span\b[^>]*class="action-label-mobile"[^>]*>[\s\S]*?<\/span>/gi, '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, label) => `${label} (${new URL(href.replace(/&amp;/g, '&'), origin + url).href})`)
    .replace(/<br\s*\/?>|<\/(?:h[1-6]|p|div|section|article|li|dt|dd|summary|figure|aside)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (full, key) => key.startsWith('#') ? String.fromCodePoint(key[1].toLowerCase() === 'x' ? parseInt(key.slice(2), 16) : parseInt(key.slice(1), 10)) : entities[key.toLowerCase()] || full)
    .split('\n').map(line => line.replace(/\s+/g, ' ').trim()).filter(Boolean).join('\n\n');
  const content = `Источник: ${origin}${url}?lang=ru\n\n${text}\n`;
  fs.writeFileSync(path.join(dist, 'readable', `${slug}.txt`), content);
  all.push(content);
}
fs.writeFileSync(path.join(dist, 'readable', 'portfolio.txt'), all.join('\n\n════════════════════════════════\n\n'));
console.log('Exported four text pages and one combined portfolio.txt.');
