const { sequelize } = require("./config/config.js");
const { Sequelize, QueryInterface } = require("sequelize");
const computerModel = require("./models/computermodel.js");
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
  try {
    await sequelize.sync({ force: true });
    console.log('Table "computermodels" dropped successfully.');
  } catch (error) {
    console.error("Error dropping table:", error);
  } finally {
    restoreDatabase("./data/database_backup.sql");
  }
}

dropTable();

app.post("/api/computers", async (req, res) => {
  const { name, serviceTag, model, status } = req.body;
  try {
    const computer = await computerModel.create({
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
    const computers = await computerModel.findAll();
    return res.json(computers);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//get all computer names with inInventory = 1
app.get("/api/computers/imageables", async (req, res) => {
  try {
    const computers = await computerModel.findAll({
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
    const computers = await computerModel.findAll({
      where: { inInventory: 2 },
      attributes: ["name"],
    });
    return res.json(computers);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//change inInventory value of computer name passed in to value passed in
app.put("/api/updatestatus/:name", async (req, res) => {
  var { name } = req.params;
  const { inInventory } = req.body;
  //if name length is 4 prepend CHAS to name
  if (name.length === 4) {
    name = "CHAS" + name;
  }
  try {
    const computer = await computerModel.update(
      { inInventory: inInventory },
      { where: { name: name } }
    );
    return res.json(computer);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get("/api/computers/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const computer = await computerModel.findOne({
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
  var { name } = req.params;
  if (name.length === 4) {
    name = "CHAS" + name;
  }
  try {
    const computer = await computerModel.findOne({
      where: { name: name },
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
