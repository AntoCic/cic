import readline from 'readline';
import log from './log.js';

/**
 * Mostra un menu interattivo nel terminale.
 * @param {string[]} options - Le opzioni del menu.
 * @param {string} title - Il titolo del menu (opzionale).
 * @returns {Promise<number>} - L'indice dell'opzione selezionata.
 */
export default async function menu(options, title = '') {
    return new Promise((resolve) => {
        let selected = 0; // Opzione selezionata inizialmente
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        // Mostra il menu nel terminale
        function renderMenu() {
            console.clear();
            if (title) {
                log.blue('='.repeat(title.length)); // Sottolinea il titolo
                log.blue(title); // Mostra il titolo del menu
            }
            log.black('---- Usa le frecce o lo spazio per spostarti e Invio per selezionare:\n');
            options.forEach((option, index) => {
                if (index === selected) {
                    log.cyan(`> ${option}`);
                } else {
                    log.white(`  ${option}`);
                }
            });
        }

        // Gestione dell'input della tastiera
        function handleKeyPress(_, key) {
            if (key.name === 'up') {
                selected = (selected - 1 + options.length) % options.length; // Sposta in alto
            } else if (key.name === 'down' || key.name === 'space') {
                selected = (selected + 1) % options.length; // Sposta in basso
            } else if (key.name === 'return') {
                rl.input.removeListener('keypress', handleKeyPress); // Rimuovi il listener
                rl.close();
                resolve(selected); // Restituisci l'indice dell'opzione selezionat
                return;
            }

            renderMenu(); // Ridisegna il menu
        }

        // Ascolta l'input della tastiera
        rl.input.on('keypress', handleKeyPress);

        // Attiva la modalità raw per catturare gli eventi dei tasti
        rl.input.setRawMode(true);
        rl.input.resume();

        renderMenu(); // Disegna il menu inizialmente
    });
}
