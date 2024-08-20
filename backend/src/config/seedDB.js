const mysql = require("mysql2");
require("dotenv").config(); // Load environment variables from .env file

// Create a connection to MySQL server without specifying the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
});

// SQL query to create the database
const createDbQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`;

// Execute the query to create the database
connection.query(createDbQuery, (err, results) => {
  if (err) {
    console.error("Error creating database:", err);
    connection.end();
    return;
  }
  console.log("Database created or already exists:", results);

  // Connect to the newly created database
  connection.changeUser({ database: process.env.DB_NAME }, (err) => {
    if (err) {
      console.error("Error changing database:", err);
      connection.end();
      return;
    }

    // SQL query to create the 'roles' table
    const createRolesTableQuery = `
      CREATE TABLE IF NOT EXISTS roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        role ENUM('super_admin', 'artist_manager', 'artist',"admin") NOT NULL
      )
    `;

    // SQL query to create the 'user' table
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
        FOREIGN KEY (role_id) REFERENCES roles(id)
      )
    `;

    // SQL query to create the 'artist' table
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

    // SQL query to create the 'music' table
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

    // Execute the queries to create the tables
    connection.query(createRolesTableQuery, (err, results) => {
      if (err) {
        console.error("Error creating roles table:", err);
        connection.end();
        return;
      }
      console.log("Roles table created or already exists:", results);

      const insertRolesQuery = `
      INSERT IGNORE INTO roles (role)
      VALUES ('super_admin'), ('artist_manager'), ('artist'),('admin')
    `;
      connection.query(insertRolesQuery, (err, results) => {
        if (err) {
          console.error("Error inserting roles:", err);
          connection.end();
          return;
        }
        console.log("Roles inserted into the roles table:", results);

        connection.query(createUserTableQuery, (err, results) => {
          if (err) {
            console.error("Error creating user table:", err);
            connection.end();
            return;
          }
          console.log("User table created or already exists:", results);

          connection.query(createArtistTableQuery, (err, results) => {
            if (err) {
              console.error("Error creating artist table:", err);
              connection.end();
              return;
            }
            console.log("Artist table created or already exists:", results);

            connection.query(createMusicTableQuery, (err, results) => {
              if (err) {
                console.error("Error creating music table:", err);
              } else {
                console.log("Music table created or already exists:", results);
              }
              // Close the connection
              connection.end();
            });
          });
        });
      });
    });
  });
});
