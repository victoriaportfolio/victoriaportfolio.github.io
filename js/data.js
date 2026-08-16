/**
 * Весь редактируемый контент сайта лежит здесь.
 * Правьте текст — вёрстка (index.html / app.js) трогать не нужно.
 *
 * Поля с пометкой [ЗАПОЛНИТЬ] — заглушки: мелкий текст на скриншотах
 * макета было невозможно разобрать точно, поэтому здесь оставлен
 * плейсхолдер вместо выдуманных цифр. Замените на реальный текст.
 */

// Блок «Продукты» повторяется в карточках Feymanlabs и БРЭ — держим в одном месте.
const PRODUCT_ACHIEVEMENTS = [
  {
    tag: "MEDTECH",
    value: "CURIO",
    desc: "HIPAA-совместимый интерфейс для телемедицины. Key Visual. Рост охвата услуг и retention после запуска",
  },
  {
    tag: "FASHION",
    value: "ANYWEAR",
    desc: "Интерфейс с UGC и механизмами монетизации. Рост пользовательской базы и конверсии в покупку",
  },
  {
    tag: "CRYPTO",
    value: "HAQQEX",
    desc: "Мобильное приложение + крипто-биржа на единой дизайн-системе. Рост активных трейдеров, выход на Европу и Азию",
  },
];

