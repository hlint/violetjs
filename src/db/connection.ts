import fs from "fs-extra";

export const DB_FILE_NAME = "./runtime/db.sqlite";
fs.ensureFileSync(DB_FILE_NAME);
