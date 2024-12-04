
# cic
Questo progetto è una **base modulare** pensata per velocizzare la creazione e l'implementazione di nuovi progetti, fornendo una serie di comandi utili e template predefiniti.

## Funzionalità principali

1. **Creazione di cartelle**
   - Crea rapidamente una struttura di directory per i tuoi progetti.

2. **Generazione di file Vue con template e in futuro molti altri**
   - Usa template predefiniti per generare rapidamente componenti Vue.js.

3. **Esecuzione automatizzata di comandi**
   - Esegui comandi shell come `npm install` direttamente dal menu del programma.

4. **Template personalizzabili**
   - I file vengono generati utilizzando template che possono essere modificati per adattarsi alle tue esigenze.

5. **Menu interattivo**
   - Un'interfaccia a menu che ti guida nelle opzioni disponibili.

6. **Sistema di logging**
   - I messaggi sono chiari e colorati per migliorare la leggibilità nel terminale.

## Utilizzo

Dopo aver clonato il repository, installa le dipendenze necessarie:
```bash
npm install
```

Esegui il programma principale:
```bash
node index.js
```

### Comandi disponibili
- **Crea una cartella**
- **Crea un file Vue**
- **Esegui `npm install`**
- **Mostra il menu di aiuto**

## Struttura del progetto

La struttura delle directory del progetto è la seguente:
```
/src
  /commands
    createVueFile.js
    help.js
  /utils
    ask.js
    checkArg.js
    createFile.js
    createFolder.js
    log.js
    menu.js
    runCmd.js
    text.js
  /templates
    vue.template
    txt.template
index.js
README.md
```

## Vantaggi

- **Modulare e estensibile**: Aggiungi nuovi comandi o template con facilità.
- **Velocità di sviluppo**: Riduce il tempo necessario per iniziare un nuovo progetto.
- **Personalizzabile**: Adatta i template alle esigenze dei tuoi progetti.

---

Questo progetto è pensato per migliorare la produttività e fornire una struttura di base per i tuoi progetti futuri.

Se hai bisogno di ulteriori dettagli, non esitare a contattare l'autore.

```sh
npm install -g .

npm publish
```