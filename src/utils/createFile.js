import log from "./log.js";
import ask from "./ask.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Funzione per creare un file con un nome, estensione, percorso e tipo specificati.
 * @param {Object} options - Parametri opzionali.
 * @param {string} [options.name] - Nome del file da creare (senza estensione).
 * @param {string} [options.extension] - Estensione del file (default: 'txt').
 * @param {string} [options.path] - Percorso relativo in cui creare il file.
 * @param {string} [options.type] - Tipo del file, corrispondente a un template.
 * @returns {Promise<string|null>} - Il percorso assoluto del file creato o null in caso di errore.
 */
export default async function createFile({ name, extension = 'txt', path: relativePath, type } = {}) {
    try {
        // Ottiene il nome del file (chiede all'utente se non è fornito)
        const fileName = name || await ask('Inserisci il nome del file da creare (senza estensione): ');

        if (!fileName || fileName === '') {
            log.error('Il nome del file non può essere vuoto.');
            return null;
        }

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        // Determina il percorso relativo (default: process.cwd())
        const basePath = relativePath ? path.resolve(process.cwd(), relativePath) : process.cwd();
        const targetPath = path.resolve(basePath, `${fileName}.${extension}`);

        // Percorso dei template nella cartella globale del progetto
        const globalTemplatePath = path.resolve(__dirname, '../templates');

        let fileContent = '';

        // Se è specificato un tipo, utilizza il template corrispondente al tipo specificato.
        // In caso contrario, cerca un template con il nome uguale all'estensione del file.
        type = type ?? extension;
        const templateFilePath = path.resolve(globalTemplatePath, `${type}.${extension}`);
        if (fs.existsSync(templateFilePath)) {
            fileContent = fs.readFileSync(templateFilePath, 'utf8');
        } else {
            log.error(`Template "${type}.${extension}" non trovato nella cartella globale.`);
            return null;
        }

        // Scrive il file con il contenuto specificato o vuoto
        fs.writeFileSync(targetPath, fileContent);
        log.success(`File "${fileName}.${extension}" creato con successo in: ${targetPath}`);
        log.info(targetPath);
        return targetPath; // Restituisce il percorso assoluto del file creato
    } catch (error) {
        log.error(`Errore durante la creazione del file: ${error.message}`);
        return null;
    }
}