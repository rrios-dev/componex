import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcssPostcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@chromatic-com/storybook"
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  docs: {
    autodocs: 'tag',
  },

  core: {
    builder: '@storybook/builder-vite',
  },

  async viteFinal(config) {
    return {
      ...config,
      css: {
        ...config.css,
        postcss: {
          plugins: [
            tailwindcssPostcss,
            autoprefixer,
          ],
        },
      },
    };
  },

  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
};

export default config; 