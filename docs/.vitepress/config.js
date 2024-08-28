import { defineConfig } from 'vitepress';

export default defineConfig({
  title: '4m00se Documentation',
  description: 'Documentation for 4m00se project',
  base: '/docs/',
  head: [['link', { rel: 'icon', href: '/docs/favicon.png' }]],
  themeConfig: {
    siteTitle: '4m00se',
    logo: '/img/logo.png',
    socialLinks: [{ icon: 'github', link: 'https://github.com/stellar-dapps/4m00se-dapp' }],
    nav: [{ text: '4m00se app', link: 'https://4m.lol' }],
    sidebar: [
      {
        text: 'What is 4m00se?',
        link: '/'
      },
      {
        text: 'User guide',
        items: [{ text: 'Form builder quick start', link: '/guide/' }]
      },
      {
        text: 'Widget reference',
        items: [{ text: 'Getting started with form widgets', link: '/reference/' }]
      },
      {
        text: 'Architecture',
        items: [
          { text: 'Project philosophy', link: '/architecture/' },
          { text: 'Form data flow 101', link: '/architecture/data-flow' }
        ]
      },
      {
        text: 'Developer guide',
        items: [
          { text: 'Getting started guide for developers', link: '/dev/' },
          { text: 'Project development roadmap', link: '/dev/roadmap' },
          { text: 'Developer resources', link: '/dev/resources' },
          { text: 'Using as a project starter', link: '/dev/starter' }
        ]
      }
    ]
  }
});
