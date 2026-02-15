import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: '🚀 Getting Started',
      collapsed: false,
      items: [
        'getting-started/prerequisites',
        'getting-started/app-setup',
        'getting-started/environment',
        'getting-started/installation',
      ],
    },
    {
      type: 'category',
      label: '🔐 Authentication',
      items: [
        'authentication/oauth-overview',
        'authentication/access-tokens',
        'authentication/sdk-oauth',
      ],
    },
    {
      type: 'category',
      label: '📖 Guides',
      items: [
        'guides/user-profile',
        'guides/publishing',
        'guides/messaging',
        'guides/comments',
        'guides/insights',
        'guides/webhooks',
      ],
    },
    {
      type: 'category',
      label: '📚 API Reference',
      link: {
        type: 'doc',
        id: 'api-reference/index',
      },
      items: [
        'api-reference/client',
        'api-reference/oauth',
        'api-reference/users',
        'api-reference/media',
        'api-reference/publishing',
        'api-reference/messaging',
        'api-reference/comments',
        'api-reference/insights',
        'api-reference/webhooks',
      ],
    },
  ],
};

export default sidebars;
