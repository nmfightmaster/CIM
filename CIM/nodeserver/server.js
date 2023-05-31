const sequelize = require('./config/dbconfig.js');
const { Sequelize } = require('sequelize');
const Computer = require('./models/computer');
const express = require("express");
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.authenticate();

app.post('/api/computers', async (req, res) => {
    const { name, serviceTag, model, status } = req.body;
    try {
        const computer = await Computer.create({ name, serviceTag, model, status });
        return res.json(computer);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

app.post('/api/computers/checkin/:query', async (req, res) => {
    const { query } = req.params;
    finalQuery = query;
    if (query.length == 4) {
        finalQuery = 'chas' + query;
    }
    try {
        const computer = await Computer.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { serviceTag: finalQuery },
                    { name: finalQuery }
                ]
            }
        });
        if (!(computer.inInventory === 1)) {
            computer.inInventory = 1;
        }
        await computer.save();
        return res.json(computer);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

app.post('/api/computers/checkout/:query', async (req, res) => {
    const { query } = req.params;
    finalQuery = query;
    if (query.length == 4) {
        finalQuery = 'chas' + query;
    }
    try {
        if (finalQuery.startsWith('chas')) {
            const computer = await Computer.findOne({
                where: {name: finalQuery}
            });
        } else {
            const computer = await Computer.findOne({
                where: {serviceTag: finalQuery}
            });
        }
        if (!(computer.inInventory === 0)) {
            computer.inInventory = 0;
        }
        await computer.save();
        console.log(computer);
        return res.json(computer);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});
    

app.get('/api/computers', async (req, res) => {
    try {
        const computers = await Computer.findAll();
        return res.json(computers);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});


app.get('/api/computers/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const computer = await Computer.findOne({
            where: { name: name }
        });
        return res.json(computer);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});