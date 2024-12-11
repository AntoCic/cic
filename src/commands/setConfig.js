// setConfig.js
import fs from 'fs';
import { log, runCmd } from '../utils.js';

/**
 * Funzione di utilità per convertire un oggetto annidato in una serie di coppie chiave-valore 
 * in notazione a punti (dot notation).
 * Esempio:
 * {
 *   foo: { bar: "value1" },
 *   baz: "value2"
 * }
 * =>
 * {
 *   "foo.bar": "value1",
 *   "baz": "value2"
 * }
 */
function flattenConfig(obj, prefix = '') {
    let result = {};
    for (const key in obj) {
        const value = obj[key];
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            // Ricorsione se l'elemento è un oggetto
            const nested = flattenConfig(value, fullKey);
            result = { ...result, ...nested };
        } else {
            // Chiave-valore semplice
            result[fullKey] = value;
        }
    }
    return result;
}

/**
 * Legge il file .runtimeconfig.json, fa il backup della configurazione attuale 
 * di Firebase Functions in runtimeconfig_backup.json, e poi aggiorna le 
 * variabili di Firebase con i valori presenti in .runtimeconfig.json.
 */
export default async function setConfig() {
    const configPath = '.runtimeconfig.json';
    const backupPath = 'runtimeconfig_backup.json';

    // Controlla se .runtimeconfig.json esiste
    const configExists = fs.existsSync(configPath);
    if (!configExists) {
        log.error('Errore: .runtimeconfig.json non trovato. Assicurati di averlo creato prima (ad es. con getRuntimeconfig).');
        return;
    }

    // Eseguiamo una get per ottenere le configurazioni attuali, da salvare come backup
    let currentConfigObj = {};
    try {
        if(fs.existsSync('./functions')){
            await runCmd('cd ./functions');
        }else{
            log.error('Spostati nella main root del project dove trovi index.html e vite.config.js');
            return;
        }
        const currentConfigData = await runCmd('firebase functions:config:get');
        fs.writeFileSync(backupPath, currentConfigData);
        currentConfigObj = JSON.parse(currentConfigData);
        log.info(`Backup della configurazione attuale creato in ${backupPath}.`);
    } catch (err) {
        log.error('Errore durante la lettura della configurazione attuale:', err);
        await runCmd('cd ../');
        return;
    }



    // Leggiamo la nuova configurazione da .runtimeconfig.json
    let newConfigObj = {};
    try {
        const data = fs.readFileSync(configPath, 'utf-8');
        newConfigObj = JSON.parse(data);
    } catch (err) {
        log.error(`Errore durante la lettura di ${configPath}:`, err);
        await runCmd('cd ../');
        return;
    }

    // Converte l'oggetto in coppie chiave-valore nel formato richiesto da firebase functions:config:set
    const currentKey = flattenConfig(currentConfigObj);
    const newKey = flattenConfig(newConfigObj);

    // Costruiamo la stringa di comando per firebase functions:config:set
    // Esempio: firebase functions:config:set foo.bar="value1" baz="value2"
    let setArgs = '';
    const keyToRemove = [];
    let foundUppercase = false;
    for (const key in newKey) {
        if (currentKey[key]) {
            if (currentKey[key] != newKey[key]) {
                keyToRemove.push(key);
                setArgs += ` ${key}="${newKey[key]}"`;
            }
        } else {
            const fixedKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
            if (/[A-Z]/.test(key)) {
                foundUppercase = true;
                log.red(`Questa chiave ${key} è stata sostituita con  ${fixedKey}`)
            }
            setArgs += ` ${fixedKey}="${newKey[key]}"`;
        }
    }

    for (const key in currentKey) {
        if (!newKey[key]) {
            keyToRemove.push(key);
        }
    }
    const unsetArgs = keyToRemove.length > 0 ? ' ' + keyToRemove.join(' ') : '';

    if (unsetArgs != '') {
        try {
            log.info('Rimuovo chiavi da configurazione Firebase.');
            await runCmd(`firebase functions:config:unset${unsetArgs}`);
            log.success('Rimosse');
        } catch (err) {
            log.error('Errore durante la rimozione delle chiavi dalla configurazione Firebase:', err);
        }
    }

    if (setArgs != '') {
        try {
            log.info('Setto nuove chiavi da .runtimeconfig.json.');
            await runCmd(`firebase functions:config:set${setArgs}`);
            log.success('Configurazione Firebase aggiornata con successo da .runtimeconfig.json.');
        } catch (err) {
            log.error('Errore durante l\'aggiornamento della configurazione Firebase:', err, 'RICORDA non si possono usare lettere maiuscole per le chiavi');
        }
    }

    if (foundUppercase) {
        log.info('Correggo il .runtimeconfig.json per la lettera maiuscola.');
        try {
            const data = await runCmd('firebase functions:config:get');
            fs.writeFileSync(configPath, data);
            log.success('Variabili env copiate in .runtimeconfig.json');
        } catch (err) {
            console.error('Errore:', err);
        }
    }
    await runCmd('cd ../; vite build; firebase deploy');
    return;
}
