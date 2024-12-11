#!/usr/bin/env node

//                   _         _____ _
//       /\         | |       / ____(_)
//      /  \   _ __ | |_ ___ | |     _  ___
//     / /\ \ | '_ \| __/ _ \| |    | |/ __|
//    / ____ \| | | | || (_) | |____| | (__
//   /_/    \_\_| |_|\__\___/ \_____|_|\___|

import { log, checkArg, menu, runCmd, createFolder, text } from "./src/utils.js";
import createVueFile from "./src/commands/createVueFile.js";
import getRuntimeconfig from "./src/commands/getRuntimeconfig.js";
import help from "./src/commands/help.js";
import setConfig from "./src/commands/setConfig.js";



const fullMenu = {
  "Deploy": {
    "Compila velocemente e distribuisci": "vite build; firebase deploy",
    "Compila in modalità produzione e distribuisci": "npm ci; vite build; firebase deploy",
    runHola: async () => { return await runCmd("echo holaaaaaaaaaaaaa"); },
  },
  "Create": { createVueFile: async () => { await createVueFile(); } },
  "Init": {
    "Get runtimeconfig": async () => { return await getRuntimeconfig(); },
    "Set runtimeconfig": async () => { return await setConfig(); },
    "Installa dipendenze globali necessarie": [
      "npm install -g @vue/cli",
      "npm install -g firebase-tools",
      "npm install -g vite",
      "npm install -g create-vite",
    ].join("; "),
    "Installa dipendenze locali necessarie": [
      "npm install @popperjs/core",
      "npm install axios",
      "npm install bootstrap",
      "npm install firebase",
      "npm install firebase-functions",
      "npm install vue-router",
      "npm install vue",
    ].join("; "),
    "Installa dipendenze di sviluppo necessarie": [
      "npm install @vitejs/plugin-vue --save-dev",
      "npm install sass --save-dev",
      "npm install vite --save-dev",
    ].join("; "),
    "Inizializza progetto": [
      "npm i",
      "cd ./functions",
      "npm i",
      "cd ../",
      "firebase login",
      "vite build",
      "firebase deploy",
    ].join("; "),
  },
  "Installa Dependencies": {
    Dependencies: {
      "Installa @popperjs/core": "npm install @popperjs/core",
      "Installa Axios": "npm install axios",
      "Installa Bootstrap": "npm install bootstrap",
      "Installa Firebase": "npm install firebase",
      "Installa Firebase Functions": "npm install firebase-functions",
      "Installa Vue Router": "npm install vue-router",
      "Installa Vue": "npm install vue",
      "Installa ESLint": "npm install eslint",
      "Installa Prettier": "npm install prettier",
      "Installa Nodemon": "npm install nodemon",
      "Installa Express": "npm i express",
      "Installa vue-i18n": "npm i vue-i18n",
    },

    "Global dependencies": {
      "Installa -g Vue CLI": "npm install -g @vue/cli",
      "Installa -g Firebase CLI": "npm install -g firebase-tools",
      "Installa -g Vite": "npm install -g vite",
      "Installa -g create-vite": "npm install -g create-vite",
      "Installa -g json-server": "npm install -g json-server",
      "Installa -g Netlify CLI": "npm install -g netlify-cli",
      "Installa -g TypeScript": "npm install -g typescript",
      "Installa -g Vercel CLI": "npm install -g vercel",
      "Installa -g Nodemon": "npm install -g nodemon",
    },
    "Dev dependencies": {
      "Installa @vitejs/plugin-vue": "npm install @vitejs/plugin-vue --save-dev",
      "Installa Sass": "npm install sass --save-dev",
      "Installa Vite": "npm install vite --save-dev",
    },
  },

  "Other": {
    createFolder: async () => { await createFolder(); },
    createVueFile: async () => { await createVueFile(); }
  },
  "help": async () => { help(); }
};


async function menuCmd(cmds = null) {
  if (cmds === null) {
    log.red("inserise params in menuCmd(cmds).");
    process.exit(0);
  }
  const optionsCmds = [...Object.keys(cmds), "Esci"];
  const choiceCmd = await menu(optionsCmds, "Cosa vuoi fare?");
  const option = optionsCmds[choiceCmd];
  const cmd = cmds[option];
  if (!!cmd) {
    switch (typeof (cmd)) {
      case 'string':
        log.info('Esecuzione di "' + cmd + '" in corso...');
        console.log(await runCmd(cmd));
        break;

      case 'function':
        console.log(text.cyan('Esecuzione di ') + text.brightYellow(option) + text.cyan(' in corso...'));
        await cmd();
        break;

      case 'object':
        await menuCmd(cmd);
        break;

      default:
        log.red("Tipo comando " + typeof (cmd) + " non valido");
        process.exit(0);
        break;
    }
  } else {
    log.black("Uscita.");
    process.exit(0);
  }
}

// Avvia il programma principale
menuCmd(fullMenu).catch((error) => {
  log.error(`index: ${error.message}`);
  process.exit(1);
});

//   const optionsArgs = ["-d", "-m"];
//   const choice = checkArg(optionsArgs) || (await menu(options, "Cosa vuoi fare?"));
