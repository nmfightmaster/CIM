const util = require("util");
const exec = util.promisify(require("child_process").exec);
const path = require("path");
require("dotenv").config({ path: "../.env" });

async function backupDatabase() {
  try {
    const backupFileName = "database_backup.sql";
    const backupFilePath = path.join(__dirname, "../data", backupFileName); // Specify the backup file path here
    const databaseName = process.env.DB_NAME;
    const username = process.env.DB_USER;
    const password = process.env.DB_PASS;

    const { stdout, stderr } = await exec(
      `mysqldump --user=${username} --password=${password} ${databaseName} > ${backupFilePath}`
    );

    console.log("Database backup created:", backupFilePath);
  } catch (error) {
    console.error("Error creating database backup:", error);
  }
}

async function restoreDatabase(backupFilePath) {
  try {
    const databaseName = process.env.DB_NAME;
    const username = process.env.DB_USER;
    const password = process.env.DB_PASS;

    const { stdout, stderr } = await exec(
      `mysql --user=${username} --password=${password} ${databaseName} < ${backupFilePath}`
    );

    console.log("Database restore completed.");
  } catch (error) {
    console.error("Error restoring database:", error);
  }
}

module.exports = { backupDatabase, restoreDatabase };
