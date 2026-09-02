/**
 * Английская версия контента. Структура полностью повторяет js/data.js —
 * если добавляете блок там, добавьте и здесь, иначе он не появится в EN.
 *
 * Контакты и логотипы берутся из русской версии (они общие).
 */

const PRODUCT_ACHIEVEMENTS_EN = [
  {
    tag: "MEDTECH",
    value: "CURIO",
    desc: "HIPAA-compliant telemedicine interface. Key Visual. Growth in service reach and retention after launch",
  },
  {
    tag: "FASHION",
    value: "ANYWEAR",
    desc: "Interface with UGC and monetisation mechanics. Growth in the user base and purchase conversion",
  },
  {
    tag: "CRYPTO",
    value: "HAQQEX",
    desc: "Mobile app + crypto exchange on a single design system. Growth in active traders, expansion to Europe and Asia",
  },
];

const SITE_DATA_EN = {
  profile: {
    name: "Victoria",
    role: "Product Designer",
    photo: "assets/images/photo.jpg",
    // Массив = явные переносы: "for" уходит на строку к millions,
    // "exchange" — на отдельную строку.
    headline: ["I create world-class digital products", "for millions of users worldwide"],
    subheadline: ["Fintech, CRM, AI platforms,", "B2B SaaS, Web3, exchange solutions"],
    lines: [
      "10 years in design, 3 of them in FinTech",
      "I use a data-driven and human-centric approach",
      "across end-to-end design processes",
    ],
    ctaLabel: "All cases",
    ctaHref: "#projects",
  },

  skills: {
    eyebrow: "Full-cycle product design — from strategy to product metrics",
    title: "Product Design for:",
    titleHighlight: "B2B AI SaaS Fintech Medtech Ed-tech",
    columns: [
      {
        title: "Research and strategy",
        items: ["User Research", "A/B testing", "Customer Journey", "Competitive analysis", "Data-Driven Design"],
      },
      {
        title: "Design and systems",
        items: ["UX / UI Design", "Design systems", "CX Design", "Brand Design", "Prototyping"],
      },
      {
        title: "Leadership and process",
        items: ["Team management", "Mentoring", "Product Roadmap", "Design Operations", "Stakeholder management"],
      },
    ],
  },

  bio: {
    strong1:
      "Product design lead with experience running the full cycle of digital product development — from Discovery and research to Delivery and shaping the visual direction.",
    muted:
      "I focus on design decisions that improve the user experience and directly move the product's business metrics.",
    strong2:
      "I embed design processes into business strategy, connecting user needs, company goals and effective delivery in engineering.",
  },

  experience: [
    {
      industry: "Fintech experience",
      badge: "FINTECH",
      companies: [
        {
          logoText: "MOEX GROUP",
          name: "Moscow Exchange",
          logoSrc: "assets/logos/moex.png",
          whatIDid: [
            {
              title: "Product strategy and UX optimisation",
              text: "Designed three high-load B2B platforms (EPR foreign trade, DFA with 50+ bn RUB issuance, clearing platform), cut key operations from 3–5 days to 24 hours and increased product ROI 2.2×.",
            },
            {
              title: "Design system and scaling solutions",
              text: "Built a single design system for three platforms, accelerating time-to-market by 35%, reducing development errors and enabling component migration from Vue.js to React.",
            },
            {
              title: "Research and product growth",
              text: "Introduced product research and A/B testing processes using the double diamond framework, redesigned onboarding and authorisation (UNEP), raising NPS by 27 pp in 6 months.",
            },
            {
              title: "Design leadership and ecosystem growth",
              text: "Created the Key Visual for new business lines, the market widget concept for the Moscow Exchange website and a designer competency map to standardise grades and grow the team.",
            },
          ],
          achievementsSubtitle: "Metrics and results I delivered for the business",
          achievements: [
            {
              tag: "TIME TO PAYMENT",
              tagRight: "DFA",
              value: "3–5 days → 24h",
              desc: "A/B testing with platform operators. Reduced time of key operations on the DFA platform",
            },
            {
              tag: "DFA ISSUANCE VOLUME",
              tagRight: "B2B FINTECH",
              value: "50+ bn RUB",
              desc: "Designed interfaces for issuing and trading DFAs. A metric-driven approach to every interface",
            },
            {
              tag: "EPR FOREIGN TRADE",
              tagRight: "FROM SCRATCH",
              value: "Cross-border payments",
              desc: "Full cycle from request to execution. Onboarding via UNEP — growth in entry conversion. Usability tests with foreign trade specialists",
            },
            {
              tag: "CLEARING",
              tagRight: "FROM SCRATCH",
              value: "Clearing platform",
              desc: "A settlement system with critical data accuracy. Translating complex financial logic into an interface",
            },
            {
              tag: "DESIGN SYSTEM",
              value: "Vue.js → React",
              desc: "Design system and component migration to a single technology stack",
            },
            {
              tag: "USABILITY",
              value: "Regular testing",
              desc: "With professional market participants: traders, brokers, operators",
            },
            {
              tag: "PROCESS",
              value: "Design Review",
              desc: "UX decision documentation, handoff with engineering, designer mentoring",
            },
            {
              tag: "LEADERSHIP",
              tagRight: "LEADERSHIP",
              value: "Competency map",
              desc: "Standardised grades and development tracks for designers",
            },
          ],
        },
        {
          logoText: "SBER",
          name: "Sberbank",
          logoSrc: "assets/logos/sber.png",
          accent: "green",
          whatIDid: [
            {
              title: "Product strategy and international product launch",
              text: "Built a banking app for the Indian market from scratch to MVP in 4 months: ran ethnographic research, designed end-to-end scenarios and localised the UX for the cultural traits of the audience.",
            },
            {
              title: "UX research and optimisation of enterprise solutions",
              text: "Reworked an ERP application for corporate clients: improved information architecture, introduced templates, validation and adaptive hints, cutting operation time and the number of user errors",
            },
            {
              title: "Brand adaptation and visual strategy",
              text: "Created the Key Visual and brand elements to adapt a global banking product for the Indian market, ensuring a coherent user experience and alignment with local cultural traits.",
            },
          ],
          achievementGroups: [
            {
              label: "INDIAN BANKING APP",
              items: [
                {
                  tag: "MVP",
                  value: "4 months",
                  desc: "4 months from the start of design to the MVP launch in the Indian market",
                },
                {
                  tag: "CONVERSION",
                  value: "Entry growth",
                  desc: "Localised sign-up scenarios accounting for cultural specifics",
                },
                {
                  tag: "RESEARCH",
                  value: "Ethnography",
                  desc: "Field research with the local audience, uncovering hidden patterns",
                },
              ],
            },
            {
              label: "ERP · FINANCIAL REPORTING",
              items: [
                {
                  tag: "TIME TO TASK",
                  value: "Hours → Minutes",
                  desc: "Reduced time of key operations: reports, exports, data reconciliation",
                },
                {
                  tag: "ERRORS",
                  value: "Reduction",
                  desc: "Real-time validation and adaptive hints while filling in forms",
                },
                {
                  tag: "ADOPTION",
                  value: "Adoption growth",
                  desc: "Redesigned onboarding and navigation, fewer support requests",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      industry: "E-commerce experience",
      badge: "E-COMMERCE",
      companies: [
        {
          logoText: "Feymanlabs",
          name: "Feymanlabs",
          logoSrc: "assets/logos/feynman.png",
          whatIDid: [
            {
              title: "Design leadership and team management",
              text: "Led design for three mobile products across the US, Europe and Asia: managed a team of 3 designers, ran 5 hires, introduced design reviews, competency development and team collaboration processes.",
            },
            {
              title: "Product design and Discovery processes",
              text: "Built the full discovery → delivery cycle: research, CJM, prototyping, usability tests and A/B experiments. Delivered the launch of three mobile apps in international markets.",
            },
            {
              title: "Design systems and scaling solutions",
              text: "Created modular design systems for medtech, fashion and crypto products, ensuring a consistent approach to interface development, faster delivery and scaling across platforms.",
            },
            {
              title: "Product strategy and metric growth",
              text: "Developed the visual concept and UX for CURIO, ANYWEAR and HAQQEX, including Key Visual and product scenarios, which drove growth in the user base, retention and activity after entering new markets.",
            },
          ],
          achievementGroups: [
            {
              label: "MANAGEMENT",
              items: [
                { tag: "TEAM", value: "3 + 5 hires", desc: "A team of 3 designers, 5 full-cycle hires" },
                { tag: "DISCOVERY", value: "Full cycle", desc: "Interviews, CJM, usability, A/B tests" },
              ],
            },
            { label: "PRODUCTS", items: PRODUCT_ACHIEVEMENTS_EN },
          ],
        },
      ],
    },
    {
      industry: "Ed-tech experience",
      badge: "ED-TECH",
      companies: [
        {
          logoText: "BRE",
          name: "Great Russian Encyclopedia",
          logoSrc: "assets/logos/bre.png",
          whatIDid: [
            {
              title: "Building the design function from scratch",
              text: "Created the design function from the ground up: hired a team of 5 designers, developed a competency map, introduced review processes, KPI tracking and specialist development.",
            },
            {
              title: "Operational management and process",
              text: "Set up collaboration between design and engineering through Jira, a RACI matrix and quality checklists, and shaped the budget for research and tooling",
            },
            {
              title: "Product redesign and UX transformation",
              text: "Ran a full portal redesign: research, CJM, usability testing, new architecture and visual system. Built personalised authorisation and navigation, increasing conversion and product DAU",
            },
          ],
          achievementGroups: [
            {
              label: "MANAGEMENT",
              items: [
                {
                  tag: "HIRING",
                  value: "5 designers",
                  desc: "Full cycle: screening, test tasks, interviews, offer, onboarding",
                },
                { tag: "GRADES", value: "3 grades", desc: "Interviews, CJM, usability, A/B tests" },
              ],
            },
            { label: "PRODUCT", items: PRODUCT_ACHIEVEMENTS_EN },
          ],
        },
      ],
    },
  ],

  projects: [
    {
      title: "B2B platform for cross-border payments",
      description: "Launch of a product solution for connecting banks and processing international payments",
      cover: "assets/images/proj-b2b-payments.png",
      tags: ["Research", "Product Hypotheses", "UX", "UI", "Delivery", "Metrics"],
      links: [
        {
          label: "Behance",
          href: "https://www.behance.net/gallery/244423585/Fintech-B2B-Platform-for-Cross-Border-Payments",
        },
      ],
    },
    {
      title: "CREATE — Corporate Assistant for HR",
      description: "Software platform for managing employees and corporate processes",
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
      description: "Crypto Ecosystem — product design for a crypto exchange and mobile app",
      cover: "assets/images/proj-haqqex.png",
      tags: ["Product Design", "Crypto", "Mobile App", "Landing Page"],
      links: [{ label: "Behance", href: "https://www.behance.net/gallery/171243765/HAQQEX" }],
    },
    {
      title: "Ispolin Capital",
      description: "Design for an investment company — branding and web platform",
      cover: "assets/images/proj-ispolin.jpg",
      tags: ["Brand Identity", "Web Design", "UI/UX"],
      links: [{ label: "Behance", href: "https://www.behance.net/gallery/172260851/Ispolin-capital" }],
    },
    {
      title: "Bellator Bike Lab",
      description: "Branding and design for a bicycle lab",
      cover: "assets/images/proj-bellator.jpg",
      tags: ["Brand Identity", "Web Design", "UI/UX"],
      links: [{ label: "Behance", href: "https://www.behance.net/gallery/232372549/Bellator-Bike-Lab" }],
    },
    {
      title: "CURIO",
      description: "Platform design and branding for a creative product",
      cover: "assets/images/proj-curio.jpg",
      tags: ["Product Design", "Branding", "UI/UX"],
      links: [{ label: "Behance", href: "https://www.behance.net/gallery/145473747/CURIO" }],
    },
    {
      title: "Dream Car Investment",
      description: "Investment platform for the automotive market",
      cover: "assets/images/proj-dreamcar.jpg",
      tags: ["Product Design", "Web Design", "UI/UX"],
      links: [{ label: "Behance", href: "https://www.behance.net/gallery/159016397/Dream-Car-Investment" }],
    },
    {
      title: "Anywear",
      description: "Fashion platform with UGC and monetisation mechanics",
      cover: "assets/images/proj-anywear.jpg",
      tags: ["Product Design", "Mobile App", "UI/UX"],
      links: [{ label: "Behance", href: "https://www.behance.net/gallery/143016217/Anywear" }],
    },
  ],
};

// Подписи интерфейса, которые лежат в разметке, а не в данных
const UI_STRINGS = {
  ru: {
    langLabel: "EN",
    skillsHeading: "Что я умею:",
    experienceHeading: "Опыт",
    whatIDid: "Что сделала",
    keyAchievements: "Ключевые достижения",
    projectsHeading: "Последние проекты",
    projectsSubtitle: "Полное портфолио — на Behance",
    allProjects: "Посмотреть все проекты",
    contactHeading: "Обсудим проект?",
    contactSubtitle: "Пишите в Telegram или на почту — отвечаю быстро.",
    emailButton: "Написать на почту",
    telegramButton: "Написать в Telegram",
    footerNote: "Виктория. Product Design.",
    htmlLang: "ru",
  },
  en: {
    langLabel: "RU",
    skillsHeading: "What I do:",
    experienceHeading: "Experience",
    whatIDid: "What I did",
    keyAchievements: "Key achievements",
    projectsHeading: "Latest projects",
    projectsSubtitle: "Full portfolio — on Behance",
    allProjects: "See all projects",
    contactHeading: "Let's talk about your project",
    contactSubtitle: "Write on Telegram or by email — I reply quickly.",
    emailButton: "Send an email",
    telegramButton: "Message on Telegram",
    footerNote: "Victoria. Product Design.",
    htmlLang: "en",
  },
};
