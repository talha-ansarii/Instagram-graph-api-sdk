import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Instagram Graph API SDK',
  tagline: 'Type-safe TypeScript SDK for Instagram Graph API',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://your-org.github.io',
  baseUrl: '/instagram-graph-api-sdk/',

  organizationName: 'your-org',
  projectName: 'instagram-graph-api-sdk',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Instagram Graph API SDK',
      logo: {
        alt: 'SDK Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://www.npmjs.com/package/instagram-graph-api-sdk',
          label: 'NPM',
          position: 'right',
        },
        {
          href: 'https://github.com/your-org/instagram-graph-api-sdk',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Getting Started', to: '/getting-started/prerequisites' },
            { label: 'Authentication', to: '/authentication/oauth-overview' },
            { label: 'API Reference', to: '/api-reference' },
          ],
        },
        {
          title: 'Resources',
          items: [
            { label: 'Instagram API Docs', href: 'https://developers.facebook.com/docs/instagram-platform' },
            { label: 'Meta for Developers', href: 'https://developers.facebook.com/' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'GitHub', href: 'https://github.com/your-org/instagram-graph-api-sdk' },
            { label: 'NPM Package', href: 'https://www.npmjs.com/package/instagram-graph-api-sdk' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Instagram Graph API SDK. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
