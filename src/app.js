const express = require('express');
const db = require('./utils/database');
const initModel = require('./models/init.model');
const Users = require('./models/users.model');
const Todos = require('./models/todos.model');
const app = express();

app.use(express.json());

const PORT = 8000;


db.authenticate()
    .then(() => console.log("AUNTENTICACION EXITOSA"))
    .catch(error => console.log(error));

initModel();

db.sync({ alter: true })
    .then(() => console.log("Base de datos sincronizada"))
    .catch((error) => console.log(error))




app.get('/', (req, res) => {

    res.status(200).json({ message: "Bienvenido Al servidor" })
});

app.get("/users", async (req, res) => {
    try {
        const result = await Users.findAll();
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
    }
});

app.get("/todos", async(req, res)=>{
    try {
        const result = await Todos.findAll();
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
    }
})

app.get("/users/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const result = await Users.findByPk(id);
        res.send(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
});

app.get("/todos/:id", async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const result = await Todos.findByPk(id);
        res.send(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
});
app.get("/users/username/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const result = await Users.findOne({ where: { username } });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
});

app.get("/users/todos/:title", async (req, res) => {
    try {
        const { title } = req.params;
        const result = await Todos.findOne({ where: { title } });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
});

//POST

app.post("/users", async (req, res) => {
    try {
        const user = req.body;
        const result = await Users.create(user);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
});

app.post("/todos", async (req, res) => {
    try {
        const todo = req.body;
        const result = await Todos.create(todo);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
});

//PUT
app.put("/users/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const field = req.body;
        const result = await Users.update(field, {
            where: {id}
        });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
});
app.put("/todos/:userId", async (req, res) => {
    try {
        const {userId} = req.params;
        const field = req.body;
        const result = await Todos.update(field, {
            where: {userId}
        });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
});

//DELETE
app.delete("/users/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Users.destroy({
            where: {id}
        });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
});

app.delete("/todos/:userId", async (req, res) => {
    try {
        const {userId} = req.params;
        const result = await Todos.destroy({
            where: {userId}
        });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
});