
const db = require('../utils/database');
const Users = require('../models/users.model');
const Todos = require('../models/todos.model');

const users = [

    { username: "Roman", email: "roman@roman.com", password: "1234" },
    { username: "Emiliano", email: "Emiliano@roman.com", password: "we4556" },
    { username: "Arenas", email: "arenas@roman.com", password: "eewewewe" },
    { username: "Juan", email: "juan@juan.com", password: "356844" },
];

const todos = [
    { title: "tarea1", description: "Ir al trabajo", userId: 1 },
    { title: "tarea2", description: "Ordenar la casa", userId: 2 },
    { title: "tarea3", description: "Limpiar el patio", userId: 3 },
    { title: "tarea4", description: "Hacer las compras", userId: 4 },
];

db.sync({ force: true })
    .then(() => {
        console.log("Iniciando la inserccion de usuarios")
        users.forEach(user=> Users.create(user));
        setTimeout(() => {
            todos.forEach(todo => Todos.create(todo))
        }, 100);
    })
    .catch(error => console.log(error));