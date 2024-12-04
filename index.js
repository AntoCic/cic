#!/usr/bin/env node

import { log, checkArg, menu, runCmd, createFolder } from './src/utils.js';
import createVueFile from './src/commands/createVueFile.js';
import help from './src/commands/help.js';

const options = [
    'Crea una cartella',
    'Crea un file Vue',
    'Esegui npm i',
    'help',
    'Esci',
];

const optionsArgs = [
    '-cc',
    '-cf',
    '-run-1',
    '--help',
    '',
    '--test',
];

// Funzione principale
async function main() {
    const choice = checkArg(optionsArgs) || await menu(options, 'Cosa vuoi fare?');

    switch (choice) {
        case 0:{
            await createFolder();
            break;
        }
        case 1: {
            await createVueFile();
            break;
        }
        case 2: {
            log.info('Esecuzione di "npm i" in corso...');
            await runCmd('npm i');
            break;
        }
        case 3: {
            help();
            break;
        }
        case 4: {
            log.info('Esecuzione del comando "cic i" in corso...');
            await runCmd('cic test');
            break;
        }
        default: {
            log.blue('Uscita.');
            process.exit(0);
        }
    }
}

// Avvia il programma principale
main().catch((error) => {
    log.error(`index: ${error.message}`);
    process.exit(1);
});
