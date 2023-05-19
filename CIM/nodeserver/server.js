const sequelize = require('./config/dbconfig');
const Computer = require('./models/computer');
const express = require("express");
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.authenticate();

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.post('/api/computers', async(req, res) => {
    const {name, serviceTag, model, status, imagedOn} = req.body;
    try{
        const computer = await Computer.create({name, serviceTag, model, status, imagedOn});
        return res.json(computer);
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});

app.get('/api/computers', async(req, res) => {
    try{
        const computers = await Computer.findAll();
        return res.json(computers);
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});

app.put('/api/computers/:id', async(req, res) => {
    const {name, serviceTag, model, status, imagedOn} = req.body;
    const {id} = req.params;
    try{
        const computer = await Computer.findOne({where: {id}});
        computer.name = name;
        computer.serviceTag = serviceTag;
        computer.model = model;
        computer.status = status;
        computer.imagedOn = imagedOn;
        await computer.save();
        return res.json(computer);
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});