
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import createFolder from '../src/utils/createFolder.js';
import fs from 'fs';
import path from 'path';

const TEST_FOLDER_NAME = 'test-folder-vitest';
const TEST_FOLDER_PATH = path.resolve(process.cwd(), TEST_FOLDER_NAME);

describe('createFolder', () => {
    // Pulizia prima del test
    beforeAll(() => {
        if (fs.existsSync(TEST_FOLDER_PATH)) {
            fs.rmdirSync(TEST_FOLDER_PATH, { recursive: true });
        }
    });

    // Pulizia dopo il test
    afterAll(() => {
        if (fs.existsSync(TEST_FOLDER_PATH)) {
            fs.rmdirSync(TEST_FOLDER_PATH, { recursive: true });
        }
    });

    it('should create a folder and verify its existence', async () => {
        const result = await createFolder({ name: TEST_FOLDER_NAME });

        // Controlla che il risultato sia il percorso corretto
        expect(result).toBe(TEST_FOLDER_PATH);

        // Controlla che la cartella esista
        expect(fs.existsSync(TEST_FOLDER_PATH)).toBe(true);

        // Cancella la cartella
        fs.rmdirSync(TEST_FOLDER_PATH, { recursive: true });

        // Controlla che la cartella sia stata eliminata
        expect(fs.existsSync(TEST_FOLDER_PATH)).toBe(false);
    });
});

