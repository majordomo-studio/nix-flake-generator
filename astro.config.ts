import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import mdx from "@astrojs/mdx";
import playformCompress from "@playform/compress";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import expressiveCode, {
  type AstroExpressiveCodeOptions, ExpressiveCodeTheme 
} from 'astro-expressive-code';
import vue from "@astrojs/vue";
import db from "@astrojs/db";
import fs from 'node:fs';

const themeFile = fs.readFileSync(
  new URL(
    `./src/assets/styles/rainglowAzure.jsonc`,
    import.meta.url
  ),
  'utf-8'
);

const codeTheme = ExpressiveCodeTheme.fromJSONString(themeFile);

const astroExpressiveCodeOptions: AstroExpressiveCodeOptions = {
  themes: [codeTheme],
  themeCssSelector: (theme) => `.${theme.type}`,
  useThemedSelectionColors: true,
  styleOverrides: {
    textMarkers: {
      markBackground: 'hsla(220, 25.00%, 30%, 0.4)',
      markBorderColor: 'hsla(220, 30.00%, 30%, 1)',
    },
    frames: {
      inlineButtonBorderOpacity: '0.0',
    }
  },
};

// https://astro.build/config
export default defineConfig({
  site: process.env.CI
    ? 'https://your-website-address.app'
    : 'http://localhost:4321',
    prefetch: {
    defaultStrategy: 'load',
    prefetchAll: true,
  },
  integrations: [react(), tailwind({
    applyBaseStyles: false
  }), expressiveCode(astroExpressiveCodeOptions), partytown(), mdx(), playformCompress(), sitemap(), icon(), vue(), db()]
});