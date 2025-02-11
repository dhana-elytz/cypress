import { defineConfig } from "cypress";
import * as browserify from "@cypress/browserify-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { preprocessor } from "@badeball/cypress-cucumber-preprocessor/browserify";
import fs from 'fs'

export async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    preprocessor(config, {
      ...browserify.defaultOptions,
      typescript: require.resolve("typescript"),
    })
  );
  on(
    'after:run', (result) => {
    }
  )

  // on('before:browser:launch', (browser, launchOptions) => {

  //   if (browser.family === 'chromium' && browser.name !== 'electron') {
  //     launchOptions.args.push('--window-size=1920,1080')    
  //     launchOptions.args.push('--start-fullscreen')
  //   }
  
  //   if (browser.name === 'electron') {
  //     launchOptions.preferences.fullscreen = true
  //   }
  //     return launchOptions
  // })

  return config;
}

const getFileConfig = () => {
  if (process.env.NODE_ENV === 'ninja') {
    return JSON.parse(fs.readFileSync('cypress.ninja.json', 'utf-8'))
  }

  if (process.env.NODE_ENV === 'ninja-sg') {
    return JSON.parse(fs.readFileSync('cypress.ninja-sg.json', 'utf-8'))
  }

  if (process.env.NODE_ENV === 'rocks') {
    return JSON.parse(fs.readFileSync('cypress.rocks.json', 'utf-8'))
  }
  if (process.env.NODE_ENV === 'plus') {
    return JSON.parse(fs.readFileSync('cypress.plus.json', 'utf-8'))
  }

  return JSON.parse(fs.readFileSync('cypress.ninja.json', 'utf-8'))
}
export default defineConfig({
  env: {
    ...getFileConfig()
  },
  projectId: "ynr8jq",
  watchForFileChanges: false,
  chromeWebSecurity: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  video: false,
  defaultCommandTimeout: 30000,
  e2e: {
    specPattern: ["**/*.feature", "**/*.test.ts"],
    setupNodeEvents,
  },
});
