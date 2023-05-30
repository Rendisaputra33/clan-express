const mysql = require("mysql2/promise");

async function getConnection() {
  try {
    const instance = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "todo_app",
    });

    await instance.connect();
    return instance;
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

module.exports = getConnection;
