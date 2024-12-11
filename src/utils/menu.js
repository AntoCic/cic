import readline from "readline";
import log from "./log.js";

function clearMenu(row) {
  readline.moveCursor(process.stdout, 0, -row);
  for (let i = 0; i < row; i++) {
    readline.clearLine(process.stdout, 0); // Cancella la linea corrente
    if (i < row - 1) {
      readline.moveCursor(process.stdout, 0, 1); // Scendi di una riga per cancellare la successiva
    }
  }
  // Se necessario, puoi riportare il cursore in posizione iniziale
  readline.moveCursor(process.stdout, 0, -(row - 1));
}

/**
 * Mostra un menu interattivo nel terminale.
 * @param {string[]} options - Le opzioni del menu.
 * @param {string} title - Il titolo del menu (opzionale).
 * @returns {Promise<number>} - L'indice dell'opzione selezionata.
 */
export default async function menu(options, title = "") {
  return new Promise((resolve) => {
    let selected = -1; // Opzione selezionata inizialmente
    let selectedText = ""; // Testo opzione selezionata inizialmente

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // Mostra il menu nel terminale
    function renderMenu() {
      if (selected === -1) {
        selected = 0;
      } else {
        clearMenu(options.length + 4);
      }

      if (title) {
        log.blue("=".repeat(title.length)); // Sottolinea il titolo
        log.blue(title); // Mostra il titolo del menu
      }
      log.black(
        "---- Usa le frecce o lo spazio per spostarti e Invio per selezionare:\n"
      );
      options.forEach((option, index) => {
        if (index === selected) {
          selectedText = `> ${option}`;
          log.cyan(selectedText);
        } else {
          log.white(`  ${option}`);
        }
      });
    }

    // Gestione dell'input della tastiera
    function handleKeyPress(_, key) {
      if (key.name === "up") {
        selected = (selected - 1 + options.length) % options.length; // Sposta in alto
      } else if (key.name === "down" || key.name === "space") {
        selected = (selected + 1) % options.length; // Sposta in basso
      } else if (key.name === "return") {
        rl.input.removeListener("keypress", handleKeyPress); // Rimuovi il listener
        rl.close();
        clearMenu(options.length + 5);
        log.cyan(selectedText.replace(">", "-->"));
        resolve(selected); // Restituisci l'indice dell'opzione selezionat
        return;
      }

      renderMenu(); // Ridisegna il menu
    }

    // Ascolta l'input della tastiera
    rl.input.on("keypress", handleKeyPress);

    // Attiva la modalità raw per catturare gli eventi dei tasti
    rl.input.setRawMode(true);
    rl.input.resume();

    renderMenu(); // Disegna il menu inizialmente
  });
}
