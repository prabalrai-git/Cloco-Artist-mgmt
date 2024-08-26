const mysql = require("mysql2");
require("dotenv").config(); // Load environment variables from .env file

// Create a connection to MySQL server without specifying the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
});

const executeQuery = async (query, connection) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const setupDatabase = async () => {
  try {
    // Create the database
    const createDbQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`;
    await executeQuery(createDbQuery, connection);
    console.log("Database created or already exists.");

    // Change to the newly created database
    await executeQuery(`USE ${process.env.DB_NAME}`, connection);

    // SQL queries to create tables
    const createRolesTableQuery = `
      CREATE TABLE IF NOT EXISTS roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        role ENUM("admin", "super_admin", "artist_manager", "artist") NOT NULL
      )
    `;

    const createArtistTableQuery = `
      CREATE TABLE IF NOT EXISTS artist (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        dob DATE,
        gender ENUM('male', 'female', 'other'),
        address TEXT,
        first_release_year YEAR,
        no_of_albums_released INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        dob DATE,
        gender ENUM('male', 'female', 'other'),
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        role_id INT,
        artist_id INT,
        FOREIGN KEY (role_id) REFERENCES roles(id),
        FOREIGN KEY (artist_id) REFERENCES artist(id)
      )
    `;

    const createMusicTableQuery = `
      CREATE TABLE IF NOT EXISTS music (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        album_name VARCHAR(255),
        genre ENUM('rnb', 'country', 'classic', 'rock', 'jazz'),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        artist_id INT,
        FOREIGN KEY (artist_id) REFERENCES artist(id)
      )
    `;

    // Execute the table creation queries
    await executeQuery(createRolesTableQuery, connection);
    console.log("Roles table created or already exists.");

    const insertRolesQuery = `
      INSERT IGNORE INTO roles (role)
      VALUES ('super_admin'), ('artist_manager'), ('artist'), ('admin')
    `;
    await executeQuery(insertRolesQuery, connection);
    console.log("Roles inserted into the roles table.");

    await executeQuery(createArtistTableQuery, connection);
    console.log("Artist table created or already exists.");

    await executeQuery(createUserTableQuery, connection);
    console.log("User table created or already exists.");

    await executeQuery(createMusicTableQuery, connection);
    console.log("Music table created or already exists.");
  } catch (err) {
    console.error("Error setting up the database:", err);
  } finally {
    // Close the connection
    connection.end();
  }
};

// Call the setup function
setupDatabase();
