import { exec } from 'child_process';
import path from 'path';

/**
 * Funzione per tornare al menu principale del pacchetto.
 */
export default function backHome() {
    // Determina il percorso del file principale del pacchetto
    const mainFilePath = path.resolve(__dirname, '../index.js'); // Adatta il percorso secondo la tua struttura

    // Esegue il comando per rilanciare il file principale
    exec(`node ${mainFilePath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Errore durante il ritorno al menu principale: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Errore nell'esecuzione: ${stderr}`);
            return;
        }
        console.log(stdout); // Mostra eventuali messaggi dell'output del file principale
    });
}