/**
 * Ritorna una stringa colorata per i log della console.
 * @param {string} text - Il testo da colorare.
 * @param {string} color - Il colore del testo (es. "blue", "red", "yellow").
 * @returns {string} - Stringa formattata con il colore specificato.
 * 
 * Colori: 
 * - black, red, green, yellow, blue, magenta, cyan,
 * - white, brightBlack, brightRed, brightGreen, brightYellow,
 * - brightBlue, brightMagenta, brightCyan, brightWhite
 * 
 * Esempo:
 * - textColor("Hello, World!", "blue") -> "Hello, World!" in blu
 */
function textColor(text, color) {
    const colors = {
        black: '\x1b[30m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        white: '\x1b[37m',
        brightBlack: '\x1b[90m',
        brightRed: '\x1b[91m',
        brightGreen: '\x1b[92m',
        brightYellow: '\x1b[93m',
        brightBlue: '\x1b[94m',
        brightMagenta: '\x1b[95m',
        brightCyan: '\x1b[96m',
        brightWhite: '\x1b[97m',
    };

    const reset = '\x1b[0m';

    // Verifica se il colore è supportato
    const colorCode = colors[color];
    if (!colorCode) {
        throw new Error(`Colore non supportato: ${color}. Usa uno tra: ${Object.keys(colors).join(', ')}`);
    }

    return `${colorCode}${text}${reset}`;
}

/**
 * Ritorna una stringa colorata per i log della console.
 * text.[colore](message) 
 * @param {string} message - Il testo da colorare.
 * 
 * - black, red, green, yellow, blue, magenta, cyan,
 * - white, brightBlack, brightRed, brightGreen, brightYellow,
 * - brightBlue, brightMagenta, brightCyan, brightWhite
 */
export default {
    black(message) {
        return textColor(message, 'black');
    },
    red(message) {
        return textColor(message, 'red');
    },
    green(message) {
        return textColor(message, 'green');
    },
    yellow(message) {
        return textColor(message, 'yellow');
    },
    blue(message) {
        return textColor(message, 'blue');
    },
    magenta(message) {
        return textColor(message, 'magenta');
    },
    cyan(message) {
        return textColor(message, 'cyan');
    },
    white(message) {
        return textColor(message, 'white');
    },
    brightBlack(message) {
        return textColor(message, 'brightBlack');
    },
    brightRed(message) {
        return textColor(message, 'brightRed');
    },
    brightGreen(message) {
        return textColor(message, 'brightGreen');
    },
    brightYellow(message) {
        return textColor(message, 'brightYellow');
    },
    brightBlue(message) {
        return textColor(message, 'brightBlue');
    },
    brightMagenta(message) {
        return textColor(message, 'brightMagenta');
    },
    brightCyan(message) {
        return textColor(message, 'brightCyan');
    },
    brightWhite(message) {
        return textColor(message, 'brightWhite');
    },
};