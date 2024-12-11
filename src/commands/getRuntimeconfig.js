// getRuntimeconfig.js
import fs from 'fs';
import { log, runCmd } from '../utils.js';

/**
 * Recupera le variabili di configurazione Firebase attraverso il comando 
 * `firebase functions:config:get`, e le salva all'interno del file `.runtimeconfig.json`. 
 * 
 * Comportamento della funzione:
 * 1. Controlla se il file `.runtimeconfig.json` esiste:
 *    - Se non esiste, viene creato e inizializzato con un oggetto vuoto `{}`.
 * 
 * 2. Se `.runtimeconfig.json` esiste, la funzione verifica la presenza di `runtimeconfig_backup.json`:
 *    - Se `runtimeconfig_backup.json` non esiste, viene creato e vi viene copiata l'attuale configurazione di `.runtimeconfig.json`
 *      prima di aggiornarla con i nuovi dati.
 * 
 * 3. Viene quindi eseguito il comando `firebase functions:config:get` per ottenere l'insieme più aggiornato 
 *    delle variabili di configurazione. Il risultato di questo comando viene scritto in `.runtimeconfig.json` 
 *    e convertito in un oggetto `configObj` che rappresenta le configurazioni caricate.
 * 
 * Al termine dell'esecuzione, `.runtimeconfig.json` conterrà le variabili aggiornate. In caso di problemi 
 * (ad esempio, se il comando `firebase functions:config:get` non va a buon fine), verrà loggato un errore.
 * 
 * @returns {Promise<Object>} 
 * Un oggetto contenente le variabili di configurazione caricate.
 * 
 * @example
 * // Esempio di utilizzo:
 * getRuntimeconfig()
 *   .then(configObj => {
 *     console.log('Configurazioni aggiornate in .runtimeconfig.json:', configObj);
 *   })
 *   .catch(err => {
 *     console.error('Errore durante l\'aggiornamento delle configurazioni:', err);
 *   });
 */
export default async function getRuntimeconfig() {
    const configPath = '.runtimeconfig.json';
    const backupPath = 'runtimeconfig_backup.json';

    // Controllo se .runtimeconfig.json esiste
    const configExists = fs.existsSync(configPath);

    // Se .runtimeconfig.json non esiste, lo creiamo vuoto
    if (!configExists) {
        fs.writeFileSync(configPath, '{}');
        log.info('.runtimeconfig.json non esisteva, creato vuoto.');
    } else {
        // Creiamo il backup
        const originalConfig = fs.readFileSync(configPath, 'utf-8');
        fs.writeFileSync(backupPath, originalConfig);
        log.info('config_backup.json creato con il contenuto attuale di .runtimeconfig.json');
    }

    // Recupera le variabili dall’environment tramite firebase e crea configObj
    let configObj = {};
    try {
        if(fs.existsSync('./functions')){
            await runCmd('cd ./functions');
        }else{
            log.error('Spostati nella main root del project dove trovi index.html e vite.config.js');
            return;
        }
        const data = await runCmd('firebase functions:config:get');
        fs.writeFileSync(configPath, data);
        configObj = JSON.parse(data);
        await runCmd('cd ../');
        log.success('Variabili env copiate in .runtimeconfig.json');
    } catch (err) {
        await runCmd('cd ../');
        console.error('Errore:', err);
    }

    return configObj;
}
