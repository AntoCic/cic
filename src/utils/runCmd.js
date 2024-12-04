import log from "./log.js";
import { spawn } from 'child_process';

/**
 * Esegue una sequenza di comandi shell uno dopo l'altro.
 * @param {string} commands - Una stringa di comandi separati da `;`.
 * @returns {Promise<void>}
 */
export default async function runCommands(commands) {
    const commandList = commands.split(';').map((cmd) => cmd.trim()); // Dividi i comandi e rimuovi spazi

    for (const command of commandList) {
        const [cmd, ...args] = command.split(' '); // Dividi il comando dai suoi argomenti

        log.cyan(`Eseguo: ${cmd} ${args.join(' ')}`);

        await new Promise((resolve, reject) => {
            const process = spawn(cmd, args, { stdio: 'inherit', shell: true });

            process.on('error', (error) => {
                log.error(`Errore durante l'esecuzione di ${cmd}: ${error.message}`);
                reject(error);
            });

            process.on('close', (code) => {
                if (code !== 0) {
                    log.error(`${cmd} terminato con codice ${code}`);
                    reject(new Error(`${cmd} terminato con codice ${code}`));
                } else {
                    resolve();
                }
            });
        });
    }

    log.success('Tutti i comandi sono stati eseguiti con successo!');
}