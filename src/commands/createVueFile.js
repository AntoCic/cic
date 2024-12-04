import { createFile } from "../utils.js";
export default async function createVueFile() {
   return await createFile({ extension : 'vue' });
}