import log from "./log.js";
import ask from "./ask.js";
import fs from 'fs';
import path from 'path';

/**
 * Funzione asincrona per creare una cartella.
 * @param {Object} options - Parametri opzionali.
 * @param {string} [options.name] - Nome della cartella da creare.
 * @param {string} [options.path] - Percorso relativo in cui creare la cartella.
 * @returns {Promise<string|null>} - Il percorso assoluto della cartella creata o null se non viene creata.
 */
export default async function createFolder({ name, path: relativePath } = {}) {
    const getFolderName = name ? Promise.resolve(name) : ask('Inserisci il nome della cartella da creare: ');

    return getFolderName
        .then((folderName) => {
            if (!folderName || folderName === '') {
                log.error('Il nome della cartella non può essere vuoto.');
                return null;
            }

            // Costruisce il percorso della cartella
            const basePath = relativePath ? path.resolve(process.cwd(), relativePath) : process.cwd();
            const targetPath = path.resolve(basePath, folderName);

            try {
                fs.mkdirSync(targetPath, { recursive: true }); //  { recursive: true } consente di creare gerarchie di cartelle se necessario.
                log.success(`Cartella "${folderName}" creata con successo in: ${targetPath}`);
                return targetPath; // Restituisce il percorso se la creazione è riuscita
            } catch (error) {
                if (error.code === 'EEXIST') {
                    log.error(`La cartella "${folderName}" esiste già.`);
                } else {
                    log.error(error.message);
                }
                return null;
            }

        })
        .catch((error) => {
            log.error(`Richiesta di input: ${error.message}`);
            return null;
        });
}