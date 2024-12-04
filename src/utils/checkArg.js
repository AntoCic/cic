/**
 * Gestisce gli argomenti passati dalla CLI e restituisce l'indice corrispondente.
 * @param {string[]} optionsArgs - Array di opzioni valide (es. ['-c', '-f', '', '-g']).
 * @returns {number|null} - L'indice dell'opzione corrispondente o null se non trovata.
 */
export default function checkArg(optionsArgs) {
    if (process.argv.length > 2) {
        const args = process.argv.slice(2);

        // Prendi il primo argomento
        const firstArg = args[0];

        // Controlla se l'argomento è vuoto o non valido
        if (!firstArg || firstArg.trim() === '') {
            return null;
        }

        // Cerca l'argomento nell'array delle opzioni
        const index = optionsArgs.indexOf(firstArg);

        // Se l'argomento è trovato, restituisci il suo indice, altrimenti null
        return index !== -1 ? index : null;
    }

    // Se non ci sono argomenti validi, restituisci null
    return null;
}
