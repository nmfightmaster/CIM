require('dotenv').config();

const express = require("express");

const cors = require('cors');

const connection = require("./services/db");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

/*connection.connect(function (err) {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }

  console.log("Connected to MySQL database.");

  connection.query("SELECT * FROM computers", function (err, result, fields) {
    if (err) {
      console.error("Error executing query:", err);
      return;
    }

    console.log(result);
    connection.end(); // Close the connection when done
  });
});*/


app.get("/api/message", (req, res) => {
  console.log("/api/message page reached");
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});