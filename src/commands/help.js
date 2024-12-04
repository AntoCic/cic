import { log } from "../utils.js";
export default function help() {
    log.magenta('###############################');
    log.yellow('Comando: cic -cc');
    log.white('-------> Crea una cartella nella directory corrente.');
    log.yellow('Comando: cic -cf');
    log.white('-------> Crea un file .vue con un template di base.');
    log.yellow('Comando: cic -up');
    log.white('-------> Esegue Update npm');
    log.yellow('Comando: cic --help');
    log.white('-------> Mostra questi log per conoscre i comandi');
    log.magenta('###############################');
}
