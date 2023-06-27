const { sequelize } = require("./config/config.js");
const { Sequelize, QueryInterface } = require("sequelize");
const Computer = require("./models/computer.js");
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();
const { getWarrantyInfo } = require("./utils/dellApi.js");
const { backupDatabase, restoreDatabase } = require("./utils/sqlDump.js");
const { getOUFromDeviceName } = require("./utils/ldap.js");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function dropTable() {
  await sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");
  console.log("Foreign key checks disabled.");

  await sequelize.query("DROP TABLE issues;");
  console.log('Table "issues" dropped.');

  await sequelize.query("DROP TABLE computers;");
  console.log('Table "computers" dropped.');

  await sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
  console.log("Foreign key checks re-enabled.");

  restoreDatabase("./data/database_backup.sql");
}
//backupDatabase(); //uncomment to backup database
dropTable();

app.post("/api/computers", async (req, res) => {
  const { name, serviceTag, model, status } = req.body;
  try {
    const computer = await Computer.create({
      name,
      serviceTag,
      model,
      status,
    });
    return res.json(computer);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get("/api/computers", async (req, res) => {
  try {
    const computers = await Computer.findAll();
    return res.json(computers);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//get all computer names with inInventory = 1
app.get("/api/computers/imageables", async (req, res) => {
  try {
    const computers = await Computer.findAll({
      where: { inInventory: 1 },
      attributes: ["name"],
    });
    return res.json(computers);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get("/api/computers/deployables", async (req, res) => {
  try {
    const computers = await Computer.findAll({
      where: { inInventory: 2 },
      attributes: ["name"],
    });
    return res.json(computers);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//change inInventory value of computer name passed in to 1
app.put("/api/checkinout/:name", async (req, res) => {
  var { name } = req.params;
  var { way } = req.body;
  //if name length is 4 prepend CHAS to name
  if (name.length === 4) {
    passedName = "CHAS" + name;
  } else {
    passedName = name;
  }
  try {
    let computer = await Computer.findOne({ where: { name: passedName } });
    if (!computer) {
      return res.status(404).json({ error: "Computer not found" });
    }
    if (way === "in") {
      computer.inInventory = 1;
    } else if (way === "out") {
      computer.inInventory = 0;
      computer.isImaged = false;
      computer.isWiped = false;
      computer.scriptRan = false;
      computer.isRenamed = false;
      computer.isUpdated = false;
    } else {
      return res.status(400).json({ error: "Invalid 'way' parameter." });
    }
    await computer.save();
    return res.json(computer);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.put("/api/imaged/:name", async (req, res) => {
  var { name } = req.params;
  //if name length is 4 prepend CHAS to name
  if (name.length === 4) {
    passedName = "CHAS" + name;
  } else {
    passedName = name;
  }
  try {
    let computer = await Computer.findOne({ where: { name: passedName } });
    if (!computer) {
      return res.status(404).json({ error: "Computer not found" });
    }
    computer.inInventory = 2;
    computer.imagedOn = new Date().toLocaleDateString();
    await computer.save();
    return res.json(computer);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.put("/api/status/:name", async (req, res) => {
  const { name } = req.params;
  const { status } = req.body;
  let passedName = name;
  // If name length is 4, prepend "CHAS" to the name
  if (name.length === 4) {
    passedName = "CHAS" + name;
  }

  try {
    let computer = await Computer.findOne({ where: { name: passedName } });
    if (!computer) {
      return res.status(404).json({ error: "Computer not found" });
    }
    switch (status) {
      case "wiped":
        computer.isWiped = !computer.isWiped;
        break;
      case "scriptRan":
        computer.scriptRan = !computer.scriptRan;
        break;
      case "renamed":
        computer.isRenamed = !computer.isRenamed;
        break;
      case "updated":
        computer.isUpdated = !computer.isUpdated;
        break;
      default:
        return res.status(400).json({ error: "Invalid status" });
    }
    if (
      computer.isWiped &&
      computer.scriptRan &&
      computer.isRenamed &&
      computer.isUpdated
    ) {
      computer.isImaged = true;
    } else {
      computer.isImaged = false;
    }

    await computer.save();

    return res.json(computer);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get("/api/computers/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const computer = await Computer.findOne({
      where: { name: name },
    });
    return res.json(computer);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//check if computer is in database
app.get("/api/computers/exists/:name", async (req, res) => {
  const { name } = req.params;
  if (name.length === 4) {
    const passedName = "CHAS" + name;
  } else {
    const passedName = name;
  }
  try {
    const computer = await Computer.findOne({
      where: { name: passedName },
    });
    if (computer) {
      return res.json(true);
    } else {
      return res.json(false);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get("/api/ou/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const ou = await getOUFromDeviceName(name);
    return res.json(ou.replace(/\\/g, "/"));
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
