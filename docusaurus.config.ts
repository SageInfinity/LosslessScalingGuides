import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type { ThemeConfig } from '@docusaurus/types';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Lossless Scaling Guides',
  tagline: '',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://sageinfinity.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  //organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'SageInfinity.github.io',
  organizationName: 'SageInfinity',
  deploymentBranch: 'deploy',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: false,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
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
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Home',
      logo: {
        src: 'img/favicon.ico',
      },
      items: [      
        {
          type: 'doc',
          docId: 'Guides/videoguides',
          position: 'left',
          label: 'Video Guides',
          overflow: 'visible',
        },
        {
          type: 'doc',
          docId: 'Guides/start',
          position: 'left',
          label: 'Guides',
          overflow: 'visible',
        },
        {
          type: 'doc',
          docId: 'Guides/DualGPUGuide',
          position: 'left',
          label: 'DualGPU Guide',
          overflow: 'visible',
        },
        {
          type: 'doc',
          docId: 'FAQ/scalers',
          position: 'left',
          label: 'FAQ',
          overflow: 'visible',
        },
        {
          type: 'doc',
          docId: 'Graphs/graphs',
          position: 'left',
          label: 'Graphs',
          overflow: 'visible',
        },
        {
          position: 'right',
          href: 'https://losslessscaling.com/',
          className: 'header-website-link',
          'aria-label': 'Official Website',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Offical Reddit',
              href: 'https://www.reddit.com/r/losslessscaling/',
            },
            {
              label: 'Offical Discord',
              href: 'https://discord.gg/tuwuNF3xSA',
            },
            {
              label: 'Official Steam Community',
              href: 'https://steamcommunity.com/app/993090/discussions/',
            },
          ],
        },
      ],
//      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
