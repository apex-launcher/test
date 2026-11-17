// Intentionally vulnerable sample code for testing SAST/code-scanning tools.
// Do not use any of these patterns in real applications.

const { exec } = require("child_process");
const fs = require("fs");
const mysql = require("mysql");
const _ = require("lodash");

// Hardcoded credentials (CWE-798)
const DB_PASSWORD = "SuperSecret123!";
const AWS_SECRET_ACCESS_KEY = "AKIAIOSFODNN7EXAMPLE";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: DB_PASSWORD,
  database: "app",
});

// SQL Injection (CWE-89): user input concatenated directly into the query
function getUserByName(name, res) {
  const query = "SELECT * FROM users WHERE name = '" + name + "'";
  db.query(query, (err, results) => res.send(results));
}

// OS Command Injection (CWE-78): user input passed straight to a shell
function pingHost(host, res) {
  exec("ping -c 1 " + host, (err, stdout) => res.send(stdout));
}

// Path Traversal (CWE-22): user input used directly as a file path
function readUserFile(filename, res) {
  const content = fs.readFileSync("/var/data/" + filename, "utf8");
  res.send(content);
}

// Prototype Pollution (CWE-1321): merging untrusted input with lodash.merge
function mergeUserSettings(defaults, userInput) {
  return _.merge(defaults, JSON.parse(userInput));
}

// Insecure Deserialization (CWE-502)
function loadSession(serialized) {
  return eval("(" + serialized + ")");
}

// Weak cryptography (CWE-327): MD5 used for password hashing
const crypto = require("crypto");
function hashPassword(password) {
  return crypto.createHash("md5").update(password).digest("hex");
}

module.exports = {
  getUserByName,
  pingHost,
  readUserFile,
  mergeUserSettings,
  loadSession,
  hashPassword,
};
