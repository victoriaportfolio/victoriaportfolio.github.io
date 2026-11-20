const DISCLOSURE_COPY = {
  ru: {
    projectTitle: 'Спецпроект · NDA',
    projectText: 'Продуктовые метрики скрыты под NDA.',
    prototypeTitle: 'Low-level прототипы MVP · NDA',
    prototypeText: 'Детали продукта и метрики скрыты под NDA.'
  },
  en: {
    projectTitle: 'Special project · NDA',
    projectText: 'Product metrics are confidential under NDA.',
    prototypeTitle: 'Low-level MVP prototypes · NDA',
    prototypeText: 'Product details and metrics are confidential under NDA.'
  }
};
function disclosureNoticeMarkup(language, kind = 'project') {
  const copy = DISCLOSURE_COPY[language] || DISCLOSURE_COPY.ru;
  return `<aside class="disclosure-notice" aria-label="${copy[kind + 'Title']}"><svg class="disclosure-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v1"/></svg><div><strong>${copy[kind + 'Title']}</strong><p>${copy[kind + 'Text']}</p></div></aside>`;
}
