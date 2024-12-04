// log.js
import text from './text.js';

function getDateTime() {
    return new Date().toLocaleString().replace(', ', '-');
}

/**
 * Esegue un console.log del colore selezionato o direttamente del tipo selezionato.
 * log.[colore || tipo](message) 
 * @param {string} message - Il testo da colorare.
 * 
 * tipi:
 * info, warning, danger, success.
 * 
 * Colori:
 * - red, green, yellow, blue, magenta, cyan, white.
 */
export default {
    white(message) {
        console.log(text.white(message));
    },
    black(message) {
        console.log(text.black(message));
    },
    green(message) {
        console.log(text.green(message));
    },
    blue(message) {
        console.log(text.blue(message));
    },
    cyan(message) {
        console.log(text.cyan(message));
    },
    yellow(message) {
        console.log(text.yellow(message));
    },
    magenta(message) {
        console.log(text.magenta(message));
    },
    red(message) {
        console.log(text.red(message));
    },

    info(message) {
        console.log(text.brightCyan(`[${getDateTime()}][INFO]: ${message}`));
    },

    warning(message) {
        console.log(text.yellow(`[${getDateTime()}][WARNING]: ${message}`));
    },

    error(message) {
        console.log(text.red(`[${getDateTime()}][ERROR]: ${message}`));
    },

    success(message) {
        console.log(text.green(`[${getDateTime()}][SUCCESS]: ${message}`));
    }
};