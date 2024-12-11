import log from "./log.js";
import { spawn } from 'child_process';

/**
 * Esegue una sequenza di comandi shell uno dopo l'altro, attendendo la fine di ciascuno prima di procedere al successivo.
 * Al termine, ritorna l'output di tutti i comandi eseguiti.
 *
 * @param {string} commands - Una stringa di uno o più comandi separati dal carattere `;`. 
 *                            Ad esempio: "echo 'ciao'; ls -la".
 *
 * @returns {Promise<string|string[]>} - Restituisce:
 *    - Una singola stringa se è stato eseguito un solo comando.
 *    - Un array di stringhe se sono stati eseguiti più comandi.
 *
 * Il valore di ritorno contiene i dati emessi su `stdout` da ciascun comando.
 *
 * @example
 * // Esempio 1: Eseguire un singolo comando e stampare il risultato
 * runCmd('echo "Hello World"')
 *   .then(output => {
 *     console.log('Output:', output); // Output: "Hello World\n"
 *   })
 *   .catch(err => console.error('Errore:', err));
 *
 * @example
 * // Esempio 2: Eseguire più comandi e accedere ai risultati separatamente
 * runCmd('echo "Primo comando"; echo "Secondo comando"')
 *   .then(results => {
 *     console.log('Primo output:', results[0]);  // "Primo comando\n"
 *     console.log('Secondo output:', results[1]); // "Secondo comando\n"
 *   })
 *   .catch(err => console.error('Errore:', err));
 */
export default async function runCmd(commands) {
    const commandList = commands.split(';').map((cmd) => cmd.trim()); // Dividi i comandi e rimuovi spazi
    let results = [];

    for (const command of commandList) {
        const [cmd, ...args] = command.split(' '); // Dividi il comando dai suoi argomenti
        log.cyan(`Eseguo: ${cmd} ${args.join(' ')}`);

        const output = await new Promise((resolve, reject) => {
            let stdoutData = '';
            let stderrData = '';

            const process = spawn(cmd, args, { shell: true });

            process.stdout.on('data', (data) => {
                stdoutData += data.toString();
            });

            process.stderr.on('data', (data) => {
                stderrData += data.toString();
            });

            process.on('error', (error) => {
                log.error(`Errore durante l'esecuzione di ${cmd}: ${error.message}`);
                reject(error);
            });

            process.on('close', (code) => {
                if (code !== 0) {
                    log.error(`${cmd} terminato con codice ${code}`);
                    reject(new Error(`${cmd} terminato con codice ${code}\n Stderr:\n${stderrData}`));
                } else {
                    resolve(stdoutData);
                }
            });
        });
        results.push(output);
    }

    if (results.length === 1) {
        return results[0];
    }
    return results;
}