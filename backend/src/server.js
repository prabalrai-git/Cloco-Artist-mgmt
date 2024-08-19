const app = require("./app");
const connection = require("./config/db");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  try {
    connection.connect((err) => {
      if (err) {
        console.error("Error connecting to mysql DB:", err);
        process.exit(1);
      }
      console.log("Mysql Database connection successful");
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
});
