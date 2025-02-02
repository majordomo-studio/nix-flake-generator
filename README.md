# Nix Flake Generator

## Built on majordomo.systems Astro v5 Boilerplate

## Astro [Integrations](https://astro.build/integrations/)

- [x] [React](https://docs.astro.build/en/guides/integrations-guide/react/)
- [x] [Vue](https://docs.astro.build/en/guides/integrations-guide/vue/)
- [x] [Astro DB](https://astro.build/db/)
- [x] [HTMX](https://htmx.org/)
- [x] [Sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [x] [Partytown](https://docs.astro.build/en/guides/integrations-guide/partytown/)
- [x] [MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/)
- [x] [Icon](https://github.com/natemoo-re/astro-icon)
- [x] [Iconify](https://icon-sets.iconify.design/)
    - [Material Symbols](https://fonts.google.com/icons)
    - [Material Symbols Light](https://fonts.google.com/icons)
    - [Phosphor](https://phosphoricons.com/)
    - [Lucide](https://lucide.dev/)
    - [Tabler](https://tabler.io/icons)
    - [Simple Icons](https://simpleicons.org/)
- [x] [SEO](https://github.com/jonasmerlin/astro-seo)
- [x] [Compress](https://github.com/Playform/Compress)
- [x] [ESLint](https://github.com/ota-meshi/eslint-plugin-astro)
- [x] [Prettier](https://github.com/withastro/prettier-plugin-astro)
- [x] [Radix UI](https://www.radix-ui.com/)
- [x] [shadcn/ui](https://ui.shadcn.com/)
    - [TailwindCSS](https://tailwindcss.com/)

## Optional Integrations

- [x] [TS Particles](https://github.com/tsparticles/astro)


# Astro Shadcn UI Template

This template helps you build apps with Astro, Tailwind CSS, and Shadcn UI.  It is a fork of [AREA44](https://github.com/AREA44/astro-shadcn-ui-template)'s Astro template.

## Getting Started

To get started with this application, make sure you have Node.js v18+ installed on your system. Then, follow these steps:

```bash
git clone --depth=1 https://github.com/AREA44/astro-shadcn-ui-template
cd astro-shadcn-ui-template
pnpm install
pnpm dev
```

Now, you can open your browser and navigate to http://localhost:4321 to see the application running.

## Features

- [Astro](https://astro.build): A modern static site builder that allows you to write components using familiar web standards like HTML, CSS, and JavaScript.
- [Tailwind CSS](https://tailwindcss.com): A utility-first CSS framework that provides a set of pre-designed styling classes to rapidly build user interfaces.
- [shadcn/ui](https://ui.shadcn.com): A collection of reusable UI components for building responsive and accessible interfaces.
- The template includes support for a theme toggle, allowing users to switch between light and dark themes.

## How to add components

Shadcn UI is a collection of re-usable components that can be easily integrated into your applications. It is not a component library, but rather a set of components that you can copy and paste into your projects.

To add a new component to your application, please refer to the [configuration guide](https://ui.shadcn.com/docs/installation/astro#thats-it).

```bash
npx shadcn-ui@latest add
```

> [!NOTE]
> In Astro, an [island](https://docs.astro.build/en/concepts/islands/) refers to any interactive UI component on the page. To add an interactive component like [Accordion](https://ui.shadcn.com/docs/components/accordion), [Dialog](https://ui.shadcn.com/docs/components/dialog) and more you have a couple of solutions available: [Add a Shadcn UI Component - Space Madness](https://spacemadness.dev/docs/add-a-shadcn-ui-component) or [shadcn-ui/ui#2890](https://github.com/AREA44/astro-shadcn-ui-template/issues/66).

For detailed documentation on using Shadcn UI, please visit the [full documentation](https://ui.shadcn.com/docs).

Shadcn UI is primarily built for the React framework. If you are unfamiliar with framework components in Astro, we recommend reading the [framework components guide](https://docs.astro.build/en/core-concepts/framework-components/) to get started.

Feel free to explore the various components and enhance your application with Shadcn UI!

### Icons

[Icones](https://icones.js.org/)

## License

Licensed under the [MIT License](LICENSE).

# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
