// ask.js
import readline from 'readline';

/**
 * Funzione per chiedere input all'utente tramite console.
 * @param {string} question - La domanda da fare all'utente.
 * @returns {Promise<string>} - La risposta dell'utente.
 */
export default function ask(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}