const SITE_DATA = {
  profile: {
    name: "Виктория",
    role: "Lead Product Designer",
    photo: "assets/images/photo.jpg",
    // Массив = явные переносы строк, ровно как в макете
    headline: [
      "создаю цифровые продукты",
      "мирового уровня с аудиторией",
      "в миллионы пользователей на",
      "международном уровне",
    ],
    subheadline: ["Fintech, CRM, AI-платформы, B2B SaaS,", "Web3, биржевые решения."],
    lines: [
      "10 лет в дизайне, из них 3 года в FinTech",
      "Использую data-driven и human-centric подход",
      "в реализации end-to-end процессов дизайна",
    ],
    ctaLabel: "Все кейсы",
    ctaHref: "#projects",
  },

  // Контакты общие для обеих языковых версий
  contacts: {
    behance: "https://www.behance.net/victoriabraf2f",
    telegram: "https://t.me/victoriachupakhina28",
    email: "mailto:hello@example.com", // [ЗАПОЛНИТЬ] рабочая почта
  },

  // Строка логотипов под хиро-блоком.
  clientLogos: [
    { name: "MOEX GROUP", type: "image", src: "assets/logos/moex.png" },
    { name: "SBER", type: "image", src: "assets/logos/sber.png" },
    { name: "Министерство просвещения Российской Федерации", type: "image", src: "assets/logos/minprosv.png" },
    { name: "Feynman Labs", type: "image", src: "assets/logos/feynman.png" },
    { name: "HAQQEX", type: "image", src: "assets/logos/haqqex.png" },
    { name: "CURIO", type: "image", src: "assets/logos/curio.png" },
    { name: "ANY WEAR", type: "image", src: "assets/logos/anywear.png" },
    { name: "Berkshire Hathaway Inc.", type: "image", src: "assets/logos/berkshire.png" },
  ],

  skills: {
    eyebrow: "Полный цикл продуктового дизайна — от стратегии до продуктовых метрик",
    title: "Product Design for:",
    titleHighlight: "B2B AI SaaS Fintech Medtech Ed-tech",
    columns: [
      {
        title: "Исследования и стратегия",
        items: ["User Research", "A/B тестирование", "Customer Journey", "Конкурентный анализ", "Data-Driven Design"],
      },
      {
        title: "Дизайн и системы",
        items: ["UX / UI Design", "Дизайн-системы", "CX Design", "Brand Design", "Прототипирование"],
      },
      {
        title: "Лидерство и процессы",
        items: ["Управление командой", "Ментор", "Product Roadmap", "Design Operations", "Стейкхолдер-менеджмент"],
      },
    ],
  },

  bio: {
    strong1:
      "Продуктовый дизайн-лид с опытом создания полного цикла разработки цифровых продуктов — от Discovery и исследований до Delivery и формирования визуального направления.",
    muted:
      "Фокусируюсь на создании дизайн-решений, которые улучшают пользовательский опыт и напрямую влияют на бизнес-метрики продукта.",
    strong2:
      "Встраиваю дизайн-процессы в бизнес-стратегию, соединяя потребности пользователей, цели компании и эффективную реализацию решений в разработке.",
  },

  // Опыт, сгруппированный по индустриям. Каждая индустрия — аккордеон,
  // внутри — карточки компаний.
  experience: [
    {
      industry: "Опыт в Fintech",
      badge: "FINTECH",
      companies: [
        {
          logoText: "MOEX GROUP",
          name: "Московская биржа",
          logoSrc: "assets/logos/moex.png",
          whatIDid: [
            {
              title: "Продуктовая стратегия и UX-оптимизация",
              text: "Реализовала дизайн трёх высоконагруженных B2B-платформ (ЭПР ВЭД, ЦФА 50+ млрд руб. эмиссии, клиринговая платформа), сократила время ключевых операций с 3–5 дней до 24 часов и увеличила ROI продукта в 2,2 раза.",
            },
            {
              title: "Дизайн-система и масштабирование решений",
              text: "Создала единую дизайн-систему для трёх платформ, ускорив time-to-market на 35%, снизив количество ошибок разработки и обеспечив миграцию компонентов с Vue.js на React.",
            },
            {
              title: "Исследования и развитие продукта",
              text: "Внедрила процессы продуктовых исследований и A/B-тестирования по фреймворку double diamond, провела редизайн онбординга и авторизации (УНЭП), повысив NPS на 27 п.п. за 6 месяцев.",
            },
            {
              title: "Дизайн-лидерство и развитие экосистемы",
              text: "Разработала Key Visual для новых направлений, концепцию рыночных виджетов для сайта Московской Биржи и карту компетенций дизайнеров для стандартизации грейдов и развития команды.",
            },
          ],
          achievementsSubtitle: "Метрики и результаты, которые я принесла бизнесу",
          achievements: [
            {
              tag: "TIME TO PAYMENT",
              tagRight: "ЦФА",
              value: "3–5 дней → 24ч",
              desc: "A/B-тестирование с операторами платформы. Сокращение времени ключевых операций на платформе ЦФА",
            },
            {
              tag: "ОБЪЁМ ЭМИССИИ ЦФА",
              tagRight: "B2B FINTECH",
              value: "50+ млрд ₽",
              desc: "Спроектировала интерфейсы для выпуска и обращения ЦФА. Метрико-ориентированный подход к каждому интерфейсу",
            },
            {
              tag: "ЭПР ВЭД",
              tagRight: "С НУЛЯ",
              value: "Международные переводы",
              desc: "Полный цикл от заявки до исполнения. Онбординг через УНЭП — рост конверсии входа. Юзабилити-тесты со специалистами ВЭД",
            },
            {
              tag: "КЛИРИНГ",
              tagRight: "С НУЛЯ",
              value: "Клиринговая платформа",
              desc: "Система взаиморасчётов с критической точностью данных. Трансляция сложной финансовой логики в интерфейс",
            },
            {
              tag: "ДИЗАЙН-СИСТЕМА",
              value: "Vue.js → React",
              desc: "Дизайн-система и миграция компонентов на единый технологический стек",
            },
            {
              tag: "ЮЗАБИЛИТИ",
              value: "Регулярные тесты",
              desc: "С профессиональными участниками рынка: трейдеры, брокеры, операторы",
            },
            {
              tag: "ПРОЦЕССЫ",
              value: "Design Review",
              desc: "Документация UX-решений, handoff с разработкой, менторинг дизайнеров",
            },
            {
              tag: "ЛИДЕРСТВО",
              tagRight: "ЛИДЕРСТВО",
              value: "Карта компетенций",
              desc: "Стандартизация грейдов и треки развития дизайнеров",
            },
          ],
        },
        {
          logoText: "SBER",
          name: "Сбербанк",
          logoSrc: "assets/logos/sber.png",
          accent: "green", // фирменный цвет тегов Сбера
          whatIDid: [
            {
              title: "Продуктовая стратегия и запуск международного продукта",
              text: "Разработала банковское приложение для рынка Индии с нуля до MVP за 4 месяца: провела этнографические исследования, спроектировала end-to-end сценарии и локализовала UX под культурные особенности аудитории.",
            },
            {
              title: "UX-исследования и оптимизация корпоративных решений",
              text: "Переработала ERP-приложение для корпоративных клиентов: улучшила информационную архитектуру, внедрила шаблоны, валидацию и адаптивные подсказки, сократив время операций и кол-во польз. ошибок",
            },
            {
              title: "Бренд-адаптация и визуальная стратегия",
              text: "Создала Key Visual и бренд-элементы для адаптации глобального банковского продукта под индийский рынок, обеспечив целостный пользовательский опыт и соответствие локальным культурным особенностям.",
            },
          ],
          achievementGroups: [
            {
              label: "INDIAN BANKING APP",
              items: [
                {
                  tag: "MVP",
                  value: "4 месяца",
                  desc: "4 месяца от старта проектирования до запуска MVP на рынке Индии",
                },
                {
                  tag: "КОНВЕРСИЯ",
                  value: "Рост входа",
                  desc: "Локализованные сценарии регистрации с учётом культурных особенностей",
                },
                {
                  tag: "ИССЛЕДОВАНИЯ",
                  value: "Этнография",
                  desc: "Полевые исследования с локальной аудиторией, выявление скрытых паттернов",
                },
              ],
            },
            {
              label: "ERP · ФИНАНСОВАЯ ОТЧЁТНОСТЬ",
              items: [
                {
                  tag: "TIME TO TASK",
                  value: "Часы → Минуты",
                  desc: "Сокращение времени ключевых операций: отчёты, выгрузка, сверка данных",
                },
                {
                  tag: "ОШИБКИ",
                  value: "Снижение",
                  desc: "Валидация в реальном времени и адаптивные подсказки при заполнении форм",
                },
                {
                  tag: "ADOPTION",
                  value: "Рост adoption",
                  desc: "Редизайн онбординга и навигации, снижение обращений в поддержку",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      industry: "Опыт в E-commerce",
      badge: "E-COMMERCE",
      companies: [
        {
          logoText: "Feymanlabs",
          name: "Feymanlabs",
          logoSrc: "assets/logos/feynman.png",
          whatIDid: [
            {
              title: "Дизайн-лидерство и управление командой",
              text: "Руководила дизайном трёх мобильных продуктов для рынков США, Европы и Азии: управляла командой из 3 дизайнеров, провела 5 наймов, внедрила дизайн-ревью, развитие компетенций и процессы командного взаимодействия.",
            },
            {
              title: "Продуктовый дизайн и Discovery-процессы",
              text: "Выстроила полный цикл discovery → delivery: исследования, CJM, прототипирование, юзабилити-тесты и A/B-эксперименты. Обеспечила запуск трёх мобильных приложений на международных рынках.",
            },
            {
              title: "Дизайн-системы и масштабирование решений",
              text: "Создала модульные дизайн-системы для medtech, fashion и crypto-продуктов, обеспечив единый подход к развитию интерфейсов, ускорение разработки и масштабирование решений между платформами.",
            },
            {
              title: "Продуктовая стратегия и рост метрик",
              text: "Разработала визуальную концепцию и UX для CURIO, ANYWEAR и HAQQEX, включая Key Visual и продуктовые сценарии, что способствовало росту пользовательской базы, Retention и активности после выхода на новые рынки.",
            },
          ],
          achievementGroups: [
            {
              label: "УПРАВЛЕНИЕ",
              items: [
                {
                  tag: "КОМАНДА",
                  value: "3 + 5 наймов",
                  desc: "Команда 3 дизайнера, 5 наймов полного цикла",
                },
                {
                  tag: "DISCOVERY",
                  value: "Full cycle",
                  desc: "Интервью, CJM, юзабилити, A/B-тесты",
                },
              ],
            },
            { label: "ПРОДУКТЫ", items: PRODUCT_ACHIEVEMENTS },
          ],
        },
      ],
    },
    {
      industry: "Опыт в Ed-tech",
      badge: "ED-TECH",
      companies: [
        {
          logoText: "БРЭ",
          name: "Большая Российская Энциклопедия",
          // [ЗАПОЛНИТЬ] Логотипа БРЭ не было в присланной полосе логотипов.
          // Положите файл в assets/logos/bre.png и укажите его здесь.
          logoSrc: "assets/logos/bre.png",
          whatIDid: [
            {
              title: "Построение дизайн-направления с нуля",
              text: "Создала дизайн-функцию с нуля: наняла команду из 5 дизайнеров, разработала карту компетенций, внедрила процессы ревью, KPI-трекинга и развития специалистов.",
            },
            {
              title: "Операционное управление и процессы",
              text: "Выстроила систему взаимодействия дизайна и разработки через Jira, RACI-матрицу и чек-листы качества, сформировала бюджет на исследования и инструменты",
            },
            {
              title: "Редизайн продукта и UX-трансформация",
              text: "Провела полный редизайн портала: исследования, CJM, юзабилити-тестирование, новая архитектура и визуальная система. Разработала персонализированную авторизацию и навигацию, увеличив конверсию и DAU продукта",
            },
          ],
          achievementGroups: [
            {
              label: "УПРАВЛЕНИЕ",
              items: [
                {
                  tag: "НАЙМ",
                  value: "5 дизайнеров",
                  desc: "Полный цикл: скрининг, тестовые, собеседования, оффер, онбординг",
                },
                {
                  tag: "ГРЕЙДЫ",
                  value: "3 грейда",
                  desc: "Интервью, CJM, юзабилити, A/B-тесты",
                },
              ],
            },
            { label: "ПРОДУКТ", items: PRODUCT_ACHIEVEMENTS },
          ],
        },
      ],
    },
  ],

  // cover — обложка проекта. Файлы скачаны с вашего Behance в assets/images/.
  projects: [
    {
      title: "B2B-платформа для внешнеэкономических переводов",
      description:
        "Launch продуктового решения для подключения банков и проведения международных переводов",
      cover: "assets/images/proj-b2b-payments.png",
      tags: ["Research", "Product Hypotheses", "UX", "UI", "Delivery", "Metrics"],
      links: [
        {
          label: "Behance — EN",
          href: "https://www.behance.net/gallery/244423585/Fintech-B2B-Platform-for-Cross-Border-Payments",
        },
      ],
    },
    {
      title: "CREATE — Corporate Assistant для HR",
      description: "Софтверная платформа для управления сотрудниками и корпоративными процессами",
      cover: "assets/images/proj-create.png",
      tags: ["Brand Identity", "UX Design", "UI Design", "Mobile App"],
      links: [
        {
          label: "Behance",
          href: "https://www.behance.net/gallery/209329083/CREATE-(Corporate-assistant)-Software-for-HR",
        },
      ],
    },
    {
      title: "HAQQEX",
      description: "Crypto Ecosystem — дизайн продукта для крипто-биржи и мобильного приложения",
      cover: "assets/images/proj-haqqex.png",
      tags: ["Product Design", "Crypto", "Mobile App", "Landing Page"],
      links: [{ label: "Behance", href: "https://www.behance.net/gallery/171243765/HAQQEX" }],
    },
    {
      title: "Ispolin Capital",
      description: "Дизайн для инвестиционной компании — брендинг и веб-платформа",
      cover: "assets/images/proj-ispolin.jpg",
      tags: ["Brand Identity", "Web Design", "UI/UX"],
      links: [{ label: "Behance", href: "https://www.behance.net/gallery/172260851/Ispolin-capital" }],
    },
    {
      title: "Bellator Bike Lab",
      description: "Брендинг и дизайн для велосипедной лаборатории",
      cover: "assets/images/proj-bellator.jpg",
      tags: ["Brand Identity", "Web Design", "UI/UX"],
      links: [{ label: "Behance", href: "https://www.behance.net/gallery/232372549/Bellator-Bike-Lab" }],
    },
    {
      title: "CURIO",
      description: "Дизайн платформы и брендинг для креативного продукта",
      cover: "assets/images/proj-curio.jpg",
      tags: ["Product Design", "Branding", "UI/UX"],
      links: [{ label: "Behance", href: "https://www.behance.net/gallery/145473747/CURIO" }],
    },
    {
      title: "Dream Car Investment",
      description: "Инвестиционная платформа для автомобильного рынка",
      cover: "assets/images/proj-dreamcar.jpg",
      tags: ["Product Design", "Web Design", "UI/UX"],
      links: [{ label: "Behance", href: "https://www.behance.net/gallery/159016397/Dream-Car-Investment" }],
    },
    {
      title: "Anywear",
      description: "Fashion-платформа с UGC и механиками монетизации",
      cover: "assets/images/proj-anywear.jpg",
      tags: ["Product Design", "Mobile App", "UI/UX"],
      links: [{ label: "Behance", href: "https://www.behance.net/gallery/143016217/Anywear" }],
    },
  ],
};
